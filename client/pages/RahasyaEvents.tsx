import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RahasyaCanvas } from '../components/RahasyaCanvas';
import { SmoothScroll } from '../components/SmoothScroll';
import { RAHASYA_EVENTS } from '../constants';
import { Calendar, MapPin, Search } from 'lucide-react';

export const RahasyaEvents: React.FC = () => {
    const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-noir-900 text-slate-300 font-mono overflow-hidden">
            <SmoothScroll />
            <RahasyaCanvas />

            <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 pointer-events-none z-0"></div>

            <div className="relative z-10 pt-4 pb-20 container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <motion.header
                    className="mb-16 border-b-2 border-slate-800 pb-6 flex justify-between items-end"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div>
                        <h5 className="text-blood font-bold tracking-[0.5em] text-xs mb-2">EVIDENCE LOG</h5>
                        <h1 className="text-6xl md:text-8xl font-special-elite text-white uppercase leading-none">
                            CASE <span className="text-transparent bg-clip-text bg-gradient-to-br from-blood to-red-900">FILES</span>
                        </h1>
                    </div>
                    <div className="hidden md:block text-right font-special-elite text-xs text-slate-500">
                        <p>TOTAL RECORDS: {RAHASYA_EVENTS.length}</p>
                        <p>CLEARANCE REQ: LEVEL 3</p>
                    </div>
                </motion.header>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {RAHASYA_EVENTS.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative bg-black border border-slate-800 hover:border-blood transition-all duration-300 h-[400px] flex flex-col overflow-hidden"
                            onMouseEnter={() => setHoveredEvent(index)}
                            onMouseLeave={() => setHoveredEvent(null)}
                        >
                            {/* Tape Overlay */}
                            <div className="absolute top-4 -right-8 w-32 h-6 bg-yellow-600/80 transform rotate-45 flex items-center justify-center text-[10px] text-black font-bold z-20 shadow-md">
                                EVID-{String(index + 1).padStart(3, '0')}
                            </div>

                            {/* Image Section */}
                            <div className="h-48 overflow-hidden relative border-b border-slate-800">
                                <img
                                    src={event.image || `https://source.unsplash.com/random/800x600?cyberpunk,tech&sig=${index}`}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                                />
                                <div className="absolute inset-0 bg-blood/10 group-hover:bg-transparent transition-colors"></div>
                                {/* Scanline */}
                                <div className="absolute inset-0 bg-scanline opacity-20 pointer-events-none"></div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 flex-1 flex flex-col justify-between relative">
                                <div>
                                    <h3 className="text-2xl font-special-elite text-white mb-2 group-hover:text-blood transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 font-mono mb-4 line-clamp-3 leading-relaxed">
                                        {hoveredEvent === index ? event.description :
                                            // Redacted effect for description when not hovered
                                            event.description.split(' ').map(word =>
                                                Math.random() > 0.5 ? '█'.repeat(word.length) : word
                                            ).join(' ')
                                        }
                                    </p>
                                </div>

                                <div className="space-y-2 border-t border-slate-800 pt-4 text-xs font-mono text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3 h-3 text-blood" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-3 h-3 text-blood" />
                                        <span>{event.venue}</span>
                                    </div>
                                </div>

                                <button className="mt-4 w-full border border-slate-700 hover:bg-blood hover:text-black hover:border-blood text-white py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2">
                                    <Search className="w-3 h-3" /> ACCESS FILE
                                </button>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-600 group-hover:border-blood transition-colors"></div>
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-600 group-hover:border-blood transition-colors"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
