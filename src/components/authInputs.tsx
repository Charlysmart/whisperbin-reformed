import type { AuthInputTypes } from "../utils/types";

const AuthInputs = ({ attribute, placeholder, label, onchange, value, type } : AuthInputTypes) => {
    return (
        <div className="flex flex-col gap-2">
            {label !== null && <label htmlFor={attribute} className="text-[15px] font-semibold text-muted">{label}</label>}
            <input type={type} name={attribute} id={attribute} placeholder={placeholder} className="w-full border text-ash border-alpha-input-border h-10 rounded-md p-2 text-[14px] focus:outline-alpha-secondary-border focus:outline-1 bg-surface" onChange={onchange} value={value} required />
        </div>
    );
}

export default AuthInputs;