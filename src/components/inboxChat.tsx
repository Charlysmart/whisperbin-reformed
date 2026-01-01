import { User2Icon } from "lucide-react";
import type { InboxChatType } from "../utils/types";

const InboxChat = ({ user, time, content, read } : InboxChatType) => {
    return (
        <div className="w-full md:h-[70px] h-[120px] p-3 bg-blue-100 flex items-center rounded-xl gap-3 shadow-xl overflow-hidden">
            <div className="w-12 h-12 p-3 md:block hidden rounded-full avatar-gradient relative">
                <User2Icon color="gray" fill="white" />
                {!read && <div className="w-2.5 h-2.5 bg-red-500 rounded-full absolute top-1 right-0.5" />}
            </div>
            <div className="flex flex-wrap w-full justify-between px-2">
                <b className="md:w-[85%] w-[65%] md:text-[18px] text-[16px] text-primary">{user}</b>
                <p className="md:text-[12px] text-[12px] text-brand">{time}</p>
                <p className="md:text-[14px] text-[15px] text-brand">{content}</p>
            </div>
        </div>
    );
}

export default InboxChat;