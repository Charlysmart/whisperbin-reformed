import type { ButtonTypes } from "../utils/types";
import "@/assets.css"
const Button = ({ label, buttonType, extraClass, type, disable, onclick } : ButtonTypes) => {
    return (
        <button className={`transition duration-500 ${disable ? "bg-gray-100 text-gray-100 cursor-not-allowed" : buttonType === "colored" ? 'bg-gradient-btn-alt text-white shadow-md shadow-alpha-primary-shadow' : buttonType === "brand" ? "bg-scarlet hover:bg-alpha-secondary-bg border hover: border-alpha-input-border hover:text-muted text-white" : buttonType === "outlined" ? "bg-transparent hover:bg-alpha-secondary-bg border bg-border-alpha-input-border text-muted" : buttonType === "muted" && "bg-surface hover:bg-alpha-secondary-bg text-muted"} ${disable && "bg-muted text-ash"} font-medium rounded-md ${extraClass}`} type={type} disabled={disable} onClick={ onclick }>
            {label}
        </button>
    );
}

export default Button;