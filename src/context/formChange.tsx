import T, { useState } from "react"

function useFormInput<T> (initialState : T) {
    const [formData, setFormData] = useState<T>(initialState);

    function handleRegisterInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormData(inputValues => ({...inputValues, [name]: value}));
    };

    return { formData, handleRegisterInput, setFormData };
}

export default useFormInput;