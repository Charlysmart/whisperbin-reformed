import { User2Icon } from "lucide-react";
import type { InboxChatType } from "../utils/types";

const InboxChat = ({ user, time, content, read } : InboxChatType) => {
    return (
        <div className="w-full md:h-[70px] h-[100px] px-2 bg-white flex items-center rounded-md gap-3 overflow-hidden">
            <div className="w-12 h-12 p-3 md:block hidden rounded-full bg-green-100 relative">
                <User2Icon />
                {!read && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full absolute top-1 right-0.5" />}
            </div>
            <div className="flex flex-wrap w-full justify-between px-2">
                <b className="md:w-[85%] w-[65%] md:text-[18px] text-[14px]">{user}</b>
                <p className="md:text-[12px] text-[8px]">{time}</p>
                <p className="md:text-[14px] text-[10px]">{content}</p>
            </div>
        </div>
    );
}

export default InboxChat;