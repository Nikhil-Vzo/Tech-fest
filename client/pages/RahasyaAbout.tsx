import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Fingerprint, Eye, Lock } from 'lucide-react';
import { RahasyaCanvas } from '../components/RahasyaCanvas';
import { SmoothScroll } from '../components/SmoothScroll';

export const RahasyaAbout: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 0.6, ease: "easeOut" as const }
        }
    };

    return (
        <div className="min-h-screen bg-noir-900 text-slate-300 font-mono overflow-hidden">
            <SmoothScroll />
            <RahasyaCanvas /> {/* Background consistency */}

            {/* Overlay Pattern */}
            <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 pointer-events-none z-0"></div>

            <div className="relative z-10 pt-4 pb-20 container mx-auto px-4 max-w-6xl">

                {/* Header - Dossier Style */}
                <motion.div
                    className="border-b-4 border-blood mb-16 pb-4 flex flex-col md:flex-row justify-between items-end"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <div>
                        <h5 className="text-blood font-bold tracking-[0.5em] text-xs mb-2">CLASSIFIED LEVEL 5</h5>
                        <h1 className="text-5xl md:text-7xl font-special-elite text-white mb-2">
                            CASE: <span className="text-blood">RAहस्य</span>
                        </h1>
                    </div>
                    <p className="text-xs font-typewriter opacity-60 mb-2 md:text-right">
                        DOC ID: 2026-X-ALPHA<br />
                        ORIGIN: UNKNOWN
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-16"
                >
                    {/* Mission Briefing */}
                    <div>
                        <motion.div variants={itemVariants} className="mb-10">
                            <h2 className="text-2xl text-white font-special-elite mb-6 flex items-center gap-3">
                                <Shield className="text-blood w-6 h-6" /> MISSION BRIEFING
                            </h2>
                            <p className="font-typewriter text-lg leading-relaxed text-slate-400">
                                <span className="bg-slate-800 text-transparent animate-pulse select-none" style={{ textShadow: "0 0 5px rgba(255,255,255,0.5)" }}>REDACTED</span> originated as a minor anomaly in the university mainframe. It has since evolved into a full-scale digital phenomenon.
                                <span className="text-white"> RAHASYA </span> is not just an event; it is an investigation into the unknown. We challenge agents to decode patterns, solve cryptograms, and expose the truth hidden within the algorithms.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6">
                            <div className="border border-slate-700 p-6 bg-black/50 hover:border-blood transition-colors group">
                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-900 p-3 mt-1">
                                        <Fingerprint className="text-blood w-6 h-6 group-hover:animate-ping" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold tracking-widest mb-2">THE OBJECTIVE</h3>
                                        <p className="text-sm opacity-70">To assemble the sharpest minds capable of navigating high-security firewalls and solving complex logical paradoxes.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-slate-700 p-6 bg-black/50 hover:border-blood transition-colors group">
                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-900 p-3 mt-1">
                                        <Eye className="text-blood w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold tracking-widest mb-2">SURVEILLANCE</h3>
                                        <p className="text-sm opacity-70">Every move is monitored. The system reacts to your choices. There are no coincidences in Rahasya.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* The Agents / Visuals */}
                    <div className="relative">
                        <div className="absolute -inset-4 border border-blood/20 opacity-50 pointer-events-none"></div>
                        <motion.div
                            variants={itemVariants}
                            className="bg-slate-900/80 p-1 font-mono text-xs text-green-500 mb-2 inline-block border border-green-900"
                        >
                            &gt; DECRYPTING IMAGE_DATA... 100%
                        </motion.div>

                        <motion.div
                            className="relative h-[500px] w-full bg-black overflow-hidden border-2 border-slate-800 grayscale hover:grayscale-0 transition-all duration-700 group"
                            variants={itemVariants}
                        >
                            {/* Image Placeholder - Replace with actual team image if available */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute inset-0 bg-[linear-gradient(transparent,black)]"></div>

                            {/* HUD Elements */}
                            <div className="absolute top-4 right-4 text-xs text-blood border border-blood px-2 py-1 animate-pulse">
                                REC ●
                            </div>
                            <div className="absolute bottom-8 left-8">
                                <h3 className="text-3xl font-bold text-white mb-1">UNIT 404</h3>
                                <p className="text-blood tracking-widest text-sm">CYBER INTELLIGENCE DIVISION</p>
                            </div>

                            {/* Crosshairs */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute top-1/2 left-1/2 w-20 h-20 border border-white/20 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                                <div className="absolute top-1/2 left-1/2 w-1 h-2 bg-white -translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute top-1/2 left-1/2 w-2 h-1 bg-white -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-8 grid grid-cols-2 gap-4">
                            <div className="bg-slate-900/50 p-4 border-l-2 border-blood">
                                <h4 className="text-white font-bold text-lg">Entire Department</h4>
                                <p className="text-xs uppercase tracking-widest text-slate-500">Suspects (Members)</p>
                            </div>
                            <div className="bg-slate-900/50 p-4 border-l-2 border-blood">
                                <h4 className="text-white font-bold text-lg">∞</h4>
                                <p className="text-xs uppercase tracking-widest text-slate-500">Unsolved Queries</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Footer Warning */}
                <motion.div
                    className="mt-20 pt-8 border-t border-slate-800 text-center"
                    variants={itemVariants}
                >
                    <Lock className="w-4 h-4 text-blood mx-auto mb-2" />
                    <p className="text-xs text-slate-600 uppercase tracking-[0.3em]">
                        Authorized Personnel Only. Accessing beyond this point requires Level 5 Clearance.
                    </p>
                </motion.div>

            </div>
        </div>
    );
};
