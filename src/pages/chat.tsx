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

const Chat = () => {
    const navigate = useNavigate();
    const { thread } = useParams();
    const [more, setMore] = useState<boolean>(false);
    const imagePicker = useRef<HTMLInputElement | null>(null);
    const [data, setData] = useState<ChatType>({
    userId : 0,
    chat : []
    });
    const { formData, handleRegisterInput, setFormData } = useFormInput<{message: string, image: File | null}>({
        message: "",
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

    function sendReply() {
        const payLoad = new FormData();
        payLoad.append("message", formData.message);
        if (formData.image) payLoad.append("image", formData.image);
        payLoad.append("message_thread", thread);

        postData({ url: "/pages/send_chat", data: payLoad, onSuccess: (response) => setFormData(prev => ({image: null, message: ""})), onError: (error) => {
            const message = error?.response?.data?.detail || "Something went wrong";
            console.log(formData)
            alertBox({ message, success: false, top: "0" })
            console.log(error.response);            
        }})
    }

    function getChat() {
        getData({url: `/pages/chat/${thread}`, onSuccess: (response) => {
            setData(response.data);
        }, onError: (error) => {
            const message = error?.response?.data?.detail || "Something went wrong";
            alertBox({ message, success: false, top: "0" });
            console.log(error.response);            
        }, navigate});
    }

    useEffect(() => {
        getChat();
    }, []);

    return  (
        <div className={`bg-blue-50 w-full text-gray-600 h-[calc(100vh-60px)] lg:px-10 md:px-5 px-2 md:py-5 py-2 font-inter overflow-y-auto font-semibold`}>
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
                <div className="space-y-5 h-[90%] overflow-y-auto no-scrollbar">
                    {data.chat.map(item => (item.sender_id === data.userId ? 
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
                        <input type="text" name="message" id="message" placeholder="Write an anonymous message..." className="h-[60px] border border-gray-100 w-[90%] rounded-md px-3 outline-0" value={formData.message} onChange={handleRegisterInput} />
                        <button className="bg-blue-500 text-white px-5 h-10 rounded-md w-[full] flex gap-1 text-[14px] items-center justify-center" onClick={sendReply}><Send size={20} /> <span className="md:block hidden">Send</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
