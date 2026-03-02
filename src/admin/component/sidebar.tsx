import { ChevronLeft, ChevronRight, Home, User2 } from "lucide-react";
import { useSidebar } from "@/context/sideBarContext";
import { useMSidebar } from "@/context/mobileSideBarContext";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "@/App.css";
import "@/assets.css";

const Sidebar = () => {
    const {sideBar, toggleSidebar} = useSidebar();
    const {mSideBar, toggleMSidebar} = useMSidebar();
    const path = useLocation().pathname;
    
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    const sideBarUse = isDesktop ? sideBar : mSideBar;
    const toggle = isDesktop ? toggleSidebar : toggleMSidebar;


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
                        <NavLink to="/dashboard"><li className={path === "dashboard" && "active"}><Home size={20} /> <span className="text-[16px]">Dashboard</span></li></NavLink>
                        <NavLink to="/users"><li className={path === "users" && "active"}><User2 size={20} /> <span className="text-[16px]">Users</span></li></NavLink>
                    </div>
                </div>}
                {!sideBarUse && <div className="border-r border-ember bg-surface text-ash w-full h-screen px-2 cursor-pointer">
                    <div className="h-15 border-b border-gray-300 flex justify-center items-center">
                        <button className="px-3" onClick={() => toggle(true)}>
                            <ChevronRight />
                        </button>
                    </div>
                    <div className="space-y-4 mt-2 flex flex-col items-center list-none *:p-2 font-inter *:hover:bg-ember *:hover:rounded-md">
                        <NavLink to="/dashboard"><li className={path === "dashboard" && "active"}><Home size={20} /></li></NavLink>
                        <NavLink to="/users"><li className={path === "users" && "active"}><User2 size={20} /></li></NavLink>
                    </div>
                </div>}
            </div>        
        </>
    );
}

export default Sidebar;