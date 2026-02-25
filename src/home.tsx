import { Check, Inbox, MessageSquare, MessageSquareDashed, MessageSquareText, RadioTower, ShieldCheck, UserX } from "lucide-react";
import Button from "./components/button";
import Logo from "./components/logo";
import chains from "@/assets/image/df0784ca-5af4-45f8-a500-bb1723d542f7.jpg";
import affirm from "@/assets/image/fc6eeb6c-e9cf-4f07-861a-a745c530707b.jpg";
import "@/assets.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const date = new Date()
    const navigate = useNavigate()
    return (
        <main className="w-full h-full space-y-10 font-inter">
            <header className="flex justify-between px-6 py-3 shadow-2xl shadow-gray-300">
                <div>
                    <Logo />
                </div>
                <div className="flex gap-5">
                    <Button label="Login" type="button" extraClass="p-2" onclick={() => navigate("../login")} />
                    <Button label="Get Started" type="button" extraClass="py-2 px-3 bg-gradient-primary text-ash rounded-xl shadow-lg shadow-[#c3110033]"  onclick={() => navigate("../register")} />
                </div>
            </header>
            <section className="flex justify-between items-center w-full h-fit p-5">
                <div className="w-1/2 flex justify-center">
                    <div className="w-[80%] space-y-5">
                        <div className="flex gap-2 bg-[#c311000d] h-fit w-fit rounded-full border border-alpha-secondary-border px-2 py-1 text-scarlet font-medium">
                            <ShieldCheck /> 100% Anonymous & Secure
                        </div>
                        <div className="text-[40px] leading-12 font-extrabold">
                            <h1>Speak freely.</h1>
                            <h1>Stay <span className="text-gradient">anonymous.</span></h1>
                        </div>
                        <div className="text-ember leading-7">
                            <p>WhisperBin is the secure platform to send private messages and join real-time temporary chat rooms without ever revealing your identity. No traces left behind.</p>
                        </div>
                        <div className="flex gap-5">
                            <Button label="Start Messaging" type="button" extraClass="py-2 px-3 bg-gradient-primary text-ash rounded-xl shadow-lg shadow-[#c3110033]" />
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-100 flex justify-center items-center">
                    <img src={chains} alt="chains" className="h-full w-[80%] transform transition duration-500 hover:scale-[1.02] rounded-2xl shadow-2xl shadow-[#c3110033]" />
                </div>
            </section>

            <section className="bg-secondary flex flex-col items-center w-full py-10 space-y-10">
                <div className="leading-10">
                    <h2 className="font-extrabold text-[30px]">Everything you need to stay private</h2>
                    <p className="text-[14px]">Powerful features designed to protect your identity while you connect with others safely.</p>
                </div>
                <div className="w-[90%] flex justify-between">
                    <div className="bg-white w-[32%] rounded-md p-10 shadow-md shadow-alpha-primary-shadow transition duration-500 hover:-translate-y-2 features relative overflow-hidden space-y-3">
                        <div className="bg-ash w-fit h-fit p-2 text-ember rounded-lg">
                            <MessageSquareDashed />
                        </div>
                        <h2 className="text-[20px] font-bold">Anonymous Messaging</h2>
                        <p className="text-[14px]">
                            Send and receive messages with complete peace of mind. Your identity is permanently masked, protecting you from tracking or unwanted exposure.
                        </p>
                    </div>
                    <div className="bg-white w-[32%] rounded-md p-10 shadow-md shadow-alpha-primary-shadow transition duration-500 hover:-translate-y-2 features relative overflow-hidden space-y-3">
                        <div className="bg-ash w-fit h-fit p-2 text-ember rounded-lg">
                            <Inbox />
                        </div>
                        <h2 className="text-[20px] font-bold">Private Inbox</h2>
                        <p className="text-[14px]">Manage your conversations in a secure, isolated inbox. Only you have access, and messages can be set to self-destruct after they are read.
                        </p>
                    </div>
                    <div className="bg-white w-[32%] rounded-md p-10 shadow-md shadow-alpha-primary-shadow transition duration-500 hover:-translate-y-2 features relative overflow-hidden space-y-3">
                        <div className="bg-ash w-fit h-fit p-2 text-ember rounded-lg">
                            <RadioTower />
                        </div>
                        <h2 className="text-[20px] font-bold">Real-Time Chat Rooms</h2>
                        <p className="text-[14px]">
                            Join or create temporary rooms for instant group conversations. When the room closes, all data vanishes into the void immediately.
                        </p>
                    </div>
                </div>
            </section>

            <section className="flex justify-between h-fit w-full">
                <div className="w-1/2 flex flex-col items-center justify-center">
                    <div className="w-[80%] space-y-7">
                        <h2 className="text-[30px] font-bold">Trust the message, not the tracker.</h2>
                        <p className="text-muted">We believe in the right to private conversations. No data harvesting, no hidden cookies, and definitely all emails are archived after verification.</p>
                        <ul className="*:flex *:gap-2 *:items-center space-y-5">
                            <li><span className="flex w-fit h-fit p-1 bg-green-600 text-white rounded-full"><Check size={16} /></span> Human-verified use to prevent spam bots</li>
                            <li><span className="flex w-fit h-fit p-1 bg-green-600 text-white rounded-full"><Check size={16} /></span> Zero-knowledge proofs</li>
                            <li><span className="flex w-fit h-fit p-1 bg-green-600 text-white rounded-full"><Check size={16} /></span> Automatic purging</li>
                        </ul>
                    </div>
                </div>
                <div className="w-1/2 h-100 flex justify-center">
                    <img src={affirm} alt="affirm" className="h-full w-[80%] rounded-2xl shadow-2xl shadow-[#c3110033] transform transition duration-500 hover:scale-[1.02]" />
                </div>
            </section>
            
            <section className="bg-gradient-hero flex flex-col items-center">
                <div className="w-[50%] flex flex-col items-center text-center text-ash space-y-7 py-15">
                    <div className="bg-[#ffffff1f] rounded-xl border border-alpha-ghost-border w-fit h-fit p-2">
                        <UserX />
                    </div>
                    <h2 className="font-bold text-[40px]">Ready to step into the shadows?</h2>
                    <p className="text-[14px] text-muted">Join thousands of users who are already communicating securely and anonymously on WhisperBin. Your secrets, identity, and freedom are safe with us.</p>
                    <div className="flex gap-5 justify-center">
                        <Button label="Create Anonymous Account" type="button" extraClass="py-2 px-3 bg-gradient-btn-alt text-ash rounded-md shadow-lg shadow-[#c3110033]" />
                        <Button label="Login" type="button" extraClass="py-2 px-5 backdrop-blur-2xl border border-alpha-ghost-border bg-[#ffffff1f]" />
                    </div>
                    <p className="flex justify-center items-center gap-2 text-muted text-[14px]"><ShieldCheck size={14} /> All personal details are kept secret.</p>
                </div>
                <footer className="flex justify-between w-[80%] border-t border-alpha-card-border py-5">
                    <div className="text-white flex items-center gap-2 font-bold text-shadow-[3px_3px_5px_rgba(0,0,0,1)]"><span className="bg-gradient-btn p-1.5 rounded-xl"><MessageSquareText /></span> WhisperBin</div>
                    <p className="text-ash">© {date.getFullYear()} WhisperBin. All rights reserved.</p>
                </footer>
            </section>
        </main>
    )
}

export default Home;