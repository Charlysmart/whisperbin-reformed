import { getData } from "@/api/get_request"
import { usePreloader } from "@/context/loaderContext"
import { alertBox } from "@/utils/alert"
import type { UserType } from "@/utils/types"
import { Search, Trash } from "lucide-react"
import { useEffect, useState } from "react"

const Users = () => {
    const [data, setData] = useState<{users: UserType[], count: number}>({
        users: [],
        count: 0
    });

    const { startLoading, stopLoading } = usePreloader();

    const [meta, setMeta] = useState<{page: number, filter: string, order: string, current_page: number}>({
        page: null,
        filter: "all",
        order: "desc",
        current_page: 1
    })

    useEffect(() => {
        const pages = Math.ceil(data.count / 20);
        setMeta(prev => ({...prev, page: pages}));
    }, [data.count]);

    useEffect(() => {
        startLoading();
        const fetch_users = async (page: number, filter: string, order: string) => {
            try {
                await getData({
                    url: `/admin/user_management?page=${page}&filter=${filter}&order=${order}`,
                    onSuccess: (response) => {
                        setData({ users: response.data.users, count: response.data.count});
                    },
                    onError: (error) => {
                        console.warn(error.reponse.data.detail)
                    }
                });
            } catch (error) {
                console.log(error);
            } finally {
                stopLoading();
            }
        }

        fetch_users(meta.current_page, meta.filter, meta.order);
    }, [meta.current_page, meta.filter, meta.order]);
    return (
        <div className="w-full h-[calc(100vh-60px)] overflow-y-auto transition duration-500 md:px-10 px-3 py-5 font-inter md:font-normal font-medium space-y-5">
            <h1 className="text-ember font-bold md:text-[30px] text-[25px]">Users Management</h1>
            <div>
                <div className="w-1/2 border bg-ash rounded-md overflow-hidden text-ember border-alpha-input-border flex justify-center">
                    <input type="search" id="search_user" name="search_user" placeholder="Search by Username or Anonymous ID" className="w-[90%] h-10 p-2 text-[14px] outline-0" />
                    <button className="w-[10%] flex justify-center items-center"><Search /></button>
                </div>
            </div>
            <section className="w-full rounded-2xl shadow-2xl py-5 px-5">
                <h2 className="font-semibold text-[25px] text-center text-ember">Whisper Users</h2>
                <table className="w-full text-left text-ember">
                    <thead className="text-void border-b border-alpha-secondary-border">
                        <tr className="h-12">
                            <th>S/N</th>
                            <th>Username</th>
                            <th className="md:table-cell hidden">Anonymous ID</th>
                            <th className="md:table-cell hidden">Status</th>
                            <th className="md:table-cell hidden">Joined Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.users.length > 0 ? data.users.map((user, index) => (
                            <tr className="not-last:border-b border-alpha-secondary-border mb-5 h-12 hover:bg-amber-50" key={user.anonymous_id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td className="md:table-cell hidden">{user.anonymous_id}</td>
                                <td className="md:table-cell hidden">{user.verified? <span className="bg-green-200 py-1 px-3 rounded-full text-green-600">verifed</span>: <span className="bg-red-200 p-2 rounded-full text-red-600">unverified</span>}</td>
                                <td className="md:table-cell hidden">{user.joined_date}</td>
                                <td>
                                    <button className="bg-red-100 text-red-500 p-1 rounded-md"><Trash /></button>
                                </td>
                            </tr>
                        )) : <p>No User registered yet!</p>}
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default Users