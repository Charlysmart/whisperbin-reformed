const VerifyPreloader = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full absolute top-0 left-0 backdrop-blur-sm">
            <div className="flex justify-center items-center">
                <div className="verify border-3 border-t-blaze border-ember animate-spin w-24 h-24  rounded-full relative">
                </div>
                <p className="absolute text-scarlet font-medium text-[18px]">Verifying</p>
            </div>
        </div>
    );
}

export default VerifyPreloader;