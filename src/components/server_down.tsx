import Button from "@/components/button";
import { FileSearch2, WifiOff } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom";

const ServerDown = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen flex justify-center items-center font-inter">
            <div className="lg:w-[40%] md:w-[70%] w-[95%] shadow-xl rounded-2xl px-5 py-20 flex flex-col items-center gap-7">
                <div className="w-fit h-fit bg-blue-200 rounded-full p-3">
                    <WifiOff className="text-blue-500" size={50} />
                </div>
                <div className="text-center">
                    <h1 className="font-bold md:text-[40px] text-[30px] text-gray-700">We're Having Trouble Connecting</h1>
                    <p className="md:text-[18px] text-[16px] text-gray-700">The server is temporarily unavailable. Please check your internet connection or try again in a few moments.</p>
                </div>
                <div className="flex gap-5">
                    <Button type="button" buttonType="brand" label="Reload" extraClass="p-2" onclick={() => location.reload()} />
                    <Button type="button" label="Go Home" extraClass="p-2 text-blue-500" />
                </div>
            </div>
        </div>
    );
}

export default ServerDown;