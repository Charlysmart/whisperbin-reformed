import { User2 } from "lucide-react";
import { useSidebar } from "../../../context/sideBarContext";
import Logo from "../../../components/logo";
const Header = () => {
    const { sideBar } = useSidebar();
    return (
        <header className={`flex justify-between items-center px-10 w-full h-15`}>
            <div>
                <Logo />
            </div>
            <div className="p-2 rounded-full bg-gray-100 ">
                <User2 />
            </div>
        </header>
    );
}

export default Header;