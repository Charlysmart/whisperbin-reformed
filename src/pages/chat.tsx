import { ArrowLeft, CircleMinusIcon, Flag, MoreVertical, Send } from "lucide-react";
import Button from "@/components/button";
import { useEffect, useRef, useState } from "react";

const Chat = () => {
    const [more, setMore] = useState<Boolean>(false);

    const body = useRef(null);
    
    function removeMore () {
        setMore(false);
    }
    
    useEffect(() => {
        const current = body.current;
        current.addEventListener("click", removeMore);
        return () => current.removeEventListener("click", removeMore);
    }, [more])
    return (
        <div className={`bg-blue-50 w-full h-[calc(100vh-60px)] lg:px-10 md:px-5 px-2 md:py-5 py-2 font-inter overflow-y-auto`}>
            <div className="h-15 flex justify-between items-center p-3 bg-white">
                <div className="flex items-center gap-5">
                    <button><ArrowLeft /></button>
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
            <div className="h-[calc(100%-60px)] bg-white border-t border-gray-200 md:px-5 px-2 py-4 flex flex-col justify-between" ref={body}>
                <div className="space-y-5 h-[90%] overflow-y-auto no-scrollbar">
                    <div className="flex justify-start w-full">
                        <div className="bg-gray-100 md:max-w-[70%] max-w-[80%] w-fit p-2 rounded space-y-2">
                            <p className="md:text-[16px] text-[14px]">Hello there! Thanks for reaching out. What can I help you with anonymously?</p>
                            <p className="text-start md:text-[12px] text-[10px]">10:05 PM</p>
                        </div>
                    </div>
                    <div className="flex justify-end w-full">
                        <div className="bg-blue-500 md:max-w-[70%] max-w-[80%] w-fit p-2 text-white rounded space-y-2">
                            <p className="md:text-[16px] text-[14px]">Hello there! Thanks for reaching out. What can I help you with anonymously?</p>
                            <p className="text-end md:text-[12px] text-[10px]">10:05 PM</p>
                        </div>
                    </div>
                    <div className="flex justify-start w-full">
                        <div className="bg-gray-100 md:max-w-[70%] max-w-[80%] w-fit p-2 rounded space-y-2">
                            <p className="md:text-[16px] text-[14px]">Hello there! Thanks for reaching out. What can I help you with anonymously?</p>
                            <p className="text-start md:text-[12px] text-[10px]">10:05 PM</p>
                        </div>
                    </div>
                    <div className="flex justify-end w-full">
                        <div className="bg-blue-500 md:max-w-[70%] max-w-[80%] w-fit p-2 text-white rounded space-y-2">
                            <p className="md:text-[16px] text-[14px]">Hello there! Thanks for reaching out. What can I help you with anonymously?</p>
                            <p className="text-end md:text-[12px] text-[10px]">10:05 PM</p>
                        </div>
                    </div>
                    <div className="flex justify-start w-full">
                        <div className="bg-gray-100 md:max-w-[70%] max-w-[80%] w-fit p-2 rounded space-y-2">
                            <p className="md:text-[16px] text-[14px]">Hello there! Thanks for reaching out. What can I help you with anonymously?</p>
                            <p className="text-start md:text-[12px] text-[10px]">10:05 PM</p>
                        </div>
                    </div>
                    <div className="flex justify-end w-full">
                        <div className="bg-blue-500 md:max-w-[70%] max-w-[80%] w-fit p-2 text-white rounded space-y-2">
                            <p className="md:text-[16px] text-[14px]">Hello there! Thanks for reaching out. What can I help you with anonymously?</p>
                            <p className="text-end md:text-[12px] text-[10px]">10:05 PM</p>
                        </div>
                    </div>
                    <div className="flex justify-start w-full">
                        <div className="bg-gray-100 md:max-w-[70%] max-w-[80%] w-fit p-2 rounded space-y-2">
                            <p className="md:text-[16px] text-[14px]">Hello there! Thanks for reaching out. What can I help you with anonymously?</p>
                            <p className="text-start md:text-[12px] text-[10px]">10:05 PM</p>
                        </div>
                    </div>
                    <div className="flex justify-end w-full">
                        <div className="bg-blue-500 md:max-w-[70%] max-w-[80%] w-fit p-2 text-white rounded space-y-2">
                            <p className="md:text-[16px] text-[14px]">Hello there! Thanks for reaching out. What can I help you with anonymously?</p>
                            <p className="text-end md:text-[12px] text-[10px]">10:05 PM</p>
                        </div>
                    </div>
                    <div className="flex justify-start w-full">
                        <div className="bg-gray-100 md:max-w-[70%] max-w-[80%] w-fit p-2 rounded space-y-2">
                            <p className="md:text-[16px] text-[14px]">Hello there! Thanks for reaching out. What can I help you with anonymously?</p>
                            <p className="text-start md:text-[12px] text-[10px]">10:05 PM</p>
                        </div>
                    </div>
                    <div className="flex justify-end w-full">
                        <div className="bg-blue-500 md:max-w-[70%] max-w-[80%] w-fit p-2 text-white rounded space-y-2">
                            <p className="md:text-[16px] text-[14px]">Hello there! Thanks for reaching out. What can I help you with anonymously?</p>
                            <p className="text-end md:text-[12px] text-[10px]">10:05 PM</p>
                        </div>
                    </div>
                    <div className="flex justify-start w-full">
                        <div className="bg-gray-100 md:max-w-[70%] max-w-[80%] w-fit p-2 rounded space-y-2">
                            <p className="md:text-[16px] text-[14px]">Hello there! Thanks for reaching out. What can I help you with anonymously?</p>
                            <p className="text-start md:text-[12px] text-[10px]">10:05 PM</p>
                        </div>
                    </div>
                    <div className="flex justify-end w-full">
                        <div className="bg-blue-500 md:max-w-[70%] max-w-[80%] w-fit p-2 text-white rounded space-y-2">
                            <p className="md:text-[16px] text-[14px]">Hello there! Thanks for reaching out. What can I help you with anonymously?</p>
                            <p className="text-end md:text-[12px] text-[10px]">10:05 PM</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 h-[10%] justify-center items-center mt-5">
                    <input type="text" name="message" id="message" placeholder="Write an anonymous message..." className="h-[60px] border border-gray-100 w-[90%] rounded-md px-3 outline-0" />
                    <button className="bg-blue-500 text-white px-5 h-10 rounded-md w-[full] flex gap-1 text-[14px] items-center justify-center"><Send size={20} /> <span className="md:block hidden">Send</span></button>
                </div>
            </div>
        </div>
    );
}

export default Chat;