import { getData } from "@/api/get_request";
import Button from "@/components/button";
import Logo from "@/components/logo"
import VerifyPreloader from "@/components/verify_preloader";
import ResetLinkModal from "@/components/invalid_link_modal";
import { ArrowLeft, Eye, EyeClosed, Info, Lock } from "lucide-react"
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { postData } from "@/api/post_request";
import useFormInput from "@/context/formChange";
import { alertBox } from "@/utils/alert";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [state, setState] = useState<{success : boolean, loading : boolean, sending : boolean}>({
        success : null,
        loading : false,
        sending : false
    });
    const [viewPwd, setPwd] = useState<{psd: boolean, cpsd: boolean}>({
        psd: false,
        cpsd: false
    });

    const { formData, handleRegisterInput, setFormData } = useFormInput<{
        password: string,
        confirm_password: string
    }>({
        password: "",
        confirm_password: ""
    });
    const navigate = useNavigate();

    const changePassword = () => {
        setState(prev => ({...prev, sending: true}))
        postData({
            url: `/auth/reset_password?token=${token}`,
            data: formData,
            onSuccess: (response) => {
                alertBox({
                    message: response.data.message,
                    success: true,
                    top: "0",
                    onClose: () => navigate("../login")
                });
                setFormData({password: "", confirm_password: ""});
            },
            onError: (error) => {
                const status = error.response.status;
                if (status === 422) {
                    alertBox({ 
                        message: error.response.data.detail[0].msg, 
                        success: false, 
                        top: "0"
                    });
                } else {
                    alertBox({
                        message: error?.response?.data?.detail,
                        success: false,
                        top: "0",
                    });
                }
            },
            finallyCallback: () => setState(prev => ({...prev, sending: false}))
        })
    }

    useEffect(() => {
        setState(prev => ({...prev, loading: true}))
        getData({
            url: `/auth/check_otp?token=${token}`,
            onSuccess: () => {
                setState(prev => ({...prev, success: true}))
            },
            onError: () => setState(prev => ({...prev, success: false})),
            finallyCallback: () => setState(prev => ({...prev, loading: false}))
        });
    }, []);

    if (state.success === null) return <VerifyPreloader />
    if (state.loading) return <VerifyPreloader />
    if (!state.success) return <ResetLinkModal />
    else 
    return (
        <div className="font-inter">
            <section className="md:flex hidden justify-center items-center h-[60px] shadow-2xl">
                <Logo />
            </section>
            <section className="md:h-[calc(100vh-60px)] h-screen overflow-y-auto w-full flex justify-center items-center">
                <div className="lg:w-[35%] md:w-[60%] w-[90%] md:p-10 px-5 p-1 space-y-5 rounded-2xl shadow-2xl">
                    <h2 className="font-semibold md:text-3xl text-xl">Reset Your Password</h2>
                    <span className="flex text-[16px] text-red-700 gap-2 items-center"><Info size={16} /> Reset links expires in 15 minutes.</span>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-medium text-gray-700">New Password</label>
                        <div className="flex items-center justify-between border border-gray-300 rounded-xl">
                            <Lock className="w-[10%] text-gray-500" />
                            <input type={viewPwd.psd ? "text" : "password"} name="password" id="password" placeholder="Enter your new password" className="px-1 py-3 rounded-lg w-[80%] outline-0" value={formData.password} onChange={handleRegisterInput} />
                            <button className="w-[10%] flex justify-center text-gray-500" onClick={() => setPwd(prev => ({...prev, psd: !prev.psd}))}>{viewPwd.psd ? <EyeClosed /> : <Eye />}</button>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmPassword" className="font-medium text-gray-700">Confirm New Password</label>
                        <div className="flex items-center justify-between border border-gray-300 rounded-xl">
                            <Lock className="w-[10%] text-gray-500" />
                            <input type={viewPwd.cpsd ? "text" : "password"} name="confirm_password" id="confirmPassword" placeholder="Re-enter your password" className="px-1 py-3 rounded-lg w-[80%] outline-0" value={formData.confirm_password} onChange={handleRegisterInput} />
                            <button className="w-[10%] flex justify-center text-gray-500"onClick={() => setPwd(prev => ({...prev, cpsd: !prev.cpsd}))}>{viewPwd.cpsd ? <EyeClosed /> : <Eye />}</button>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-5">
                        <Button label={state.sending ? <div className="flex justify-center items-center gap-1">Resetting Password...<span className="spinner"/></div> : "Reset Password"} type="button" buttonType="brand" extraClass="py-2 w-full" onclick={changePassword} />
                        <Link to="../forgot_password"><Button label={<><ArrowLeft /> Back to Forgot Password</>} type="button" extraClass="py-2 w-full flex justify-center items-center text-gray-700" /></Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ResetPassword;