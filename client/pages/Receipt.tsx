import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Home, Download, Mail, User, ShieldCheck, MapPin, AlertCircle, Loader2 } from 'lucide-react';
import { Card, Button } from '../components/UIComponents';
import QRCode from "react-qr-code";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Confetti from 'react-confetti';

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

export const Receipt: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    const [isDownloading, setIsDownloading] = useState(false);
    
    // Retrieve data
    const { paymentId, orderId, amount, items, user, verificationId } = location.state || {};

    if (!paymentId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">No Receipt Found</h2>
                    <Button onClick={() => navigate('/')}>Return Home</Button>
                </div>
            </div>
        );
    }

    const isRahasya = location.pathname.includes('/rahasya');
    const bollywoodColors = ['#FFD700', '#FF69B4', '#8A2BE2', '#00FFFF', '#FFA500', '#ffffff'];
    const rahasyaColors = ['#dc2626', '#7f1d1d', '#000000', '#333333', '#ffffff'];

    const ticketRawData = {
        event: "AMISPARK x RAHASYA 2026",
        ticket_id: orderId,
        payment_ref: paymentId,
        attendee_name: `${user?.firstName} ${user?.lastName}`,
        attendee_email: user?.email,
        college: user?.college,
        verification_id: verificationId,
        zone: items?.join(', '),
        amount_paid: amount,
        status: "CONFIRMED",
        is_rahasya: isRahasya,
        issued_at: new Date().toISOString()
    };
    const encodedData = btoa(JSON.stringify(ticketRawData));
    const qrUrl = `${window.location.origin}/#/ticket-view?data=${encodedData}`;

    // --- FIXED DOWNLOAD FUNCTION ---
    const handleDownload = async () => {
        const element = document.getElementById('download-wrapper'); // TARGET BY ID
        if (!element) {
            console.error("Receipt element not found!");
            return;
        }

        setIsDownloading(true);

        try {
            // Wait a moment for UI to settle
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(element, {
                backgroundColor: isRahasya ? '#000000' : '#2e1065', // Hardcode bg color to avoid transparency issues
                scale: 2, // High resolution
                useCORS: true, // Allow external images if any
                logging: false
            });

            const imgData = canvas.toDataURL('image/png');
            
            // A4 Portrait Setup
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // Add image to PDF
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
            pdf.save(`Ticket_${user?.firstName}_${orderId}.pdf`);

        } catch (error) {
            console.error("PDF Generation Failed:", error);
            alert("Failed to download PDF. Please try again or take a screenshot.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className={`min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4 ${isRahasya ? 'bg-noir-900 text-slate-300 font-mono' : 'bg-bollywood-900 text-glitz-paper font-body'}`}>
            
            <Confetti
                width={width}
                height={height}
                colors={isRahasya ? rahasyaColors : bollywoodColors}
                recycle={false}
                numberOfPieces={800}
                gravity={0.2}
                className="z-0 pointer-events-none"
            />

            <div className="container mx-auto max-w-2xl relative z-10">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-r blur-3xl opacity-30 pointer-events-none -z-10 ${isRahasya ? 'from-red-900 via-black to-red-900' : 'from-purple-600 via-pink-600 to-blue-600'}`}></div>

                {/* WRAPPER DIV WITH ID FOR CAPTURE */}
                <div id="download-wrapper" className="p-1">
                    <Card className={`p-8 text-center relative overflow-hidden shadow-2xl ${isRahasya ? 'bg-black/90 border-red-900/50 shadow-red-900/20' : 'bg-bollywood-800/95 border-drama/50 shadow-drama/30'}`}>
                        
                        <div className="mb-6 relative inline-block">
                            <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${isRahasya ? 'bg-red-600' : 'bg-green-500'}`}></div>
                            <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center mx-auto border-2 bg-black/30 backdrop-blur-sm ${isRahasya ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}`}>
                                <Check className="w-10 h-10" />
                            </div>
                        </div>

                        <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${isRahasya ? 'font-special-elite text-red-500' : 'font-display text-transparent bg-clip-text bg-gradient-to-r from-glitz-gold via-white to-glitz-gold'}`}>
                            {isRahasya ? 'ACCESS GRANTED' : "YOU'RE IN!"}
                        </h1>
                        <p className="text-lg opacity-80 mb-6">See you at the fest!</p>

                        {/* Mail Notification */}
                        <div className={`mb-8 p-4 rounded-lg border flex flex-col items-center gap-2 ${isRahasya ? 'bg-red-900/10 border-red-800 text-red-200' : 'bg-indigo-900/30 border-indigo-400/30 text-indigo-100'}`}>
                            <div className="flex items-center gap-2 font-bold text-lg">
                                <Mail className="w-5 h-5" /> Ticket Sent to Email
                            </div>
                            <p className="text-sm opacity-80 text-center px-4">
                                Your official entry pass has been mailed to <span className="font-bold underline">{user?.email}</span>.
                            </p>
                            <div className={`mt-2 text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full flex items-center gap-2 ${isRahasya ? 'bg-red-500/20 text-red-300' : 'bg-white/20 text-white'}`}>
                                <AlertCircle className="w-3 h-3" /> Please scan the mailed ticket at the gate
                            </div>
                        </div>

                        {/* QR Code */}
                        <div className={`inline-block mb-8 p-4 rounded-xl border backdrop-blur-sm ${isRahasya ? 'bg-red-950/30 border-red-900/50' : 'bg-white/10 border-white/20'}`}>
                            <div className="bg-white p-3 rounded-lg shadow-lg">
                                <QRCode value={qrUrl} size={150} level="M" />
                            </div>
                            <p className="mt-2 text-[10px] font-bold opacity-70 uppercase tracking-widest">Instant Receipt Copy</p>
                        </div>

                        {/* Details */}
                        <div className={`text-left p-6 rounded-lg mb-4 text-sm space-y-3 ${isRahasya ? 'bg-slate-900/80 border border-slate-700' : 'bg-black/30 border border-white/10'}`}>
                            <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-3">
                                <span className="opacity-70">Amount Paid</span>
                                <span className={`font-bold text-xl ${isRahasya ? 'text-red-400' : 'text-green-400'}`}>₹{amount}</span>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex justify-between items-center">
                                    <span className="opacity-60 flex items-center gap-2"><User className="w-3 h-3" /> Name</span>
                                    <span className="font-bold">{user?.firstName} {user?.lastName}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="opacity-60 flex items-center gap-2"><Mail className="w-3 h-3" /> Email</span>
                                    <span className="truncate max-w-[200px]">{user?.email}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="opacity-60 flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> Verify ID</span>
                                    <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-xs">{verificationId || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="opacity-60 flex items-center gap-2"><MapPin className="w-3 h-3" /> Access Zone</span>
                                    <span className="font-bold text-drama-light">{items?.join(', ')}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-white/5 mt-2">
                                    <span className="opacity-50 text-xs">Order Ref</span>
                                    <span className="font-mono text-xs opacity-70">{orderId}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Buttons (OUTSIDE THE CAPTURE DIV) */}
                <div className="flex flex-col md:flex-row gap-4 justify-center relative z-20 mt-8">
                    <Button onClick={() => navigate('/')} className="flex items-center gap-2 justify-center w-full md:w-auto order-2 md:order-1 opacity-80 hover:opacity-100">
                        <Home className="w-4 h-4" /> Home
                    </Button>
                    <Button 
                        onClick={handleDownload} 
                        disabled={isDownloading}
                        className={`flex items-center gap-2 justify-center w-full md:w-auto order-1 md:order-2 font-bold py-3 px-8 shadow-lg transform hover:-translate-y-1 transition-all ${isRahasya ? 'bg-red-700 hover:bg-red-600 shadow-red-900/30' : 'bg-gradient-to-r from-drama to-purple-600 hover:from-drama-light hover:to-purple-500 shadow-purple-900/30'}`}
                    >
                        {isDownloading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" /> Generating...
                            </>
                        ) : (
                            <>
                                <Download className="w-5 h-5" /> Download PDF Receipt
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};