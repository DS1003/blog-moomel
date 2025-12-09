import React from 'react';
import Image from 'next/image';

interface BadgeProps {
    name: string;
    icon: string;
    description?: string;
    isLocked?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export default function Badge({ name, icon, description, isLocked = false, size = 'md' }: BadgeProps) {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
    };

    return (
        <div className="group relative flex flex-col items-center">
            <div
                className={`
          ${sizeClasses[size]} relative rounded-full flex items-center justify-center
          ${isLocked ? 'bg-neutral-200 grayscale opacity-70' : 'bg-gradient-to-br from-primary-100 to-accent-100 shadow-md'}
          transition-all duration-300 hover:scale-110
        `}
            >
                {/* Placeholder for icon if image URL is not provided or valid, otherwise use Image */}
                {icon.startsWith('http') || icon.startsWith('/') ? (
                    <div className="relative w-2/3 h-2/3">
                        <Image
                            src={icon}
                            alt={name}
                            fill
                            className="object-contain"
                        />
                    </div>
                ) : (
                    <span className="text-xl">{icon}</span> // Fallback for emoji icons
                )}

                {isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-full">
                        <svg className="w-1/2 h-1/2 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 w-max max-w-[150px] text-center">
                <div className="bg-neutral-800 text-white text-xs rounded py-1 px-2 shadow-lg">
                    <p className="font-bold">{name}</p>
                    {description && <p className="text-neutral-300 text-[10px] mt-0.5">{description}</p>}
                    {isLocked && <p className="text-red-300 text-[10px] mt-0.5 font-medium">Verrouillé</p>}
                </div>
                <div className="w-2 h-2 bg-neutral-800 rotate-45 mx-auto -mt-1"></div>
            </div>
        </div>
    );
}
