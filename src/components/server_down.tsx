import { WifiOff } from "lucide-react";
import Button from "./button"
const ServerDown = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center font-inter bg-void">
            <div className="lg:w-[40%] md:w-[70%] w-[95%] bg-surface shadow-2xl shadow-alpha-primary-glow rounded-2xl px-5 py-20 flex flex-col items-center gap-7">
                <div className="w-fit h-fit bg-surface-alt rounded-full p-3">
                    <WifiOff className="text-ember" size={50} />
                </div>
                <div className="text-center">
                    <h1 className="font-bold md:text-[40px] text-[30px] text-ash">We're Having Trouble Connecting</h1>
                    <p className="md:text-[18px] text-[16px] text-muted">The server is temporarily unavailable. Please check your internet connection or try again in a few moments.</p>
                </div>
                <div className="flex gap-5">
                    <Button type="button" buttonType="brand" label="Reload" extraClass="p-2" onclick={() => location.reload()} />
                    <Button type="button" label="Go Home" extraClass="p-2 text-blaze" />
                </div>
            </div>
        </div>
    );
}

export default ServerDown;