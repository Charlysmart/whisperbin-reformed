import Button from "@/components/button";
import { FileSearch2 } from "lucide-react"
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen flex justify-center items-center font-inter">
            <div className="lg:w-[40%] md:w-[70%] w-[90%] shadow-xl rounded-2xl px-5 py-20 flex flex-col items-center gap-7">
                <div className="w-fit h-fit bg-blue-200 rounded-full p-3">
                    <FileSearch2 className="text-blue-500" size={50} />
                </div>
                <div className="text-center">
                    <h1 className="font-bold md:text-[40px] text-[30px] text-gray-700">This Page Doesn't Exist</h1>
                    <p className="md:text-[18px] text-[16px] text-gray-700">We're sorry, but it seems the page you were looking for has vanished or never existed. Perhaps you mistyped the address or followed a broken link.</p>
                </div>
                <div className="flex gap-5">
                    <Button type="button" buttonType="brand" label="Go Home" extraClass="p-2" />
                    <Button type="button" label="Back" extraClass="p-2 text-blue-500" onclick={() => navigate(-1)} />
                </div>
            </div>
        </div>
    );
}

export default NotFound;