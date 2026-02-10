import { createElement, Check, X } from "lucide";
import { AlertType } from "./types";
import "@/App.css";

export const alertBox = ({ message, success, top, onClose } : AlertType) => {
    const div = document.createElement("div");
    div.classList.add("md:max-w-[35%]", "max-w-[70%]", "h-fit", "shadow-lg", "shadow-blue-100", "rounded-lg", "bg-white", "p-3", "overflow-hidden", "absolute", "right-2", `top-${top}`);
    const close = document.createElement("div");
    close.classList.add("flex", "justify-end");
    const closeIcon = createElement(X, {
        size: 24,
        color: "red"
    });
    close.appendChild(closeIcon);
    const textContainer = document.createElement("div");
    textContainer.classList.add("flex", "items-center", "gap-2");
    const successIconContainer = document.createElement("div");
    successIconContainer.classList.add(success ? "bg-green-600" : "bg-red-600", "w-fit", "h-fit", "rounded-full", "p-1")
    const successIcon = createElement(Check, {
        color : "white"
    });
    const failureIcon = createElement(X, {
        color : "white"
    });
    successIconContainer.appendChild(success ? successIcon : failureIcon)
    const text = document.createElement("div");
    text.classList.add("font-inter", "font-medium");
    text.textContent = message;
    textContainer.append(successIconContainer, text)
    const slider = document.createElement("div");
    slider.classList.add("absolute", "bottom-0", "bg-blue-500", "alert-box");
    div.append(close, textContainer, slider);
    document.body.appendChild(div);

    const handleClick = () => {
        div.classList.add("hidden");
        if (onClose) onClose();
    }
    const timeout = setTimeout(() => {
        handleClick();
    }, 3000);

    closeIcon.addEventListener("click", () => {
        clearTimeout(timeout);
        handleClick();
    });
}





