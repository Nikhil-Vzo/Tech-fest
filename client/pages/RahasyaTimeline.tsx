import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RahasyaCanvas } from '../components/RahasyaCanvas';
import { SmoothScroll } from '../components/SmoothScroll';
import { RAHASYA_EVENTS } from '../constants';
import { Clock, MapPin, Crosshair, Radio, Search } from 'lucide-react';

export const RahasyaTimeline: React.FC = () => {
    const uniqueDays = Array.from(new Set(RAHASYA_EVENTS.map(e => e.date))).sort();
    const [selectedDay, setSelectedDay] = useState(uniqueDays[0] || 'Day 1');
    const filteredEvents = RAHASYA_EVENTS.filter(e => e.date === selectedDay);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen bg-noir-900 text-slate-300 font-mono overflow-hidden">
            <SmoothScroll />
            <RahasyaCanvas />

            <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 pointer-events-none z-0"></div>

            <div className="relative z-10 pt-4 pb-20 container mx-auto px-4 max-w-5xl">

                {/* Header */}
                <motion.div
                    className="text-center mb-16 border-b-2 border-slate-800 pb-8 relative"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-blood text-black text-xs font-bold px-2 py-0.5 uppercase tracking-widest z-20">
                        CLASSIFIED
                    </div>
                    <h5 className="text-blood font-bold tracking-[0.6em] text-xs mb-4 pt-6">CHRONOLOGICAL DATA</h5>
                    <h1 className="text-6xl md:text-8xl font-special-elite text-white uppercase leading-none drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                        INCIDENT <span className="text-transparent bg-clip-text bg-gradient-to-br from-blood to-red-900 border-b-4 border-blood">LOG</span>
                    </h1>
                </motion.div>

                {/* Day Selector */}
                <div className="flex justify-center mb-16 gap-4">
                    {uniqueDays.map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`px-6 py-2 border-2 text-sm font-bold font-special-elite tracking-widest uppercase transition-all duration-300 relative group overflow-hidden ${selectedDay === day
                                ? 'border-blood bg-blood text-black shadow-[0_0_20px_rgba(220,38,38,0.6)]'
                                : 'border-slate-700 text-slate-500 hover:border-slate-500 hover:text-white'
                                }`}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {selectedDay === day && <Radio className="w-3 h-3 animate-pulse" />}
                                {day}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2 md:translate-x-0">
                        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-blood to-transparent opacity-50"></div>
                        <div className="sticky top-1/2 w-3 h-3 bg-blood rounded-full -translate-x-[5px] animate-ping opacity-20"></div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        key={selectedDay} // Re-animate on day switch
                    >
                        {filteredEvents.map((event, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    variants={itemVariants}
                                    key={event.id}
                                    className={`relative flex flex-col md:items-center md:justify-between mb-12 md:mb-16 w-full ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                                >
                                    {/* Spacer/Empty Side (Desktop Only) */}
                                    <div className="hidden md:block md:w-5/12" />

                                    {/* Node / Reticle */}
                                    <div className="absolute left-6 md:left-1/2 -top-2 md:top-auto md:relative md:left-auto md:transform-none z-10 -translate-x-1/2 md:translate-x-0 flex items-center justify-center">
                                        <div className="bg-noir-900 p-1 border border-slate-700 rounded-full group-hover:border-blood transition-colors shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                                            {isLeft ? <Crosshair className="text-blood w-6 h-6 animate-spin-slow" /> : <Search className="text-white w-6 h-6 scale-75" />}
                                        </div>
                                    </div>

                                    {/* Card */}
                                    <div className={`w-full pl-12 md:pl-0 md:w-5/12 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                                        <div className="group relative bg-black border border-slate-800 p-6 hover:border-blood transition-colors duration-300">

                                            {/* Connector Trace (Desktop) */}
                                            <div className={`hidden md:block absolute top-1/2 h-px bg-slate-800 w-8 ${isLeft ? '-right-8' : '-left-8'}`}>
                                                <div className="absolute top-0 left-0 w-full h-full bg-blood transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                                            </div>

                                            {/* Connector Trace (Mobile) */}
                                            <div className="md:hidden absolute top-6 -left-6 w-6 h-px bg-slate-800"></div>

                                            {/* Tape Label */}
                                            <div className="absolute -top-3 -right-3 bg-yellow-600/90 text-black text-[10px] font-bold px-3 py-1 transform rotate-2 shadow-sm uppercase font-special-elite z-20">
                                                LOG #{String(100 + index)}
                                            </div>

                                            <div className="flex items-center gap-3 mb-3 border-b border-slate-800 pb-2">
                                                <Clock className="w-4 h-4 text-blood" />
                                                <span className="text-blood font-mono text-sm tracking-wider font-bold">{event.time}</span>
                                            </div>

                                            <h3 className="text-xl font-bold font-special-elite text-white mb-2 uppercase tracking-wide group-hover:text-blood transition-colors">
                                                {event.title}
                                            </h3>

                                            <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 font-mono">
                                                <span className="px-2 py-0.5 border border-slate-700 rounded-sm uppercase bg-slate-900">{event.category}</span>
                                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                                            </div>

                                            <p className="text-slate-400 text-sm font-typewriter leading-relaxed">
                                                {event.description}
                                            </p>

                                            {/* Corner Accents */}
                                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-700 group-hover:border-blood transition-colors"></div>
                                        </div>
                                    </div>

                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {filteredEvents.length === 0 && (
                        <div className="text-center py-20 border border-dashed border-slate-800 text-slate-600 font-mono uppercase tracking-widest bg-black/50">
                             /// DATA CORRUPTED OR MISSING ///
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
