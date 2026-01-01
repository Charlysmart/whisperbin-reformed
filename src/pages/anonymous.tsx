import { getData } from "@/api/get_request";
import Button from "@/components/button";
import { usePreloader } from "@/context/loaderContext";
import { AnonymousDataType, AnonymousType } from "@/utils/types";
import { Clock, Ghost, MessageSquare, Reply, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { timeFormat } from "@/utils/time";
import { patchData } from "@/api/patch_request";
import { alertBox } from "@/utils/alert";

const AnonymousBlock = ({ read, content, time, replied, reply, task } : AnonymousType) => {
    const iconMap = {
        chat: MessageSquare,
        reply: Reply,
    };

    const Icon = replied ? iconMap["chat"] : iconMap["reply"];
    return (
        <div className={`md:px-5 px-3 py-3 border-l-4 ${read ? "border-gray-400 bg-white" : "border-blue-500 bg-blue-50"} w-full h-fit rounded-2xl flex gap-5 hover:shadow-xl text-gray-600`} onClick={task}>
            <div className={`${read ? "bg-gray-200" : "avatar-gradient"} h-fit w-fit md:p-3 p-2 rounded-full`}>
                <Ghost color={read ? "gray" : "white"} />
            </div>
            <div className="space-y-3 w-full">
                <div className="flex items-center gap-5">
                    <div>
                        <h3 className="font-semibold md:text-[18px] text-[16px]">Anonymous</h3>
                        <p className="inline-flex items-center gap-2 text-[13px] text-brand"><Clock size={13} /> {time}</p>
                    </div>
                    <div className={`${!read ? "bg-blue-200 text-blue-600" : replied ? "bg-green-100 text-green-800" : ""} px-4 py-1 rounded-full text-[14px] font-medium`}>{!read ? "New" : replied ? "Replied" : ""}</div>
                </div>
                <p className="md:text-[16px] text-[15px]">
                    {content}
                </p>
                <div className="flex justify-end">
                    <Button label={<><Icon size={16} /> {replied ? "View Chat" : "Reply"}</>} buttonType={replied ? "grayed" : "colored"} onclick={reply} extraClass="w-fit h-full px-4 py-2 flex gap-1 items-center" type="button" />
                </div>
            </div>
        </div>
    );
}

const AnonymousChat = () => {
    const [data, setData] = useState<AnonymousDataType[]>([]);
    const [filter, setFilter] = useState<"all" | "unread" | "replied">("all");
    const navigate = useNavigate();
    const { startLoading, stopLoading } = usePreloader();

    function fetchAnonymous() {
        startLoading();
        fetchData();
    }
    
    function fetchData() {
        getData({url: `/pages/get_anonymous?filter=${filter}`, navigate, onSuccess: (response) => {
            setData(response.data);
        }, onError: (error) => {
            if (error.response) console.log(error.response.data.detail);            
        }, finallyCallback: () => stopLoading() })  
    }

    function markFunction(thread : string, task : "reply" | "read") {
        const url = task === "reply" ? "reply_anonymous" : "markRead"
        patchData({url: `/pages/${url}/${thread}`, onSuccess : () => {
            if (task === "reply") navigate(`../chat/${thread}`);
        }, onError: (error) => {
            if (error.response) {
                alertBox({message: error.response.data.detail, success: false, top: "0"});
            } else {
                console.log(error.message);                
            }
        }});
        fetchData();
    }

    useEffect(() => {
        fetchAnonymous();
    }, [filter]);

    return (
        <div className={`bg-blue-50 w-full h-[calc(100vh-60px)] text-gray-600 md:px-10 px-3 py-5 font-inter md:font-normal font-medium overflow-y-auto space-y-5`}>
            <div>
                <b className="md:text-[30px] text-[20px]">Anonymous Messages</b>
                <p className="md:text-[18px] text-[15px]">Messages sent to your anonymous link. Reply to start a conversation.</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-between bg-white p-5 rounded-2xl shadow-md">
                <div className="md:w-1/3 w-full flex gap-4">
                    <Button label="All Messages" buttonType={filter === "all" ? "colored" : "outlined"} type="button" extraClass="w-fit h-full md:px-4 px-2 md:py-2 py-1 md:text-[16px] text-[12px]" onclick={() => setFilter("all")} />
                    <Button label="Unread" buttonType={filter === "unread" ? "colored" : "outlined"} type="button" extraClass="w-fit h-full md:px-4 px-2 md:py-2 py-1 md:text-[16px] text-[12px]" onclick={() => setFilter("unread")} />
                    <Button label="Replied" buttonType={filter === "replied" ? "colored" : "outlined"} type="button" extraClass="w-fit h-full md:px-4 px-2 md:py-2 py-1 md:text-[16px] text-[12px]" onclick={() => setFilter("replied")} />
                </div>
                <div className="flex lg:w-1/3 w-full h-11 border border-gray-200 overflow-hidden rounded-md">
                    <button className="h-full w-fit p-3">
                        <Search size={16} />
                    </button>
                    <input type="search" placeholder="Search messages..." className="border-none w-full outline-none" />
                </div>
            </div>
            <div className="space-y-5 w-full">
                {data.length !== 0 ? data.map(item => (
                    <AnonymousBlock key={item.message_thread} read={item.read} content={item.content} time={timeFormat(item.sent_at)} replied={item.replied} reply={() => item.replied ? navigate(`../chat/${item.message_thread}`) : markFunction(item.message_thread, "reply")} task={() => !item.read ? markFunction(item.message_thread, "read") : ""} />
                )) : <p>No Data!</p>}
            </div>
        </div>
    );
}

export default AnonymousChat;