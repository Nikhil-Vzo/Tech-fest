import React, { useState } from 'react';
import { Lock, Shield, Terminal, Mic, Eye, Database, ChevronRight } from 'lucide-react';

const CASE_FILES = [
    {
        id: '001',
        title: 'Hack The Mainframe',
        time: '10:00 AM',
        day: 'DAY 1',
        category: 'CODE BREAKING',
        description: 'A 24-hour coding marathon. Crack the secure server before time runs out.',
        icon: Lock,
        color: 'text-yellow-500'
    },
    {
        id: '002',
        title: 'Drone Forensics',
        time: '02:00 PM',
        day: 'DAY 1',
        category: 'FORENSICS',
        description: 'Analyze flight paths and recover data from crashed drones.',
        icon: Database,
        color: 'text-yellow-500'
    },
    {
        id: '003',
        title: 'The Dark Web Seminar',
        time: '11:00 AM',
        day: 'DAY 2',
        category: 'TRAINING',
        description: 'Expert session on cybersecurity threats lurking in the shadows.',
        icon: Mic,
        color: 'text-red-500' // Red border/glow in screenshot
    },
    {
        id: '004',
        title: 'Capture The Flag',
        time: '01:00 PM',
        day: 'DAY 2',
        category: 'CYBER CRIMES',
        description: 'Penetration testing competition. Find the flags, claim the bounty.',
        icon: Shield,
        color: 'text-yellow-500'
    },
    {
        id: '005',
        title: 'The Final Verdict',
        time: '05:00 PM',
        day: 'DAY 3',
        category: 'INTERROGATION',
        description: 'Closing ceremony and awards distribution for top investigators.',
        icon: Eye, // Mask icon replacement
        color: 'text-yellow-500'
    },
    {
        id: '006',
        title: 'Cold Case Solved',
        time: '02:00 PM',
        day: 'DAY 3',
        category: 'UNDERCOVER',
        description: 'Panel discussion with industry experts on resolving impossible cases.',
        icon: Terminal,
        color: 'text-yellow-500'
    }
];

const CATEGORIES = ['ALL', 'CODE BREAKING', 'FORENSICS', 'INTERROGATION', 'CYBER CRIMES', 'UNDERCOVER', 'TRAINING'];

export const RahasyaEvents: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('ALL');

    const filteredFiles = activeCategory === 'ALL'
        ? CASE_FILES
        : CASE_FILES.filter(file => file.category === activeCategory);

    return (
        <div className="min-h-screen bg-noir-900 text-slate-300 font-mono py-20">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 font-special-elite tracking-tighter">CASE FILES</h1>
                    <div className="inline-block bg-blood/10 border border-blood px-4 py-1">
                        <span className="text-blood font-bold tracking-[0.3em] text-sm uppercase font-special-elite">CLASSIFIED EVIDENCE</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 text-xs font-bold tracking-widest uppercase border transition-all ${activeCategory === category
                                ? 'bg-blood border-blood text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                                : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFiles.map((file) => (
                        <div
                            key={file.id}
                            className={`bg-black/40 border ${file.id === '003' ? 'border-blood/50 shadow-[0_0_20px_rgba(220,38,38,0.1)]' : 'border-slate-800'} p-6 relative group hover:bg-slate-900/80 transition-all`}
                        >
                            {/* Tag */}
                            <div className={`absolute -top-3 -right-3 px-3 py-1 text-[10px] font-bold tracking-widest uppercase transform rotate-2 shadow-lg ${file.id === '003' ? 'bg-blood text-white' : 'bg-yellow-500 text-black'}`}>
                                EVIDENCE #{file.id}
                            </div>

                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 rounded-full bg-slate-800/50 ${file.color}`}>
                                    <file.icon className="w-6 h-6" />
                                </div>
                                <span className="text-xs text-slate-600 font-bold tracking-widest uppercase">{file.day}</span>
                            </div>

                            <h3 className={`text-xl font-bold mb-2 ${file.id === '003' ? 'text-blood' : 'text-white'}`}>{file.title}</h3>

                            <div className="flex items-center text-xs text-slate-500 mb-4 font-bold tracking-wider uppercase">
                                <Clock className="w-3 h-3 mr-2" />
                                {file.time}
                            </div>

                            <p className="text-sm text-slate-400 leading-relaxed mb-8 border-t border-slate-800/50 pt-4">
                                {file.description}
                            </p>

                            <div className="flex justify-between items-end">
                                <span className="text-[10px] text-blood font-bold tracking-widest uppercase">CONFIDENTIAL</span>
                                <button className="text-xs text-slate-500 hover:text-white flex items-center transition-colors group-hover:translate-x-1 duration-300">
                                    Read File <ChevronRight className="w-3 h-3 ml-1" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

// Helper component for the Clock icon since it was missing in imports
function Clock({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}
