import { Bell, ChevronLeft, ChevronRight, DoorOpen, GhostIcon, Home, Inbox, LayoutDashboard, LogIn, PlusCircle, Send, User, User2, Users } from "lucide-react";
import { useSidebar } from "@/context/sideBarContext";
import { useMSidebar } from "@/context/mobileSideBarContext";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "@/App.css"
import "@/assets.css"
import { useUser } from "@/context/data";

const Sidebar = () => {
    const {sideBar, toggleSidebar} = useSidebar();
    const {mSideBar, toggleMSidebar} = useMSidebar();
    const path = useLocation().pathname;
    
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    const sideBarUse = isDesktop ? sideBar : mSideBar;
    const toggle = isDesktop ? toggleSidebar : toggleMSidebar;

    const userDetail = useUser();


    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <div className={sideBarUse ? "lg:w-[15%] md:w-[30%] w-[60%] md:relative fixed" : "lg:w-[5%] w-[12%]"}>
                {sideBarUse && <div className="border-r border-ember bg-surface z-10000 w-full h-screen px-2 cursor-pointer text-ash">
                    <div className="h-15 flex justify-end items-center">
                        <button className="px-3" onClick={() => toggle(false)}>
                            <ChevronLeft />
                        </button>
                    </div>
                    <div className="space-y-4 **:flex **:items-center **:gap-1.5 *:p-2 font-inter font-semibold *:hover:bg-ember *:hover:rounded-md">
                        <NavLink to="/anonymous_messages"><li className={path === "anonymous_messages" && "active"}><GhostIcon size={20} /> <span className="text-[16px]">Anonymous</span></li></NavLink>
                        {userDetail.role === "admin" && <NavLink to="/dashboard"><li className={path === "dashboard" && "active"}><LayoutDashboard size={20} /> <span className="text-[16px]">Dashboard</span></li></NavLink>}
                        <NavLink to="/inbox"><li className={path === "inbox" && "active"}><Inbox size={20} /> <span className="text-[16px]">Inbox</span></li></NavLink>
                        <NavLink to="/send_message"><li className={path === "send_message" && "active"}><Send size={20} /> <span className="text-[16px]">Send Message</span></li></NavLink>
                        <NavLink to="/user_profile"><li className={path === "user_profile" && "active"}><User size={20} /> <span className="text-[16px]">User Profile</span></li></NavLink>
                        <NavLink to="/notifications"><li className={path === "notifications" && "active"}><Bell size={20} /> <span className="text-[16px]">Notifications</span></li></NavLink>
                        <NavLink to="/create_room"><li className={path === "create_room" && "active"}><PlusCircle size={20} /> <span className="text-[16px]">Create Room</span></li></NavLink>
                        <NavLink to="/join_room"><li className={path === "join_room" && "active"}><DoorOpen size={20} /> <span className="text-[16px]">Join Room</span></li></NavLink>
                        {userDetail.role === "admin" && <NavLink to="/users"><li className={path === "users" && "active"}><Users size={20} /> <span className="text-[16px]">User Management</span></li></NavLink>}
                    </div>
                </div>}
                {!sideBarUse && <div className="border-r border-ember bg-surface text-ash w-full h-screen px-2 cursor-pointer">
                    <div className="h-15 border-b border-gray-300 flex justify-center items-center">
                        <button className="px-3" onClick={() => toggle(true)}>
                            <ChevronRight />
                        </button>
                    </div>
                    <div className="space-y-4 mt-2 flex flex-col items-center list-none *:p-2 font-inter *:hover:bg-ember *:hover:rounded-md">
                        <NavLink to="/anonymous_messages"><li className={path === "anonymous_messages" && "active"}><GhostIcon size={20} /></li></NavLink>
                        {userDetail.role === "admin" && <NavLink to="/dashboard"><li className={path === "dashboard" && "active"}><LayoutDashboard size={20} /></li></NavLink>}
                        <NavLink to="/inbox"><li className={path === "inbox" && "active"}><Inbox size={20} /></li></NavLink>
                        <NavLink to="/send_message"><li className={path === "send_message" && "active"}><Send size={20} /></li></NavLink>
                        <NavLink to="/user_profile"><li className={path === "user_profile" && "active"}><User size={20} /></li></NavLink>
                        <NavLink to="/notifications"><li className={path === "notifications" && "active"}><Bell size={20} /></li></NavLink>
                        <NavLink to="/create_room"><li className={path === "create_room" && "active"}><PlusCircle size={20} /></li></NavLink>
                        <NavLink to="/join_room"><li className={path === "join_room" && "active"}><DoorOpen size={20} /></li></NavLink>
                        {userDetail.role === "admin" && <NavLink to="/users"><li className={path === "users" && "active"}><Users size={20} /></li></NavLink>}
                    </div>
                </div>}
            </div>        
        </>
    );
}

export default Sidebar;