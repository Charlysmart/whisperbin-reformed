import Preloader from "@/components/preloader";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const PreloaderContext = createContext<any>(null);

const PreloaderProvider = () => {
    const [count, setCount] = useState(0);

    const startLoading = () => {
        setCount(prev => prev + 1);
    };

    const stopLoading = () => {
        setCount(prev => Math.max(prev - 1, 0));
    };

    const preloader = count > 0;

    return (
        <PreloaderContext.Provider value={{ startLoading, stopLoading }}>
            {preloader && <Preloader />}
            <Outlet />
        </PreloaderContext.Provider>
    );
};

export default PreloaderProvider;

export const usePreloader = () => useContext(PreloaderContext);