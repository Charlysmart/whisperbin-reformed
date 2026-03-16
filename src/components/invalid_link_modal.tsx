import { ArrowLeft, Lock, RefreshCcw, ShieldAlert, X } from "lucide-react"
import Button from "./button"
import { useNavigate } from "react-router-dom";

const ResetLinkModal = () => {
    const navigate = useNavigate();
    return (
        <div className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center font-inter z-10000 backdrop-blur-sm">
            <section className="lg:w-[30%] md:w-[60%] w-[90%] md:p-10 px-5 p-1 space-y-5 border-t-7 border-scarlet shadow-2xl rounded-lg bg-white">
                <div className="flex justify-end text-gray-700">
                    <button onClick={() => navigate("../login")}><X /></button>
                </div>
                <div className="flex flex-col items-center gap-5">
                    <div className="p-5 border-5 border-white rounded-full bg-secondary text-ember">
                        <ShieldAlert size={30} />
                    </div>
                    <h2 className="font-bold text-[25px]">Reset Link Invalid</h2>
                    <p className="text-muted">This password reset link has expired or is no longer valid. For your security, reset links are only active for 15 minutes</p>
                    <div className="flex flex-col space-y-5 w-full">
                        <Button label={<><RefreshCcw /> Request New Reset Link</>} type="button" buttonType="brand" extraClass="py-2 w-full flex justify-center items-center text-gray-700 gap-2" />
                        <Button label={<><ArrowLeft /> Back to Forgot Password</>} type="button" extraClass="py-2 w-full flex justify-center items-center text-gray-700" />
                    </div>
                    <div className="flex p-3 bg-secondary gap-2">
                        <div className="w-[10%]">
                            <Lock size={13} />
                        </div>
                        <p className="text-[13px]">If you didn't request this change, please contact our security team immediately. WhisperBin will never ask for your password via email.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ResetLinkModal;