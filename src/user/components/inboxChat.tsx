import { Image, User2Icon } from "lucide-react";
import type { InboxChatType } from "@/utils/types";

const InboxChat = ({ user, time, content, read, task, image } : InboxChatType) => {
    return (
        <div className="w-full md:h-fit transition-colors duration-700 h-fit md:p-3 p-1 py-3 bg-surface-alt hover:bg-alpha-primary-shadow-hover text-ash flex md:items-center rounded-xl md:gap-3 gap-1 shadow-xl overflow-hidden cursor-pointer z-1000" onClick={task}>
            <div className="lg:w-[5%] h-fit md:p-3 p-1 w-[15%] md:block rounded-full bg-gradient-card-alt">
                <User2Icon className="w-full h-full text-muted" />                
            </div>
            <div className="px-2 lg:w-[95%] w-[85%] whitespace-nowrap overflow-hidden truncate">
                <div className="flex flex-wrap w-full justify-between items-start">
                    <div className="space-y-1 min-w-0 flex-1">
                        <h2 className="md:text-[16px] text-[15px] text-primary whitespace-nowrap overflow-hidden truncate">{user}</h2>
                        <div className="flex items-center">
                            {!image && <Image size={16} />}
                            <p className="flex-1 md:text-[14px] text-[15px] text-muted truncate">{content}</p>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[12px] text-muted">{time}</p>
                        {!read && 
                            <div className="w-fit h-fit px-2 flex items-center justify-center bg-scarlet rounded-full text-[13px]">
                                unread
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InboxChat;