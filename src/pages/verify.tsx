import Logo from "@/components/logo";
import { LucideInfo, RotateCwIcon, ShieldCheck } from "lucide-react";
import "@/App.css";
import Button from "@/components/button";

export const VerifyInput = () => {
    return (
        <input type="number" inputMode="numeric" pattern="[0-9]*" max={1} name="verification-token" id="verification-token" className="md:w-15 w-10 h-10 md:h-15 border-2 border-gray-400 rounded-xl focus:outline-blue-500 text-center" />
    );
}
const Verify = () => {
    return (
        <div className="w-full lg:block md:flex overflow-y-auto body">
            <section className="flex w-full justify-center items-center py-5">
                <div className="lg:w-[40%] md:w-[70%] w-[90%] h-fit border border-gray-200 bg-white hover:shadow rounded-2xl md:px-10 px-3 py-10 font-inter">
                    <div className="flex justify-center items-center flex-col mb-3 gap-5">
                        <Logo />
                        <div className="bg-blue-100 p-3 text-blue-500 font-bold rounded-full">
                            <ShieldCheck size={28} /> 
                        </div>
                    </div>
                    <div className="md:mb-4 text-center flex flex-col gap-3">
                        <h1 className="md:text-[30px] text-[18px] font-bold text-gray-800">Verify Your Account</h1>
                        <p className="md:text-[18px] text-gray-600 text-[15px]">We've sent a 6-digit verification code to your email</p>
                        <p className="text-blue-500 md:text-[16px] text-[14px]">example@mail.com</p>
                    </div>
                    <form className="flex flex-col md:gap-10 gap-5">
                        <div className="flex justify-between mt-10 md:px-0 px-1">
                            <VerifyInput />
                            <VerifyInput />
                            <VerifyInput />
                            <VerifyInput />
                            <VerifyInput />
                            <VerifyInput />
                        </div>
                        <div className="px-10 space-y-6">
                            <Button label="Verify Account" buttonType="colored" extraClass="w-full text-[20px] font-medium shadow-2xl shadow-blue-200" />
                            <hr className="border-gray-200" />
                        </div>
                    </form>
                    <div className="text-[#4b5563] md:text-[16px] text-[14px] text-center space-y-3 mt-10">
                        <p>Didn't receive any code?</p>
                        <p className="text-blue-500 inline-flex gap-2 font-semibold md:text-[18px] text-[15px]"><RotateCwIcon /> Resend Verification Code</p>
                        <p>Code expires in <span className="font-medium">5:00</span></p>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-100 mt-5 flex gap-3">
                        <LucideInfo className="text-blue-500" size={30} />
                        <p className="md:text-[14px] text-[12px] text-gray-600">For your security, this verification ensures only you can access your anonymous account.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Verify;