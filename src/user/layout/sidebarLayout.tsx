import SidebarProvider from "@/context/sideBarContext";
import Header from "@/components/header";
import { Outlet } from "react-router-dom";
import MSidebarProvider from "@/context/mobileSideBarContext";
import FetchUserProvider from "@/context/data";
import Sidebar from "@/components/sidebar";

const SidebarLayout = () => {
    return (
        <FetchUserProvider>
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
        </FetchUserProvider>
    );
}

export default SidebarLayout;