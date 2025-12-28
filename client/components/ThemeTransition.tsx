import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const ThemeTransition: React.FC = () => {
    const location = useLocation();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionType, setTransitionType] = useState<'to-rahasya' | 'to-amispark' | null>(null);
    const prevPathRef = useRef(location.pathname);

    useEffect(() => {
        const currentPath = location.pathname;
        const prevPath = prevPathRef.current;

        const isRahasya = (path: string) => path.startsWith('/rahasya');
        const isAmispark = (path: string) => !path.startsWith('/rahasya');

        // Only trigger if actually changing themes
        if (isAmispark(prevPath) && isRahasya(currentPath)) {
            setTransitionType('to-rahasya');
            setIsTransitioning(true);
        } else if (isRahasya(prevPath) && isAmispark(currentPath)) {
            setTransitionType('to-amispark');
            setIsTransitioning(true);
        }

        prevPathRef.current = currentPath;

    }, [location.pathname]);

    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
                setTransitionType(null);
            }, 2500); // 2.5s duration
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    if (!isTransitioning) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden">
            {/* Static Noise Overlay */}
            <div className="absolute inset-0 bg-static-noise opacity-20 animate-pulse"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                {transitionType === 'to-rahasya' && (
                    <div className="animate-fade-in">
                        <h1 className="text-5xl md:text-8xl font-bold text-red-600 font-special-elite animate-glitch tracking-tighter mb-4 shadow-red-500/50 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]">
                            SYSTEM BREACH
                        </h1>
                        <p className="text-xl md:text-2xl text-white font-mono animate-pulse tracking-[0.5em] uppercase">
                            ENTERING RESTRICTED ZONE...
                        </p>
                    </div>
                )}

                {transitionType === 'to-amispark' && (
                    <div className="relative animate-fade-in flex flex-col items-center">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 blur-3xl opacity-20 animate-pulse rounded-full" />
                        <h1 className="relative text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 font-display animate-bounce-slow tracking-tighter mb-4 drop-shadow-[0_0_25px_rgba(236,72,153,0.5)]">
                            BACK TO FUN
                        </h1>
                        <p className="relative text-xl md:text-3xl text-white font-body animate-pulse tracking-[0.3em] font-bold uppercase mt-4">
                            ✨ LET THE PARTY BEGIN ✨
                        </p>
                    </div>
                )}
            </div>

            {/* Scanlines / Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,black_90%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
        </div>
    );
};
