import { getData } from "@/api/get_request";
import Button from "@/components/button";
import { usePreloader } from "@/context/loaderContext";
import { AnonymousDataType, AnonymousType } from "@/utils/types";
import { ArrowLeft, ArrowRight, Clock, Ghost, MessageSquare, Reply, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { timeFormat } from "@/utils/time";
import { patchData } from "@/api/patch_request";
import { alertBox } from "@/utils/alert";
import { connectSocket } from "@/utils/socket";
import { AnonymousPreview } from "@//user/components/anonymousPreview";
import "@/assets.css";
import { handleRightClick } from "@/utils/contextMenu";

const AnonymousBlock = ({ read, content, time, replied, reply, task, be_replied } : AnonymousType) => {
    const iconMap = {
        chat: MessageSquare,
        reply: Reply,
    };

    const Icon = replied ? iconMap["chat"] : iconMap["reply"];
    return (
        <div className={`md:px-5 px-3 py-3 border-l-4 bg-gradient-card border-l-ember w-full h-fit rounded-2xl flex md:gap-5 gap-1 hover:shadow-xl text-gray-600`}>
            <div className="lg:w-[5%] md:w-[15%] md:block hidden">
                <div className={`${read ? "bg-gradient-card" : "bg-ember"} h-fit w-fit md:p-3 p-2 rounded-full`}>
                    <Ghost color={read ? "gray" : "white"} />
                </div>
            </div>
            <div className="space-y-3 lg:w-[95%] md:w-[85%] w-full">
                <div className="space-y-3 text-ash" onClick={task}>
                    <div className="flex items-center gap-5">
                        <div>
                            <h3 className="font-semibold md:text-[18px] text-[16px]">Anonymous</h3>
                            <p className="inline-flex items-center gap-2 text-[13px] text-muted"><Clock size={13} /> {time}</p>
                        </div>
                        <div className={`${!read ? "bg-primary-glow text-scarlet" : replied && "text-blaze bg-alpha-secondary-bg"} px-4 py-1 rounded-full text-[14px] font-medium`}>{!read ? "New" : replied && "Replied"}</div>
                    </div>
                    <p className="md:text-[16px] text-[15px] whitespace-nowrap overflow-hidden truncate">
                            {content}
                    </p>
                </div>
                {be_replied && <div className="flex justify-end-safe">
                    <Button label={<><Icon size={16} /> {replied ? "View Chat" : "Reply"}</>} buttonType={replied ? "muted" : "colored"} onclick={reply} extraClass="w-fit h-full px-4 py-2 flex gap-1 items-center" type="button" />
                </div>}
            </div>
        </div>
    );
}

const AnonymousChat = () => {
    const [info, setInfo] = useState<{count: number, data: AnonymousDataType[]}>({
        count: null,
        data: []
    });
    const divFocus = useRef<HTMLDivElement>(null);
    const [meta, setMeta] = useState<{filter : "all" | "unread" | "replied", currentPage: number, pages: number}>({
        filter : "all",
        currentPage : 1,
        pages: null
    });
    const navigate = useNavigate();
    const { startLoading, stopLoading } = usePreloader();
    const websocket = useRef<any>(null);
    const [modal, openModal] = useState<{content: string, opened: boolean}>({
        content: "",
        opened: false
    });

    // for focusing div
    const focusDiv = () => {
        divFocus.current?.focus()
    }

    function fetchAnonymous() {
        startLoading();
        fetchData();
    }
    
    function fetchData() {
        getData({url: `/pages/get_anonymous?filter=${meta.filter}&page=${meta.currentPage}`, navigate, onSuccess: (response) => {
            setInfo(prev => ({count: response.data.count, data: response.data.anonymous}));
        }, onError: (error) => {
            if (error.response) console.log(error.response.data.detail);            
        }, finallyCallback: () => {stopLoading();} })  
    }

    function markFunction(thread : string, task : "reply" | "read") {
        const url = task === "reply" ? "reply_anonymous" : "markRead"
        patchData({url: `/pages/${url}/${thread}`, onSuccess : () => {
            if (task === "reply") navigate(`../chat/${thread}`);
            if (task === "read") {
                setInfo(prev => ({...prev, data: prev.data.map(item => item.message_thread === thread ? {...item, read: true} : item)}))
            }
        }, onError: (error) => {
            if (error.response) {
                alertBox({message: error.response.data.detail, success: false, top: "0"});
            } else {
                console.log(error.message);                
            }
        }});
    }

    function handleModal(content: string, thread : string, read: boolean) {
        openModal({content: content, opened: true});
        if (!read) markFunction(thread, "read");
    }

    // To handle the pagination
    useEffect(() => {
        if (info.count) {
            let total = info.count;
            let limit = 10;
            setMeta(prev => ({...prev, pages: Math.ceil(total / limit)}))
        }
    }, [info.count]);

    useEffect(() => {
        fetchAnonymous();
    }, [meta.filter, meta.currentPage]);

    // To connect my websocket
    useEffect(() => {
        document.addEventListener("contextmenu", handleRightClick);
        websocket.current = connectSocket({
            url: "new_anonymous",
            onMessage: (event) => {
                const payload = event.data;
                setInfo(prev => ({count: prev.count + 1, data: [payload, ...prev.data]}))
            }
        });

        return () => {
            document.removeEventListener("contextmenu", handleRightClick);
            websocket.current?.close();
        }
    }, [])

    return (
        <div className={`bg-void w-full h-[calc(100vh-60px)] no-copy transition duration-500 text-ash md:px-10 px-3 py-5 font-inter md:font-normal font-medium overflow-y-auto space-y-5`}>
            {modal.opened && <AnonymousPreview content={modal.content} onclick={() => openModal({content: "", opened: false})} />}
            <div>
                <b className="md:text-[30px] text-[20px]">Anonymous Messages</b>
                <p className="md:text-[18px] text-[15px]">Messages sent to your anonymous link. Reply to start a conversation.</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-between bg-transparent border border-alpha-secondary-bg  p-5 rounded-2xl shadow-md">
                <div className="md:w-1/3 w-full flex gap-4">
                    <Button label="All Messages" buttonType={meta.filter === "all" ? "brand" : "outlined"} type="button" extraClass="w-fit h-full p-2 md:text-[16px] text-[12px]" onclick={() => setMeta(prev => ({...prev, filter:"all"}))} />
                    <Button label="Unread" buttonType={meta.filter === "unread" ? "brand" : "outlined"} type="button" extraClass="w-fit h-full md:px-4 p-2 md:text-[16px] text-[12px]" onclick={() => setMeta(prev => ({...prev, filter:"unread"}))} />
                    <Button label="Replied" buttonType={meta.filter === "replied" ? "brand" : "outlined"} type="button" extraClass="w-fit h-full md:px-4 p-2 md:text-[16px] text-[12px]" onclick={() => setMeta(prev => ({...prev, filter:"replied"}))} />
                </div>
                <div className="flex lg:w-1/3 w-full h-11 border border-alpha-input-border bg-surface focus:border-scarlet overflow-hidden rounded-md" tabIndex={0} ref={divFocus} onClick={focusDiv}>
                    <button className="h-full w-fit p-3">
                        <Search size={16} />
                    </button>
                    <input type="search" placeholder="Search messages..." className="border-none w-full outline-none" />
                </div>
            </div>
            <div className="space-y-5 w-full">
                {info.data.length !== 0 ? info.data.map(item => (
                    <AnonymousBlock key={item.message_thread} 
                        read={item.read} 
                        content={item.content} 
                        time={timeFormat(item.sent_at)} 
                        replied={item.replied} 
                        reply={() => item.replied ? navigate(`../chat/${item.message_thread}`) : markFunction(item.message_thread, "reply")} 
                        task={() => {
                            handleModal(item.content, item.message_thread, item.read);
                            !item.read && markFunction(item.message_thread, "read")
                        }} 
                        be_replied = {item.be_replied} />
                )) : <p>No Data!</p>}
                {meta.pages > 0 && 
                    <div className="flex justify-center items-center-safe gap-3">
                        <Button label={<><ArrowLeft /></>} type="button" extraClass="p-2 text-blue-500 bg-blue-100 border-3 border-blue-300" disable={meta.currentPage < 1 ? false : true} onclick={() => meta.currentPage > 1 && setMeta(prev => ({...prev, currentPage: prev.currentPage -= 1}))} />
                        <p className="text-gray-400 font-medium text-[18px]">{meta.currentPage} / {meta.pages}</p>
                        <Button label={<><ArrowRight /></>} type="button" extraClass="p-2 text-blue-500 bg-blue-100 border-3 border-blue-300" disable={meta.currentPage < meta.pages ? false : true} onclick={() => meta.currentPage < meta.pages && setMeta(prev => ({...prev, currentPage: prev.currentPage += 1}))} />
                    </div>
                }
            </div>
        </div>
    );
}

export default AnonymousChat;