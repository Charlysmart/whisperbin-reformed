import "@/App.css"
const Preloader = () => {
    return (
        <div className="preloader-container z-100000 flex gap-2 justify-center items-center w-full h-screen absolute top-0 overflow-hidden bg-surface">
            <span className="dot bg-ember"></span>
            <span className="dot bg-ember"></span>
            <span className="dot bg-ember"></span>
        </div>
    );
}

export default Preloader;