import { GhostIcon, MessageSquareIcon, User, UserPlus } from "lucide-react";
import MessagesChart from "../component/chart";
import { dashboardData } from "../utils/dataset";

const AdminDashboard = () => {
    return (
        <div className="w-full h-[calc(100vh-60px)] overflow-y-auto transition duration-500 md:px-10 px-3 py-5 font-inter md:font-normal font-medium space-y-5">
            <div>
                <h1 className="lg:text-[30px] text-[25px] font-bold text-ember">Admin Dashboard</h1>
                <p className="md:text-[18px] text-scarlet">Monitor and manage messages and spam to ensure a safe and anonymous environment for all users.</p>
            </div>
            <section className="space-y-5 shadow-2xl rounded-2xl md:px-5 px-2 py-5">
                <h2 className="font-bold text-[30px] text-center text-ember">Overview Statistics</h2>
                <div className="w-full *:lg:w-1/4 *:w-full *:p-5 *:space-y-3 flex gap-5 lg:flex-nowrap flex-wrap">
                    <div className="border border-gray-200 rounded-2xl bg-gray-50">
                        <div className="flex justify-between items-center">
                            <p className="font-medium text-[20px] text-gray-600">Total Users</p>
                            <User className="text-blue-500" />
                        </div>
                        <div className="space-y-5">
                            <b className="text-[20px]">12,345</b>
                            <p className="text-green-500">+5% last month</p>
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-2xl bg-gray-50">
                        <div className="flex justify-between items-center">
                            <p className="font-medium text-[20px] text-gray-600">Total Messages</p>
                            <MessageSquareIcon className="text-purple-500" />
                        </div>
                        <div className="space-y-5">
                            <b className="text-[20px]">12,345</b>
                            <p className="text-green-500">+5% last month</p>
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-2xl bg-gray-50">
                        <div className="flex justify-between items-center">
                            <p className="font-medium text-[20px] text-gray-600">New SignUps</p>
                            <UserPlus className="text-yellow-500" />
                        </div>
                        <div className="space-y-5">
                            <b className="text-[20px]">12,345</b>
                            <p className="text-red-500">-5% from yesterday</p>
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-2xl bg-gray-50">
                        <div className="flex justify-between items-center">
                            <p className="font-medium text-[20px] text-gray-600">Anonymous Messages</p>
                            <GhostIcon className="text-amber-950" />
                        </div>
                        <div className="space-y-5">
                            <b className="text-[20px]">12,345</b>
                            <p className="text-red-500">-5% from yesterday</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col w-full items-center justify-center shadow-2xl rounded-2xl p-5">
                <h1 className="text-ember font-bold text-[30px]">Statistics Chart</h1>
                <div className="flex lg:flex-row flex-col gap-5 justify-between w-full">
                    <div className="lg:w-[48%] w-full">
                        <MessagesChart data={dashboardData} type="bar" label="New Signups" />
                    </div>
                    <div className="lg:w-[48%] w-full">
                        <MessagesChart data={dashboardData} type="line" label="Anonymous Messages" />
                    </div>
                </div>
            </section>

            <section className="shadow shadow-alpha-primary-shadow p-5">
                <h2 className="text-center font-bold text-[30px] text-ember">Recent Signups</h2>
                <div className="flex items-start gap-5">
                    <div className="h-13 w-0.5 bg-blaze relative">
                        <div className="h-3 w-3 absolute -left-1 rounded-full bg-ember" />
                    </div>
                    <p className="text-scarlet md:text-[18px]">New user @whisperuser5674 just signed up 5 mins ago</p>
                </div>
                <div className="flex items-start gap-5">
                    <div className="h-13 w-0.5 bg-blaze relative">
                        <div className="h-3 w-3 absolute -left-1 rounded-full bg-ember" />
                    </div>
                    <p className="text-scarlet md:text-[18px]">New user @whisperuser5674 just signed up 5 mins ago</p>
                </div>
            </section>
        </div>
    );
}

export default AdminDashboard