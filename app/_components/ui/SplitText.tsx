'use client';

import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';

type SplitTextProps = {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
};

export default function SplitText({ text, className = '', delay = 0, duration = 0.05 }: SplitTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const words = text.split(' ');

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: duration, delayChildren: delay * 0.001 },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            style={{ display: 'flex', flexWrap: 'wrap' }}
            variants={container}
            initial="hidden"
            animate={controls}
            className={className}
        >
            {words.map((word, index) => (
                <motion.div key={index} style={{ display: 'flex', marginRight: '0.25em' }}>
                    {word.split('').map((letter, letterIndex) => (
                        <motion.span key={letterIndex} variants={child}>
                            {letter}
                        </motion.span>
                    ))}
                </motion.div>
            ))}
        </motion.div>
    );
}
