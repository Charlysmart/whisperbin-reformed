import { Check, Inbox, MessageSquare, MessageSquareDashed, MessageSquareText, RadioTower, ShieldCheck, UserX } from "lucide-react";
import Button from "./components/button";
import Logo from "./components/logo";
import chains from "@/assets/image/df0784ca-5af4-45f8-a500-bb1723d542f7.jpg";
import affirm from "@/assets/image/fc6eeb6c-e9cf-4f07-861a-a745c530707b.jpg";
import "@/assets.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
    const date = new Date();
    const navigate = useNavigate();

    const container = {
        hidden: {},
        show: {
            transition: {
            staggerChildren: 0.2
            }
        }
    };

    const item = {
    hidden: { opacity: 0, y: 50, rotateY: 180 },
    show: { opacity: 1, y: 0, rotateY: 0, transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const
    } }
    };
    return (
        <main className="w-full h-full space-y-10 font-inter">
            <header className="flex justify-between items-center px-6 py-3 sticky top-0 z-1000 backdrop-blur-2xl scroll-smooth shadow-2xl shadow-gray-300">
                <div className="">
                    <Logo />
                </div>
                <div className="flex gap-5">
                    <Button label="Login" type="button" extraClass="p-2 md:block hidden rounded-xl transition duration-700 hover:shadow-lg" onclick={() => navigate("../login")} />
                    <Button label="Get Started" type="button" extraClass="py-2 px-3 md:block hidden transition-all duration-700 bg-gradient-primary text-ash rounded-xl shadow-lg shadow-[#c3110033] hover:transform hover:scale-[1.03]" onclick={() => navigate("../register")} />
                    <Button label="Get Started" type="button" extraClass="py-2 px-3 md:hidden transition-all duration-700 bg-gradient-primary text-ash rounded-xl shadow-lg shadow-[#c3110033] hover:transform hover:scale-[1.03]" onclick={() => navigate("../login")} />
                </div>
            </header>
            <section className="flex md:flex-row flex-col md:gap-0 gap-10 justify-between items-center overflow-x-hidden w-full h-fit p-5">
                <motion.div className="md:w-1/2 w-full flex justify-center" 
                initial={{opacity: 0, x: -100}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 1}}
                >
                    <div className="w-[80%] space-y-5">
                        <div className="flex items-center gap-2 bg-[#c311000d] h-fit w-fit rounded-full border border-alpha-secondary-border px-2 py-1 text-scarlet font-medium md:text-[16px] text-[10px]">
                            <ShieldCheck className="md:w-4 md:h-4 w-3 h-3" /> 100% Anonymous & Secure
                        </div>
                        <div className="lg:text-[40px] md:text-[35px] text-[25px] md:leading-12 leading-10 font-extrabold">
                            <h1>Speak freely.</h1>
                            <h1>Stay <span className="text-gradient">anonymous.</span></h1>
                        </div>
                        <div className="text-ember lg:text-[16px] text[14px] leading-7">
                            <p>WhisperBin is the secure platform to send private messages and join real-time temporary chat rooms without ever revealing your identity. No traces left behind.</p>
                        </div>
                        <div className="flex gap-5">
                            <Button label="Start Messaging" type="button" extraClass="py-2 px-3 bg-gradient-primary text-ash rounded-xl shadow-lg shadow-[#c3110033] transition duration-1000" onclick={() => navigate("../send_message")} />
                        </div>
                    </div>
                </motion.div>
                <motion.div className="md:w-1/2 w-full flex justify-center items-center"
                initial={{opacity: 0, x: 100}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 1}}
                >
                    <img src={chains} alt="chains" loading="lazy" className="w-[80%] transform transition duration-500 hover:scale-[1.02] rounded-2xl shadow-2xl shadow-[#c3110033]" />
                </motion.div>
            </section>

            <section className="bg-secondary flex flex-col items-center w-full py-10 px-2 space-y-10">
                <div className="text-center md:leading-10 leading-6 space-y-3">
                    <h2 className="font-extrabold md:text-[30px] text-[20px] text-center">Everything you need to stay private</h2>
                    <p className="md:text-[14px] text-[12px]">Powerful features designed to protect your identity while you connect with others safely.</p>
                </div>
                <motion.div className="w-[90%] flex md:flex-row flex-col md:gap-0 gap-7 md:items-stretch items-center justify-between"
                style={{perspective: 1000}}
                variants={container} 
                initial="hidden" 
                whileInView="show"
                viewport={{ once: true }}
                >
                    <motion.div className="bg-white md:w-[32%] w-full rounded-md p-10 shadow-md shadow-alpha-primary-shadow transition duration-500 hover:-translate-y-2 features relative overflow-hidden space-y-3"
                    variants={item}
                    >
                        <div className="bg-ash w-fit h-fit p-2 text-ember rounded-lg">
                            <MessageSquareDashed />
                        </div>
                        <h2 className="md:md:text-[20px] font-semibold">Anonymous Messaging</h2>
                        <p className="lg:text-[14px] md:text-[13px]">
                            Send and receive messages with complete peace of mind. Your identity is permanently masked, protecting you from tracking or unwanted exposure.
                        </p>
                    </motion.div>
                    <motion.div className="bg-white md:w-[32%] w-full rounded-md p-10 shadow-md shadow-alpha-primary-shadow transition duration-500 hover:-translate-y-2 features relative overflow-hidden space-y-3"
                    variants={item}
                    >
                        <div className="bg-ash w-fit h-fit p-2 text-ember rounded-lg">
                            <Inbox />
                        </div>
                        <h2 className="md:text-[20px] font-bold">Private Inbox</h2>
                        <p className="lg:text-[14px] md:text-[13px]">Manage your conversations in a secure, isolated inbox. Only you have access, and messages can be set to self-destruct after they are read.
                        </p>
                    </motion.div>
                    <motion.div className="bg-white md:w-[32%] w-full rounded-md p-10 shadow-md shadow-alpha-primary-shadow transition duration-500 hover:-translate-y-2 features relative overflow-hidden space-y-3"
                    variants={item}
                    >
                        <div className="bg-ash w-fit h-fit p-2 text-ember rounded-lg">
                            <RadioTower />
                        </div>
                        <h2 className="md:text-[20px] font-bold">Real-Time Chat Rooms</h2>
                        <p className="lg:text-[14px] md:text-[13px]">
                            Join or create temporary rooms for instant group conversations. When the room closes, all data vanishes into the void immediately.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            <section className="flex md:flex-row flex-col md:gap-0 gap-10 justify-between h-fit w-full overflow-x-hidden">
                <motion.div className="md:w-1/2 w-full flex flex-col items-center justify-center"
                initial={{opacity: 0, x: -100}}
                transition={{duration: 1}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                >
                    <div className="w-[80%] space-y-7">
                        <h2 className="lg:text-[30px] md:text-[25px] text-[18px] font-bold">Trust the message, not the tracker.</h2>
                        <p className="text-muted">We believe in the right to private conversations. No data harvesting, no hidden cookies, and definitely all emails are archived after verification.</p>
                        <ul className="*:flex lg:text-[16px] md:text-[15px] text-[14px] *:gap-2 *:items-center space-y-5">
                            <li><span className="flex w-fit h-fit p-1 bg-green-600 text-white rounded-full"><Check size={16} /></span> Human-verified use to prevent spam bots</li>
                            <li><span className="flex w-fit h-fit p-1 bg-green-600 text-white rounded-full"><Check size={16} /></span> Zero-knowledge proofs</li>
                            <li><span className="flex w-fit h-fit p-1 bg-green-600 text-white rounded-full"><Check size={16} /></span> Automatic purging</li>
                        </ul>
                    </div>
                </motion.div>
                <motion.div className="md:w-1/2 w-full flex justify-center items-center"
                initial={{opacity: 0, x: 100}}
                transition={{duration: 1}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                >
                    <img src={affirm} alt="affirm" loading="lazy" className="w-[80%] rounded-2xl shadow-2xl shadow-[#c3110033] transform transition duration-500 hover:scale-[1.02]" />
                </motion.div>
            </section>
            
            <section className="bg-gradient-hero flex flex-col items-center">
                <motion.div className="lg:w-[50%] md:w-[70%] flex flex-col items-center text-center text-ash space-y-7 px-2 py-15"
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 1}}
                viewport={{once: true}}
                >
                    <div className="bg-[#ffffff1f] rounded-xl border border-alpha-ghost-border w-fit h-fit p-2">
                        <UserX />
                    </div>
                    <h2 className="font-bold lg:text-[40px] md:text-[35px] text-[20px]">Ready to step into the shadows?</h2>
                    <p className="md:text-[14px] text-[12px] text-gray-400">Join thousands of users who are already communicating securely and anonymously on WhisperBin. Your secrets, identity, and freedom are safe with us.</p>
                    <div className="flex gap-5 justify-center">
                        <Button label="Create Anonymous Account" type="button" extraClass="py-2 px-3 bg-gradient-btn-alt text-ash rounded-md shadow-lg shadow-[#c3110033] transition duration-700 hover:transform hover:-translate-y-2 text-[12px]" onclick={() => navigate("../register")} />
                        <Button label="Login" type="button" extraClass="py-2 px-5 backdrop-blur-2xl border border-alpha-ghost-border bg-[#ffffff1f] transition duration-700 hover:transform hover:-translate-y-2 text-[12px]" onclick={() => navigate("../login")} />
                    </div>
                    <p className="flex justify-center items-center gap-2 text-gray-400 md:text-[14px] text-[12px]"><ShieldCheck size={14} /> All personal details are kept secret.</p>
                </motion.div>
                <motion.footer className="flex md:flex-row flex-col justify-between items-center w-[80%] border-t border-alpha-card-border py-5 md:gap-0 gap-3"
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 1}}
                viewport={{once: true}}
                >
                    <div className="text-white flex items-center gap-2 font-bold text-shadow-[3px_3px_5px_rgba(0,0,0,1)]"><span className="bg-gradient-btn p-1.5 rounded-xl"><MessageSquareText className="w-4 h-4" /></span> WhisperBin</div>
                    <p className="text-ash md:text-[16px] text-[12px]">© {date.getFullYear()} WhisperBin. All rights reserved.</p>
                </motion.footer>
            </section>
        </main>
    )
}

export default Home;