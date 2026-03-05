import { refreshToken } from "@/api/refresh_token";
import Forbidden from "@/components/forbidden";
import { usePreloader } from "@/context/loaderContext";
import axiosClient from "@/utils/axios"
import { log } from "console";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminAuthentication = () => {
    const [loggedIn, setLoggedIn] = useState<boolean | 403 | null>(null);
    const { startLoading, stopLoading } = usePreloader();
    const path = useLocation().pathname;
    const navigate = useNavigate();
    
    useEffect(() => {
        async function check_user() {
            startLoading();
            let url;
            try {
                url = await axiosClient.get("/pages/protected_route");
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
                else if (error.response?.data?.detail === "You do not have access to this page") {
                    setLoggedIn(403);                    
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

    if (loggedIn === 403) {
        return <Forbidden />
    }

    if (loggedIn === false) {
        return <Navigate to="../login" replace state={{path: path}} />
    }
    return <Outlet />
}

export default AdminAuthentication;