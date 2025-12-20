import { ActivityIcon, ChevronLeft, ChevronRight, Inbox, Send, User } from "lucide-react";
import { useSidebar } from "@/context/sideBarContext";

const Sidebar = () => {
    const {sideBar, toggleSidebar} = useSidebar();
    
    return (
        <div className={sideBar ? "w-[15%]" : "w-[5%]"}>
            {sideBar && <div className="border-r border-gray-300 w-full h-screen px-2 cursor-pointer">
                <div className="h-15 flex justify-end items-center">
                    <button className="px-3" onClick={() => toggleSidebar(false)}>
                        <ChevronLeft />
                    </button>
                </div>
                <div className="space-y-4 *:flex *:gap-1.5 *:p-2 font-inter *:hover:bg-gray-200 *:hover:rounded-md">
                    <li><Inbox size={20} /> <span className="text-[14px]">Inbox</span></li>
                    <li><Send size={20} /> <span className="text-[14px]">Send Message</span></li>
                    <li><User size={20} /> <span className="text-[14px]">User Profile</span></li>
                    <li><ActivityIcon size={20} /> <span className="text-[14px]">Status Feed</span></li>
                </div>
            </div>}
            {!sideBar && <div className="border-r border-gray-300 w-full h-screen px-2 cursor-pointer">
                <div className="h-15 border-b border-gray-300 flex justify-center items-center">
                    <button className="px-3" onClick={() => toggleSidebar(true)}>
                        <ChevronRight />
                    </button>
                </div>
                <div className="space-y-4 mt-2 flex flex-col items-center list-none *:p-2 font-inter *:hover:bg-gray-200 *:hover:rounded-md">
                    <li><Inbox size={20} /></li>
                    <li><Send size={20} /></li>
                    <li><User size={20} /></li>
                    <li><ActivityIcon size={20} /></li>
                </div>
            </div>}
        </div>        
    );
}

export default Sidebar;