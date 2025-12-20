import SidebarProvider from "@/context/sideBarContext";
import Header from "@/components/header"
import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router-dom";
import MSidebarProvider from "@/context/mobileSideBarContext";

const SidebarLayout = () => {
    return (
        <SidebarProvider>
            <MSidebarProvider>
                <main className="flex w-full">
                    <Sidebar />
                    <div className="w-full">
                        <Header />
                        <Outlet />
                    </div>
                </main>
            </MSidebarProvider>
        </SidebarProvider>
    );
}

export default SidebarLayout;