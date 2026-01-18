import { getData } from "@/api/get_request";
import { postData } from "@/api/post_request";
import AuthInputs from "@/components/authInputs";
import Button from "@/components/button";
import useFormInput from "@/context/formChange";
import { usePreloader } from "@/context/loaderContext";
import { alertBox } from "@/utils/alert";
import { Link } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type JoinedRooms = {
    room_name: string, 
    room_thread: string
}

const JoinRoom = () => {
    const { formData, setFormData } = useFormInput<string>("");
    const [ rooms, setRooms ] = useState<JoinedRooms[]>([]);

    const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData(prev => (value.trim()));
    }
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const { startLoading, stopLoading } = usePreloader();

    async function JoinRoom() {
        setLoading(true);
        await postData({
            url : "pages/join_room",
            data : {thread : formData},
            navigate,
            onSuccess : (response) => {
                alertBox({ message: response.data.message, success: true, top: "0", onClose: () => navigate(`../whisperroom/${formData}`) })
                setTimeout(() => {
                    navigate(`../whisperroom/${formData}`);
                }, 5100)
            },
            onError : (error) => alertBox({ message: error.response.data.detail, success: false, top: "0" }),
            finallyCallback: () => setLoading(false)
        });
    }

    useEffect(() => {
        startLoading();
        getData({ 
            url: "/pages/joined_rooms",
            navigate,
            onSuccess: (response) => setRooms(response.data.rooms),
            onError: (error) => alertBox({ message: error?.response?.data?.detail, success: false, top: "0" }), finallyCallback: () => stopLoading()
        });
    }, []);

    return (
        <div className="flex justify-center h-[calc(100vh-15vh)] gap-5 items-center w-full font-inter md:font-normal font-medium py-10">
            <div className="px-5 py-7 shadow-xl shadow-gray-200 rounded-2xl space-y-5 lg:w-[45%] md:w-[70%] w-full">
                <section className="flex flex-col items-center">
                    <h1 className="font-bold lg:text-[30px] md:text-[25px] text-[18px] text-gray-00">Join Whisperroom</h1>
                    <p className="text-gray-500 lg:text-[15px] md:text-[14px] text-[13px]">Enter the Room ID to connect anonymously</p>
                </section>
                <section className="space-y-5">
                    <div className="flex border border-gray-300 text-gray-500 items-center w-full gap-2 px-2 py-1 rounded-lg">
                        <Link size={16} color="gray" />
                        <input type="text" name="roomId" placeholder="Room ID" id="roomId" className="w-full outline-0" onChange={handleRoomChange} />
                    </div>
                    <div className="flex w-full gap-3">
                        <Button buttonType="brand" type="button"  label={loading ? <div className="flex justify-center items-center gap-1">Joining Room...<span className="spinner"/></div> :"Join Room"} disable={formData !== "" ? false : true} onclick={JoinRoom} extraClass="px-3 py-2 w-full" />
                    </div>
                    <div className="border space-y-3 p-2 rounded-2xl border-gray-200">
                        {rooms && rooms.map(item => (
                            <div className="flex justify-between items-center-safe" key={item.room_thread}>
                            <p className="text-gray-800">{item.room_name}</p>
                            <Button label="Enter Room" type="button" buttonType="outlined" extraClass="px-3 py-2 text-gray-800" onclick={() => navigate(`../whisperroom/${item.room_thread}`)} />
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex justify-center">
                        <p className="text-[12px] md:w-[80%] w-full text-center text-gray-500">WhisperBin rooms are temporary. They dissolve after a period of inactivity or when last user leaves. All messages are deleted, ensuring complete anonymity.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default JoinRoom;