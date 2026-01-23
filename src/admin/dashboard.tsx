import { GhostIcon, MessageSquareIcon, User, UserPlus } from "lucide-react";

const AdminDashboard = () => {
    return (
        <div className="px-10 py-5 space-y-5 text-gray-600 font-inter">
            <div>
                <h1 className="text-[30px] font-bold">Admin Dashboard</h1>
                <p className="text-[18px]">Monitor and manage messages and spam to ensure a safe and anonymous environment for all users.</p>
            </div>
            <h2 className="font-semibold text-[20px]">Overview Statistics</h2>
            <section className="w-full *:md:w-1/3 *:1/2 *:p-5 *:space-y-3 flex gap-5 lg:flex-nowrap flex-wrap">
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
            </section>
        </div>
    );
}

export default AdminDashboard