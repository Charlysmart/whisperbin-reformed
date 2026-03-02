import { User2, ChevronDown, Link, LogOut } from "lucide-react";
import Logo from "./logo";
import { useNavigate } from "react-router-dom";
import Button from "./button";
import user from "@/assets/image/user.png";
import { getData } from "@/api/get_request";
import { useEffect, useState } from "react";
import { deleteData } from "@/api/delete_request";
import { alertBox } from "@/utils/alert";

const ProfileModal = ({ username, site_username, close, logout }) => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="bg-black w-full h-[calc(100vh-60px)] absolute opacity-15 top-15 z-8000 left-0" onClick={close} />
            <div className="flex flex-col lg:h-[50vh] h-fit lg:w-[25%]  md:w-[50%] w-[75%] shadow-xl absolute z-9999 top-15 bg-surface right-0">
                <div className="bg-gradient-hero h-[40%]">
                    <div className="bg-ash rounded-md h-[130px] w-[150px] relative lg:top-6 top-12 md:left-[30%] left-[25%] flex justify-center items-center-safe">
                        <img src={user} alt="user placeholder" className="w-full h-full" />
                    </div>
                </div>
                <div className="relative bg-surface p-5 top-8 h-[calc(60%-32px)] ">
                    <b className="text-ash md:text-[18px] text-[16px]">{site_username}</b>
                    <p className="text-muted md:text-[16px] text-[14px]">@{username}</p>
                    <div className="mt-5 flex flex-wrap md:justify-between justify-center gap-3">
                        <Button type="button" label={<><Link className="md:block hidden" /> Get Link</>} buttonType="outlined" extraClass="px-5 py-2 flex gap-2 text-brand" onclick={() => navigate("../user_profile")} />
                        <Button type="button" label={<><LogOut className="md:block hidden" /> Log out</>} buttonType="outlined" extraClass="px-5 py-2 flex gap-2 text-brand" onclick={logout} />
                    </div>
                </div>
            </div>
        </div>
    )
}
const Header = () => {
    const [data, setData] = useState<{username: string, whisper_username: string}>({
        username : "",
        whisper_username : ""
    });
    const [modal, openModal] = useState<boolean>(false);
    const navigate = useNavigate()

    const logout = () => {
        deleteData({
            url: "auth/logout",
            onSuccess: () => navigate("../login"),
            onError: (error) => alertBox({ message: error.response.data.detail, success: false, top: "0"})
        })
    }

    useEffect(() => {
        getData({
            url: "pages/user",
            onSuccess: (response) => setData(response.data),
            onError: (error) => console.log(error.response.data.detail)            
        });
    }, [])
    return (
        <header className="md:px-10 px-5 w-full h-15 bg-surface">
            <div className="flex justify-between h-full items-center">
                <div>
                    <Logo />
                </div>
                <div className="flex items-center">
                    <div className="rounded-full border border-ember w-10 h-10">
                        <img src={user} alt="user" className="w-full h-full" />
                    </div>
                    <ChevronDown onClick={() => openModal(!modal)} className="text-ash" />
                </div>
            </div>
            {modal && <ProfileModal username={data.username} site_username={data.whisper_username} close={() => openModal(false)} logout={logout} />}
        </header>
    );
}

export default Header;