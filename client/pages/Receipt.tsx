import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Home, AlertTriangle } from 'lucide-react';
import { Card, Button } from '../components/UIComponents';
import QRCode from "react-qr-code";

export const Receipt: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Retrieve data passed from Booking page
    const { paymentId, orderId, amount, items, user, verificationId } = location.state || {};

    // Fallback if accessed directly without data
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

    // 1. Create the data object - WITH VERIFICATION ID
    const ticketRawData = {
        event: "AMISPARK x RAHASYA 2026",
        ticket_id: orderId,
        payment_ref: paymentId,
        attendee_name: `${user?.firstName} ${user?.lastName}`,
        attendee_email: user?.email,
        college: user?.college,
        verification_id: verificationId, // Ensuring this is passed
        zone: items?.join(', '),
        amount_paid: amount,
        status: "CONFIRMED",
        is_rahasya: isRahasya,
        issued_at: new Date().toISOString()
    };

    // 2. Encode it for the URL (Base64)
    const encodedData = btoa(JSON.stringify(ticketRawData));
    
    // 3. Construct the Full URL
    const qrUrl = `${window.location.origin}/#/ticket-view?data=${encodedData}`;

    return (
        <div className={`min-h-screen py-24 px-4 ${isRahasya ? 'bg-noir-900 text-slate-300 font-mono' : 'bg-bollywood-900 text-glitz-paper font-body'}`}>
            <div className="container mx-auto max-w-2xl">
                
                <Card className={`p-8 text-center ${isRahasya ? 'bg-black/40 border-green-900' : 'bg-bollywood-800 border-green-500/30'}`}>
                    
                    {/* Success Icon */}
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50">
                        <Check className="w-10 h-10 text-green-500" />
                    </div>

                    <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${isRahasya ? 'font-special-elite text-white' : 'font-display text-white'}`}>
                        PAYMENT SUCCESSFUL
                    </h1>
                    <p className="text-lg opacity-80 mb-8">Transaction ID: {paymentId}</p>

                    {/* QR Code Section */}
                    <div className="flex flex-col items-center justify-center mb-8">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <QRCode 
                                value={qrUrl}
                                size={180}
                                level="M"
                                fgColor="#000000"
                                bgColor="#ffffff"
                            />
                        </div>
                        <p className="mt-4 text-xs font-mono opacity-50 uppercase tracking-widest">
                            Scan to View Digital Ticket
                        </p>
                    </div>

                    {/* Receipt Details */}
                    <div className={`text-left p-6 rounded-lg mb-8 ${isRahasya ? 'bg-slate-900 border border-slate-700' : 'bg-black/20 border border-white/10'}`}>
                        <div className="flex justify-between mb-4 border-b border-white/10 pb-4">
                            <span className="opacity-70">Amount Paid</span>
                            <span className="font-bold text-xl text-green-400">₹{amount}</span>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="opacity-70">Order ID</span>
                                <span>{orderId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-70">Name</span>
                                <span>{user?.firstName} {user?.lastName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-70">Email</span>
                                <span>{user?.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-70">Verification ID</span>
                                <span className="font-mono text-xs">{verificationId || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-70">Items</span>
                                <span>{items?.join(', ')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Important Warning */}
                    <div className={`p-4 mb-8 text-left text-sm border-l-4 ${isRahasya ? 'bg-yellow-900/20 border-yellow-600 text-yellow-500' : 'bg-yellow-500/10 border-yellow-500 text-yellow-200'}`}>
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-bold mb-1">IMPORTANT:</p>
                                <p>The ticket is mailed to your given email id ({user?.email}).</p>
                                <p className="mt-1 font-bold text-red-400">DO NOT TRY TO SCAN THE QR CODE YOURSELF.</p>
                                <p className="opacity-80 text-xs mt-1">Scanning it yourself will mark it as logged in, and you may be denied entry at the gate.</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions - REMOVED DOWNLOAD BUTTON */}
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Button onClick={() => navigate('/')} className="flex items-center gap-2 justify-center w-full md:w-auto">
                            <Home className="w-4 h-4" /> Return to Home
                        </Button>
                    </div>

                </Card>
            </div>
        </div>
    );
};