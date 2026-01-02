'use client';
import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface BlurTextProps {
    text: string;
    delay?: number;
    className?: string;
    animateBy?: 'words' | 'letters';
    direction?: 'top' | 'bottom';
    threshold?: number;
    rootMargin?: string;
    variant?: Variants;
    wrap?: boolean;
}

export const BlurText = ({
    text,
    delay = 50,
    className = '',
    animateBy = 'words',
    direction = 'top',
    threshold = 0.1,
    rootMargin = '0px',
    variant,
    wrap = true,
}: BlurTextProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: threshold, margin: rootMargin as any });

    const defaultVariants: Variants = {
        hidden: {
            filter: 'blur(10px)',
            opacity: 0,
            y: direction === 'top' ? -50 : 50,
        },
        visible: {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
        },
    };

    const combinedVariants = variant || defaultVariants;

    const words = text.split(' ');
    const letters = text.split('');

    if (animateBy === 'letters') {
        return (
            <div ref={ref} className={`${className} flex ${wrap ? 'flex-wrap' : 'flex-nowrap'}`}>
                {letters.map((letter, index) => (
                    <motion.span
                        key={index}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={combinedVariants}
                        transition={{
                            duration: 0.5,
                            delay: index * (delay / 1000), // Convert ms to s
                            ease: [0.2, 0.65, 0.3, 0.9],
                        }}
                        className="inline-block will-change-[transform,filter,opacity]"
                    >
                        {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                ))}
            </div>
        );
    }

    return (
        <div ref={ref} className={`${className} flex ${wrap ? 'flex-wrap' : 'flex-nowrap'}`}>
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={combinedVariants}
                    transition={{
                        duration: 0.8,
                        delay: index * (delay / 1000), // Convert ms to s
                        ease: [0.2, 0.65, 0.3, 0.9],
                    }}
                    className="inline-block will-change-[transform,filter,opacity] mr-[0.25em] last:mr-0"
                >
                    {word}
                </motion.span>
            ))}
        </div>
    );
};
