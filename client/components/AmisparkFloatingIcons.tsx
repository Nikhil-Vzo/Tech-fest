import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';



// Spotlight Beam Component
const Spotlight = ({ position, delay, color }: { position: 'left' | 'right', delay: number, color: string }) => {
    return (
        <motion.div
            className={`absolute top-[-20%] w-[400px] h-[150vh] blur-3xl opacity-40 pointer-events-none z-0 ${position === 'left' ? 'left-[-10%]' : 'right-[-10%]'}`}
            style={{
                background: `conic-gradient(from ${position === 'left' ? '160deg' : '200deg'} at 50% 0%, transparent 40%, ${color} 50%, transparent 60%)`,
                transformOrigin: 'top center',
            }}
            animate={{
                rotate: position === 'left' ? [-15, 15, -15] : [15, -15, 15],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }}
        />
    );
};

// Camera Flash Component
const Flashbulb = () => {
    const [style, setStyle] = useState({ top: 0, left: 0, scale: 1 });

    useEffect(() => {
        setStyle({
            top: Math.random() * 100,
            left: Math.random() * 100,
            scale: Math.random() * 0.5 + 0.5
        });
    }, []);

    return (
        <motion.div
            className="absolute bg-white rounded-full blur-xl pointer-events-none z-0"
            style={{
                top: `${style.top}%`,
                left: `${style.left}%`,
                width: '100px',
                height: '100px',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }}
            transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3 + 1, // Faster flashes (1-4s)
                ease: "easeOut"
            }}
        />
    );
};

// Gold Dust Component (Restored)
const GoldParticle = () => {
    const left = Math.random() * 100;
    const duration = Math.random() * 5 + 5;
    const size = Math.random() * 4 + 2;

    return (
        <motion.div
            className="absolute bg-glitz-gold rounded-full opacity-60 pointer-events-none z-0"
            style={{
                left: `${left}%`,
                width: size,
                height: size,
                top: '110vh'
            }}
            animate={{
                y: -1200,
                opacity: [0, 0.8, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * -20 // Pre-warm the animation so dust is already 
            }}
        />
    );
};

export const AmisparkFloatingIcons: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Spotlights - Instant Start */}
            <Spotlight position="left" delay={0} color="var(--color-drama)" />
            <Spotlight position="right" delay={1} color="var(--color-glitz-gold)" />

            {/* Flashbulbs - Paparazzi Effect (Increased Count) */}
            {[...Array(12)].map((_, i) => (
                <Flashbulb key={`flash-${i}`} />
            ))}

            {/* Rising Gold Dust (Restored) */}
            {[...Array(30)].map((_, i) => (
                <GoldParticle key={`dust-${i}`} />
            ))}
        </div>
    );
};
