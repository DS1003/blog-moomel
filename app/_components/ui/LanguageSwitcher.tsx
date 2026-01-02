'use client';

import { useLanguage } from '@/app/_components/providers/LanguageProvider';
import { motion } from 'framer-motion';

interface LanguageSwitcherProps {
    variant?: 'light' | 'dark';
}

export default function LanguageSwitcher({ variant = 'light' }: LanguageSwitcherProps) {
    const { locale, setLocale } = useLanguage();

    const isLight = variant === 'light';

    return (
        <div className={`flex items-center backdrop-blur-sm border rounded-full p-1 relative transition-colors duration-500 ${isLight
                ? 'bg-white/10 border-white/20'
                : 'bg-neutral-100 border-neutral-200'
            }`}>
            {/* Sliding background */}
            <motion.div
                layout
                className={`absolute h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full shadow-sm top-1 ${isLight ? 'bg-white' : 'bg-white'
                    }`}
                animate={{
                    left: locale === 'fr' ? '4px' : 'calc(50%)',
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
            />

            <button
                onClick={() => setLocale('fr')}
                className={`relative z-10 px-3 py-1 text-[10px] sm:text-xs font-bold transition-colors ${locale === 'fr'
                        ? 'text-primary-600'
                        : (isLight ? 'text-white/60 hover:text-white' : 'text-neutral-400 hover:text-neutral-900')
                    }`}
            >
                FR
            </button>
            <button
                onClick={() => setLocale('en')}
                className={`relative z-10 px-3 py-1 text-[10px] sm:text-xs font-bold transition-colors ${locale === 'en'
                        ? 'text-primary-600'
                        : (isLight ? 'text-white/60 hover:text-white' : 'text-neutral-400 hover:text-neutral-900')
                    }`}
            >
                EN
            </button>
        </div>
    );
}
