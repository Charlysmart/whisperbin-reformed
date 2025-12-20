import { Copy } from "lucide-react";
import InboxChat from "@/components/inboxChat";

const UserProfile = () => {
    return (
        <div className={`bg-white w-full h-[calc(100vh-60px)] md:px-10 px-3 py-5 font-inter overflow-y-auto border-t border-gray-100`}>
            <b className="md:text-[30px] text-[18px]">Your Profile & Settings</b>
            <div className="flex flex-col gap-3 mt-5 border border-gray-100 md:p-5 px-2 py-5 rounded-md">
                <label htmlFor="messageLink" className="md:text-[20px] text-[16px] font-medium">Your Anonymous Message Link</label>
                <div className="border-2 border-gray-200 w-full px-3 py-1 bg-gray-100 flex justify-between items-center rounded-md">
                    <input type="text" name="messageLink" id="messageLink" readOnly value="anonytext.app/u/alice_s_anon" className="md:text-[14px] text-[12px] outline-0" />
                    <button><Copy size={16} /></button>
                </div>
                <p className="md:text-[14px] text-[12px]">Share this link to receive anonymous messages. Your identity is always protected.</p>
            </div>
            <div className="flex flex-col gap-3 mt-5 border border-gray-100 md:p-5 px-2 py-5 rounded-md">
                <b className="md:text-[20px] text-[16px] font-medium">Incoming Message Preview</b>
                <div className="border border-gray-100 rounded-md">
                    <InboxChat user="Anonyuser_3546" time="2 hours ago" content="Just wanted to say your recent post on the Status Feed was inspiring! Keep it up." read={false} />
                </div>
                <p className="md:text-[14px] text-[12px]">This is how an incoming anonymous message will appear in your inbox.</p>
            </div>
            <div className="flex flex-col gap-3 mt-5 border border-gray-100 md:p-5 px-2 py-5 rounded-md">
                <b className="md:text-[20px] text-[16px] font-medium">Privacy and Notification Settings</b>
                <div className="space-y-5">
                    <div className="flex justify-between items-center">
                        <p className="md:text-[14px] text-[12px]">Email Notification</p>
                        <div className="w-11 h-6 rounded-full flex items-center overflow-hidden bg-blue-500">
                            <div className="bg-white w-5 h-5 rounded-full transform translate-x-full" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="md:text-[14px] text-[12px]">Push Notification</p>
                        <div className="w-11 h-6 rounded-full flex items-center overflow-hidden bg-gray-300">
                            <div className="bg-white w-5 h-5 rounded-full transform translate-x-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserProfile;