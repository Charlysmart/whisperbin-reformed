import { getData } from "@/api/get_request";
import { patchData } from "@/api/patch_request";
import Button from "@/components/button";
import { usePreloader } from "@/context/loaderContext";
import { alertBox } from "@/utils/alert";
import { timeFormat } from "@/utils/time";
import { NotificationBlockType } from "@/utils/types";
import { ArrowLeft, ArrowRight, Clock, Heart, Mail, MessageCircle, Reply, ReplyAll } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connectSocket } from "@/utils/socket";
import { handleRightClick } from "@/utils/contextMenu";

const NotificationBlock = ({ read, type, content, time, linkText, link, id } : NotificationBlockType) => {
    const iconMap = {
        comment: MessageCircle,
        message: Mail,
        like: Heart,
        "comment reply": Reply,
        default: ReplyAll,
    };
    
    const navigate = useNavigate();

    const markRead = (id: number, link: string) => {
        patchData({ url: `pages/markRead?id=${id}`, onSuccess: (response) => navigate(`../${link}`), onError: (error) => alertBox({ message: error.response.data.detail, success: false, top: "0" }) })
    }

    const Icon = iconMap[type] || iconMap.default;
    return (
        <div className={`md:px-5 px-3 py-3 border-l-4 border-l-ember bg-gradient-card w-full h-fit rounded-2xl flex gap-5 hover:shadow-xl text-ash`}>
            <div className={`${read ? "bg-gradient-card" : "bg-ember"} h-fit w-fit md:p-3 p-2 rounded-full`}>
                <Icon color={read ? "gray" : "white"} />
            </div>
            <div className="space-y-3">
                <h3 className="font-semibold md:text-[18px] text-[16px]">
                    {type === "comment" ? "Someone commented on your status post" 
                    : type === "message" ? "You received a new anonymous message" 
                    : type === "like" ? "Someone liked your status post" 
                    : type === "comment-reply" ? "Someone replied to your comment" 
                    : "Someone replied to your anonymous message"}
                </h3>
                <p className="md:text-[16px] text-[15px]">
                    {type === "message" ? "Someone sent you a message via your anonymous link" 
                    : type === "reply" ? "Check your messages to continue the conversation" 
                    : content}
                </p>
                <p className="md:text-[14px] text-[13px] text-muted flex items-center flex-wrap gap-2" onClick={() => markRead(id, link)}><Clock size={16} /> {time} <span className="text-blaze">{linkText}</span></p>
            </div>
        </div>
    )
}

const Notification = () => {
    const navigate = useNavigate();
    const { startLoading, stopLoading } = usePreloader();
    const [meta, setMeta] = useState<{filter : "all" | "unread", currentPage: number, pages: number}>({
        filter : "all",
        currentPage : 1,
        pages: null
    });
    const [info, setInfo] = useState<{count: number, data: {id: number, read: boolean, type: "message" | "like" | "reply" | "comment" | "comment-reply", content?: string, added: string, notify_id: string }[]}>({
        count : null,
        data : []
    });
    const websocket = useRef<any>(null);
    const pageRef = useRef(meta.currentPage);
    useEffect(() => {
        
        startLoading();
        getData({ 
            url: `/pages/get_notification?filter=${meta.filter}&page=${meta.currentPage}`, 
            navigate, 
            onSuccess: (response) => setInfo({count: response.data.count, data: response.data.notification}), 
            onError: (error) => alertBox({ message: error.response.data.detail, success: false, top: "0" }), finallyCallback: () => stopLoading() })
            pageRef.current = meta.currentPage;
    }, [meta.filter, meta.currentPage]);

    // To handle the pagination
    useEffect(() => {
        if (info.count) {
            let total = info.count;
            let limit = 10;
            setMeta(prev => ({...prev, pages: Math.ceil(total / limit)}))
        }
    }, [info.count]);

    // To initialize websocket
    useEffect(() => {
        document.addEventListener("contextmenu", handleRightClick);
        websocket.current = connectSocket({
            url: "new_notification",
            onMessage: (event) => {
                const payload = event.data;
                if (pageRef.current === 1) {
                    setInfo(prev => ({count: (prev.count ?? 0) + 1, data: [payload, ...prev.data]}));
                }
            }
        });

        return () => {
            document.removeEventListener("contextmenu", handleRightClick);
            websocket.current?.close();
        }
    }, []);
    return (
        <div className="bg-void no-copy text-ash w-full h-[calc(100vh-60px)] flex justify-center md:px-10 px-3 py-5 font-inter  md:font-normal font-medium overflow-y-auto">
            <section className="md:w-[80%] w-full space-y-5">
                <div>
                    <b className="text-[30px] ">Notifications</b>
                </div>
                <div className="w-full flex flex-wrap gap-4">
                    <div className="flex md:gap-2 justify-between *:hover:bg-gray-100">
                        <Button label="All" buttonType={meta.filter === "all" ? "colored" : ""} extraClass="w-fit h-full px-4 py-2 border-0" onclick={() => setMeta(prev => ({...prev, filter: "all"}))} />
                        <Button label="Unread" buttonType={meta.filter === "unread" ? "colored" : ""} extraClass="w-fit h-full px-4 py-2 border-0" onclick={() => setMeta(prev => ({...prev, filter: "unread"}))} />
                    </div>
                </div>
                <div className="space-y-5 cursor-pointer mb-5">
                    {info.data.length >= 1 ? info.data.map(item => (
                        <NotificationBlock key={item.id} read={item.read} time={timeFormat(item.added)} type={item.type} linkText="View Message" content={item.content && item.content} link={item.type === "message" ? "anonymous_messages" : item.type === "reply" ? `/chat/${item.notify_id}` : "anonymous_messages"} id={item.id} />)) : "No Notification yet!"
                    }
                    {info.count > 0 && <div className="flex justify-center items-center-safe gap-3">
                        <Button label={<><ArrowLeft /></>} type="button" extraClass="p-2 text-blue-500 bg-blue-100 border-3 border-blue-300 disabled:border-none" disable={meta.currentPage > 1 ? false : true} onclick={() => setMeta(prev => ({...prev, currentPage: prev.currentPage > 1 ? prev.currentPage - 1 : prev.currentPage}))} />
                        <p className="text-gray-400 font-medium text-[18px]">{meta.currentPage} / {meta.pages}</p>
                        <Button label={<><ArrowRight /></>} type="button" extraClass="p-2 text-blue-500 bg-blue-100 border-3 border-blue-300 disabled:border-none" disable={meta.currentPage < meta.pages ? false : true} onclick={() => setMeta(prev => ({...prev, currentPage: prev.currentPage < prev.pages ? prev.currentPage + 1 : prev.currentPage}))} />
                    </div>}
                </div>
            </section>
        </div>
    );
}

export default Notification;