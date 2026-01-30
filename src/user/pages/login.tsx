import { ShieldCheck } from "lucide-react";
import AuthInputs from "@/components/authInputs";
import Button from "@/components/button";
import Logo from "@/user/components/logo";
import "@/App.css";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postData } from "@/api/post_request";
import useFormInput from "@/context/formChange";
import { alertBox } from "@/utils/alert";

type LoginProps = {
    username: string,
    password: string
}
const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const { formData, handleRegisterInput } = useFormInput<LoginProps>({
        username: "",
        password: ""
    });
    const locate = useLocation()
    const { path } = locate.state || {};

    const signIn = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        postData({
            url: "/auth/login",
            data: formData,
            onSuccess: (response) => {
                alertBox({ message: response.data.message, success: true, top: "0", onClose: () => navigate(path, {replace: true}) })
                setTimeout(() => {
                    if (path !== "") navigate(path, {replace: true});
                    navigate("/", {replace: true});
                }, 5100)
            },
            onError: (error) => {
                if (error.response) {
                    alertBox({ message: error.response.data.detail, success: false, top: "0" })
                } else {
                    console.log(error.message)
                }
            },
            finallyCallback: () => setLoading(false),
        });
    }
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

                    <form className="flex flex-col gap-5" onSubmit={signIn}>
                        <AuthInputs label="Username" type="text" attribute="username" placeholder="Enter Your unique username" onchange={handleRegisterInput} value={formData.username} />
                        <AuthInputs label="Password" type="password" attribute="password"  onchange={handleRegisterInput}  value={formData.password} placeholder="Enter Your password" />
                        <p className="text-[15px] mt-7 text-end text-blue-500 font-bold">Forgot password?</p>
                        <div className="mt-5 mb-5 flex flex-col gap-4">
                            <Button label={loading ? <div className="flex justify-center items-center gap-1">Logging in...<span className="spinner"/></div> :"Login"} disable={loading ? true : false} buttonType="colored" extraClass="w-full py-2" type="submit" />
                        </div>
                    </form>
                    <div className="text-[14px] space-y-3">
                        <p>Don't have an account yet? <span className="text-blue-500 font-bold cursor-pointer" onClick={() => navigate("../register")}>Register here</span></p>
                        <p>Your privacy is our priority. Read our <span className="text-blue-500 font-bold">Privacy Policy.</span></p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;