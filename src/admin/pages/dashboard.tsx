import { GhostIcon, MessageSquareIcon, User, UserPlus } from "lucide-react";
import MessagesChart from "../component/chart";
import { dashboardData } from "../utils/dataset";
import { useEffect, useState } from "react";
import { getData } from "@/api/get_request";
import { timeFormat } from "@/utils/time";

type StatDataType = {
    day : string
    date : string
    count : number
}

const AdminDashboard = () => {
    const [count, setCount] = useState<{total_anonymous: number, total_users: number, new_users: number, new_anonymous: number}>({
        total_anonymous : 0,
        total_users : 0,
        new_users : 0,
        new_anonymous : 0
    });
    const [recent, setRecent] = useState<{custom_username: string, time_joined: string}[]>([])
    const [stat, setStat] = useState<{new_signups: StatDataType[], new_messages: StatDataType[]}>({
        new_signups: [],
        new_messages: []
    });

    useEffect(() => {
        getData({
            url: "/admin/dashboard",
            onSuccess: (response) => {
                setCount(response.data.statistics);
                setRecent(response.data.recent_users);
                setStat({new_signups: response.data.chart_stat.new_signups, new_messages: response.data.chart_stat.new_messages})
            }
        })
    }, [])
    return (
        <div className="w-full h-[calc(100vh-60px)] overflow-y-auto transition duration-500 md:px-10 px-3 py-5 font-inter md:font-normal font-medium space-y-10">
            <div>
                <h1 className="lg:text-[30px] text-[25px] font-bold text-ember">Admin Dashboard</h1>
                <p className="md:text-[18px] text-scarlet">Monitor and manage messages and spam to ensure a safe and anonymous environment for all users.</p>
            </div>
            <section className="space-y-5 shadow-2xl rounded-2xl md:px-5 px-2 py-5">
                <h2 className="font-bold text-[30px] text-center text-ember">Overview Statistics</h2>
                <div className="w-full *:lg:w-1/4 *:w-full *:p-5 *:space-y-3 flex gap-5 lg:flex-nowrap flex-wrap">
                    <div className="border border-gray-200 rounded-2xl bg-gray-50">
                        <div className="flex justify-between items-center h-[50%]">
                            <p className="font-medium text-[20px] text-gray-600">Total Users</p>
                            <User className="text-blue-500" />
                        </div>
                        <div className="space-y-5 h-[40%]">
                            <b className="text-[20px]">{count.total_users}</b>
                            <p className="text-green-500">+5% last month</p>
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-2xl bg-gray-50">
                        <div className="flex justify-between items-center h-[50%]">
                            <p className="font-medium text-[20px] text-gray-600">Total Anonymous Messages</p>
                            <MessageSquareIcon className="text-purple-500" />
                        </div>
                        <div className="space-y-5 h-[40%]">
                            <b className="text-[20px]">{count.total_anonymous}</b>
                            <p className="text-green-500">+5% last month</p>
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-2xl bg-gray-50">
                        <div className="flex justify-between items-center h-[50%]">
                            <p className="font-medium text-[20px] text-gray-600">New SignUps</p>
                            <UserPlus className="text-yellow-500" />
                        </div>
                        <div className="space-y-5 h-[40%]">
                            <b className="text-[20px]">{count.new_users}</b>
                            <p className="text-red-500">-5% from yesterday</p>
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-2xl bg-gray-50">
                        <div className="flex justify-between items-center h-[50%]">
                            <p className="font-medium text-[20px] text-gray-600">New Anonymous Messages</p>
                            <GhostIcon className="text-amber-950" />
                        </div>
                        <div className="space-y-5 h-[40%]">
                            <b className="text-[20px]">{count.new_anonymous}</b>
                            <p className="text-red-500">-5% from yesterday</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col w-full items-center justify-center shadow-2xl rounded-2xl p-5">
                <h1 className="text-ember font-bold text-[30px]">Statistics Chart</h1>
                <div className="flex lg:flex-row flex-col gap-5 justify-between w-full">
                    <div className="lg:w-[48%] w-full">
                        <MessagesChart key="signup-chart" data={stat.new_signups} type="bar" label="New Signups" />
                    </div>
                    <div className="lg:w-[48%] w-full">
                        <MessagesChart key="message-chart" data={stat.new_messages} type="line" label="Anonymous Messages" />
                    </div>
                </div>
            </section>

            <section className="shadow shadow-alpha-primary-shadow p-5">
                <h2 className="text-center font-bold text-[30px] text-ember">Recent Signups</h2>
                {recent.length > 0 ? recent.map(item => (
                    <div className="flex items-start gap-5" key={item.custom_username}>
                        <div className="h-13 w-0.5 bg-blaze relative">
                            <div className="h-3 w-3 absolute -left-1 rounded-full bg-ember" />
                        </div>
                        <p className="text-scarlet md:text-[18px]">New user @{item.custom_username} just signed up {timeFormat(item.time_joined)}</p>
                    </div>
                )) : <p>No Signup yet</p>}
            </section>
        </div>
    );
}

export default AdminDashboard