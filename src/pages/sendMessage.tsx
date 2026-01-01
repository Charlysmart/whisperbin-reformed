import { postData } from "@/api/post_request";
import AuthInputs from "@/components/authInputs";
import Button from "@/components/button";
import useFormInput from "@/context/formChange";
import { alertBox } from "@/utils/alert";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SendMessage = () => {
    const { username } = useParams();
    const { formData, handleRegisterInput, setFormData } = useFormInput<{username: string, message: string} >({
        username : "",
        message : ""
    });

    useEffect(() => {
        if (username) setFormData(prev => ({...prev, username:username}));
    }, []);

    function sendAnonymous () {
        postData({ url: "/pages/send_anonymous", data: formData, onSuccess: (response) => {
            alertBox({ message: response.data.message, success: true, top: "0" });
            setFormData({
                username : "",
                message : ""
            });
        }, onError: (error) => {
            alertBox({ message: error.response.data.detail, success: false, top: "0" });
        }});
    }

    return (
        <div className={`w-full h-[calc(100vh-60px)] md:px-10 px-3 py-5 font-inter text-gray-600 font-medium overflow-y-auto space-y-5`}>
            <b className="md:text-[30px] text-[18px]">Send Anonymous Message</b>
            <div className="flex justify-center py-5">
                <div className="lg:w-[55%] md:w-[90%] w-full shadow rounded-xl p-5 space-y-5">
                    <p className="text-[16px]">Compose your anonymous message below. Your identity will remain hidden.</p>
                    <div className="flex flex-wrap gap-3 items-end justify-between">
                        <div className="w-full">
                            <AuthInputs type="text" label="Recipient Anonymous Username" attribute="username" placeholder="e.g: secretfriend" value={formData.username} onchange={handleRegisterInput} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-[14px] font-medium">Your Message</label>
                        <textarea name="message" id="message" placeholder="Type your anonymous Message here..." className="w-full border border-gray-300 h-20 rounded-md px-2 text-[14px] focus:border-gray-400 resize-none" onChange={handleRegisterInput} value={formData.message} />
                    </div>
                    <p className="text-[13px] p-2 border border-gray-200 bg-gray-100 rounded-md">Your message will be delivered securely and anonymously. The recipient will not know your identity.</p>
                    <Button label="Send Message" type="submit" buttonType="colored" extraClass="w-full" onclick={sendAnonymous} />
                </div>
            </div>
        </div>
    );
}

export default SendMessage;