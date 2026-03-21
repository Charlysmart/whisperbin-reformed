import { refreshToken } from "@/api/refresh_token";
import Forbidden from "@/components/forbidden";
import { usePreloader } from "@/context/loaderContext";
import axiosClient from "@/utils/axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const UserAuthentication = () => {
    const [loggedIn, setLoggedIn] = useState<boolean | 403 | null>(null);
    const { startLoading, stopLoading } = usePreloader();
    const path = useLocation().pathname;
    const navigate = useNavigate();
    
    useEffect(() => {
        async function check_user() {
            startLoading();
            let url = "/pages/general";
            try {
                await axiosClient.get(url);
                setLoggedIn(true);
            }
            catch (error) {
                if (error.response?.data?.detail?.code === "TOKEN_EXPIRED") {
                    const refreshSucceeded = await refreshToken();

                    if (refreshSucceeded) {
                        // Update axios headers with new token inside refreshToken()!

                        try {
                            await axiosClient.get(url);
                            setLoggedIn(true);
                        } catch (retryError) {
                            setLoggedIn(false);
                        }
                    } else {
                        setLoggedIn(false);
                    }
                }
                else if (error.response?.data?.detail === "User not verified") {
                    console.log("hello")
                    navigate("../verify", {replace: true, state: {"path" : path}});
                }
                else {
                    setLoggedIn(false);
                }
            }
            finally {
                stopLoading();
            }
        }  
        check_user();
    }, []);

    if (loggedIn === null) {
        return null;
    }

    if (loggedIn === false) {
        return <Navigate to="../login" replace state={{path: path}} />
    }
    return <Outlet />
}

export default UserAuthentication;