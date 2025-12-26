import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Search, Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '../components/UIComponents';

export const RahasyaHome: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date('2026-02-17T00:00:00'); // Updated to Oct 15 as per screenshot
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

    return (
        <div className="min-h-screen bg-noir-900 text-slate-300 font-mono selection:bg-blood selection:text-white">
            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-black opacity-90 z-0" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-20 z-0 mix-blend-overlay" />

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center p-4 w-full">

                    <div className="mb-8 transform -rotate-2">
                        <span className="bg-blood text-white px-6 py-2 text-sm font-bold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(220,38,38,0.5)] font-special-elite">
                            INVESTIGATION ACTIVE
                        </span>
                    </div>

                    <div className="border border-white/30 px-12 py-4 mb-12 backdrop-blur-sm bg-black/30 w-full max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-[0.2em] text-center font-special-elite">
                            AMISPARK <span className="text-blood">x</span> RAहस्य
                        </h1>
                    </div>

                    <div className="max-w-3xl border-y border-slate-700 py-8 mb-12 w-full">
                        <p className="text-xl md:text-2xl text-slate-300 font-special-elite leading-relaxed">
                            "Every line of code is a clue. Every bug is a<br />
                            <span className="text-white font-bold">suspect.</span>"
                        </p>
                    </div>

                    {/* Countdown */}
                    <div className="flex gap-4 md:gap-8 mb-12">
                        {[
                            { label: 'DAYS', value: timeLeft.days },
                            { label: 'HOURS', value: timeLeft.hours },
                            { label: 'MINUTES', value: timeLeft.minutes },
                            { label: 'SECONDS', value: timeLeft.seconds }
                        ].map((item) => (
                            <div key={item.label} className="flex flex-col items-center">
                                <div className="w-20 h-24 md:w-24 md:h-32 border border-slate-700 bg-black/50 flex items-center justify-center mb-2 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-blood/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                    <span className="text-4xl md:text-5xl font-bold text-blood font-special-elite z-10">{item.value.toString().padStart(2, '0')}</span>
                                </div>
                                <span className="text-[10px] text-slate-500 tracking-[0.2em] uppercase font-special-elite">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 w-full max-w-xl">
                        <Link to="/rahasya/booking" className="flex-1">
                            <button className="w-full bg-blood hover:bg-red-700 text-white py-4 px-8 font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] clip-path-slanted font-special-elite">
                                JOIN INVESTIGATION
                            </button>
                        </Link>
                        <Link to="/rahasya/events" className="flex-1">
                            <button className="w-full bg-transparent hover:bg-white/5 text-white border border-slate-600 py-4 px-8 font-bold tracking-widest uppercase transition-all font-special-elite">
                                VIEW CASE FILES
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Scrolling Strip */}
            <div className="bg-caution-tape py-3 overflow-hidden relative border-y-4 border-black">
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className="mx-4 text-black font-bold text-sm tracking-widest uppercase flex items-center font-special-elite">
                            /// BREAKING NEWS: CAMPUS LOCKDOWN INITIATED /// SUSPECT AT LARGE IN SERVER ROOM /// PREPARE FOR ENCRYPTION PROTOCOLS
                        </span>
                    ))}
                </div>
            </div>

            {/* Info Cards */}
            <section className="bg-noir-900 py-20 border-b border-slate-800">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-800 border border-slate-800 bg-black/20">
                        {/* Card 1 */}
                        <div className="p-10 group hover:bg-slate-900/50 transition-colors relative overflow-hidden">
                            <div className="absolute left-0 top-10 bottom-10 w-1 bg-blood transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                            <Calendar className="w-10 h-10 text-blood mb-6" />
                            <h3 className="text-xl font-bold text-white mb-2 font-special-elite uppercase tracking-wider">DATE OF INCIDENT</h3>
                            <p className="text-slate-400 mb-4 font-typewriter">October 15-17, 2026</p>
                            <p className="text-xs text-slate-600 uppercase tracking-widest font-special-elite">Mark your calendar timeline.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-10 group hover:bg-slate-900/50 transition-colors relative overflow-hidden">
                            <div className="absolute left-0 top-10 bottom-10 w-1 bg-caution-tape transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                            <MapPin className="w-10 h-10 text-yellow-500 mb-6" />
                            <h3 className="text-xl font-bold text-white mb-2 font-special-elite uppercase tracking-wider">CRIME SCENE</h3>
                            <p className="text-slate-400 mb-4 font-typewriter">University Main Campus</p>
                            <p className="text-xs text-slate-600 uppercase tracking-widest font-special-elite">Sector 7, Tech Block.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-10 group hover:bg-slate-900/50 transition-colors relative overflow-hidden">
                            <div className="absolute left-0 top-10 bottom-10 w-1 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                            <Clock className="w-10 h-10 text-white mb-6" />
                            <h3 className="text-xl font-bold text-white mb-2 font-special-elite uppercase tracking-wider">DURATION</h3>
                            <p className="text-slate-400 mb-4 font-typewriter">72 Hours Non-Stop</p>
                            <p className="text-xs text-slate-600 uppercase tracking-widest font-special-elite">Sleep is for the innocent.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};
