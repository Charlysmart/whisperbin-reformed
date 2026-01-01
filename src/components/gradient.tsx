export function GradientProvider() {
    return (
        <svg width="0" height="0" style={{position: 'absolute'}}>
            <defs>
                <linearGradient id="my-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e40af" />
                    <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
            </defs>
        </svg>
    );
}