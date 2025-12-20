import AuthInputs from "@/components/authInputs";
import Button from "@/components/button";

const SendMessage = () => {
    return (
        <div className={`w-full h-[calc(100vh-60px)] md:px-10 px-3 py-5 font-inter text-gray-600 font-medium overflow-y-auto space-y-5`}>
            <b className="md:text-[30px] text-[18px]">Send Anonymous Message</b>
            <div className="flex justify-center py-5">
                <div className="lg:w-[55%] md:w-[90%] w-full border border-gray-100 rounded-md p-5 space-y-5">
                    <p className="text-[16px]">Compose your anonymous message below. Your identity will remain hidden.</p>
                    <div className="flex flex-wrap gap-3 items-end justify-between">
                        <div className="w-[75%]">
                            <AuthInputs label="Recipient Anonymous Link" attribute="anonymousLink" placeholder="e.g: anonytext.com/secretfriend" />
                        </div>
                        <div className="h-10">
                            <Button label="Select Contact" buttonType="outlined" extraClass="px-3 h-full text-[14px]" />
                        </div>
                    </div>
                    <AuthInputs label="Subject (Optional)" attribute="subject" placeholder="Optional message subject" />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-[14px] font-medium">Your Message</label>
                        <textarea name="message" id="message" placeholder="Type your anonymous Message here..." className="w-full border border-gray-300 h-20 rounded-md px-2 text-[14px] focus:border-gray-400" />
                    </div>
                    <p className="text-[13px] p-2 border border-gray-200 bg-gray-100 rounded-md">Your message will be delivered securely and anonymously. The recipient will not know your identity.</p>
                    <Button label="Send Message" buttonType="colored" extraClass="w-full" />
                </div>
            </div>
        </div>
    );
}

export default SendMessage;