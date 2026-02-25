import { Download, MessageSquareText, X } from "lucide-react";
import Button from "../../components/button";
import { useRef } from "react";
import html2canvas from "html2canvas";

type PreviewType = {
    content : string,
    onclick : () => void
}
export const AnonymousPreview = ({ content, onclick } : PreviewType) => {
    const captureRef = useRef<HTMLDivElement>(null);
    const downloadImage = async () => {
        if (!captureRef.current) return;

        const canvas = await html2canvas(captureRef.current, {
            backgroundColor: "#ffffff",
            scale: 2, //higher quality
            useCORS: true
        });

        const link = document.createElement("a");
        link.download = "whisper_anonymous.jpg";
        link.href = canvas.toDataURL("image/jpg");
        link.click();
    }
    return (
        <div className="h-screen backdrop-blur-md overflow-y-auto absolute w-full top-0 left-0 z-9999">
            <div className="w-full h-[50px] flex justify-end-safe">
                <button className="p-2 w-fit h-fit" onClick={onclick}><X className="font-semibold text-gray-500"/></button>
            </div>
            <div className="flex flex-col space-y-5 justify-center h-[calc(100vh-50px)] backdrop-blur-2xl items-center">
                <div className="lg:w-[35%] md:w-[60%] w-[95%] flex justify-center-safe rounded-2xl p-5" ref={captureRef}>
                    <div className="w-[95%] rounded-2xl overflow-hidden" style={{ color: '#000', backgroundColor: '#2e0a07', boxShadow: "2px 2px 15px rgba(0, 0, 0, 0.226)" }}>
                        <section className="bg-gradient-hero px-5 py-2 space-y-2 text-ash">
                            <div className="flex gap-2 items-center">
                                <MessageSquareText color="white" className="w-4 h-4" />
                                <h2 className="font-semibold md:text-[15px] text-[14px] font-inter">WhisperBin</h2>
                            </div>
                            <h2 className="text-center font-bold text-[18px]">Anonymous Message</h2>
                        </section>
                        <section className="p-5 h-fit bg-ash text-muted">
                            {content}
                        </section>
                    </div>
                </div>
                <div>
                    <Button label={<><Download /> Download</>} type="button" buttonType="colored" extraClass="p-2 flex gap-2" onclick={downloadImage} />
                </div>
            </div>
        </div>
    );
}