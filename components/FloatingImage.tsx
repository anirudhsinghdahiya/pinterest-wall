'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface FloatingImageProps {
    src: string;
    alt: string;
    index: number;
}

export default function FloatingImage({ src, alt, index }: FloatingImageProps) {
    const [randomProps, setRandomProps] = useState({
        size: 0,
        y: 0,
        rotation: 0,
        duration: 0,
        delay: 0,
    });

    useEffect(() => {
        // Generate random properties on client side to avoid hydration mismatch
        const size = Math.random() * 200 + 180; // 180-380px (wider range for more variety)
        const y = Math.random() * 120 - 10; // -10% to 110% of viewport height (cover full screen, allow cutoff)
        const rotation = Math.random() * 10 - 5; // -5 to 5 degrees (more subtle)
        const duration = Math.random() * 25 + 45; // 45-70 seconds (even slower, more graceful)
        const delay = Math.random() * 3; // 0-3 seconds (short delay so images appear quickly)

        setRandomProps({ size, y, rotation, duration, delay });
    }, [index]);

    if (randomProps.size === 0) return null; // Don't render until client-side props are set

    // Calculate initial X position - spread images across the screen including off-screen left
    // This ensures images cover the whole screen immediately
    const initialX = -20 + (index * 20) % 140; // Spread from -20vw to 120vw

    return (
        <motion.div
            className="absolute"
            style={{
                top: `${randomProps.y}%`,
                zIndex: Math.floor(index / 3), // Less z-index variation for less overlapping
                filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))',
            }}
            initial={{
                x: `${initialX}vw`, // Start distributed from off-screen left to right
                rotate: randomProps.rotation,
            }}
            animate={{
                x: '120vw', // Move all the way across to right
                rotate: randomProps.rotation + (Math.random() * 4 - 2), // Subtle rotation change
            }}
            transition={{
                duration: randomProps.duration,
                repeat: Infinity,
                repeatType: 'loop', // Seamless loop without reset jump
                ease: 'linear', // Smooth constant movement
                delay: randomProps.delay,
            }}
        >
            <Image
                src={src}
                alt={alt}
                width={randomProps.size}
                height={randomProps.size}
                className="rounded-2xl object-cover opacity-80 hover:opacity-100 transition-all duration-700 ease-out hover:scale-105"
                style={{
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(4px)',
                }}
                unoptimized
            />
        </motion.div>
    );
}
