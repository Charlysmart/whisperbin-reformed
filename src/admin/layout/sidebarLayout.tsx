import SidebarProvider from "@/context/sideBarContext";
import Header from "@/components/header";
import { Outlet } from "react-router-dom";
import MSidebarProvider from "@/context/mobileSideBarContext";
import Sidebar from "../component/sidebar";

const AdminSidebarLayout = () => {
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

export default AdminSidebarLayout;