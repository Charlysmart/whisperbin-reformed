import { Eye, EyeClosed, ShieldCheck } from "lucide-react";
import AuthInputs from "@/components/authInputs";
import Button from "@/components/button";
import Logo from "@/components/logo";
import "@/App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { postData } from "@/api/post_request";
import useFormInput from "@/context/formChange";
import { alertBox } from "@/utils/alert";
import { handleRightClick } from "@/utils/contextMenu";

type LoginProps = {
    username: string,
    password: string
}
const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [viewPwd, setPwd] = useState<boolean>(false);
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
                alertBox({ message: response.data.message, success: true, top: "0", onClose: () => navigate(path ? path : "../anonymous_messages", {replace: true}) })
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

    useEffect(() => {
        document.addEventListener("contextmenu", handleRightClick);

        return () => {
            document.removeEventListener("contextmenu", handleRightClick);
        }
    }, []);
    
    return (
        <div className="w-full no-copy lg:block md:flex overflow-y-auto bg-gradient-body h-screen">
            <section className="flex w-full justify-center items-center py-5">
                <div className="lg:w-[40%] md:w-[70%] w-[90%] h-fit border border-alpha-card-border bg-surface hover:shadow rounded-2xl md:px-10 px-3 py-10 font-inter font-medium">
                    <div className="flex justify-center items-center flex-col mb-3 gap-5">
                        <Logo />
                        <div className="bg-ember p-3 text-scarlet font-bold rounded-full">
                            <ShieldCheck size={28} /> 
                        </div>
                    </div>
                    <div className=" mb-4 text-center flex flex-col gap-3">
                        <p className="md:text-[30px] text-[20px] font-bold text-ash">Login to WhisperBin</p>
                        <p className="text-[16px] text-muted">Securely access your anonymous messaging platform.</p>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={signIn}>
                        <AuthInputs label="Username" type="text" attribute="username" placeholder="Enter Your unique username" onchange={handleRegisterInput} value={formData.username} />
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-[15px] font-semibold text-muted">Password</label>
                            <div className="flex gap-2 w-full border border-alpha-input-border h-10 rounded-md focus:outline-blue-400 focus:outline-1">
                                <input type={viewPwd ? "text" : "password"} name="password" id="password" placeholder="Enter Your password" className="w-[90%] h-10 rounded-md p-2 text-[14px] outline-none text-ash" onChange={handleRegisterInput} value={formData.password} required />
                                <button type="button" className="w-[10%] flex justify-center text-muted items-center" onClick={() => setPwd(!viewPwd)}>{viewPwd ? <EyeClosed /> : <Eye />}</button>
                            </div>
                        </div>
                        <p className="text-[15px] mt-7 text-end text-blaze font-bold">Forgot password?</p>
                        <div className="mt-5 mb-5 flex flex-col gap-4">
                            <Button label={loading ? <div className="flex justify-center items-center gap-1">Logging in...<span className="spinner"/></div> :"Login"} disable={loading ? true : false} buttonType="colored" extraClass="w-full py-2" type="submit" />
                        </div>
                    </form>
                    <div className="text-[14px] space-y-3">
                        <p className="text-muted">Don't have an account yet? <span className="text-blaze font-bold cursor-pointer" onClick={() => navigate("../register")}>Register here</span></p>
                        <p className="text-muted">Your privacy is our priority. Read our <span className="text-blaze font-bold">Privacy Policy.</span></p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;
