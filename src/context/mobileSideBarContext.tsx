import React, { createContext, useContext, useState } from "react";

type sidebarContextType = {
    mSideBar : boolean
    toggleMSidebar : (toggle : boolean) => void
}

const mSidebarContext = createContext<sidebarContextType>({
    mSideBar : false,
    toggleMSidebar : () => {}
});

const MSidebarProvider:React.FC<{children : React.ReactNode}> = ({children}) => {
    const [mSideBar, setSidebar] = useState<boolean>(false);

    // function to toggle the sidebar
    function toggleMSidebar (toggle: boolean) {
        setSidebar(toggle);
    }

    return (
        <mSidebarContext.Provider value={{mSideBar, toggleMSidebar}}>
            {children}
        </mSidebarContext.Provider>
    );
}

export default MSidebarProvider;

export const useMSidebar = (() => {
    const context = useContext(mSidebarContext);
    if (context) return context
    else throw new Error("Context is null");    
});