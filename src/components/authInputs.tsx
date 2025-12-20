import type { AuthInputTypes } from "../utils/types";

const AuthInputs = ({ attribute, placeholder, label } : AuthInputTypes) => {
    return (
        <div className="flex flex-col gap-2">
            {label !== null && <label htmlFor={attribute} className="text-[14px] font-medium">{label}</label>}
            <input type="text" name={attribute} id={attribute} placeholder={placeholder} className="w-full border border-gray-300 h-10 rounded-md p-2 text-[14px] focus:border-gray-400" />
        </div>
    );
}

export default AuthInputs;