import { getData } from "@/api/get_request";
import { postData } from "@/api/post_request";
import Button from "@/components/button";
import ResetLinkModal from "@/components/invalid_link_modal";
import Logo from "@/components/logo"
import useFormInput from "@/context/formChange";
import { alertBox } from "@/utils/alert";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const { formData, handleRegisterInput, setFormData } = useFormInput<{
        username: string
    }>({
        username: ""
    });
    const [loading, setLoading] = useState<boolean>(false);

    const sendUsername = () => {
        setLoading(true);
        getData({
            url: `/auth/get_username?username=${formData.username}`,
            onSuccess: (response) => {
                alertBox({
                    message: response.data.message,
                    success: true,
                    top: "0",
                });
                setFormData({username: ""})
            },
            onError: (error) => {
                if (error?.response?.data?.detail) {
                    alertBox({
                        message: error?.response?.data?.detail,
                        success: false,
                        top: "0",
                    });
                } 
            },
            finallyCallback: () => setLoading(false)
        })
    }
    return (
        <div className="font-inter">
            <section className="flex justify-center items-center h-20 shadow-2xl">
                <Logo />
            </section>
            <section className="h-[calc(100vh-80px)] w-full flex justify-center items-center">
                <div className="lg:w-[35%] md:w-[60%] bg-white w-[90%] md:p-10 px-5 p-1 space-y-5 rounded-2xl shadow-2xl">
                    <h2 className="font-semibold md:text-3xl text-2xl">Forgot Password</h2>
                    <p className="text-gray-700">No worries! Enter your username below and we'll send you a secure link to reset your password.</p>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="font-medium">Username</label>
                        <input type="text" name="username" id="username" placeholder="enter your registered username" className="border border-gray-300 px-1 py-2 rounded-lg" value={formData.username} onChange={handleRegisterInput} />
                    </div>

                    <div className="flex flex-col space-y-5">
                        <Button label={loading ? <div className="flex justify-center items-center gap-1">Sending Reset Link...<span className="spinner"/></div> :"Send Reset Link"} type="button" buttonType="brand" extraClass="py-2 w-full" disable={(formData.username.trim() === "") || (loading) ? true : false} onclick={sendUsername} />
                        <Link to="../login"><Button label={<><ArrowLeft /> Back to Login</>} type="button" extraClass="py-2 w-full flex justify-center items-center text-gray-700" /></Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ForgotPassword;