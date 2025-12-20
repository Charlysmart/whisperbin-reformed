import type { ButtonTypes } from "../utils/types";
const Button = ({ label, buttonType, extraClass } : ButtonTypes) => {
    return (
        <button className={`${buttonType === "colored" ? 'bg-blue-500 text-white' : buttonType === "outlined" ? "bg-white border border-gray-300" : ""} h-[50px] font-medium rounded-md ${extraClass}`}>
            {label}
        </button>
    );
}

export default Button;