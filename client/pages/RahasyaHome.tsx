import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { RAHASYA_BACKGROUNDS } from '../constants';
import { RahasyaCanvas } from '../components/RahasyaCanvas';
import { SmoothScroll } from '../components/SmoothScroll';
import { motion } from 'framer-motion';

export const RahasyaHome: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [bgImage, setBgImage] = useState('');

    useEffect(() => {
        const randomBg = RAHASYA_BACKGROUNDS[Math.floor(Math.random() * RAHASYA_BACKGROUNDS.length)];
        setBgImage(randomBg);

        const targetDate = new Date('2026-02-17T00:00:00');
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 2.5
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
    };

    return (
        <div className="min-h-screen bg-noir-900 text-slate-300 font-mono selection:bg-blood selection:text-white overflow-hidden">
            <SmoothScroll />

            {/* Hero Section */}
            <section className="relative min-h-screen h-auto flex flex-col items-center justify-start overflow-hidden pt-0 -mt-2 pb-32">
                {/* Fallback Background for reliability + Blend */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10 z-0 transition-opacity duration-1000"
                    style={{ backgroundImage: `url('${bgImage}')` }}
                />

                {/* 3D Background Layer - Moved here to sit ON TOP of bg image but BEHIND content */}
                <RahasyaCanvas />

                {/* Visual Effects Overlays */}
                <div className="absolute inset-0 bg-scanline z-0 pointer-events-none opacity-30 mix-blend-overlay" />
                <div className="absolute inset-0 bg-vignette z-0 pointer-events-none" />

                <motion.div
                    className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center p-4 w-full"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >

                    <motion.div variants={itemVariants} className="mb-6 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                        <span className="bg-blood text-black px-4 md:px-6 py-2 text-[10px] md:text-sm font-bold tracking-widest md:tracking-[0.3em] uppercase shadow-[0_0_25px_rgba(220,38,38,0.8)] font-special-elite animate-pulse border-2 border-white whitespace-nowrap">
                            ⚠ SYSTEM BREACH DETECTED ⚠
                        </span>
                    </motion.div>

                    <motion.div variants={itemVariants} className="border-x-4 border-blood/50 px-4 py-6 md:px-8 md:py-8 mb-8 backdrop-blur-md bg-black/60 w-full max-w-4xl relative overflow-hidden group shadow-2xl">
                        {/* Glitch Overlay Elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-blood/20 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-blood/20 animate-pulse"></div>

                        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-[0.15em] text-center font-special-elite leading-tight drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                            AMISPARK <span className="text-blood text-glow-red inline-block hover:animate-glitch">x</span> RAहस्य
                        </h1>
                        <p className="mt-4 text-blood/80 tracking-widest md:tracking-[0.5em] text-[10px] md:text-sm uppercase font-bold whitespace-nowrap">/// CLASSIFIED EVENT PROTOCOL_2026 ///</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="max-w-2xl border-l-2 border-blood pl-6 py-4 mb-10 w-full text-left bg-gradient-to-r from-black/60 to-transparent">
                        <p className="text-2xl md:text-3xl text-slate-200 font-special-elite leading-snug">
                            "IN A CITY OF ALGORITHMS,<br />
                            <span className="text-blood font-bold text-glow-red">TRUTH</span> IS THE ONLY<br />
                            UNPATCHABLE BUG."
                        </p>
                    </motion.div>

                    {/* Countdown */}
                    <motion.div variants={itemVariants} className="flex gap-4 md:gap-8 mb-12">
                        {[
                            { label: 'T-MINUS DAYS', value: timeLeft.days },
                            { label: 'HRS', value: timeLeft.hours },
                            { label: 'MIN', value: timeLeft.minutes },
                            { label: 'SEC', value: timeLeft.seconds }
                        ].map((item) => (
                            <div key={item.label} className="flex flex-col items-center group">
                                <div className="w-16 h-20 md:w-24 md:h-32 bg-black/80 border-2 border-slate-800 group-hover:border-blood flex items-center justify-center mb-2 relative overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-colors duration-300">
                                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(220,38,38,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine"></div>
                                    <span className="text-3xl md:text-5xl font-bold text-white group-hover:text-blood font-special-elite z-10 font-mono">{item.value.toString().padStart(2, '0')}</span>
                                </div>
                                <span className="text-[10px] text-blood/70 tracking-[0.2em] uppercase font-bold">{item.label}</span>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-8 w-full max-w-2xl">
                        <Link to="/rahasya/booking" className="flex-1 group">
                            <button className="w-full bg-blood hover:bg-black hover:text-blood border-2 border-transparent hover:border-blood text-white py-5 px-8 font-bold tracking-[0.2em] uppercase transition-all shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:shadow-[0_0_50px_rgba(220,38,38,0.8)] clip-path-slanted font-special-elite text-lg relative overflow-hidden">
                                <span className="relative z-10">BUY TICKETS</span>
                            </button>
                        </Link>
                        <Link to="/rahasya/events" className="flex-1">
                            <button className="w-full bg-black/50 hover:bg-white/10 text-slate-300 border-2 border-slate-600 border-b-[6px] hover:border-white py-5 px-8 font-bold tracking-[0.2em] uppercase transition-all font-special-elite text-lg relative z-10 group-hover:text-white">
                                ACCESS EVIDENCE
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Scrolling Strip */}
            <div className="bg-black pb-3 pt-[22px] overflow-hidden relative border-y-4 border-blood mt-[35px] rotate-1 scale-105 shadow-2xl z-20">
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className="mx-4 text-blood font-bold text-sm tracking-widest uppercase flex items-center font-special-elite">
                            /// BREAKING NEWS: CAMPUS LOCKDOWN INITIATED /// SUSPECT AT LARGE IN SERVER ROOM /// PREPARE FOR ENCRYPTION PROTOCOLS
                        </span>
                    ))}
                </div>
            </div>

            {/* Info Cards */}
            <section className="bg-noir-900 py-20 border-b border-slate-800 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-10 bg-black/40 border border-slate-800 hover:border-blood transition-all group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-blood/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                            <Calendar className="w-12 h-12 text-blood mb-6 relative z-10" />
                            <h3 className="text-xl font-bold text-white mb-2 font-special-elite uppercase tracking-wider relative z-10">DATE OF INCIDENT</h3>
                            <p className="text-slate-400 mb-4 font-typewriter relative z-10">October 15-17, 2026</p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-10 bg-black/40 border border-slate-800 hover:border-yellow-500 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-yellow-500/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                            <MapPin className="w-12 h-12 text-yellow-500 mb-6 relative z-10" />
                            <h3 className="text-xl font-bold text-white mb-2 font-special-elite uppercase tracking-wider relative z-10">CRIME SCENE</h3>
                            <p className="text-slate-400 mb-4 font-typewriter relative z-10">University Main Campus</p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="p-10 bg-black/40 border border-slate-800 hover:border-white transition-all group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                            <Clock className="w-12 h-12 text-white mb-6 relative z-10" />
                            <h3 className="text-xl font-bold text-white mb-2 font-special-elite uppercase tracking-wider relative z-10">DURATION</h3>
                            <p className="text-slate-400 mb-4 font-typewriter relative z-10">72 Hours Non-Stop</p>
                        </motion.div>
                    </div>
                </div>
            </section>

        </div>
    );
};
