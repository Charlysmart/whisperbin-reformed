import AuthInputs from "@/components/authInputs";
import Button from "@/components/button";
import Logo from "@/components/logo";
import { useEffect, useState } from "react";
import { SignUpTypes } from "@/utils/types";
import { alertBox } from "@/utils/alert";
import { useNavigate } from "react-router-dom";
import { postData } from "@/api/post_request";
import useFormInput from "@/context/formChange";
import { Eye, EyeClosed } from "lucide-react";
import { handleRightClick } from "@/utils/contextMenu";
import SEO from "@/components/seo";

const Register = () => {
    const [viewPwd, setPwd] = useState<{psd: boolean, cpsd: boolean}>({
        psd: false,
        cpsd: false
    });
    const {formData, handleRegisterInput} = useFormInput<SignUpTypes>({
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    });
    const [loading, setLoading] = useState<Boolean>(false);

    const navigate = useNavigate();

    const signUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        postData({
            url: "/auth/signup", 
            data: formData, 
            onSuccess: (response) => {
                alertBox({ message: response.data.message, success: true, top: "0", onClose: () => navigate("../login", {replace: true})})
            },
            onError: (error) => {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 422) {
                        alertBox({ message: error.response.data.detail[0].msg, success: false, top: "0" });
                    } else {
                        alertBox({ message: error.response.data.detail, success: false, top: "0" });
                    }
                } else {
                    console.log(error.message);
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
        <>
            <SEO 
                title="Create Account — WhisperBin"
                description="Sign up on WhisperBin to receive anonymous messages, chat privately, and connect without revealing your identity."
                url={`${import.meta.env.VITE_SITE_URL}/register`}
            />
            <div className="w-full no-copy lg:block md:flex overflow-y-auto h-screen bg-gradient-body">
                <section className="flex w-full justify-center items-center py-5">
                    <div className="lg:w-[40%] md:w-[70%] w-[90%] h-fit border border-alpha-card-border bg-surface hover:shadow rounded-2xl md:px-10 px-3 py-10 font-inter font-medium">
                        <div className="flex justify-center mb-3">
                            <Logo />
                        </div>
                        <p className="md:text-[24px] text-[18px] mb-4 text-center text-ash">Create Your Anonymous Account</p>

                        <form className="flex flex-col gap-5" onSubmit={signUp}>
                            <AuthInputs type="text" label="Anonymous Handle" attribute="username" placeholder="Enter your unique username" value={formData.username} onchange={handleRegisterInput} />
                            <AuthInputs type="text" label="E-mail" attribute="email" placeholder="Enter your email" value={formData.email} onchange={handleRegisterInput} />
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password" className="text-[15px] font-semibold text-muted">Password</label>
                                <div className="flex gap-2 w-full border border-alpha-input-border h-10 rounded-md focus:outline-blue-400 focus:outline-1">
                                    <input type={viewPwd.psd ? "text" : "password"} name="password" id="password" placeholder="Enter Your password" className="w-[90%] h-10 rounded-md p-2 text-[14px] outline-none text-ash" onChange={handleRegisterInput} value={formData.password} required />
                                    <button type="button" className="w-[10%] flex justify-center text-muted items-center" onClick={() => setPwd(prev => ({...prev, psd: !prev.psd}))}>{viewPwd.psd ? <EyeClosed /> : <Eye />}</button>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password" className="text-[15px] font-semibold text-muted">Confirm Password</label>
                                <div className="flex gap-2 w-full border border-alpha-input-border h-10 rounded-md focus:outline-blue-400 focus:outline-1">
                                    <input type={viewPwd.cpsd ? "text" : "password"} name="confirm_password" id="confirm_password" placeholder="Confirm your password" className="w-[90%] h-10 rounded-md p-2 text-[14px] outline-none text-ash" onChange={handleRegisterInput} value={formData.confirm_password} required />
                                    <button type="button" className="w-[10%] flex justify-center items-center text-muted" onClick={() => setPwd(prev => ({...prev, cpsd: !prev.cpsd}))}>{viewPwd.cpsd ? <EyeClosed /> : <Eye />}</button>
                                </div>
                            </div>
                            
                            <p className="md:text-[14px] text-[14px] mt-2 text-center text-muted">Your privacy is our priority. We handle your data with utmost care.</p>
                            <div className="mt-5 flex flex-col gap-4">
                                <Button label={loading ? <div className="flex justify-center items-center gap-1">Registering...<span className="spinner"/></div> :"Register"} disable={loading ? true : false} buttonType="colored" extraClass="w-full py-2" type="submit" />
                                <Button label="Already have an account? Login" type="button" buttonType="outlined" extraClass="w-full py-2" onclick={() => navigate("../login")} />
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Register;