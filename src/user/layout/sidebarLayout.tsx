import SidebarProvider from "@/context/sideBarContext";
import Header from "@/user/components/header"
import Sidebar from "@/user/components/sidebar";
import { Outlet } from "react-router-dom";
import MSidebarProvider from "@/context/mobileSideBarContext";

const SidebarLayout = () => {
    return (
        <SidebarProvider>
            <MSidebarProvider>
                <main className="flex w-full">
                    <Sidebar />
                    <div className="flex-1 w-[87%]">
                        <Header />
                        <Outlet />
                    </div>
                </main>
            </MSidebarProvider>
        </SidebarProvider>
    );
}

export default SidebarLayout;