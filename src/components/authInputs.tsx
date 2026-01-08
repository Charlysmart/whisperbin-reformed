import type { AuthInputTypes } from "../utils/types";

const AuthInputs = ({ attribute, placeholder, label, onchange, value, type } : AuthInputTypes) => {
    return (
        <div className="flex flex-col gap-2">
            {label !== null && <label htmlFor={attribute} className="text-[15px] font-semibold">{label}</label>}
            <input type={type} name={attribute} id={attribute} placeholder={placeholder} className="w-full border border-gray-300 h-10 rounded-md p-2 text-[14px] focus:outline-blue-400 focus:outline-1" onChange={onchange} value={value} required />
        </div>
    );
}

export default AuthInputs;