import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Clock, Mail, AlertTriangle, Fingerprint, History, AlertCircle } from 'lucide-react';
import { RahasyaCanvas } from '../components/RahasyaCanvas';
import { supabase } from '../src/supabaseClient';

export const DigitalTicket: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [ticketData, setTicketData] = useState<any>(null);
    const [scanHistory, setScanHistory] = useState<any[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const logAttempted = useRef(false);

    // 1. Decode Data
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

    // 2. Log Scan & Fetch History
    useEffect(() => {
        const handleScanLogic = async () => {
            if (!ticketData?.ticket_id) return;

            // A. Log the current scan (only once per page load)
            if (!logAttempted.current) {
                logAttempted.current = true;
                await supabase.from('ticket_scans').insert({
                    ticket_id: ticketData.ticket_id,
                    scanned_at: new Date().toISOString(),
                    device_info: navigator.userAgent
                });
            }

            // B. Fetch total history for this ticket
            const { data, error } = await supabase
                .from('ticket_scans')
                .select('*')
                .eq('ticket_id', ticketData.ticket_id)
                .order('scanned_at', { ascending: false }); // Newest first

            if (data) {
                setScanHistory(data);
            }
            setLoadingHistory(false);
        };

        if (ticketData) {
            handleScanLogic();
        }
    }, [ticketData]);

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

    const isRahasya = ticketData.is_rahasya || (ticketData.event && ticketData.event.includes('RAHASYA'));
    const scanCount = scanHistory.length;
    const isReused = scanCount > 1;

    const formattedDate = new Date(ticketData.issued_at).toLocaleString('en-US', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: 'numeric', minute: 'numeric', hour12: true
    });

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 overflow-hidden relative ${isRahasya ? 'bg-noir-900 font-mono text-slate-300' : 'bg-bollywood-900 font-body text-glitz-paper'}`}>
            
            {isRahasya && (
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <RahasyaCanvas />
                </div>
            )}

            <div className="absolute inset-0 opacity-30 pointer-events-none z-1">
                <div className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] ${isRahasya ? 'bg-[conic-gradient(from_0deg,transparent_0_340deg,#dc2626_360deg)] animate-spin-slow' : 'bg-[conic-gradient(from_0deg,transparent_0_340deg,#8a2be2_360deg)] animate-spin-slow'}`}></div>
            </div>
            
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
                    </div>

                    <div className="p-6 space-y-6 relative">
                        <div className="text-center mb-4">
                            <h3 className="text-xl font-bold text-white leading-tight mb-1">{ticketData.attendee_name}</h3>
                            <p className={`text-xs font-bold uppercase ${isRahasya ? 'text-blood' : 'text-drama-light'}`}>{ticketData.college}</p>
                            <div className="flex items-center justify-center gap-2 mt-2 opacity-70 text-[10px]">
                                <Mail className="w-3 h-3" />
                                <span>{ticketData.attendee_email}</span>
                            </div>
                        </div>

                        <div className={`grid grid-cols-2 gap-y-3 gap-x-4 text-xs p-4 rounded border ${isRahasya ? 'bg-slate-900/50 border-slate-700' : 'bg-white/5 border-white/10'}`}>
                            <div className="col-span-2 pb-2 border-b border-white/5">
                                <p className="opacity-50 text-[9px] uppercase tracking-widest flex items-center gap-1">
                                    <Fingerprint className="w-3 h-3" /> Verification ID
                                </p>
                                <p className="font-mono font-bold text-white text-sm break-all">
                                    {ticketData.verification_id || 'NOT PROVIDED'}
                                </p>
                            </div>
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
                        </div>

                        {/* --- SCAN HISTORY LOG --- */}
                        {!loadingHistory && (
                            <div className={`p-4 rounded border-l-4 ${isReused 
                                ? 'bg-red-500/10 border-red-500 text-red-200' 
                                : 'bg-green-500/10 border-green-500 text-green-200'
                            }`}>
                                <div className="flex items-start gap-3 mb-3">
                                    {isReused ? <AlertCircle className="w-5 h-5 shrink-0" /> : <Check className="w-5 h-5 shrink-0" />}
                                    <div>
                                        <p className="font-bold text-sm uppercase tracking-wider">
                                            {isReused ? `Warning: Scanned ${scanCount} Times` : 'Fresh Ticket: First Scan'}
                                        </p>
                                    </div>
                                </div>
                                
                                {isReused && (
                                    <div className="mt-2 text-[10px] font-mono opacity-80 space-y-1 pl-8 border-l border-white/10 ml-2">
                                        <div className="uppercase opacity-50 mb-1">Recent Activity:</div>
                                        {scanHistory.slice(0, 3).map((scan, index) => (
                                            <div key={scan.id} className="flex justify-between">
                                                <span>
                                                    {new Date(scan.scanned_at).toLocaleString('en-US', {
                                                        hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
                                                    })}
                                                </span>
                                                <span className="opacity-50">{index === 0 ? '(Just Now)' : '(Previous)'}</span>
                                            </div>
                                        ))}
                                        {scanCount > 3 && <div>...and {scanCount - 3} more</div>}
                                    </div>
                                )}
                            </div>
                        )}

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