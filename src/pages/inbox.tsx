import { Search } from "lucide-react";
import Button from "@/components/button";
import InboxChat from "@/components/inboxChat";

const Inbox = () => {
    return (
        <div className={`bg-blue-50 w-full h-[calc(100vh-60px)] md:px-10 px-3 py-5 font-inter overflow-y-auto space-y-5`}>
            <div>
                <b className="text-[30px] ">Inbox</b>
            </div>
            <div className="w-full flex flex-wrap gap-4">
                <div className="flex lg:w-[85%] w-full h-11 border border-gray-200 overflow-hidden rounded-md">
                    <button className="h-full w-fit p-3">
                        <Search size={16} />
                    </button>
                    <input type="search" placeholder="Search messages..." className="border-none w-full outline-none" />
                </div>
                <div className="flex w-[10%] gap-2 justify-between *:hover:bg-gray-100">
                    <Button label="All" buttonType="outlined" extraClass="w-fit h-full px-4" />
                    <Button label="Unread" buttonType="outlined" extraClass="w-fit h-full px-4" />
                </div>
            </div>
            <div className="space-y-5">
                <InboxChat user="AnonyUser_234" time="1 hour ago" content="I noticed some unusual activity on the Status Feed. Is everything alright? Stay safe." read={true} />
                <InboxChat user="AnonyUser_234" time="1 hour ago" content="I noticed some unusual activity on the Status Feed. Is everything alright? Stay safe." read={false} />
                <InboxChat user="AnonyUser_234" time="1 hour ago" content="I noticed some unusual activity on the Status Feed. Is everything alright? Stay safe." read={false} />
                <InboxChat user="AnonyUser_234" time="1 hour ago" content="I noticed some unusual activity on the Status Feed. Is everything alright? Stay safe." read={true} />
            </div>
        </div>
    );
}

export default Inbox;