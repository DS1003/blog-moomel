import Threads from "@/app/_components/ui/Threads";
import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] bg-[#F9F7F2] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0">
                <Threads />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center animate-fade-in-up">
                {/* Logo Container */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6 rounded-full bg-white shadow-xl p-2 animate-bounce-slow">
                    <div className="relative w-full h-full rounded-full overflow-hidden border border-neutral-100">
                        <Image
                            src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1765297757/Logo_512_vwh0kd.png"
                            alt="Trésor Moomel Logo"
                            fill
                            className="object-contain p-2"
                            priority
                        />
                    </div>
                </div>

                {/* Text */}
                <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 tracking-tight font-medium mb-3">
                    Trésor Moomel
                </h1>
                <div className="h-px w-16 bg-primary-400 mb-3"></div>
                <span className="text-neutral-500 uppercase tracking-[0.3em] text-xs font-medium">
                    Chargement...
                </span>
            </div>
        </div>
    );
}
