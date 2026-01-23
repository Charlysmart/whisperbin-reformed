import Preloader from "@/components/preloader";
import { createContext, useContext, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

const preloaderContext = createContext<any>(null);

const PreloaderProvider = () => {
    const [preloader, setPreloader] = useState<boolean>(false);
    const startTime = useRef<number | null>(null);

    const startLoading = () => {
        setPreloader(true);
    }

    const stopLoading = () => {
            setPreloader(false);
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