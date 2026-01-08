import { Image, User2Icon } from "lucide-react";
import type { InboxChatType } from "../utils/types";

const InboxChat = ({ user, time, content, read, task, image } : InboxChatType) => {
    return (
        <div className="w-full md:h-fit h-fit p-3 bg-blue-100 flex items-center rounded-xl gap-3 shadow-xl overflow-hidden cursor-pointer" onClick={task}>
            <div className="w-12 h-12 p-3 md:block hidden rounded-full avatar-gradient relative">
                <User2Icon color="gray" fill="white" />
                {!read && <div className="w-2.5 h-2.5 bg-red-500 rounded-full absolute top-1 right-0.5" />}
            </div>
            <div className="px-2 space-y-2 w-full">
                <div className="flex flex-wrap w-full justify-between">
                    <h2 className="md:w-[85%] w-[full] md:text-[16px] text-[15px] text-primary">{user}</h2>
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