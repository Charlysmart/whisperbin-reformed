import { getData } from "@/api/get_request";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { createContext, useContext, useEffect, useState } from "react";
import { usePreloader } from "./loaderContext";

type User = {
    username: string;
    custom_username: string;
    role: "user" | "admin" | null;
};

const DataContext = createContext<User | null>(null);

const FetchUserProvider = ({children} : {children : React.ReactNode}) => {
    const [userDetail, setUserDetail] = useState<User | null>(null);

    const { startLoading, stopLoading } = usePreloader();

    useEffect(() => {
        startLoading("user");
        getData({
            url: "pages/user",
            onSuccess: (response) => setUserDetail(response.data),
            onError: (error) => console.log(error.response.data.detail),    
            finallyCallback: stopLoading("user")
        });
    }, []);
    
    if (!userDetail) {
        return null;
    }
    return (
        <DataContext.Provider value={userDetail}>
            { children }
        </DataContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(DataContext);

    if (!context) {
        throw new Error("useUser must be used inside FetchUserProvider");
    }

    return context;
}

export default FetchUserProvider