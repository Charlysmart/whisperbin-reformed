import Button from "@/components/button";
import { NotificationBlockType } from "@/utils/types";
import { Clock, Heart, Mail, MessageCircle, Reply, ReplyAll } from "lucide-react";

const NotificationBlock = ({ read, type, content, time, linkText } : NotificationBlockType) => {
    const iconMap = {
        comment: MessageCircle,
        message: Mail,
        like: Heart,
        "comment reply": Reply,
        default: ReplyAll,
    };

        const Icon = iconMap[type] || iconMap.default;
    return (
        <div className={`md:px-5 px-3 py-3 border-l-4 ${read ? "border-gray-500 bg-white" : "border-blue-500 bg-blue-50"} w-full h-fit rounded-2xl flex gap-5 hover:shadow-xl text-gray-600`}>
            <div className={`${read ? "bg-gray-200" : "bg-blue-500"} h-fit w-fit md:p-3 p-2 rounded-full`}>
                <Icon fill={read ? "gray" : "white"} color={read ? "gray" : "white"} />
            </div>
            <div className="space-y-3">
                <h3 className="font-semibold md:text-[18px] text-[16px]">
                    {type === "comment" ? "Someone commented on your status post" 
                    : type === "message" ? "You received a new anonymous message" 
                    : type === "like" ? "Someone liked your status post" 
                    : type === "comment-reply" ? "Someone replied to your anonymous message" 
                    : "Someone replied to your comment"}
                </h3>
                <p className="md:text-[16px] text-[15px]">
                    {type === "message" ? "Someone sent you a message via your anonymous link" 
                    : type === "reply" ? "Check your messages to continue the conversation" 
                    : content}
                </p>
                <p className="md:text-[14px] text-[13px] flex flex-wrap gap-2"><Clock size={16} /> {time} <span className="text-blue-500">{linkText}</span></p>
            </div>
        </div>
    )
}

const Notification = () => {
    return (
        <div className="bg-gray-50 w-full h-[calc(100vh-60px)] flex justify-center md:px-10 px-3 py-5 font-inter font-medium overflow-y-auto">
            <section className="md:w-[80%] w-full space-y-5">
                <div>
                    <b className="text-[30px] ">Notifications</b>
                </div>
                <div className="w-full flex flex-wrap gap-4">
                    <div className="flex md:gap-2 justify-between *:hover:bg-gray-100">
                        <Button label="All" buttonType="colored" extraClass="w-fit h-full px-4 py-2 border-0" />
                        <Button label="Unread" extraClass="w-fit h-full px-4 py-2 border-0" />
                        <Button label="Posts" extraClass="w-fit h-full px-4 py-2" />
                    </div>
                </div>
                <div className="space-y-5 cursor-pointer">
                    <NotificationBlock read={false} time="2 minutes ago" type="message" linkText="View Message"  />
                    <NotificationBlock read={true} time="30 minutes ago" type="comment" content="I completely agree with you on this..." linkText="View Comment"  />
                </div>
            </section>
        </div>
    );
}

export default Notification;