import { MessageSquareText } from "lucide-react";
const Logo = () => {
    return(
        <div className="flex items-center gap-2">
            <div className="bg-alpha-primary-overlay w-fit p-1 rounded-sm"><MessageSquareText className="text-scarlet w-4 h-4" /></div>
            <h2 className="text-gradient font-bold md:text-[20px] text-[18px] font-inter">WhisperBin</h2>
        </div>
    );
}

export default Logo;