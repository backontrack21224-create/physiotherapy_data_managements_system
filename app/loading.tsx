

export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-primary/20 bg-white p-2 animate-pulse">
                    <img
                        src="/logo.jpg"
                        alt="Loading..."
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                </div>
            </div>
        </div>
    );
}
