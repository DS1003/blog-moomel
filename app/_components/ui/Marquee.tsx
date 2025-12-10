'use client';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame, wrap } from 'framer-motion';
import { useRef } from 'react';

interface MarqueeProps {
    children: React.ReactNode;
    baseVelocity?: number;
    className?: string; // Add className prop
}

export default function Marquee({ children, baseVelocity = 100, className }: MarqueeProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /**
         * This is what changes the direction of the scroll once we
         * switch scrolling directions.
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className={`overflow-hidden whitespace-nowrap flex flex-nowrap ${className}`}>
            <motion.div className="flex flex-nowrap gap-8" style={{ x }}>
                {children}
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    );
}

// Hook to get velocity since useVelocity is deprecated/removed in newer framer-motion or used differently
// Actually useVelocity is standard in framer-motion but let's implement a simple version if needed
// Wait, useVelocity from framer-motion text? 
// No, useVelocity takes a motion value.
import { useVelocity } from 'framer-motion';
