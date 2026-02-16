import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import Button from "@/components/button";
import InboxChat from "@/user/components/inboxChat";
import { useEffect, useRef, useState } from "react";
import { getData } from "@/api/get_request";
import { alertBox } from "@/utils/alert";
import { usePreloader } from "@/context/loaderContext";
import { useNavigate } from "react-router-dom";
import { InboxDataType } from "@/utils/types";
import { timeFormat } from "@/utils/time";
import { patchData } from "@/api/patch_request";
import { connectSocket } from "@/utils/socket";

const Inbox = () => {
    const [info, setInfo] = useState<{data: InboxDataType[], count: number}>({
        data: [],
        count: null
    });
    const [meta, setMeta] = useState<{pages: number, currentPage: number}>({
        pages: null,
        currentPage: 1
    });
    const { startLoading, stopLoading } = usePreloader();
    const navigate = useNavigate();
    const socket = useRef<any>(null);

    function fetchData() {
        startLoading();
        getData({
            url: `/pages/inbox?page=${meta.currentPage}`, 
            navigate, 
            onSuccess: (response) => setInfo({data: response.data.data, count: response.data.count}), 
            onError: (error) => alertBox({ message: error.response.data.detail, success: false, top: "0" }), finallyCallback: () => stopLoading()
        });
    }

    useEffect(() => {
        const totalPages = Math.ceil(info.count / 10);
        setMeta(prev => ({...prev, pages: totalPages}));
    }, [info.count]);

    useEffect(() => {
        socket.current = connectSocket({
            url: "get_new_message",
            onMessage: (payload) => {
                const newData = payload.data;
                if (meta.currentPage === 1){
                    setInfo(prev => {
                        const map = new Map(prev.data.map(item => [item.message_thread, item]));
                        map.set(newData.message_thread, newData);
                        return { ...prev, data: Array.from(map.values()), count: (prev.count ?? 0) + 1 };
                    });
                }
            }
        });

        return () => {
            socket.current?.close();
        }

    }, []);

    useEffect(() => {
        fetchData();
    }, [meta.currentPage])

    function markAsRead(thread: string, read: boolean) {
        if (!read) {
            patchData({ url: `pages/mark_inbox_read?thread=${thread}`, 
                navigate, 
                onSuccess: () => {
                    setInfo(prev => ({
                        ...prev,
                        data: prev.data.map(item =>
                            item.message_thread === thread ? { ...item, read: true } : item
                        )
                    }));
                    navigate(`../chat/${thread}`)
                }, 
                onError: (error) => alertBox({
                    message: error.response.data.detail, 
                    success: false, 
                    top: "0"
                }) 
            })
        } else {
            navigate(`../chat/${thread}`)
        }
    }
    return (
        <div className={`bg-blue-50 w-full h-[calc(100vh-60px)] text-gray-600 md:px-10 px-3 py-5 font-inter  md:font-normal font-medium overflow-y-auto space-y-5`}>
            <div>
                <b className="text-[30px] ">Inbox</b>
            </div>
            <div className="w-full flex flex-wrap gap-4">
                <div className="flex lg:w-[85%] w-full h-11 border border-gray-200 overflow-hidden rounded-md">
                    <button className="h-full w-fit p-3">
                        <Search size={16} />
                    </button>
                    <input type="search" placeholder="Search messages..." className="border-none w-full outline-none" />
                </div>
                <div className="flex w-[10%] gap-2 justify-between *:hover:bg-gray-100">
                    <Button label="All" buttonType="outlined" extraClass="w-fit h-full px-4 py-2" />
                    <Button label="Unread" buttonType="outlined" extraClass="w-fit h-full px-4 py-2" />
                </div>
            </div>
            <div className="space-y-5 border-red-700">
                {info.data.length !== 0 ? info.data.map(item => (
                    <div className="w-full">
                        <InboxChat key={item.message_thread} user={item.message_thread} time={timeFormat(item.sent_at)} content={item.content} read={item.read} task = {() => markAsRead(item.message_thread, item.read)} image={item.image} />
                    </div>))  : "No Chat yet!"
                }
                {meta.pages > 0 && 
                    <div className="flex justify-center items-center-safe gap-3">
                        <Button label={<><ArrowLeft /></>} type="button" extraClass="p-2 text-blue-500 bg-blue-100 border-3 border-blue-300" disable={meta.currentPage > 1 ? false : true} onclick={() => meta.currentPage > 1 && setMeta(prev => ({...prev, currentPage: prev.currentPage - 1}))} />
                        <p className="text-gray-400 font-medium text-[18px]">{meta.currentPage} / {meta.pages}</p>
                        <Button label={<><ArrowRight /></>} type="button" extraClass="p-2 text-blue-500 bg-blue-100 border-3 border-blue-300" disable={meta.currentPage < meta.pages ? false : true} onclick={() => meta.currentPage < meta.pages && setMeta(prev => ({...prev, currentPage: prev.currentPage + 1}))} />
                    </div>
                }
            </div>
        </div>
    );
}

export default Inbox;