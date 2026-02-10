import Logo from "@/user/components/logo";
import { LucideInfo, RotateCwIcon, ShieldCheck } from "lucide-react";
import "@/App.css";
import Button from "@/components/button";
import { useEffect, useRef, useState } from "react";
import { postData } from "@/api/post_request";
import { getData } from "@/api/get_request";
import { alertBox } from "@/utils/alert";
import { useNavigate } from "react-router-dom";

const Verify = () => {
    const navigate = useNavigate();
    const inputsRef = useRef<HTMLInputElement[]>([]);
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [loading, setLoading] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState(300);

    const otpValue = otp.join("");

    const verifyUser = () => {
        if (otpValue.length !== 6 || loading) return;
        setLoading(true);

        postData({url: `/auth/verify_email?token=${otpValue}`, onSuccess: (response) => {
            alertBox({message: response.data.message, success: true, top: "0", onClose: () => navigate("../")});
        }, onError: (error) => {
            if (error.response) {
                if (error.response.status === 422) {
                    alertBox({message: error.response.data.detail[0].msg, success: false, top: "0"});
                }
                else if (error.response.data.detail === "Access token missing") {
                    alertBox({message: "Login session expired! Kindly login again!", success: false, top: "0", onClose: () => navigate("../login")});
                } else {
                    alertBox({message: error.response.data.detail, success: false, top: "0"});
                }
            } else {
                console.log(error.message);                
            }
        }, finallyCallback: () => setLoading(false)});
    }

    const handleVerification = (e: React.FormEvent) => {
        e.preventDefault();
        verifyUser();
    }

    useEffect(() => {
        if (otpValue.length === 6) {
            verifyUser();
        }
    }, [otpValue]);

    // 🔢 Handle typing
    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && inputsRef.current[index + 1]) {
            inputsRef.current[index + 1].focus();
        }
    };

    // ⬅️ Handle backspace
    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !otp[index] && inputsRef.current[index - 1]) {
            inputsRef.current[index - 1].focus();
        }
    };

    // 📋 Handle paste
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();

        const paste = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        const newOtp = paste.split("");
        setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);

        inputsRef.current[paste.length - 1]?.focus();
    };

    // timer logic
    useEffect(() => {
        if (timeLeft <= 0) return;

        const intervalId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    // Convert seconds to MM:SS format
    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60).toString().padStart(2, "0");
        const sec = (seconds % 60).toString().padStart(2, "0");
        return `${min}:${sec}`;
    };

    const resend_verification = () => {
        getData({url: "/auth/resend_verification", navigate, onSuccess: (response) => {
            alertBox({ message: response.data.message, success: true, top: "0"});
        }, onError: (error) => {
            if (error.response) {
                if (error.response.status === 422) {
                    alertBox({message: error.response.data.detail[0].msg, success: false, top: "0"});
                }
                else if (error.response.data.detail === "Access token missing") {
                    alertBox({message: "Login session expired! Kindly login again!", success: false, top: "0", onClose: () => navigate("../login")});
                } else {
                    alertBox({message: error.response.data.detail, success: false, top: "0"});
                }
            } else {
                console.log(error.message);                
            }
        }});
    }
    
    return (
        <div className="w-full lg:block md:flex overflow-y-auto body">
            <section className="flex w-full justify-center items-center py-5">
                <div className="lg:w-[40%] md:w-[70%] w-[90%] h-fit text-gray-600 border border-gray-200 bg-white hover:shadow rounded-2xl md:px-10 px-3 py-10 font-inter font-medium">
                    <div className="flex justify-center items-center flex-col mb-3 gap-5">
                        <Logo />
                        <div className="bg-blue-100 p-3 text-blue-500 font-bold rounded-full">
                            <ShieldCheck size={28} /> 
                        </div>
                    </div>
                    <div className="md:mb-4 text-center flex flex-col gap-3">
                        <h1 className="md:text-[30px] text-[20px] font-bold text-gray-800">Verify Your Account</h1>
                        <p className="md:text-[18px] text-gray-600 text-[16px]">We've sent a 6-digit verification code to your email</p>
                        <p className="text-blue-500 md:text-[16px] text-[15px]">example@mail.com</p>
                    </div>
                    <form className="flex flex-col md:gap-10 gap-5" onSubmit={handleVerification}>
                        <div className="flex justify-between mt-10 md:px-0 px-1" onPaste={handlePaste}>
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        if (el) inputsRef.current[index] = el;
                                    }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={value}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className=" md:w-15 w-10 h-10 md:h-15 text-center border-2 rounded-xl focus:outline-blue-500"
                                />
                            ))}
                        </div>
                        <div className="px-10 space-y-6">
                            <Button label={loading ? <div className="flex justify-center items-center gap-1">Verifying...<span className="spinner"/></div> :"Verify"} disable={loading || otpValue.length !== 6}buttonType="colored" extraClass={`w-full md:text-[20px] font-medium shadow-2xl shadow-blue-200 ${otpValue.length !== 6 ? "cursor-not-allowed" : "cursor-pointer"} `} />
                            <hr className="border-gray-200" />
                        </div>
                    </form>
                    <div className="text-[#4b5563] md:text-[16px] text-[15px] text-center space-y-3 mt-10">
                        <p>Didn't receive any code?</p>
                        <p className="text-blue-500 inline-flex gap-2 font-semibold md:text-[18px] text-[16px]" onClick={resend_verification}><RotateCwIcon /> Resend Verification Code</p>
                        <p>Code expires in <span className="font-semibold">{formatTime(timeLeft)}</span></p>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-100 mt-5 flex gap-3">
                        <LucideInfo className="text-blue-500" size={30} />
                        <p className="md:text-[14px] text-[13px] text-gray-600">For your security, this verification ensures only you can access your anonymous account.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Verify;