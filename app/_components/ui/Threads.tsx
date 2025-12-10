'use client';
import { useEffect, useRef } from 'react';

export default function Threads({
    amplitude = 1,
    distance = 0,
    enableMouseInteraction = true,
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let time = 0;
        const lines: WaveLine[] = [];
        const lineCount = 40;

        // Brand colors: Primary golds/browns and Neutral greys
        const colors = [
            'rgba(184, 134, 54, 0.3)',  // Gold
            'rgba(123, 82, 34, 0.2)',   // Brown
            'rgba(217, 184, 125, 0.2)', // Light Gold
            'rgba(200, 200, 200, 0.1)'  // Grey
        ];

        class WaveLine {
            phase: number;
            speed: number;
            amplitude: number;
            frequency: number;
            color: string;
            yOffset: number;

            constructor(index: number) {
                this.phase = Math.random() * Math.PI * 2;
                this.speed = 0.002 + Math.random() * 0.003;
                this.amplitude = 50 + Math.random() * 150;
                this.frequency = 0.002 + Math.random() * 0.003;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                // Spread lines across the vertical space, concentrating in middle
                this.yOffset = height * 0.2 + Math.random() * (height * 0.6);
            }

            draw(ctx: CanvasRenderingContext2D, time: number) {
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1.5;

                for (let x = 0; x < width; x += 5) {
                    // Compound sine waves for "thread-like" organic motion
                    const y = this.yOffset +
                        Math.sin(x * this.frequency + time * this.speed + this.phase) * this.amplitude +
                        Math.sin(x * this.frequency * 2.5 + time * this.speed * 1.5) * (this.amplitude * 0.3);

                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            }
        }

        for (let i = 0; i < lineCount; i++) {
            lines.push(new WaveLine(i));
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            time += 1;

            lines.forEach(line => {
                line.draw(ctx, time);
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Re-initialize lines on resize to fit new height
            lines.length = 0;
            for (let i = 0; i < lineCount; i++) {
                lines.push(new WaveLine(i));
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [amplitude, distance, enableMouseInteraction]);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
