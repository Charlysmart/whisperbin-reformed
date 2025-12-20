import React, { createContext, useContext, useState } from "react";

type sidebarContextType = {
    sideBar : boolean
    toggleSidebar : (toggle : boolean) => void
}

const sidebarContext = createContext<sidebarContextType>({
    sideBar : false,
    toggleSidebar : () => {}
});

const SidebarProvider:React.FC<{children : React.ReactNode}> = ({children}) => {
    const [sideBar, setSideBar] = useState<boolean>(true);

    // function to toggle the sidebar
    function toggleSidebar (toggle: boolean) {
        setSideBar(toggle);
    }

    return (
        <sidebarContext.Provider value={{sideBar, toggleSidebar}}>
            {children}
        </sidebarContext.Provider>
    );
}

export default SidebarProvider;

export const useSidebar = (() => {
    const context = useContext(sidebarContext);
    if (context) return context
    else throw new Error("Context is null");    
});