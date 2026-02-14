import Button from "@/components/button";
import { ArrowLeft, CircleMinus, Crown, Image, LogOut, SendIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "@/api/get_request";
import { alertBox } from "@/utils/alert";
import { WhisperroomType } from "@/utils/types";
import { postData } from "@/api/post_request";
import useFormInput from "@/context/formChange";
import { connectSocket } from "@/utils/socket";
import { deleteData } from "@/api/delete_request";
import ReplyModal from "@/components/reply";

const Whisperroom = () => {
    const imagePicker = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { room_thread } = useParams();
    const [data, setData] = useState<WhisperroomType[]>([]);
    const [info, setInfo] = useState<{title : string, reply_content : string, count : number, is_admin: boolean}>({
        title: "",
        reply_content: "",
        count: 0,
        is_admin: null
    });
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const isAtBottomRef = useRef(true);
    const websocket = useRef<any>(null);
    const [replyModal, setReplyModal] = useState<{state: boolean, id: number, sender: boolean}>({
        state : false,
        id: null,
        sender: true
    });

    const { formData, handleRegisterInput, setFormData } = useFormInput<{message: string, reply: number | null, image: File | null}>({
        message: "",
        reply: null,
        image: null
    });
    const body = useRef<HTMLDivElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (!formData.image) {
            setPreview(null);
            return;
        }
        const url = URL.createObjectURL(formData.image);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [formData.image]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setFormData(prev => ({...prev, image: file}))            
        }
    }

    useEffect(() => {
        if (data.length > 0) {
            scrollToBottom(false);
        }
    }, [data.length]);

    const handleScroll = (e) => {
        const target = e.currentTarget;
        const isAtBottom =
            target.scrollHeight - target.scrollTop <= target.clientHeight + 50;

        isAtBottomRef.current = isAtBottom;

        setShowScrollBtn(!isAtBottom);
    }

    const scrollToBottom = (smooth = true) => {
        requestAnimationFrame(() => {
            messagesEndRef.current?.scrollIntoView({
                behavior: smooth ? "smooth" : "auto"
            });
        });
    };

    // reply logic and modal
    let timer;

    function startTimer(id: number, sender: boolean) {
        timer = setTimeout(() => {
            setReplyModal({id: id, state: true, sender: sender})
        }, 2000);
    }

    function cancelTimer() {
        clearTimeout(timer);
    }

    function onReply(id: number) {
        setFormData(prev => ({...prev, reply: id}))
        getData({
            url: `pages/reply_whisperroom?id=${id}`,
            navigate,
            onSuccess: (response) => {setInfo(prev => ({...prev, reply_content: response.data}));},
            onError: (error) => alertBox({ message: error.response.data.detail, success: false, top: "0" })
        });
    }

    async function onDelete(id: number) {
        await websocket.current?.send({
            type : "delete",
            data : id
        });
    }

    // To make enter key send message
    function altSendMessage(e: React.KeyboardEvent) {
        if (e.key === "Enter") sendMessage();
    }

    // Sending the image to the backend
    async function sendImage() {
        const formInput = new FormData();
        if (formData.image) formInput.append("image", formData.image);
        
        try {
            const response =  await postData({
                url: `pages/upload_image`,
                data: formInput,
                navigate
            });
            const filename = response.data.image || response.data;
            return filename
        }
        catch (error) {
            alertBox({ message: error.response.data.detail, success: false, top: "0" });
             return null;
        }
    }

    // Leave chat room
    async function leaveRoom() {
        await deleteData({
            url: `pages/leave_room/${room_thread}`,
            navigate,
            onSuccess: () => navigate("../join_room", {replace: true}),
            onError: (error) => alertBox({ message: error.response.data.detail, success: false, top: "0" })
        })
    }
    
    // delete chat room
    async function dissolveRoom() {
        await deleteData({
            url: `pages/dissolve_room/${room_thread}`,
            navigate,
            onSuccess: () => navigate("../join_room", {replace: true}),
            onError: (error) => alertBox({ message: error.response.data.detail, success: false, top: "0" })
        })
    }

    // send message
    async function sendMessage() {
        if (!formData.message.trim() && !formData.image) {
            alertBox({ message: "Can't send empty message", success: false, top: "0" });
            return
        }
        let imageName: string | null
        if (formData.image) {
            try {
                imageName = await sendImage();
                if (!imageName) return
            }
            catch {
                return;
            }            
        }
        const payload = {
            content : formData.message,
            reply_to : formData.reply,
            image : imageName
        }

        await websocket.current?.send({
            type : "message",
            data : payload
        });
        setFormData({message: "", reply: null, image: null});
        setInfo(prev => ({...prev, reply_content: ""}))
    }

    useEffect(() => {
        getData({
            url: `pages/whisperroom/${room_thread}`,
            navigate,
            onSuccess: (response) => {setInfo(prev => ({...prev, title: response.data.room_name, count: response.data.count, is_admin: response.data.is_admin})); setData(response.data.messages);},
            onError: (error) => alertBox({ message: error.response.data.detail, success: false, top: "0", onClose: () => navigate("../join_room") })
        });

        websocket.current = connectSocket({
            url: `send_whisperroom/${room_thread}`,
            onMessage: (event) => {
                if (event.type === "message") {
                    setData(prev => {
                        const updated = [...prev, event.data];

                        if (isAtBottomRef.current) {
                            setTimeout(() => scrollToBottom(), 0);
                        }
                        return updated;
                    });
                }
                else if (event.type === "delete"){
                    const msgId = event.data;
                    const msgData = document.querySelector(`#id_${msgId}`);
                    if (msgData) msgData.remove()
                }
                else if (event.type === "update") {
                    if (event.data) {
                        setInfo(prev => ({...prev, count: prev.count + 1}));
                    } else {
                        setInfo(prev => ({...prev, count: prev.count - 1}));
                    }
                }
                else if (event.type === "dissolve") {
                    if (event.data) {
                        alertBox({ message: `${info.title} dissolved`, success: false, top: "0", onClose: () => navigate("../join_room", {replace: true}) })
                        setTimeout(() => navigate("../join_room", {replace: true}), 5000);
                    }
                }
            }
        });

        return () => {
            websocket.current?.close();
        }
    }, []);
    return (
        <div>
            {replyModal.state && 
                <div className="w-full h-screen backdrop-blur-2xl absolute top-0 left-0 flex justify-center items-center" onClick={() => setReplyModal({id: null, state: false, sender: null})}>
                    <ReplyModal onreply={() => onReply(replyModal.id)} ondelete={() => onDelete(replyModal.id)} sender={replyModal.sender} />
                </div>
            }

            <div className={`bg-blue-50 w-full text-gray-600 h-[calc(100vh-60px)] lg:px-10 md:px-5 px-2 md:py-5 py-2 font-inter overflow-y-auto md:font-normal font-medium`}>
            <div className="h-15 flex justify-between items-center p-3 bg-white">
                <div className="flex items-center gap-5">
                    <button onClick={() => navigate(-1)}><ArrowLeft /></button>
                    <div>
                        <b>{info.title}</b>
                        <p className="text-[13px]">{info.count} members</p>
                    </div>
                </div>
                <div className="text-[14px] h-full *:items-center *:justify-center space-x-3 flex">
                    <div className="w-fit flex" title="leave room" onClick={leaveRoom}>
                        <Button label="Leave Room" buttonType="outlined" extraClass="w-fit px-3 h-full gap-2 md:block hidden" />
                        <Button label={<><LogOut /></>} buttonType="outlined" extraClass="w-fit px-3 h-full gap-2 md:hidden block" />
                    </div>
                    {info.is_admin && 
                        <div className="w-fit flex" title="dissolve room" onClick={dissolveRoom}>
                            <Button label="Dissolve Room" buttonType="outlined" extraClass="w-fit px-3 h-full gap-2 md:block hidden" />
                            <Button label={<><CircleMinus className="text-red-600" /></>} buttonType="outlined" extraClass="w-fit px-3 h-full gap-2 md:hidden block" />
                        </div>
                    }
                </div>
            </div>
            <div className="h-[calc(100%-60px)] bg-white border-t border-gray-200 md:px-5 px-2 py-4 flex flex-col justify-between">
                <div className="space-y-5 h-[90%] overflow-y-auto no-scrollbar" onScroll={handleScroll}>
                    {data.map(item => (
                        item.sender ? 
                        <div className="flex justify-end items-center gap-2 w-full" key={item.id} id={`id_${item.id}`}>
                            <div className="bg-blue-500 md:max-w-[70%] max-w-[80%] w-fit p-2 rounded-lg space-y-2 text-white" onTouchStart={() => startTimer(item.id, true)} onTouchEnd={cancelTimer} onTouchCancel={cancelTimer} onDoubleClick={() => setReplyModal({id: item.id, state: true, sender: true})}>
                                {item.reply_to && 
                                    <div className="border-l-4 border-l-white-600 bg-blue-600 p-2 rounded-lg">
                                        <p>{item.reply_to}</p>
                                    </div>
                                }
                                {item.admin && (
                                    <Crown size={14} className="text-white-500 ml-1 text-right" />
                                )}
                                {item.image && <img src={`${import.meta.env.VITE_SERVER_URL}/pages/image/${encodeURIComponent(item.image)}`} alt={item.image} className="max-w-full max-h-60 object-contain rounded-md mb-2"/>}
                                <p className="md:text-[16px] text-[16px]">{item.content}</p>
                                <p className="text-start text-[12px]">10:05 PM</p>
                            </div>
                        </div> 
                        :
                        <div className="flex justify-start items-center gap-2 w-full" key={item.id} id={`id_${item.id}`}>
                            <div className="bg-gray-100 md:max-w-[70%] max-w-[80%] w-fit p-2 rounded-lg space-y-2" onTouchStart={() => startTimer(item.id, false)} onTouchEnd={cancelTimer} onTouchCancel={cancelTimer} onDoubleClick={() => setReplyModal({id: item.id, state: true, sender: false})}>
                                {item.reply_to &&
                                    <div className="border border-l-4 border-l-blue-600 border-gray-200 bg-gray-200 p-2 rounded-lg">
                                        <p>{item.reply_to}</p>
                                    </div>                                
                                }
                                {item.admin && (
                                    <Crown size={15} className="text-blue-500 ml-1" />
                                )}
                                {item.image && <img src={`${import.meta.env.VITE_SERVER_URL}/pages/image/${encodeURIComponent(item.image)}`} alt={item.image} className="max-w-full max-h-60 object-contain rounded-md mb-2"/>}
                                <p className="md:text-[16px] text-[16px]">{item.content}</p>
                                <p className="text-start text-[12px]">10:05 PM</p>
                            </div>
                        </div>
                    ))} 

                    {showScrollBtn && (
                        <button
                            onClick={() => scrollToBottom()}
                            className="fixed bottom-28 right-6 bg-blue-500 text-white px-3 py-2 rounded-full shadow-lg hover:bg-blue-600 transition"
                        >
                            ↓
                        </button>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="flex flex-col justify-end w-full mt-2">
                    {info.reply_content.trim() !== "" && 
                    <div className="border border-l-4 md:ml-[4%] ml-[11%] border-l-blue-600 border-gray-200 md:w-[85%] w-[75%] bg-gray-200 p-2 rounded-lg">
                        <div className="flex justify-end">
                            <X size={16} onClick={() => {
                                setInfo(prev => ({...prev, reply_content: ""}));
                                setFormData(prev => ({...prev, reply: null}))}} />
                        </div>
                        <p>{info.reply_content}</p>
                    </div>}
                    {preview && (
                        <img src={preview} className="w-30 h-25 object-contain mt-2 md:ml-[4%] ml-[11%]" />
                    )}
                    <div className="flex gap-2 h-[60px] justify-center w-full items-center mt-2">
                        <div className="md:w-[3%] w-[10%] flex justify-center border">
                            <Image onClick={() => imagePicker.current.click()} />
                            <input type="file" className="hidden" ref={imagePicker} onChange={handleChange} />
                        </div>
                        <input type="text" name="message" id="message" placeholder="Write an anonymous message..." className="h-full border border-gray-100 md:w-[85%] w-[75%] rounded-md px-3 outline-0" onChange={handleRegisterInput} value={formData.message} onKeyDown={altSendMessage} />
                        <button className="bg-blue-500 text-white px-5 border h-10 rounded-md md:w-[10%] w-[13%] flex gap-1 text-[14px] items-center justify-center" onClick={sendMessage}>
                            <SendIcon size={16} className="md:hidden block text-white" /> 
                            <span className="md:block hidden">Send</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Whisperroom;
