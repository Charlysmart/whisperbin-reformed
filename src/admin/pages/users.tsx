import { Search, Trash } from "lucide-react"

const Users = () => {
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
                <table className="w-full text-left text-ember">
                    <thead className="text-void border-b border-alpha-secondary-border">
                        <tr className="h-12">
                            <th>S/N</th>
                            <th>Username</th>
                            <th>Anonymous ID</th>
                            <th>Joined Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-alpha-secondary-border mb-5 h-12">
                            <td>1</td>
                            <td>chiemerie</td>
                            <td>whisperuser_5746</td>
                            <td>2026-09-03</td>
                            <td>
                                <button className="bg-red-100 text-red-500 p-1 rounded-md"><Trash /></button>
                            </td>
                        </tr>
                        <tr className="border-b border-alpha-secondary-border mb-5 h-12">
                            <td>1</td>
                            <td>chiemerie</td>
                            <td>whisperuser_5746</td>
                            <td>2026-09-03</td>
                            <td>
                                <button className="bg-red-100 text-red-500 p-1 rounded-md"><Trash /></button>
                            </td>
                        </tr>
                        <tr className="not-last:border-b border-alpha-secondary-border mb-5 h-12">
                            <td>1</td>
                            <td>chiemerie</td>
                            <td>whisperuser_5746</td>
                            <td>2026-09-03</td>
                            <td>
                                <button className="bg-red-100 text-red-500 p-1 rounded-md"><Trash /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default Users