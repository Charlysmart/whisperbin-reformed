import { ArrowLeft, Lock, User } from "lucide-react";
import { InteractionStats, UserInfo } from "@/components/statusComponent";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Button from "@/components/button";
import { CommentType } from "@/utils/types";

const Comment = ({ username, time, comment, likes, comments, liked, left } : CommentType) => {
    return(
        <div className="flex justify-end w-full">
            <div className="flex justify-end gap-3 mb-7" style={{width : `${left}%`, minWidth: "85%",}}>
                <div className="bg-gray-200 p-2 rounded-full w-fit h-fit">
                    <User aria-hidden="true" />
                </div>
                <div className="space-y-3 w-full">
                    <div className="bg-gray-50 md:p-5 p-3 rounded-2xl space-y-3">
                        <div className="text-gray-600 flex md:flex-row flex-col justify-between">
                            <h1 className="md:text-[18px] text-[16px] font-semibold">{username}</h1>
                            <p className="text-[14px]">{time}</p>
                        </div>
                        <p className="md:text-[16px] text-[15px]">{comment}</p>
                    </div>
                    <InteractionStats likes={likes} comments={comments} liked={liked} />                                
                </div>
            </div>
        </div>
    )
}
const ViewStatus = () => {
    return (
        <div className={`bg-gray-50 w-full flex flex-col gap-10 text-gray-600 items-center md:px-0 px-2 py-5 h-[calc(100vh-60px)] font-inter font-medium overflow-y-auto border-t border-gray-100 *:md:w-[80%] *:w-full`}>
            <div className="flex text-gray-500 text-[16px] font-semibold hover:text-blue-500 cursor-pointer">
                <ArrowLeft /> Back to Status Feed
            </div>
            <div className="bg-white shadow-xl text-gray-700 w-full rounded-2xl md:p-6 py-6 px-3 space-y-5">
                <UserInfo username="@anonymous_3425" time="3 hours ago" />
                <p className="md:text-[18px] text-[16px]">Just sent my first anonymous message! Feeling empowered by the privacy AnonyText offers. This platform is amazing for sharing thoughts without judgment.</p>
                <hr className="border-gray-200" />
                <InteractionStats likes={3} comments={5} liked={true} />
            </div>
            
            <div className="bg-white shadow-xl w-full text-gray-700 rounded-2xl md:p-6 py-6 px-3 space-y-5">
                <h1 className="flex gap-3 font-bold text-[24px] items-center"><ChatBubbleLeftRightIcon className="text-blue-500 h-6 w-6" /> Comments</h1>
                <form className="space-y-5">
                    <div className="w-full flex gap-5">
                        <div className="bg-gray-200 w-fit h-fit p-2 rounded-full">
                            <User size={30} aria-hidden="true" />
                        </div>
                        <textarea placeholder="Share your thoughts anonymously..." className="w-full h-20 border-2 border-gray-400 rounded-xl md:text-[16px] text-[12px] p-3 resize-none outline-blue-500"/>
                    </div>
                    <div className="flex md:justify-between justify-center flex-wrap gap-2">
                        <div className="text-gray-700 md:text-[14px] text-[13px] flex items-center gap-1">
                            <Lock size={16} />
                            <p>Your comment will be posted anonymously</p>
                        </div>
                        <div>
                            <Button label="Post Comment" buttonType="colored" extraClass="px-4 shadow-2xl shadow-blue-200 md:text-[16px] text-[14px]" />
                        </div>
                    </div>
                </form>
                <hr className="border-gray-200" />
                <div className="w-full">
                    <Comment username="@anonymous_2334" time="1 hour ago" comment="I completely agree! Anonymity allows us to be vulnerable without fear of judgment. It's like having a conversation with your most honest self reflected back at you through others." likes={2} comments={1} liked={true} left={100} />
                    <Comment username="@anonymous_2334" time="1 hour ago" comment="Exactly! It's liberating in a way. We can express opinions we might otherwise keep to ourselves." likes={1} comments={0} liked={true} left={90} />
                    <Comment username="@anonymous_2334" time="1 hour ago" comment="Not sure I agree completely. Sometimes knowing who you're talking to builds trust and accountability. Anonymity can be a double-edged sword." likes={2} comments={0} liked={false} left={100} />
                </div>
            </div>
        </div>
    );
}

export default ViewStatus