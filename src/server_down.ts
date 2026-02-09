// import { createElement, WifiOff } from "lucide";

// const ServerDown = () => {
//     const container = document.createElement("div");
//     container.classList.add("w-full", "h-screen", "flex", "justify-center", "items-center", "font-inter");
//     const semi_container = document.createElement("div");
//     semi_container.classList.add("lg:w-[40%]", "md:w-[70%]", "w-[95%]", "shadow-xl", "rounded-2xl", "px-5", "py-20", "flex", "flex-col", "items-center", "gap-7");
//     const icon = document.createElement("div");
//     icon.classList.add("w-fit", ",h-fit", "bg-blue-200", "rounded-full", "p-3");
//     const wifiOff = createElement(WifiOff, {
//         size : 50
//     });
//     wifiOff.classList.add("text-blue-500");
//     icon.appendChild(wifiOff);
//     const main = document.createElement("div");
//     main.classList.add("text-center");
//     const header = document.createElement("h1");
//     header.classList.add("font-bold", "md:text-[40px]" ,"text-[30px]", "text-gray-700");
//     header.textContent = "We're Having Trouble Connecting";
//     const sub_text = document.createElement("p");
//     sub_text.classList.add("md:text-[18px]", "text-[16px]", "text-gray-700");
//     sub_text.textContent = "The server is temporarily unavailable. Please check your internet connection or try again in a few moments.";
//     main.append(header, sub_text);
//     const button_container = document.createElement("div");
//     button_container.classList.add("flex", "gap-5");
//     const reload = document.createElement("button");
//     reload.classList.add("p-2", "bg-blue-500", "text-white", "rounded-md");
//     reload.textContent = "Reload";
//     reload.onclick = () => window.location.reload();
//     const go_home = document.createElement("button");
//     go_home.classList.add("p-2", "bg-transparent", "text-blue-500", "rounded-md");
//     go_home.textContent = "Home";
//     // go_home.onclick = () => window.location.reload();
//     button_container.append(reload, go_home);
//     semi_container.append(icon, main, button_container);
//     container.append(semi_container);
// }

// export default ServerDown;