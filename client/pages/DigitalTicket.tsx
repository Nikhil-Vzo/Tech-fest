import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Clock, MapPin, User, Mail, CreditCard, AlertTriangle, Fingerprint } from 'lucide-react';
import { RahasyaCanvas } from '../components/RahasyaCanvas';

export const DigitalTicket: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [ticketData, setTicketData] = useState<any>(null);

    useEffect(() => {
        const data = searchParams.get('data');
        if (data) {
            try {
                const decoded = JSON.parse(atob(data));
                setTicketData(decoded);
            } catch (e) {
                console.error("Invalid ticket data", e);
            }
        }
    }, [searchParams]);

    if (!ticketData) {
        return (
            <div className="min-h-screen bg-black text-red-500 flex items-center justify-center font-mono">
                <div className="text-center p-8 border border-red-500 animate-pulse">
                    <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold">INVALID TICKET DATA</h1>
                    <p className="text-sm mt-2">Access Denied / Corrupted Link</p>
                </div>
            </div>
        );
    }

    // Force Rahasya theme if data suggests it, or if it's explicitly set
    const isRahasya = ticketData.is_rahasya || (ticketData.event && ticketData.event.includes('RAHASYA'));

    const formattedDate = new Date(ticketData.issued_at).toLocaleString('en-US', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: 'numeric', minute: 'numeric', hour12: true
    });

    return (
        // Main Container: Set background color here
        <div className={`min-h-screen flex items-center justify-center p-4 overflow-hidden relative ${isRahasya ? 'bg-noir-900 font-mono text-slate-300' : 'bg-bollywood-900 font-body text-glitz-paper'}`}>
            
            {/* LAYER 0: 3D Background (Rahasya Only) */}
            {isRahasya && (
                <div className="fixed inset-0 z-0 pointer-events-none">
                    {/* Ensure RahasyaCanvas handles its own sizing */}
                    <RahasyaCanvas />
                </div>
            )}

            {/* LAYER 1: Ambient Effects */}
            <div className="absolute inset-0 opacity-30 pointer-events-none z-1">
                <div className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] ${isRahasya ? 'bg-[conic-gradient(from_0deg,transparent_0_340deg,#dc2626_360deg)] animate-spin-slow' : 'bg-[conic-gradient(from_0deg,transparent_0_340deg,#8a2be2_360deg)] animate-spin-slow'}`}></div>
            </div>
            
            {/* LAYER 2: Content (Ticket) */}
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className={`relative overflow-hidden border-2 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl ${
                    isRahasya 
                    ? 'bg-black/80 border-blood shadow-blood/20 rounded-sm' 
                    : 'bg-bollywood-800/95 border-glitz-gold shadow-glitz-gold/20 rounded-xl'
                }`}>
                    
                    {/* Header */}
                    <div className={`p-6 text-center border-b ${isRahasya ? 'bg-blood/20 border-blood/50' : 'bg-drama/20 border-white/10'}`}>
                        <div className="flex justify-center mb-2">
                            <ShieldCheck className={`w-12 h-12 ${isRahasya ? 'text-blood animate-pulse' : 'text-glitz-gold'}`} />
                        </div>
                        <h2 className={`text-2xl font-bold tracking-widest uppercase ${isRahasya ? 'font-special-elite text-white' : 'font-display text-transparent bg-clip-text bg-gradient-to-r from-glitz-gold to-white'}`}>
                            {isRahasya ? 'ACCESS GRANTED' : 'OFFICIAL PASS'}
                        </h2>
                        <p className="text-[10px] opacity-70 tracking-[0.3em] uppercase mt-1">
                            {ticketData.event}
                        </p>
                    </div>

                    {/* Details Body */}
                    <div className="p-6 space-y-6 relative">
                        
                        <div className="text-center mb-4">
                            <h3 className="text-xl font-bold text-white leading-tight mb-1">{ticketData.attendee_name}</h3>
                            <p className={`text-xs font-bold uppercase ${isRahasya ? 'text-blood' : 'text-drama-light'}`}>{ticketData.college}</p>
                            
                            <div className="flex items-center justify-center gap-2 mt-2 opacity-70 text-[10px]">
                                <Mail className="w-3 h-3" />
                                <span>{ticketData.attendee_email}</span>
                            </div>
                        </div>

                        {/* Data Grid */}
                        <div className={`grid grid-cols-2 gap-y-3 gap-x-4 text-xs p-4 rounded border ${isRahasya ? 'bg-slate-900/50 border-slate-700' : 'bg-white/5 border-white/10'}`}>
                            
                            {/* Verification ID Field */}
                            <div className="col-span-2 pb-2 border-b border-white/5">
                                <p className="opacity-50 text-[9px] uppercase tracking-widest flex items-center gap-1">
                                    <Fingerprint className="w-3 h-3" /> Verification ID
                                </p>
                                <p className="font-mono font-bold text-white text-sm break-all">
                                    {ticketData.verification_id || 'NOT PROVIDED'}
                                </p>
                            </div>

                            {/* Zone */}
                            <div className="col-span-2 pb-2 border-b border-white/5">
                                <p className="opacity-50 text-[9px] uppercase tracking-widest">Access Zone</p>
                                <p className="font-bold text-white text-base">{ticketData.zone}</p>
                            </div>

                            <div>
                                <p className="opacity-50 text-[9px] uppercase tracking-widest">Ticket ID</p>
                                <p className="font-mono font-bold text-white">{ticketData.ticket_id.split('_')[1] || ticketData.ticket_id}</p>
                            </div>

                            <div className="text-right">
                                <p className="opacity-50 text-[9px] uppercase tracking-widest">Paid</p>
                                <p className="font-mono text-green-400">₹{ticketData.amount_paid}</p>
                            </div>

                            <div className="col-span-2 pt-2 mt-1 border-t border-white/10 flex justify-between items-center">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 opacity-50" />
                                    <span className="opacity-70 text-[10px]">{formattedDate}</span>
                                </div>
                                <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${isRahasya ? 'border-green-500/50 text-green-500 bg-green-500/10' : 'bg-green-500 text-white'}`}>
                                    {ticketData.status}
                                </div>
                            </div>
                        </div>

                        {/* Validated Animation */}
                        <div className="mt-4 flex justify-center">
                            <div className={`w-full py-2 flex items-center justify-center gap-2 font-bold tracking-widest text-[10px] uppercase border ${
                                isRahasya 
                                ? 'bg-green-900/20 border-green-600 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                                : 'bg-gradient-to-r from-glitz-gold to-drama text-white border-transparent rounded-full shadow-lg'
                            }`}>
                                <Check className="w-3 h-3" /> Authenticated
                            </div>
                        </div>
                    </div>

                    <div className="p-2 bg-black/50 text-center text-[9px] opacity-40 font-mono">
                        SECURE HASH: {ticketData.payment_ref}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};