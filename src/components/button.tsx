import type { ButtonTypes } from "../utils/types";
const Button = ({ label, buttonType, extraClass, type, disable, onclick } : ButtonTypes) => {
    return (
        <button className={`${disable ? "bg-gray-100 text-gray-100 cursor-not-allowed" : buttonType === "colored" ? 'button-gradient text-white' : buttonType === "brand" ? 'bg-blue-400 text-white' : buttonType === "outlined" ? "bg-white border border-gray-300" : buttonType === "grayed" ? "bg-gray-200 text-gray-500" : ""} ${disable ? "bg-gray-400" : ""} font-medium rounded-md ${extraClass}`} type={type} disabled={disable} onClick={ onclick }>
            {label}
        </button>
    );
}

export default Button;