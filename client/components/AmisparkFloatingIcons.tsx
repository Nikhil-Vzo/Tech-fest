import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';



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
            scale: Math.random() * 0.8 + 0.8 // Increased minimum scale for better visibility
        });
    }, []);

    return (
        <motion.div
            className="absolute bg-white rounded-full blur-xl pointer-events-none z-0"
            style={{
                top: `${style.top}%`,
                left: `${style.left}%`,
                width: '120px', // Slightly larger
                height: '120px',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.9, 0], scale: [0, 1.5, 0] }} // Higher peak opacity
            transition={{
                duration: 0.15, // Snappier flash
                repeat: Infinity,
                repeatDelay: Math.random() * 2 + 0.2, // Slightly more frequent
                ease: "easeOut"
            }}
        />
    );
};

// Floating Music Note Component
const MusicNote = () => {
    const [config] = useState(() => ({
        left: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        size: Math.random() * 20 + 20, // 20px - 40px
        rotation: Math.random() * 360,
        delay: -(Math.random() * 10)
    }));

    return (
        <motion.div
            className="absolute pointer-events-none z-0 text-white"
            style={{
                left: `${config.left}%`,
                top: '100%',
                // Removed filter to prevent rendering artifacts
            }}
            animate={{
                top: '-10%',
                opacity: [0, 1, 1, 0],
                rotate: [config.rotation, config.rotation + 360],
            }}
            transition={{
                duration: config.duration,
                repeat: Infinity,
                ease: "linear",
                delay: config.delay,
                repeatDelay: 0
            }}
        >
            <Music size={config.size} />
        </motion.div>
    );
};

export const AmisparkFloatingIcons: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[10]">
            {/* Spotlights - Instant Start */}
            <Spotlight position="left" delay={0} color="var(--color-drama)" />
            <Spotlight position="right" delay={0.2} color="var(--color-glitz-gold)" />

            {/* Flashbulbs - Paparazzi Effect */}
            {[...Array(8)].map((_, i) => (
                <Flashbulb key={`flash-${i}`} />
            ))}

            {/* Floating Music Notes */}
            {[...Array(15)].map((_, i) => (
                <MusicNote key={`note-${i}`} />
            ))}
        </div>
    );
};
