import { ArrowLeft, Info, LayoutDashboard, Lock, ShieldAlert } from "lucide-react"
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen fixed bg-void flex justify-center items-center font-inter">
            <div className="lg:w-[50%] md:w-[80%] w-[90%] md:h-fit h-[90%] overflow-auto shadow-2xl shadow-alpha-primary-glow p-10 bg-surface flex flex-col items-center gap-5 text-ash rounded-2xl">
                <span className="border flex items-center bg-faded-white font-semibold border-scarlet rounded-full px-10 py-1 text-scarlet md:text-[13px] text-[10px]">Security Protocol: Active</span>
                <div className="border p-3 flex justify-center items-center border-alpha-ghost-border bg-surface rounded-lg">
                    <ShieldAlert className="text-scarlet md:w-10 md:h-10" />
                </div>
                    
                <h2 className="lg:text-[40px] text-[20px] font-extrabold text-scarlet"><span className="text-ash">403 -</span> Access Denied</h2>
                <h4 className="lg:text-[30px] text-[18px] font-semibold">You have permission to access this page.</h4>
                <p className="lg:text-[18px] text-gray-300">The requested resource is restricted. Please verify your credentials or navigate back to a authorized segment of the platform.</p>

                <div className="border border-alpha-card-border rounded-xl p-5 mt-5 bg-alpha-subtle-border flex md:gap-4 gap-2">
                    <Info size={35} className="md:block hidden" />
                    <section>
                        <b className="mb-1 block">Restricted Area</b>
                        <p className="text-[14px] text-gray-300">This section is restricted based on <b>role authorization</b>. Your current session does not meet the <b>required</b> access level.</p>
                    </section>
                </div>
                
                <section className="flex justify-center items-center gap-5 mt-5">
                    <button className="px-5 py-2 md:text-[16px] text-[13px] flex items-center rounded-md border border-alpha-ghost-border" onClick={() => navigate(-1)}><ArrowLeft className="md:block hidden" /> Go Back</button>
                    <button className="px-5 py-2 md:text-[16px] text-[13px] flex items-center bg-scarlet rounded-md" onClick={() => navigate("../")}><LayoutDashboard className="md:block hidden" /> Go to Dashboard</button>
                </section>
            </div>
        </div>
    );
}

export default Forbidden;