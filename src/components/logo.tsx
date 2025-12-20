import { MessageSquareText } from "lucide-react";
const Logo = () => {
    return(
        <div className="flex items-center gap-2">
            <div className="bg-blue-500 w-fit p-1 rounded-sm"><MessageSquareText color="white" /></div>
            <h2 className="text-blue-500 font-bold text-[20px] font-inter">AnonyText</h2>
        </div>
    );
}

export default Logo;