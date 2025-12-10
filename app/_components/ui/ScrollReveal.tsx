'use client';
import { motion, useInView, useAnimation, Variant } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string;
    animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "zoom-in";
    duration?: number;
    offset?: number;
}

export default function ScrollReveal({
    children,
    width = "100%",
    delay = 0,
    className = "",
    animation = "fade-up",
    duration = 0.5,
    offset = 0 // Trigger as soon as 1px is visible
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: offset });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const getVariants = () => {
        switch (animation) {
            case "fade-in":
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration, delay } }
                };
            case "slide-left":
                return {
                    hidden: { opacity: 0, x: -75 },
                    visible: { opacity: 1, x: 0, transition: { duration, delay, ease: "easeOut" as any } }
                };
            case "slide-right":
                return {
                    hidden: { opacity: 0, x: 75 },
                    visible: { opacity: 1, x: 0, transition: { duration, delay, ease: "easeOut" as any } }
                };
            case "zoom-in":
                return {
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { duration, delay, ease: "easeOut" as any } }
                };
            case "fade-up":
            default:
                return {
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0, transition: { duration, delay, ease: "easeOut" as any } }
                };
        }
    };

    return (
        <div ref={ref} style={{ position: "relative", width }} className={className}>
            <motion.div
                variants={getVariants()}
                initial="hidden"
                animate={mainControls}
            >
                {children}
            </motion.div>
        </div>
    );
}
