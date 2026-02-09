import { getData } from "@/api/get_request";
import { alertBox } from "@/utils/alert";
import { ChatType } from "@/utils/types";
import { ArrowLeft, CircleMinusIcon, Flag, Image, MoreVertical, Send } from "lucide-react";
import Button from "@/components/button";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFormInput from "@/context/formChange";
import { postData } from "@/api/post_request";
import { timeFormat } from "@/utils/time";
import { connectSocket } from "@/utils/socket";

type SocketMessage =
  | { type: "message"; data: { id: string; message: string; image?: string; message_thread: string; sender: boolean; read: boolean } }
  | { type: "read"; data: { message_id: string } }
const Chat = () => {
    const navigate = useNavigate();
    const { thread } = useParams();
    const [more, setMore] = useState<boolean>(false);
    const imagePicker = useRef<HTMLInputElement | null>(null);
    const [data, setData] = useState<ChatType>([]);
    const [image, setImage] = useState<File | null>(null);
    const sentReadReceipts = useRef(new Set<number>());
    const { formData, handleRegisterInput, setFormData } = useFormInput<{message: string, image: string | null, message_thread: string}>({
        message: "",
        image: null,
        message_thread: thread
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
            console.log(error.response);                
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
            message_thread: formData.message_thread
        };
              
        await socketRef.current?.send({
            type: "message",
            data: payload
        });
        setFormData((prev) => ({...prev, message: "", image: null})) 
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

    async function getChat() {
        await getData({url: `/pages/chat/${thread}`, onSuccess: (response) => {
            setData(response.data);
        }, onError: (error) => {
            const message = error?.response?.data?.detail || "Something went wrong";
            alertBox({ message, success: false, top: "0" });
            console.log(error.response);            
        }, navigate});
    }

    useEffect(() => {
        if (data.length > 0) {
            scrollToBottom(false);
        }
    }, [data.length]);

    useEffect(() => {
        getChat();

        socketRef.current = connectSocket({
            url: "send_chat",
            onOpen: () => console.log("Websocket message open"),
            onMessage: (data) => {
                if (data.type === "message") {
                    setData(prev => {
                        const updated = [...prev, data.data];

                        if (isAtBottomRef.current) {
                            setTimeout(() => scrollToBottom(), 0);
                        }
                        return updated;
                    });
                }
            }
        });

        return () => {
            socketRef.current?.close();
        };
    }, []);

    return (
        <div className={`bg-blue-50 w-full text-gray-600 h-[calc(100vh-60px)] lg:px-10 md:px-5 px-2 md:py-5 py-2 font-inter overflow-y-auto md:font-normal font-medium`}>
            <div className="h-15 flex justify-between items-center p-3 bg-white">
                <div className="flex items-center gap-5">
                    <button onClick={() => navigate(-1)}><ArrowLeft /></button>
                    <b>Anonymous Chat</b>
                </div>
                <div className="text-[14px] h-full *:items-center *:justify-center space-x-3 md:flex hidden">
                    <Button label={<><Flag /> Report</>} buttonType="outlined" extraClass="w-fit px-3 h-full flex gap-2" />
                    <Button label={<><CircleMinusIcon /> Block</>} extraClass="w-fit px-3 h-full bg-red-500 text-white flex gap-2" />
                </div>
                <div className="md:hidden">
                    <button onClick={() => setMore(!more)}>
                        <MoreVertical />
                    </button>
                </div>
            </div>
            <div className={`*:flex *:gap-2 space-y-5 bg-white p-3 w-1/2 absolute top-[130px] right-2 md:hidden ${more ? "block" : "hidden"}`}>
                <li><Flag /> Report</li>
                <hr className="border-gray-300" />
                <li><CircleMinusIcon /> Block</li>
            </div>
            <div className="h-[calc(100%-60px)] bg-white border-t border-gray-200 md:px-5 px-2 py-4 flex flex-col justify-between" ref={body} onClick={() => setMore(false)}>
                <div className="space-y-5 h-[90%] overflow-y-auto no-scrollbar" onScroll={handleScroll}>
                    {data.map(item => (item.sender ? 
                        <div className="flex justify-end w-full" key={item.id}>
                            <div className="bg-blue-500 md:max-w-[70%] max-w-[80%] w-fit p-2 rounded-lg space-y-2 text-white">
                                {item.image && (<img src={`http://localhost:8000/pages/image/${encodeURIComponent(item.image)}`} alt="chat image" className="max-w-full max-h-60 object-contain rounded-md mb-2"/> )}
                                {item.content !== "" && <p className="md:text-[16px] text-[16px]">{item.content}</p>}
                                <p className="text-start text-[12px]">{timeFormat(item.sent_at)}</p>
                            </div>
                        </div>
                        :
                        <div className="flex justify-start w-full" key={item.id}>
                            <div className="bg-gray-100 md:max-w-[70%] max-w-[80%] w-fit p-2 rounded -lg space-y-2">
                                {item.image && (<img src={`http://localhost:8000/pages/image/${encodeURIComponent(item.image)}`} alt="chat image" className="max-w-full max-h-60 object-contain rounded-md mb-2"/> )}
                                {item.content !== "" && <p className="md:text-[16px] text-[16px]">{item.content}</p>}
                                <p className="text-start text-[12px]">{timeFormat(item.sent_at)}</p>
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
                <div className="flex flex-col justify-end mb-5">
                    {preview && (
                        <img src={preview} className="w-30 h-25 object-contain" />
                    )}
                    <div className="flex gap-2 h-[10%] justify-center items-center mt-5">
                        <div>
                            <Image onClick={() => imagePicker.current.click()} />
                            <input type="file" onChange={handleChange} className="hidden" ref={imagePicker} />
                        </div>
                        <input type="text" name="message" id="message" placeholder="Write an anonymous message..." className="h-[60px] border border-gray-100 w-[90%] rounded-md px-3 outline-0" value={formData.message} onChange={handleRegisterInput} onKeyDown={(e) => {if (e.key === "Enter") sendMessage();
                        }} />
                        <button className="bg-blue-500 text-white px-5 h-10 rounded-md w-[full] flex gap-1 text-[14px] items-center justify-center" onClick={sendMessage}><Send size={20} /> <span className="md:block hidden">Send</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
