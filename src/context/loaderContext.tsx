import Preloader from "@/components/preloader";
import { createContext, useContext, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

const preloaderContext = createContext<any>(null);

const PreloaderProvider = () => {
    const [count, setCount] = useState(0);
    const startLoading = () => {
        setCount(prev => prev + 1);
    }

    const stopLoading = () => {
        setCount(prev => Math.max(prev - 1, 0));
    }
    
    const preloader = count > 0;

    return (
        <preloaderContext.Provider value={{ preloader, startLoading, stopLoading }}>
            {preloader && <Preloader />}
            <Outlet />
        </preloaderContext.Provider>
    );
}

export default PreloaderProvider;

export const usePreloader = () => useContext(preloaderContext);