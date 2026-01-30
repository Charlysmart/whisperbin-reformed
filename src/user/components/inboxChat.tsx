import { Image, User2Icon } from "lucide-react";
import type { InboxChatType } from "@/utils/types";

const InboxChat = ({ user, time, content, read, task, image } : InboxChatType) => {
    return (
        <div className="w-full md:h-fit h-fit md:p-3 p-1 py-3 bg-blue-100 flex md:items-center rounded-xl md:gap-3 gap-1 shadow-xl overflow-hidden cursor-pointer relative" onClick={task}>
            <div className="lg:w-[5%] h-fit md:p-3 p-1 w-[15%] md:block rounded-full avatar-gradient relative">
                <User2Icon color="gray" fill="white" className="w-full h-full" />
                {!read && <div className="w-2.5 h-2.5 bg-red-500 rounded-full absolute lg:top-1 md:top-2 top-0 lg:right-0.5 md:right-1 right-0" />}
            </div>
            <div className="px-2 space-y-2 lg:w-[95%] w-[85%]">
                <div className="flex flex-wrap w-full justify-between">
                    <h2 className="md:text-[16px] text-[15px] text-primary overflow-hidden whitespace-nowrap" style={{textOverflow: "ellipsis"}}>{user}</h2>
                    <p className="text-[12px] text-brand">{time}</p>
                </div>
                <div className="flex items-center">
                    {!image && <Image size={16} />}
                    <p className="md:text-[14px] text-[15px] text-brand">{content}</p>
                </div>
            </div>
        </div>
    );
}

export default InboxChat;