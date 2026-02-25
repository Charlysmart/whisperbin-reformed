import { getData } from "@/api/get_request";
import { alertBox } from "@/utils/alert";
import { ChatType } from "@/utils/types";
import { ArrowLeft, CircleMinusIcon, Flag, Image, MoreVertical, Send, SendIcon, X } from "lucide-react";
import Button from "@/components/button";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFormInput from "@/context/formChange";
import { postData } from "@/api/post_request";
import { connectSocket } from "@/utils/socket";
import ReplyModal from "@/user/components/reply";
import { handleRightClick } from "@/utils/contextMenu";

type SocketMessage =
  | { type: "message"; data: { id: string; message: string; image?: string; message_thread: string; sender: boolean; read: boolean } }
  | { type: "read"; data: { message_id: string } }
const Chat = () => {
    const navigate = useNavigate();
    const { thread } = useParams();
    const [more, setMore] = useState<boolean>(false);
    const imagePicker = useRef<HTMLInputElement | null>(null);
    const [data, setData] = useState<ChatType>([]);
    const [block, setBlocked] = useState<{blocked : boolean, blocked_by: boolean | null}>({
        blocked : null,
        blocked_by : null
    })
    const [image, setImage] = useState<File | null>(null);
    const sentReadReceipts = useRef(new Set<number>());
    const { formData, handleRegisterInput, setFormData } = useFormInput<{
        message: string, 
        image: string | null, 
        message_thread: string, 
        reply_id: number
    }>({
        message: "",
        image: null,
        message_thread: thread,
        reply_id: null
    });
    const [replyModal, setReplyModal] = useState<{state: boolean, id: number, sender: boolean, reply_content : string}>({
        state : false,
        id: null,
        sender: true,
        reply_content: ""
    });
    const body = useRef<HTMLDivElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const isAtBottomRef = useRef(true);
    const socketRef = useRef<any>(null);

    useEffect(() => {
        if (!image) {
            setPreview(null);
            return;
        }
        const url = URL.createObjectURL(image);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [image]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setImage(file);
        }
    }

    const handleScroll = (e) => {
        const target = e.currentTarget;
        const isAtBottom =
            target.scrollHeight - target.scrollTop <= target.clientHeight + 50;

        isAtBottomRef.current = isAtBottom;

        setShowScrollBtn(!isAtBottom);
        if (isAtBottom) markMessagesAsRead();
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
            setReplyModal(prev => ({...prev, id: id, state: true, sender: sender}))
        }, 2000);
    }

    function cancelTimer() {
        clearTimeout(timer);
    }

    function onReply(id: number) {
        setFormData(prev => ({...prev, reply_id: id}))
        getData({
            url: `pages/reply_chat?id=${id}`,
            navigate,
            onSuccess: (response) => {setReplyModal(prev => ({...prev, reply_content: response.data}));},
            onError: (error) => alertBox({ message: error.response.data.detail, success: false, top: "0" })
        });
    }

    async function onDelete(id: number) {
        await socketRef.current?.send({
            type : "delete",
            data : id
        });
    }

    // To make enter key send message
    function altSendMessage(e: React.KeyboardEvent) {
        if (e.key === "Enter") sendMessage();
    }

    async function sendImage(): Promise<string> {
        const payLoad = new FormData();
        payLoad.append("image", image);

        try {
            const response = await postData({ url: "/pages/upload_image", data: payLoad});
            const filename = response.data.image || response.data; 
            setFormData(prev => ({...prev, image : filename}));
            return filename;
        }
        catch (error) {
            const message = error?.response?.data?.detail || "Something went wrong";
            alertBox({ message, success: false, top: "0" })
            return null; 
        }
    }

    async function sendMessage() {
        let imageName: string | null = null;

        if (image) {
            try {
                imageName = await sendImage();
                if (!imageName) return
            } catch {
                return; // stop if upload fails
            }
        }

        const payload = {
            message: formData.message,
            image: imageName,
            message_thread: formData.message_thread,
            reply_to: formData.reply_id
        };        
              
        await socketRef.current?.send({
            type: "message",
            data: payload
        });
        setFormData((prev) => ({...prev, message: "", image: null, reply_id: null}));
        setReplyModal((prev) => ({...prev, reply_content: ""})) 
        setImage(null);
        setTimeout(() => scrollToBottom(), 50);
    }

    const markMessagesAsRead = () => {
        data.forEach(msg => {
            if (!msg.read && !msg.sender && !sentReadReceipts.current.has(msg.id)) {
                socketRef.current?.send({
                    type: "read_receipt",
                    data: { message_id : msg.id }
                });
                sentReadReceipts.current.add(msg.id);
            }
        });
    };

    const blockChat = async (thread: string) => {
        await getData({
            url: `/pages/block_chat?thread=${thread}`,
            onSuccess: (response) => setBlocked(response.data),
            onError: (error) => alertBox({ message: error.response.data.detail, success: false, top: "0" })
        });
    }

    async function getChat() {
        await getData({
            url: `/pages/chat/${thread}`, 
            onSuccess: (response) => {
                setData(response.data.chat);
                setBlocked(response.data.block)
            }, 
            onError: (error) => {
                const message = error?.response?.data?.detail || "Something went wrong";
                alertBox({ message, success: false, top: "0" });
            }, 
            navigate
        });
    }

    useEffect(() => {
        if (data.length > 0) {
            scrollToBottom(false);
        }
    }, [data.length]);

    useEffect(() => {
        getChat();
        document.addEventListener("contextmenu", handleRightClick);

        socketRef.current = connectSocket({
            url: "send_chat",
            onMessage: (data) => {
                if (data.type === "error") {
                    alertBox({ message: data.data, success: false, top: "0" });
                }
                else if (data.type === "message") {
                    setData(prev => {
                        const updated = [...prev, data.data];

                        if (isAtBottomRef.current) {
                            setTimeout(() => scrollToBottom(), 0);
                        }
                        return updated;
                    });
                } 
                else if (data.type === "delete") {
                    let content = document.querySelector(`#id_${data.data}`);
                    if (content) content.remove();
                }
                else if (data.type === "block") {
                    setBlocked(data.payload);
                }
            }
        });

        return () => {
            document.removeEventListener("contextmenu", handleRightClick);
            socketRef.current?.close();
        };
    }, []);

    return (
        <div className={`bg-surface w-full h-[calc(100vh-60px)] lg:px-10 md:px-5 px-2 md:py-5 py-2 font-inter overflow-y-auto md:font-normal no-copy text-ash font-medium`}>
            {replyModal.state && 
                <div className="w-full h-screen backdrop-blur-2xl absolute top-0 left-0 flex justify-center items-center" onClick={() => setReplyModal(prev => ({...prev, id: null, state: false, sender: null}))}>
                    <ReplyModal onreply={() => onReply(replyModal.id)} ondelete={() => onDelete(replyModal.id)} sender={replyModal.sender} />
                </div>
            }
            <div className="h-15 flex justify-between items-center p-3 bg-void">
                <div className="flex items-center gap-5">
                    <button onClick={() => navigate(-1)}><ArrowLeft /></button>
                    <b>Anonymous Chat</b>
                </div>
                {((!block.blocked) || block.blocked && block.blocked_by) &&  
                    <div>
                        <div className="text-[14px] h-full *:items-center *:justify-center space-x-3 md:flex hidden">
                            <Button label={<><CircleMinusIcon /> {block.blocked && block.blocked_by ? "Unblock" : "Block"}</>} extraClass="w-fit p-2 h-full bg-ember text-ash flex gap-2" onclick={() => blockChat(thread)} />
                        </div>
                        <div className="md:hidden">
                            <button onClick={() => setMore(!more)}>
                                <MoreVertical />
                            </button>
                        </div>
                    </div>
                }
            </div>
            {((!block.blocked) || block.blocked && block.blocked_by) &&  
                <div className={`*:flex *:gap-2 space-y-5 bg-ember p-3 w-1/2 absolute top-[130px] right-2 md:hidden ${more ? "block" : "hidden"}`}>
                    <li onClick={() => blockChat(thread)}><CircleMinusIcon /> {block.blocked && block.blocked_by ? "Unblock" : "Block"}</li>
                </div>
            }
            <div className="h-[calc(100%-60px)] bg-surface-alt border-t border-alpha-divider md:px-5 px-2 py-4 flex flex-col justify-between" ref={body} onClick={() => setMore(false)}>
                <div className="space-y-5 h-[90%] overflow-y-auto no-scrollbar" onScroll={handleScroll}>
                    {data.map(item => (
                        item.sender ? 
                        <div className="flex justify-end items-center gap-2 w-full" key={item.id} id={`id_${item.id}`}>
                            <div className="bg-gradient-btn md:max-w-[70%] max-w-[80%] w-fit p-2 rounded-lg space-y-2 " onTouchStart={() => startTimer(item.id, true)} onTouchEnd={cancelTimer} onTouchCancel={cancelTimer} onDoubleClick={() => setReplyModal(prev => ({...prev, id: item.id, state: true, sender: item.sender}))}>
                                {item.reply_to && 
                                    <div className="border-l-4 border-l-ash text-ash-alt bg-alpha-overlay p-2 rounded-lg">
                                        <p>{item.reply_to}</p>
                                    </div>
                                }
                                {item.image && <img src={`${import.meta.env.VITE_SERVER_URL}/pages/image/${encodeURIComponent(item.image)}`} alt={item.image} className="max-w-full max-h-60 object-contain rounded-md mb-2"/>}
                                <p className="md:text-[16px] text-[16px]">{item.content}</p>
                                <p className="text-start text-[12px] text-muted">{item.sent_at}</p>
                            </div>
                        </div> 
                        :
                        <div className="flex justify-start items-center gap-2 w-full" key={item.id} id={`id_${item.id}`}>
                            <div className="bg-surface border border-alpha-card-border md:max-w-[70%] wrap-break-word max-w-[80%] w-fit p-2 rounded-r-xl rounded-bl-xl space-y-2" onTouchStart={() => startTimer(item.id, false)} onTouchEnd={cancelTimer} onTouchCancel={cancelTimer} onDoubleClick={() => setReplyModal(prev => ({...prev, id: item.id, state: true, sender: item.sender}))}>
                                {item.reply_to &&
                                    <div className="border border-l-4 border-l-ember border-alpha-card-border bg-surface-alt p-2 rounded-lg">
                                        <p>{item.reply_to}</p>
                                    </div>                                
                                }
                                {item.image && <img src={`${import.meta.env.VITE_SERVER_URL}/pages/image/${encodeURIComponent(item.image)}`} alt={item.image} className="max-w-full max-h-60 object-contain rounded-md mb-2"/>}
                                <p className="md:text-[16px] text-[16px] text-ash">{item.content}</p>
                                <p className="text-start text-[12px] text-muted">{item.sent_at}</p>
                            </div>
                        </div>
                    ))} 

                    {showScrollBtn && (
                        <button
                            onClick={() => scrollToBottom()}
                            className="fixed bottom-28 right-6 bg-scarlet text-white px-3 py-2 rounded-full shadow-lg hover:bg-ember transition"
                        >
                            ↓
                        </button>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="flex flex-col justify-end w-full mt-2">
                    {block.blocked ? 
                        <div className="flex justify-center text-ash">
                            <p>This chat can't be continued.</p>
                        </div> 
                        : 
                        <div>
                            {replyModal.reply_content.trim() !== "" && 
                            <div className="border border-l-4 border-l-ember border-alpha-card-border bg-surface-alt md:ml-[4%] ml-[11%] md:w-[85%] w-[75%] max-h-18 p-2 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <p className="w-[95%] line-clamp-2">{replyModal.reply_content}</p>
                                    <X size={16} className="md:w-[3%] w-[5%] text-muted" onClick={() => {
                                        setReplyModal(prev => ({...prev, reply_content: ""}));
                                        setFormData(prev => ({...prev, reply_id: null}))}
                                    } />
                                </div>
                            </div>}
                            {preview && (
                                <img src={preview} className="w-30 h-25 object-contain mt-2 md:ml-[4%] ml-[11%]" />
                            )}
                            <div className="flex gap-2 h-[60px] justify-center w-full items-center mt-2">
                                <div className="md:w-[3%] w-[10%] flex justify-center">
                                    <Image onClick={() => imagePicker.current.click()} />
                                    <input type="file" className="hidden" ref={imagePicker} onChange={handleChange} />
                                </div>
                                <textarea name="message" id="message" placeholder="Write an anonymous message..." className="h-full max-h-20 border border-alpha-input-border focus:border-scarlet shadow shadow-alpha-primary-glow md:w-[85%] w-[75%] rounded-md resize-none p-2 outline-0 no-scrollbar" onChange={handleRegisterInput} value={formData.message} onKeyDown={altSendMessage} />
                                <button className="bg-gradient-btn text-white md:px-5 h-10 rounded-md shadow shadow-primary-shadow md:w-[10%] w-[13%] flex gap-1 text-[14px] items-center justify-center" onClick={sendMessage}>
                                    <SendIcon size={18} className="text-white" /> 
                                    <span className="md:block hidden">Send</span>
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Chat;
