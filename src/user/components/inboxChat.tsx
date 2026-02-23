import { Image, User2Icon } from "lucide-react";
import type { InboxChatType } from "@/utils/types";

const InboxChat = ({ user, time, content, read, task, image } : InboxChatType) => {
    return (
        <div className="w-full md:h-fit transition-colors duration-700 h-fit md:p-3 p-1 py-3 bg-surface-alt hover:bg-alpha-primary-shadow-hover text-ash flex md:items-center rounded-xl md:gap-3 gap-1 shadow-xl overflow-hidden cursor-pointer z-1000" onClick={task}>
            <div className="lg:w-[5%] h-fit md:p-3 p-1 w-[15%] md:block rounded-full bg-gradient-card-alt">
                <User2Icon className="w-full h-full text-muted" />
                {!read && <div className="w-2.5 h-2.5 bg-red-500 rounded-full absolute lg:top-1 md:top-2 top-0 lg:right-0.5 md:right-1 right-0" />}
            </div>
            <div className="px-2 space-y-2 lg:w-[95%] w-[85%]">
                <div className="flex flex-wrap w-full justify-between">
                    <h2 className="md:text-[16px] text-[15px] text-primary overflow-hidden whitespace-nowrap" style={{textOverflow: "ellipsis"}}>{user}</h2>
                    <p className="text-[12px] text-muted">{time}</p>
                </div>
                <div className="flex items-center">
                    {!image && <Image size={16} />}
                    <p className="md:text-[14px] text-[15px] text-muted truncate">{content}</p>
                </div>
            </div>
        </div>
    );
}

export default InboxChat;