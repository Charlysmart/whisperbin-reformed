import { ShieldCheck } from "lucide-react";
import AuthInputs from "@/components/authInputs";
import Button from "@/components/button";
import Logo from "@/components/logo";
import "@/App.css";


const Login = () => {
    return (
        <div className="w-full lg:block md:flex overflow-y-auto body">
            <section className="flex w-full justify-center items-center py-5">
                <div className="lg:w-[40%] md:w-[70%] w-[90%] h-fit border border-gray-200 bg-white hover:shadow rounded-2xl md:px-10 px-3 py-10 font-inter font-medium text-gray-600">
                    <div className="flex justify-center items-center flex-col mb-3 gap-5">
                        <Logo />
                        <div className="bg-blue-100 p-3 text-blue-500 font-bold rounded-full">
                            <ShieldCheck size={28} /> 
                        </div>
                    </div>
                    <div className=" mb-4 text-center flex flex-col gap-3">
                        <p className="md:text-[30px] text-[20px] font-bold">Login to AnonyText</p>
                        <p className="text-[16px]">Securely access your anonymous messaging platform.</p>
                    </div>

                    <form className="flex flex-col gap-5">
                        <AuthInputs label="Username" attribute="username" placeholder="Enter Your unique username" />
                        <AuthInputs label="Password" attribute="password" placeholder="Enter Your password" />
                    </form>
                    <p className="text-[15px] mt-7 text-end text-blue-500 font-bold">Forgot password?</p>
                    <div className="mt-5 mb-5 flex flex-col gap-4">
                        <Button label="Login" buttonType="colored" extraClass="w-full" />
                    </div>
                    <div className="text-[14px] space-y-3">
                        <p>Don't have an account yet? <span className="text-blue-500 font-bold">Register here</span></p>
                        <p>Your privacy is our priority. Read our <span className="text-blue-500 font-bold">Privacy Policy.</span></p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;