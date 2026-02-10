import { Search } from "lucide-react";
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
    const [data, setData] = useState<InboxDataType[]>([])
    const { startLoading, stopLoading } = usePreloader();
    const navigate = useNavigate();
    const socket = useRef<any>(null)

    useEffect(() => {
        console.log("📥 Inbox mounted");
        startLoading();
        getData({
            url: "/pages/inbox", 
            navigate, 
            onSuccess: (response) => setData(response.data), 
            onError: (error) => alertBox({ message: error.response.data.detail, success: false, top: "0" }), finallyCallback: () => stopLoading()
        });

        socket.current = connectSocket({
            url: "get_new_message",
            onMessage: (payload) => {
                const newData = payload.data;
                setData(prev => {
                    const index = prev.findIndex((item )=> item.message_thread === newData.message_thread)
                    if (index !== -1) {
                        const updated = [...prev]
                        updated[index] = newData
                        return updated
                    }
                    return [newData, ...prev]
                });
            }
        });

        return () => {
            socket.current?.close();
        }

    }, []);

    function markAsRead(thread: string, read: boolean) {
        if (!read) {
            patchData({ url: `pages/mark_inbox_read?thread=${thread}`, 
                navigate, 
                onSuccess: () => navigate(`../chat/${thread}`), 
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
        <div className={`bg-blue-50 w-full h-[calc(100vh-60px)] text-gray-600 md:px-10 px-3 py-5 font-inter  md:font-normal font-mediumoverflow-y-auto space-y-5`}>
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
            <div className="space-y-5">
                {data.length !== 0 ? data.map(item => (
                    <InboxChat key={item.message_thread} user={item.message_thread} time={timeFormat(item.sent_at)} content={item.content} read={item.read} task = {() => markAsRead(item.message_thread, item.read)} image={item.image} />)) : "No Chat yet!"}
            </div>
        </div>
    );
}

export default Inbox;