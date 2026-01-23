import { MessageSquareText } from "lucide-react";
const Logo = () => {
    return(
        <div className="flex items-center gap-2">
            <div className="bg-blue-500 w-fit p-1 rounded-sm"><MessageSquareText color="white" className="w-4 h-4" /></div>
            <h2 className="text-blue-500 font-bold md:text-[20px] text-[18px] font-inter">WhisperBin</h2>
        </div>
    );
}

export default Logo;