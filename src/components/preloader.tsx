import "@/App.css"
const Preloader = () => {
    return (
        <div className="preloader-container z-100000 flex gap-2 justify-center items-center w-full h-screen absolute top-0 overflow-hidden bg-white">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    );
}

export default Preloader;