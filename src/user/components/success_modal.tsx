import { useNavigate } from "react-router-dom";

type SuccessModalType = {
    thread : string,
    title : string
}
export const SuccessModal = ({ thread, title } : SuccessModalType) => {
    const navigate = useNavigate();
    function onCopy() {
        const text = 
        `Got something on your mind?
        Join ${title} and let it out, no names, no pressure, just vibes.
        Use this ID to join: ${thread}`;
        navigator.clipboard.writeText(text);
    }
    return (
        <div className="w-full h-screen absolute top-0 left-0 flex overflow-hidden backdrop-blur items-center justify-center">
            <div className="bg-surface lg:w-[400px] md:w-[400px] w-[95%] rounded-2xl shadow-2xl">
                <div className="p-5">
                    <h1 className="font-semibold text-[18px]">Whisperroom Created</h1>
                    <p className="text-[15px] text-muted">Room ID: <span>{thread}</span></p>
                </div>
                <div className="text-blue-600 w-full flex *:w-1/2 *:py-2">
                    <button className="border-t border-r border-gray-300 font-medium text-blaze" onClick={onCopy}>Copy ID</button>
                    <button className="border-t border-gray-300 font-medium text-blaze" onClick={() => navigate(`../whisperroom/${thread}`)}>Enter Room</button>
                </div>
            </div>
        </div>
    );
}