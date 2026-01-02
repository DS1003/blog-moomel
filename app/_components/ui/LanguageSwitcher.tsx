'use client';

import { useLanguage } from '@/app/_components/providers/LanguageProvider';
import { motion } from 'framer-motion';

interface LanguageSwitcherProps {
    variant?: 'light' | 'dark';
}

export default function LanguageSwitcher({ variant = 'dark' }: LanguageSwitcherProps) {
    const { locale, setLocale } = useLanguage();
    const isLightState = variant === 'light';

    const languages = [
        { code: 'fr', label: 'FR' },
        { code: 'en', label: 'EN' },
    ];

    return (
        <div className={`inline-flex p-1 rounded-full backdrop-blur-md transition-all duration-500 border ${isLightState
            ? 'bg-white/10 border-white/20 shadow-lg'
            : 'bg-neutral-200/30 border-neutral-300/50 shadow-sm'
            }`}>
            <div className="flex relative">
                {languages.map((lang) => {
                    const isActive = locale === lang.code;
                    return (
                        <button
                            key={lang.code}
                            onClick={() => setLocale(lang.code as 'fr' | 'en')}
                            className="relative px-2.5 sm:px-3.5 py-1 sm:py-1.5 focus:outline-none transition-all duration-300 group"
                        >
                            {/* Active Indicator Background */}
                            {isActive && (
                                <motion.div
                                    layoutId="languageHighlight"
                                    className={`absolute inset-0 rounded-full shadow-md ${isLightState ? 'bg-white' : 'bg-neutral-900'
                                        }`}
                                    transition={{
                                        type: "spring",
                                        bounce: 0.2,
                                        duration: 0.5
                                    }}
                                />
                            )}

                            {/* Label */}
                            <span className={`relative z-10 text-[10px] sm:text-[11px] font-bold tracking-[0.15em] transition-colors duration-300 ${isActive
                                ? (isLightState ? 'text-neutral-900' : 'text-white')
                                : (isLightState ? 'text-white/60 group-hover:text-white' : 'text-neutral-500 group-hover:text-neutral-900')
                                }`}>
                                {lang.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
