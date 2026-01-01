import { Image, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { InteractionStats, UserInfo } from "@/components/statusComponent";
import Button from "@/components/button";
import { getData } from "@/api/get_request";
import { useNavigate } from "react-router-dom";
import { usePreloader } from "@/context/loaderContext";

const StatusFeed = () => {
    const filePicker = useRef<HTMLInputElement | null>(null);
    const [image, setImage] =useState<File | null>(null);
    const { startLoading, stopLoading } = usePreloader();
    const navigate = useNavigate();

    const openFIle = () => {
        if (filePicker.current) filePicker.current.click();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setImage(file)
        }
    }

    async function fetchStatusData() {
        startLoading();

        getData({url: "/pages/dashboard", navigate, onError: (error) => console.log(error), finallyCallback: () => stopLoading()})
    }

    useEffect(() => {
        fetchStatusData();
    }, []);
    return (
        <div className={`bg-gray-50 w-full h-[calc(100vh-60px)] md:px-10 px-2 py-5 font-inter text-gray-600 font-medium overflow-hidden border-t border-gray-100 flex`}>
            <div className="lg:w-[70%] w-full overflow-y-auto no-scrollbar">
                <div className="shadow-md shadow-gray-200 bg-white rounded-md md:p-6 py-6 px-3 space-y-5">
                    <div className="flex gap-3">
                        <div className="avatar-gradient p-2 rounded-full w-fit h-fit">
                            <User color="white" className="user" />
                        </div>
                        <input type="text" name="thought" id="thought" placeholder="Share your anonymous thoughts..." className="border border-gray-200 rounded-md w-full text-[14px] px-3" />
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between items-end">
                        <div className="space-y-5">
                            <div className="flex gap-3 items-center cursor-pointer" onClick={openFIle}>
                                <Image size={16} /> 
                                <p className="text-[16px]">Image</p>
                            </div>
                            <input type="file" name="image" id="image" ref={filePicker} onChange={handleChange} className="hidden" />
                            {image && <div className="w-30 h-25">
                                <img src={image ? URL.createObjectURL(image) : ""} alt={image ? URL.createObjectURL(image) : ""} className="w-full h-full object-contain" />
                            </div>}
                        </div>
                        <Button label="Post" buttonType="colored" extraClass="px-4 md:text-[16px] text-[12px]" />
                    </div>
                </div>

                <div className="flex mt-5 gap-3 text-[16px]">
                    <button className="py-2 px-4 rounded-md">Recent</button>
                    <button className="py-2 px-4 rounded-md">Popular</button>
                </div>

                <div className="space-y-5">
                    <div className="border border-border bg-card rounded-lg p-6 space-y-5">
                        <UserInfo username="@anonymous_3464" time="4 hours ago" />
                        <div>
                            <p>Just sent my first anonymous message! Feeling empowered by the privacy AnonyText offers. This platform is amazing for sharing thoughts without judgment.</p>
                        </div>
                        <hr className="border-gray-200" />
                        <InteractionStats likes={102} comments={453} liked={true} />
                    </div>
                    
                    <div className="border border-gray-200 bg-card rounded-lg p-6 space-y-5">
                        <UserInfo username="@anonymous_4564" time="1 hours ago" />
                        <div>
                            <p>Just sent my first anonymous message! Feeling empowered by the privacy AnonyText offers. This platform is amazing for sharing thoughts without judgment.</p>
                        </div>
                        <div className="flex justify-center">
                            <img src="" alt="" className="border md:w-1/2 w-full h-72"/>
                        </div>
                        <hr className="border-gray-200" />
                        <InteractionStats likes={32} comments={16} liked={false} />
                    </div>                    
                </div>
            </div>
            <div className="w-[30%] lg:flex flex-col hidden items-center gap-5">
                <div className="w-[85%] border border-gray-200 bg-white rounded-md p-3 space-y-2">
                    <h1>Trending Topics</h1>
                    <div className="text-[14px] space-y-2 *:flex *:justify-between">
                        <p><span className="text-blue-500">#health&wellbeing</span><span className="text-gray-600">123 posts</span></p>
                        <p><span className="text-blue-500">#addiction</span><span className="text-gray-600">75 posts</span></p>
                        <p><span className="text-blue-500">#addiction</span><span className="text-gray-600">154 posts</span></p>
                        <p><span className="text-blue-500">#domesticviolence</span><span className="text-gray-600">13 posts</span></p>
                    </div>
                </div>
                <div className="w-[85%] border border-gray-200 bg-white rounded-md p-3 space-y-2">
                    <h1>Stay Anonymous & Safe</h1>
                    <div className="text-[14px] text-gray-600">
                        Our community thrives on respect and anonymity. Please familiarize yourself with our guidelines to ensure a positive experience for everyone.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatusFeed;