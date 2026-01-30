import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] bg-white backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 md:w-28 md:h-28 mb-4">
                <Image
                    src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1765297757/Logo_512_vwh0kd.png"
                    alt="Moomel"
                    fill
                    className="object-contain animate-bounce-slow"
                    priority
                />
            </div>

            <div className="flex flex-col items-center gap-3">
                {/* Minimalist Spinner */}
                <div className="w-5 h-5 border-[2px] border-neutral-100 border-t-primary-600 rounded-full animate-spin"></div>

                {/* Premium Text */}
                <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-neutral-400 font-medium animate-pulse">
                    Chargement
                </span>
            </div>
        </div>
    );
}
