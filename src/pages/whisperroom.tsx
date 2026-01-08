import Button from "@/components/button";
import { useSwipeable } from "react-swipeable";
import { ArrowLeft, Image, Reply, SendIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "@/api/get_request";
import { alertBox } from "@/utils/alert";
import { WhisperroomType } from "@/utils/types";
import { postData } from "@/api/post_request";
import useFormInput from "@/context/formChange";

const Whisperroom = () => {
    const imagePicker = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { room_thread } = useParams();
    const [data, setData] = useState<WhisperroomType[]>([]);
    const [info, setInfo] = useState<{title : string, reply_content : string}>({
        title: "",
        reply_content: ""
    });

    const swipe = useSwipeable({
        onSwipedRight: () => console.log("Swiped right!"),
        trackMouse: true,
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

    function onReply(id: number) {
        setFormData(prev => ({...prev, reply: id}))
        getData({
            url: `pages/reply_whisperroom?id=${id}`,
            navigate,
            onSuccess: (response) => {setInfo(prev => ({...prev, reply_content: response.data})); setData(response.data.messages)},
            onError: (error) => alertBox({ message: error.response.data.detail, success: false, top: "0", onClose: () => navigate("../") })
        });
    }

    async function sendMessage() {
        const formInput = new FormData()
        formInput.append("content", formData.message);
        if (formData.reply !== null) formInput.append("reply_to", formData.reply.toString());
        if (formData.image) formInput.append("image", formData.image);
        formInput.append("room_thread", room_thread);
        
        await postData({
            url: `pages/whisperroom/${room_thread}`,
            data: formData,
            navigate,
            onError: (error) => alertBox({ message: error.response.data.detail, success: false, top: "0", onClose: () => navigate("../") })
        })
    }

    useEffect(() => {
        getData({
            url: `pages/whisperroom/${room_thread}`,
            navigate,
            onSuccess: (response) => {setInfo(prev => ({...prev, title: response.data.room_name})); setData(response.data.messages)},
            onError: (error) => alertBox({ message: error.response.data.detail, success: false, top: "0", onClose: () => navigate("../") })
        });
    }, [])
    return (
        <div>
            <div className={`bg-blue-50 w-full text-gray-600 h-[calc(100vh-60px)] lg:px-10 md:px-5 px-2 md:py-5 py-2 font-inter overflow-y-auto md:font-normal font-semibold`}>
            <div className="h-15 flex justify-between items-center p-3 bg-white">
                <div className="flex items-center gap-5">
                    <button onClick={() => navigate(-1)}><ArrowLeft /></button>
                    <div>
                        <b>{info.title}</b>
                        <p className="text-[13px]">3 members</p>
                    </div>
                </div>
                <div className="text-[14px] h-full *:items-center *:justify-center space-x-3 md:flex hidden">
                    <Button label="Leave Room" buttonType="outlined" extraClass="w-fit px-3 h-full flex gap-2" />
                </div>
            </div>
            <div className="h-[calc(100%-60px)] bg-white border-t border-gray-200 md:px-5 px-2 py-4 flex flex-col justify-between">
                <div className="space-y-5 h-[90%] overflow-y-auto no-scrollbar">
                    {data.map(item => (
                        item.sender ? 
                        <div className="flex justify-end items-center gap-2 w-full" key={item.id}>
                            <Reply className="md:block hidden" onClick={() => onReply(item.id)} />
                            <div className="bg-blue-500 md:max-w-[70%] max-w-[80%] w-fit p-2 rounded-lg space-y-2 text-white">
                                {item.reply_to && 
                                    <div className="border-l-4 border-l-white-600 bg-blue-600 p-2 rounded-lg">
                                        <p>{item.reply_to}</p>
                                    </div>
                                }
                                <p className="md:text-[16px] text-[16px]">{item.content}</p>
                                <p className="text-start text-[12px]">10:05 PM</p>
                            </div>
                        </div> 
                        :
                        <div className="flex justify-start items-center gap-2 w-full" key={item.id}>
                            <div className="bg-gray-100 md:max-w-[70%] max-w-[80%] w-fit p-2 rounded-lg space-y-2" {...swipe}>
                                {item.reply_to &&
                                    <div className="border border-l-4 border-l-blue-600 border-gray-200 bg-gray-200 p-2 rounded-lg">
                                        <p>{item.reply_to}</p>
                                    </div>                                
                                }
                                <p className="md:text-[16px] text-[16px]">{item.content}</p>
                                <p className="text-start text-[12px]">10:05 PM</p>
                            </div>
                            <Reply className="md:block hidden" />
                        </div>
                    ))}
                    {/* <div className="flex justify-end w-full">
                        <div className="bg-blue-500 md:max-w-[70%] max-w-[80%] w-fit p-2 rounded-lg space-y-2 text-white">
                            <p className="md:text-[16px] text-[16px]">Welcome Everyone</p>
                            <p className="text-start text-[12px]">10:05 PM</p>
                        </div>
                    </div>
                        
                    <div className="flex justify-start items-center gap-2 w-full">
                        <div className="bg-gray-100 md:max-w-[70%] max-w-[80%] w-fit p-2 rounded-lg space-y-2">
                            <img src="" alt="chat image" className="max-w-full max-h-60 object-contain rounded-md mb-2"/>
                            <p className="md:text-[16px] text-[16px]">I am happy to be here</p>
                            <p className="text-start text-[12px]">10:05 PM</p>
                        </div>
                        <Reply className="md:block hidden" />
                    </div>
                        <div className="flex justify-start items-center gap-2 w-full">
                            <div className="bg-gray-100 md:max-w-[70%] max-w-[80%] w-fit p-2 rounded-lg space-y-2" {...swipe}>
                                <p className="md:text-[16px] text-[16px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore sit veritatis ipsum magni corporis reprehenderit recusandae minus quas inventore ullam?</p>
                                <p className="text-start text-[12px]">10:05 PM</p>
                            </div>
                            <Reply className="md:block hidden" />
                        </div>
                        <div className="flex justify-start items-center gap-2 w-full">
                            <div className="bg-gray-100 md:max-w-[70%] max-w-[80%] w-fit p-2 rounded-lg space-y-2">
                                <div className="border border-l-4 border-l-blue-600 border-gray-200 bg-gray-200 p-2 rounded-lg">
                                    <p>Hello All!</p>
                                </div>
                                <p className="md:text-[16px] text-[16px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, deleniti.</p>
                                <p className="text-start text-[12px]">10:05 PM</p>
                            </div>
                            <Reply className="md:block hidden" />
                        </div> */}
                </div>
                <div className="flex flex-col justify-end mb-5">
                    {info.reply_content.trim() !== "" && 
                    <div className="border border-l-4 border-l-blue-600 border-gray-200 w-[90%] bg-gray-200 p-2 rounded-lg">
                        <p>{info.reply_content}</p>
                    </div>}
                    {/* {preview && (
                        <img src={preview} className="w-30 h-25 object-contain" />
                    )} */}
                    <div className="flex gap-2 h-[10%] justify-center items-center mt-5">
                        <div>
                            <Image onClick={() => imagePicker.current.click()} />
                            <input type="file" className="hidden" ref={imagePicker} />
                        </div>
                        <input type="text" name="message" id="message" placeholder="Write an anonymous message..." className="h-[60px] border border-gray-100 w-[90%] rounded-md px-3 outline-0" />
                        <button className="bg-blue-500 text-white px-5 h-10 rounded-md w-[full] flex gap-1 text-[14px] items-center justify-center" onClick={sendMessage}><SendIcon size={20} /> <span className="md:block hidden">Send</span></button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Whisperroom;