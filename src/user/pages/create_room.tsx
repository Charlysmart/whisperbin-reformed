import { getData } from "@/api/get_request";
import { postData } from "@/api/post_request";
import AuthInputs from "@/components/authInputs";
import Button from "@/components/button";
import { SuccessModal } from "@/user/components/success_modal";
import useFormInput from "@/context/formChange";
import { usePreloader } from "@/context/loaderContext";
import { alertBox } from "@/utils/alert";
import { Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
    const { formData, setFormData } = useFormInput<{title : string, display_admin : boolean}>({
        title : "",
        display_admin : false
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [modalInfo, setModalInfo] = useState<{ thread : string, title : string, modal: boolean }>({
        thread : "",
        title : "",
        modal : false
    });
    const { startLoading, stopLoading } = usePreloader();

    const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        setFormData(prev => ({...prev, [name]: name === "display_admin" ? checked : value}))
    }

    async function CreateRoom() {
        setLoading(true);
        await postData({
            url : "pages/create_room",
            data : formData,
            navigate,
            onSuccess : (response) => {
                setModalInfo({
                    thread : response.data.thread,
                    title : response.data.title,
                    modal : true
                })
            },
            onError : (error) => alertBox({ message: error.response.data.detail, success: false, top: "0" }),
            finallyCallback: () => setLoading(false)
        });
    }

    return (
        <div className="flex flex-col gap-5 items-center w-full font-inter px-2 overflow-y-auto md:font-normal font-medium py-10 h-[calc(100vh-15vh)]">
            {modalInfo.modal && <SuccessModal thread={modalInfo.thread} title={modalInfo.title} />}
            <div className="px-5 py-7 shadow-xl shadow-gray-200 rounded-2xl space-y-5 lg:w-[45%] md:w-[70%] w-full">
                <section className="flex flex-col items-center">
                    <h1 className="font-bold lg:text-[30px] md:text-[25px] text-[18px] text-gray-00">Create New Whisperroom</h1>
                    <p className="text-gray-500 lg:text-[15px] md:text-[14px] text-[12px]">Start an anonymous room conversation instantly.</p>
                </section>
                <section className="space-y-5">
                    <AuthInputs label="Whisperroom Name" type="text" attribute="title" placeholder="e.g: Class Bash" value={formData.title} onchange={handleRoomChange} />
                    <div className="flex gap-2">
                        <label htmlFor="admin">I would like to show as admin</label>
                        <input type="checkbox" name="display_admin" id="admin" checked={formData.display_admin} onChange={handleRoomChange} />
                    </div>                 
                    <div className="flex justify-end gap-3">
                        <Button buttonType="outlined" type="reset" label="Clear" onclick={() => setFormData({ title : "", display_admin : false})} extraClass="px-5 py-2 text-gray-600" />
                        <Button buttonType="brand" type="button" label={loading ? <div className="flex justify-center items-center gap-1">Creating Room...<span className="spinner"/></div> :"Create Room"} disable={formData.title.trim() === ""} onclick={CreateRoom} extraClass="px-3 py-2" />
                    </div>
                </section>
            </div>
            <div className="px-5 py-7 lg:w-[45%] md:w-[70%] w-full bg-gray-50 rounded-2xl text-gray-500">
                <h2 className="flex gap-2 mb-5 font-medium"><Shield /> Your Privacy Matters</h2>
                <ul className="list-disc text-[14px] space-y-1">
                    <li>Anonymous conversations.</li>
                    <li>No user accounts or identity tracking.</li>
                    <li>Messages are temporary and automatically deleted after dissolving group.</li>
                    <li>Rooms dissolve after inactivity or when the last user leaves</li>
                </ul>
            </div>
        </div>
    );
}

export default CreateRoom;