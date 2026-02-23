import { getData } from "@/api/get_request";
import { postData } from "@/api/post_request";
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
            onSuccess: (response) => {
                if (response.data) setRooms(response.data.rooms)
            },
            onError: (error) => alertBox({ message: error?.response?.data?.detail, success: false, top: "0" }), finallyCallback: () => stopLoading()
        });
    }, []);

    return (
        <div className="bg-void text-ash flex justify-center h-[calc(100vh-60px)] gap-5 items-center w-full font-inter md:font-normal font-medium py-10">
            <div className="bg-surface border border-alpha-card-border px-5 py-7 shadow-xl shadow-alpha-secondary rounded-2xl space-y-5 lg:w-[45%] md:w-[70%] w-full">
                <section className="flex flex-col items-center">
                    <h1 className="font-bold lg:text-[30px] md:text-[25px] text-[18px] text-gray-00">Join Whisperroom</h1>
                    <p className="text-muted lg:text-[15px] md:text-[14px] text-[13px]">Enter the Room ID to connect anonymously</p>
                </section>
                <section className="space-y-5">
                    <div className="flex border border-alpha-input-border bg-surface-alt text-gray-500 items-center w-full gap-2 px-2 py-1 rounded-lg">
                        <Link size={16} className="text-muted" />
                        <input type="text" name="roomId" placeholder="Room ID" id="roomId" className="w-full outline-0  text-ash placeholder:text-muted" onChange={handleRoomChange} />
                    </div>
                    <div className="w-full gap-3">
                        <button type="button" disabled={formData !== "" ? false : true} onClick={JoinRoom} className="bg-gradient-btn disabled:bg-muted disabled:text-ash disabled:cursor-not-allowed text-white font-medium rounded-md px-3 py-2 w-full">
                            {loading ? <div className="flex justify-center items-center gap-1">Joining Room...<span className="spinner"/></div> :"Join Room"}
                        </button>
                                
                    </div>
                        {rooms.length >= 1 && 
                            <div className="border space-y-3 p-2 rounded-2xl bg-surface-alt border-alpha-card-border">
                                {rooms.map(item => (
                                    <div className="flex justify-between items-center-safe" key={item.room_thread}>
                                        <p className="text-ash">{item.room_name}</p>
                                        <Button label="Enter Room" type="button" extraClass="px-3 py-2 text-ash border border-blaze" onclick={() => navigate(`../whisperroom/${item.room_thread}`)} />
                                    </div>
                                ))}
                            </div>
                        }
                    <div className="w-full flex justify-center">
                        <p className="text-[12px] md:w-[80%] w-full text-center text-muted">WhisperBin rooms are temporary. They dissolve after a period of inactivity or when last user leaves. All messages are deleted, ensuring complete anonymity.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default JoinRoom;