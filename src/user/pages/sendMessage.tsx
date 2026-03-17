import { getData } from "@/api/get_request";
import { postData } from "@/api/post_request";
import AuthInputs from "@/components/authInputs";
import Button from "@/components/button";
import useFormInput from "@/context/formChange";
import { usePreloader } from "@/context/loaderContext";
import { alertBox } from "@/utils/alert";
import { handleRightClick } from "@/utils/contextMenu";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

const SendMessage = () => {
    const { username } = useParams();
    const [loading, setLoading] = useState<Boolean>(false);
    const { formData, handleRegisterInput, setFormData } = useFormInput<{username: string, content: string, be_replied: boolean} >({
        username : "",
        content : "",
        be_replied : true
    });
    const { startLoading, stopLoading } = usePreloader();
    const navigate = useNavigate();

    useEffect(() => {
        startLoading();
        getData({ url: "/pages/general", navigate, onError: (error) => {
            alertBox({ message: error.response.data.detail, success: false, top: "0" });
            }, finallyCallback: () => stopLoading()
        });

        if (username) setFormData(prev => ({...prev, username:username}));

        document.addEventListener("contextmenu", handleRightClick);

        return () => {
            document.removeEventListener("contextmenu", handleRightClick);
        }
    }, []);

    async function sendAnonymous () {
        setLoading(true)
        await postData({ url: "/pages/send_anonymous", data: formData, onSuccess: (response) => {
            alertBox({ message: response.data.message, success: true, top: "0" });
            setFormData({
                username : "",
                content : "",
                be_replied : true
            });
        }, onError: (error) => {
            alertBox({ message: error.response.data.detail, success: false, top: "0" });
        }, finallyCallback: () => {
            setLoading(false);
        }
        });
    }

    return (
        <>
            <Helmet>
                <title>Send Anonymous Message to {username} — WhisperBin</title>

                <meta
                name="description"
                content={`Send anonymous messages to ${username} on WhisperBin.`}
                />

                <link rel="canonical" href={`${import.meta.env.VITE_SITE_URL}/send_message`} />

                {/* Open Graph */}
                <meta property="og:title" content={`Send Anonymous Message to ${username}`} />
                <meta
                property="og:description"
                content={`Drop an anonymous message for ${username} on WhisperBin.`}
                />
                <meta property="og:image" content={`${import.meta.env.VITE_SITE_URL}/images/unnamed.png`} />
                <meta property="og:url" content={`${import.meta.env.VITE_SITE_URL}/send_message/${username}`} />

                {/* Twitter */}
                <meta name="twitter:title" content={`Send Anonymous Message to ${username}`} />
                <meta
                name="twitter:description"
                content={`Send a secret message to ${username} anonymously.`}
                />
                <meta name="twitter:image" content={`${import.meta.env.VITE_SITE_URL}/images/unnamed.png`} />
            </Helmet>

            <div className={`w-full no-copy h-[calc(100vh-60px)] bg-surface-alt md:px-10 px-3 py-5 font-inter text-ash md:font-normal font-medium overflow-y-auto space-y-5`}>
                <b className="md:text-[30px] text-[18px]">Send Anonymous Message</b>
                <div className="flex justify-center py-5">
                    <div className="lg:w-[55%] md:w-[90%] w-full shadow shadow-alpha-primary-shadow rounded-xl p-5 space-y-5">
                        <p className="text-[16px]">Compose your anonymous message below. Your identity will remain hidden.</p>
                        <div className="flex flex-wrap gap-3 items-end justify-between">
                            <div className="w-full">
                                <AuthInputs type="text" label="Recipient Anonymous Username" attribute="username" placeholder="e.g: secretfriend" value={formData.username.toLowerCase()} onchange={handleRegisterInput} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-[14px] font-medium">Your Message</label>
                            <textarea name="content" id="content" placeholder="Type your anonymous Message here..." className="w-full border border-alpha-input-border h-20 rounded-md px-2 text-[14px] bg-surface focus:border-alpha-secondary-border resize-none" onChange={handleRegisterInput} value={formData.content} />
                        </div>
                        <div className="flex gap-2 items-center-safe">
                            <label htmlFor="message" className="text-[14px] font-medium">Do you wish to be replied?</label>
                            <input type="checkbox" name="be_replied" id="be_replied" className="checked:accent-scarlet" checked={formData.be_replied} onChange={() => setFormData(prev => ({...prev, be_replied: !formData.be_replied}))} />
                        </div>
                        <p className="text-[13px] p-2 bg-muted rounded-md">Your message will be delivered securely and anonymously. The recipient will not know your identity.</p>
                        <Button label={loading ? <div className="flex justify-center items-center gap-1">Sending...<span className="spinner"/></div> :"Send Message"} disable={loading ? true : formData.username.trim() === "" || formData.content.trim() === "" ? true :  false} type="submit" buttonType="brand" extraClass="w-full py-2" onclick={sendAnonymous} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SendMessage;