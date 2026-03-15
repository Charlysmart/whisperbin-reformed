import Button from "@/components/button";
import Logo from "@/components/logo"
import VerifyPreloader from "@/components/verify_preloader";
import { ArrowLeft, Eye, EyeClosed, Info, Lock } from "lucide-react"

const ResetPassword = () => {
    return (
        <div className="font-inter">
            <VerifyPreloader />
            <section className="md:flex hidden justify-center items-center h-[60px] shadow-2xl">
                <Logo />
            </section>
            <section className="md:h-[calc(100vh-60px)] h-screen overflow-y-auto w-full flex justify-center items-center">
                <div className="lg:w-[35%] md:w-[60%] w-[90%] md:p-10 px-5 p-1 space-y-5 rounded-2xl shadow-2xl">
                    <h2 className="font-semibold md:text-3xl text-xl">Reset Your Password</h2>
                    <span className="flex text-[16px] text-red-700 gap-2 items-center"><Info size={16} /> Reset links expires in 15 minutes.</span>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="font-medium text-gray-700">New Password</label>
                        <div className="flex items-center justify-between border border-gray-300 rounded-xl">
                            <Lock className="w-[10%] text-gray-500" />
                            <input type="text" name="username" id="username" placeholder="enter your registered username" className="px-1 py-3 rounded-lg w-[80%] outline-0" />
                            <button className="w-[10%] flex justify-center text-gray-500"><Eye /></button>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="font-medium text-gray-700">Confirm New Password</label>
                        <div className="flex items-center justify-between border border-gray-300 rounded-xl">
                            <Lock className="w-[10%] text-gray-500" />
                            <input type="text" name="username" id="username" placeholder="enter your registered username" className="px-1 py-3 rounded-lg w-[80%] outline-0" />
                            <button className="w-[10%] flex justify-center text-gray-500"><Eye /></button>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-5">
                        <Button label="Send Reset Link" type="button" buttonType="brand" extraClass="py-2 w-full" />
                        <Button label={<><ArrowLeft /> Back to Forgot Password</>} type="button" extraClass="py-2 w-full flex justify-center items-center text-gray-700" />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ResetPassword;