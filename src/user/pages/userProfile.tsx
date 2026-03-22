import { Copy } from "lucide-react";
import InboxChat from "@/user/components/inboxChat";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/button";
import { getData } from "@/api/get_request";
import { alertBox } from "@/utils/alert";
import { useNavigate } from "react-router-dom";
import { patchData } from "@/api/patch_request";
import { usePreloader } from "@/context/loaderContext";
import { handleRightClick } from "@/utils/contextMenu";

const UserProfile = () => {
    const [text, setText] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [preference, setPreferences] = useState<{email: boolean, push: boolean}>({
        email: false,
        push: false
    });
    const to_copy = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const { startLoading, stopLoading } = usePreloader();

    useEffect(() => {
        if (text.trim()) {
            const copy = navigator.clipboard.writeText(text);
            if (copy) alertBox({message: "copied", success: true, top: "0"})
        }
    }, [text])

    useEffect(() => {
        startLoading();
        getData({url: "/pages/user_setting", onSuccess: (response) => {setPreferences({email: response.data.result.email, push: response.data.result.push}); setUsername(response.data.user)}, onError: (error) => alertBox({message: error.response.data.detail, success: false, top: "0"}), navigate, finallyCallback: () => stopLoading()});

        document.addEventListener("contextmenu", handleRightClick);

        return () => {
            document.removeEventListener("contextmenu", handleRightClick);
        }
    }, []);

    function updateData () {
        patchData({url: "/pages/update_preference", data: preference, onSuccess: (response) => alertBox({message: response.data.message, success: true, top: "0"}), onError: (error) => alertBox({message: error.response.data.detail, success: false, top: "0"}), navigate})
    }
    return (
        <div className="bg-void no-copy w-full h-[calc(100vh-60px)] md:px-10 px-3 py-5 font-inter text-ash md:font-normal font-medium overflow-y-auto border-t border-alpha-subtle-border">
            <b className="md:text-[30px] text-[20px]">Your Profile & Settings</b>
            <div className="flex flex-col gap-3 mt-5 border border-alpha-card-border bg-surface md:p-5 px-2 py-5 rounded-xl">
                <label htmlFor="messageLink" className="md:text-[20px] text-[18px] font-semibold">Your Anonymous Message Link</label>
                <div className="border-2 border-alpha-input-border w-full px-3 py-1 bg-void flex justify-between items-center rounded-md gap-2">
                    <input type="text" name="messageLink" id="messageLink" readOnly value={`${import.meta.env.VITE_SITE_URL}/send_message/${username}`} className="md:text-[14px] text-[13px] outline-0 w-full" ref={to_copy} />
                    <button onClick={() => setText(`https://${to_copy.current.value}`)}><Copy size={16} /></button>
                </div>
                <p className="md:text-[14px] text-[13px]">Share this link to receive anonymous messages. Your identity is always protected.</p>
            </div>
            <div className="flex flex-col gap-3 mt-5 border border-alpha-card-border bg-surface md:p-5 px-2 py-5 rounded-xl">
                <b className="md:text-[20px] text-[18px] font-semibold">Incoming Message Preview</b>
                <div className="border border-alpha-subtle-border rounded-xl">
                    <InboxChat user="Anonyuser_3546" time="2 hours ago" content="Just wanted to say your recent post on the Status Feed was inspiring! Keep it up." read={false} image={true} />
                </div>
                <p className="md:text-[14px] text-[13px]">This is how an incoming anonymous message will appear in your inbox.</p>
            </div>
            <div className="flex flex-col gap-3 mt-5 border border-alpha-card-border bg-surface md:p-5 px-2 py-5 rounded-xl">
                <b className="md:text-[20px] text-[18px] font-semibold">Privacy and Notification Settings</b>
                <div className="space-y-5">
                    {[{title : "Email Notification", label : "email"}, {title : "Push Notification", label : "push"}].map((item, i) => (
                        <div className="flex justify-between items-center" key={i}>
                            <p className="text-[14px]">{item.title}</p>
                            <div className={`w-11 h-6 rounded-full flex items-center overflow-hidden ${preference[item.label] ? "bg-ember" : "bg-muted"}`} onClick={() => setPreferences(prev => ({...prev, [item.label]: !preference[item.label]}))}>
                                <div className={`bg-ash w-5 h-5 rounded-full transform transition duration-500 ease-in-out ${preference[item.label] ? "translate-x-full" : "translate-x-0"}`} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-3">
                    <Button label="Save" buttonType="colored" type="button" onclick={updateData} extraClass="px-5 py-2" />
                </div>
            </div>
        </div>
    );
}
export default UserProfile;