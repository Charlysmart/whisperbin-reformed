import Preloader from "@/components/preloader";
import { createContext, useContext, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

const preloaderContext = createContext<any>(null);

const PreloaderProvider = () => {
    const [preloader, setPreloader] = useState<boolean>(false);
    const startTime = useRef<number | null>(null);

    const startLoading = () => {
        startTime.current = Date.now();
        setPreloader(true);
    }

    const stopLoading = () => {
        const elapsed = Date.now() - (startTime.current ?? 0);
        const remaining = Math.max(5000 - elapsed, 0);

        setTimeout(() => {
            setPreloader(false);
            startTime.current = null;
        }, remaining);
    }

    return (
        <preloaderContext.Provider value={{ preloader, startLoading, stopLoading }}>
            {preloader && <Preloader />}
            <Outlet />
        </preloaderContext.Provider>
    );
}

export default PreloaderProvider;

export const usePreloader = () => useContext(preloaderContext);