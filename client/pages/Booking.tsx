import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ticket, Users, CreditCard, Check, AlertCircle, Lock, Loader2 } from 'lucide-react';
import { Button, Input, Card } from '../components/UIComponents';
import { useLocation, useNavigate } from 'react-router-dom';
import { CHHATTISGARH_COLLEGES } from '../constants';
import { supabase } from '../src/supabaseClient';

// Add Razorpay type definition
declare global {
    interface Window {
        Razorpay: any;
    }
}

// Database Row Type
interface ZoneTier {
    id: string;
    zone_id: string;
    name: string;
    category: 'AMITIAN' | 'NON-AMITIAN';
    base_price: number;
    tech_fest_fee: number;
    accommodation_fee: number;
    total_seats: number;
    available_seats: number;
    is_active: boolean;
}

const attendeeSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    gender: z.enum(["Male", "Female", "Other", "Rather not to say"], { message: "Please select a gender" }),
    college: z.string().min(1, "Please select a college"),
});

type AttendeeFormData = z.infer<typeof attendeeSchema>;

export const Booking: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isRahasya = location.pathname.includes('/rahasya');

    // State
    const [tiers, setTiers] = useState<ZoneTier[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTier, setSelectedTier] = useState<ZoneTier | null>(null);
    const [step, setStep] = useState(1);
    const [accommodation, setAccommodation] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const gridRef = useRef<HTMLDivElement>(null);
    const [gridHeight, setGridHeight] = useState<number>(0);

    // Update grid height on mount and zoom
    useEffect(() => {
        if (gridRef.current) {
            setGridHeight(gridRef.current.offsetHeight);
        }
    }, [step, zoomLevel]);

    // User Data & Verification
    const [userData, setUserData] = useState<AttendeeFormData | null>(null);
    const [verificationInput, setVerificationInput] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isPaying, setIsPaying] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const { register, handleSubmit, formState: { errors }, watch } = useForm<AttendeeFormData>({
        resolver: zodResolver(attendeeSchema)
    });

    const selectedCollege = watch('college');
    const isAmityStudent = selectedCollege === "Amity University Raipur";

    // 1. Fetch Zones from Supabase
    useEffect(() => {
        const fetchZones = async () => {
            const { data, error } = await supabase
                .from('pricing_and_seats')
                .select('*');

            if (error) {
                console.error('Error fetching zones:', error);
                setToast({ message: "Failed to load ticket data. Check console.", type: 'error' });
            } else {
                setTiers(data || []);
            }
            setLoading(false);
        };

        fetchZones();
    }, []);

    const getTier = (id: string) => tiers.find(t => t.zone_id === id);

    const isZoneRestricted = (tier: ZoneTier) => {
        if (isAmityStudent) {
            return tier.category === 'NON-AMITIAN';
        } else {
            return tier.category === 'AMITIAN' || tier.zone_id === 'general-access';
        }
    };

    const handleTierSelect = (tier?: ZoneTier) => {
        if (!tier) return;

        if (!tier.is_active || tier.available_seats <= 0) {
            setToast({ message: "This zone is currently unavailable.", type: 'error' });
            return;
        }

        if (isZoneRestricted(tier)) {
            const msg = isAmityStudent
                ? "This zone is for external participants only."
                : "This zone is reserved for Amity students.";
            setToast({ message: msg, type: 'error' });
            return;
        }

        setSelectedTier(tier);
        setStep(3);
        setAccommodation(false);
        setIsVerified(false);
        setVerificationInput('');
    };

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 2.0));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));

    const onUserSubmit = (data: AttendeeFormData) => {
        setUserData(data);
        setStep(2);
        setTimeout(() => {
            setToast({ message: "Use the Zoom controls (+ / -) to view the full map!", type: 'success' });
        }, 500);
    };

    const calculateTotal = () => {
        if (!selectedTier) return 0;
        let total = selectedTier.base_price + selectedTier.tech_fest_fee;
        if (accommodation) total += selectedTier.accommodation_fee;
        return total;
    };

    const handleVerify = () => {
        if (!verificationInput) return;
        setIsVerifying(true);

        setTimeout(() => {
            setIsVerifying(false);
            if (isAmityStudent && !verificationInput.toLowerCase().includes('amity')) {
                setToast({ message: "Invalid Amity Email.", type: 'error' });
            } else {
                setIsVerified(true);
                setToast({ message: "Verified Successfully!", type: 'success' });
            }
        }, 1000);
    };

    // --- DB SAVE FUNCTION ---
    const saveBookingToSupabase = async (paymentId: string, orderId: string, amount: number) => {
        if (!userData || !selectedTier) return false;

        const { error } = await supabase
            .from('bookings')
            .insert([
                {
                    payment_id: paymentId,
                    order_id: orderId,
                    first_name: userData.firstName,
                    last_name: userData.lastName,
                    email: userData.email,
                    phone: userData.phone,
                    gender: userData.gender,
                    college: userData.college,
                    zone_id: selectedTier.zone_id,
                    tier_name: selectedTier.name,
                    accommodation: accommodation,
                    amount_paid: amount,
                    status: 'CONFIRMED',
                    is_rahasya: isRahasya,
                    verification_id: verificationInput,
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) {
            console.error('Database Error:', error);
        }
        return true;
    };

    // --- EMAIL TRIGGER FUNCTION ---
    const sendConfirmationEmail = async (pId: string, oId: string, amount: number) => {
        if (!userData || !selectedTier) return;

        // Reconstruct the Ticket Data URL used in the QR Code
        const ticketRawData = {
            event: "AMISPARK x RAHASYA 2026",
            ticket_id: oId,
            payment_ref: pId,
            attendee_name: `${userData.firstName} ${userData.lastName}`,
            attendee_email: userData.email,
            college: userData.college,
            verification_id: verificationInput,
            zone: selectedTier.name,
            amount_paid: amount,
            status: "CONFIRMED",
            is_rahasya: isRahasya,
            issued_at: new Date().toISOString()
        };
        const encodedData = btoa(JSON.stringify(ticketRawData));
        const qrLink = `${window.location.origin}/#/ticket-view?data=${encodedData}`;

        try {
            // Call the local backend server
            await fetch('http://localhost:5000/api/send-ticket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userData.email,
                    name: `${userData.firstName} ${userData.lastName}`,
                    ticketId: oId,
                    zone: selectedTier.name,
                    amount: amount,
                    qrLink: qrLink,
                    isRahasya: isRahasya
                })
            });
            console.log("Email request sent to server");
        } catch (error) {
            console.error("Failed to send email trigger", error);
        }
    };

    // --- PAYMENT INTEGRATION ---
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!selectedTier || !userData) return;
        setIsPaying(true);

        const totalAmount = calculateTotal();
        const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

        // Shared Success Handler
        const onPaymentSuccess = async (pId: string, oId: string) => {
            // 1. Save to Database
            await saveBookingToSupabase(pId, oId, totalAmount);
            
            // 2. Trigger Email (Fire and Forget - don't await blocking)
            sendConfirmationEmail(pId, oId, totalAmount);

            // 3. Navigate to Receipt
            const targetPath = isRahasya ? '/rahasya/receipt' : '/receipt';
            navigate(targetPath, {
                state: {
                    paymentId: pId,
                    orderId: oId,
                    amount: totalAmount,
                    items: [selectedTier.name, accommodation ? "Accommodation" : null].filter(Boolean),
                    user: userData,
                    verificationId: verificationInput
                }
            });
            setIsPaying(false);
        };

        if (razorpayKey) {
            const isLoaded = await loadRazorpayScript();

            if (!isLoaded) {
                setToast({ message: "Failed to load payment gateway. Please try again.", type: 'error' });
                setIsPaying(false);
                return;
            }

            const options = {
                key: razorpayKey,
                amount: totalAmount * 100,
                currency: "INR",
                name: "Amispark x Rahasya 2026",
                description: `Ticket: ${selectedTier.name}`,
                image: "https://i.ibb.co/fz6gHG0L/Untitled-design-removebg-preview.png",
                handler: function (response: any) {
                    onPaymentSuccess(
                        response.razorpay_payment_id, 
                        response.razorpay_order_id || "ORD_" + Date.now()
                    );
                },
                prefill: {
                    name: `${userData.firstName} ${userData.lastName}`,
                    email: userData.email,
                    contact: userData.phone,
                },
                theme: {
                    color: isRahasya ? "#dc2626" : "#8a2be2",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
            setIsPaying(false);

        } else {
            // SIMULATION MODE
            setTimeout(async () => {
                const dummyPaymentId = "pay_SIM_" + Math.random().toString(36).substr(2, 9).toUpperCase();
                const dummyOrderId = "order_SIM_" + Math.random().toString(36).substr(2, 9).toUpperCase();
                
                await onPaymentSuccess(dummyPaymentId, dummyOrderId);
            }, 2000);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-black text-white"><Loader2 className="w-10 h-10 animate-spin mr-3" /> Loading Tickets...</div>;
    }

    return (
        <div className={`min-h-screen py-20 px-4 ${isRahasya ? 'bg-noir-900 text-slate-300 font-mono' : 'bg-bollywood-900 text-glitz-paper font-body'}`}>
            <div className="container mx-auto max-w-6xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className={`text-3xl md:text-5xl font-bold mb-4 ${isRahasya ? 'text-white font-typewriter' : 'font-display text-glitz-gold'}`}>
                        {isRahasya ? 'SECURE ACCESS' : 'GET TICKETS'}
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT PANEL: Steps */}
                    <div className="lg:col-span-2">

                        {/* STEP 1: Details */}
                        {step === 1 && (
                            <Card className={`p-6 ${isRahasya ? 'bg-black/40 border-slate-800' : 'bg-bollywood-800 border-drama'}`}>
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Users className="w-5 h-5" /> Student Details</h2>
                                <form onSubmit={handleSubmit(onUserSubmit)} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Input {...register('firstName')} placeholder="First Name" />
                                            {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
                                        </div>
                                        <div>
                                            <Input {...register('lastName')} placeholder="Last Name" />
                                            {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
                                        </div>
                                    </div>

                                    <Input {...register('email')} placeholder="Email" type="email" />
                                    {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}

                                    <Input {...register('phone')} placeholder="Phone Number" />
                                    {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}

                                    <select
                                        {...register('gender')}
                                        className="w-full p-3 rounded bg-black/20 border border-white/10 text-white focus:border-drama outline-none"
                                    >
                                        <option value="" className="bg-gray-900">Select Gender</option>
                                        <option value="Male" className="bg-gray-900">Male</option>
                                        <option value="Female" className="bg-gray-900">Female</option>
                                        <option value="Other" className="bg-gray-900">Other</option>
                                        <option value="Rather not to say" className="bg-gray-900">Rather not to say</option>
                                    </select>
                                    {errors.gender && <span className="text-red-500 text-xs">{errors.gender.message}</span>}

                                    <select
                                        {...register('college')}
                                        className="w-full p-3 rounded bg-black/20 border border-white/10 text-white focus:border-drama outline-none"
                                    >
                                        <option value="" className="bg-gray-900">Select College</option>
                                        {CHHATTISGARH_COLLEGES.map(c => (
                                            <option key={c} value={c} className="bg-gray-900">{c}</option>
                                        ))}
                                    </select>
                                    {errors.college && <span className="text-red-500 text-xs">{errors.college.message}</span>}

                                    <Button type="submit" className="w-full mt-4 bg-drama hover:bg-drama-dark">Next: Select Zone</Button>
                                </form>
                            </Card>
                        )}

                        {/* STEP 2: Venue Layout */}
                        {step === 2 && (
                            <Card className={`p-6 ${isRahasya ? 'bg-black/40 border-slate-800' : 'bg-bollywood-800 border-drama'}`}>
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Ticket className="w-5 h-5" /> Select Zone</h2>

                                <div className="flex justify-end gap-2 mb-2">
                                    <Button onClick={handleZoomOut} className="bg-white/10 hover:bg-white/20 px-3 py-1 text-sm font-mono" title="Zoom Out">-</Button>
                                    <span className="flex items-center text-xs opacity-70 min-w-[60px] justify-center">Zoom: {Math.round(zoomLevel * 100)}%</span>
                                    <Button onClick={handleZoomIn} className="bg-white/10 hover:bg-white/20 px-3 py-1 text-sm font-mono" title="Zoom In">+</Button>
                                </div>

                                <div className="relative overflow-x-auto py-4 overflow-y-hidden text-center bg-black/20 rounded-lg border border-white/5" style={{ height: gridHeight ? gridHeight * zoomLevel + 50 : 'auto' }}>
                                    <div
                                        style={{
                                            transform: `scale(${zoomLevel})`,
                                            transformOrigin: 'top center',
                                            transition: 'transform 0.2s ease-out',
                                            display: 'inline-block',
                                        }}
                                        ref={gridRef}
                                    >
                                        <div className={`venue-grid ${isRahasya ? 'venue-noir' : 'venue-bollywood'} min-w-[600px] mx-auto`}>
                                            <div className={`venue-area area-stage-top ${isRahasya ? 'bg-slate-800 border-slate-700' : 'bg-drama-dark border-drama'}`}>
                                                <span>{isRahasya ? 'TERMINAL' : 'STAGE'}</span>
                                            </div>
                                            <div className={`venue-area area-stage-bottom ${isRahasya ? 'bg-slate-800 border-slate-700' : 'bg-drama-dark border-drama'}`}>
                                                <span>{isRahasya ? 'LINK' : 'RAMP'}</span>
                                            </div>

                                            {/* TECH BAZAAR */}
                                            {(() => {
                                                const tier = getTier('tech-bazaar');
                                                const locked = tier ? (!tier.is_active || tier.available_seats === 0 || isZoneRestricted(tier)) : true;
                                                return (
                                                    <div
                                                        className={`venue-area area-techfest ${isRahasya ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-purple-900/40 border-purple-500/30 hover:bg-purple-900/60'} ${locked ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                                                        onClick={() => handleTierSelect(tier)}
                                                    >
                                                        <span>{tier?.name || 'Loading...'}</span>
                                                        <div className="area-info">
                                                            <p className="font-bold">₹{tier ? tier.base_price + tier.tech_fest_fee : '...'}</p>
                                                            <p className="text-xs">{tier?.available_seats} Seats</p>
                                                            {locked && <Lock className="w-4 h-4 mt-1" />}
                                                        </div>
                                                    </div>
                                                );
                                            })()}

                                            {/* FACULTY */}
                                            <div className={`venue-area area-faculty ${isRahasya ? 'bg-red-950 border-red-900/50 cursor-not-allowed text-red-800' : 'bg-red-900/40 border-red-500/30 cursor-not-allowed'}`}>
                                                <span>FACULTY</span>
                                                <div className="absolute top-2 right-2"><Lock className="w-4 h-4" /></div>
                                            </div>

                                            {/* STAR CIRCLE */}
                                            {(() => {
                                                const tier = getTier('star-circle');
                                                const locked = tier ? (!tier.is_active || tier.available_seats === 0 || isZoneRestricted(tier)) : true;
                                                return (
                                                    <div
                                                        className={`venue-area area-fanpit ${isRahasya ? 'bg-black border-slate-600 text-white' : 'bg-pink-900/40 border-pink-500/30 hover:bg-pink-900/60'} ${locked ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                                                        onClick={() => handleTierSelect(tier)}
                                                    >
                                                        <span>{tier?.name || 'Loading...'}</span>
                                                        <div className="area-info">
                                                            <p className="font-bold">₹{tier ? tier.base_price + tier.tech_fest_fee : '...'}</p>
                                                            <p className="text-xs">{tier?.available_seats} Seats</p>
                                                            {locked && <Lock className="w-4 h-4 mt-1" />}
                                                        </div>
                                                    </div>
                                                );
                                            })()}

                                            {/* GENERAL ACCESS */}
                                            {(() => {
                                                const tier = getTier('general-access');
                                                const locked = tier ? (!tier.is_active || tier.available_seats === 0 || isZoneRestricted(tier)) : true;
                                                return (
                                                    <div
                                                        className={`venue-area area-general ${isRahasya ? 'bg-slate-800 border-slate-600 text-slate-400' : 'bg-indigo-900/40 border-indigo-500/30 hover:bg-indigo-900/60'} ${locked ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                                                        onClick={() => handleTierSelect(tier)}
                                                    >
                                                        <span>{tier?.name || 'Loading...'}</span>
                                                        <div className="area-info">
                                                            <p className="font-bold">₹{tier ? tier.base_price + tier.tech_fest_fee : '...'}</p>
                                                            <p className="text-xs">{tier?.available_seats} Seats</p>
                                                            {locked && <Lock className="w-4 h-4 mt-1" />}
                                                        </div>
                                                    </div>
                                                );
                                            })()}

                                            <div className={`venue-area area-food ${isRahasya ? 'bg-slate-900 border-slate-800 text-slate-500' : 'bg-orange-900/40 border-orange-500/30'}`}>
                                                <span>FOOD</span>
                                            </div>
                                            <div className={`venue-area area-dj ${isRahasya ? 'bg-slate-900 border-slate-700' : 'bg-black border-drama'}`}>
                                                <span>{isRahasya ? 'SURVEILLANCE' : 'DJ CONSOLE'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setStep(1)} className="mt-6 text-sm underline opacity-60 hover:opacity-100">Back to Details</button>
                            </Card>
                        )}

                        {/* STEP 3: Payment */}
                        {step === 3 && selectedTier && (
                            <Card className={`p-6 ${isRahasya ? 'bg-black/40 border-slate-800' : 'bg-bollywood-800 border-drama'}`}>
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><CreditCard className="w-5 h-5" /> Payment</h2>

                                <div className="bg-black/20 p-4 rounded-lg mb-6 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span>Base Ticket ({selectedTier.name})</span>
                                        <span>₹{selectedTier.base_price}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-green-400">
                                        <span>TechFest & Games Fee</span>
                                        <span>+ ₹{selectedTier.tech_fest_fee}</span>
                                    </div>

                                    <div className="pt-3 border-t border-white/10">
                                        <label className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={accommodation}
                                                onChange={(e) => setAccommodation(e.target.checked)}
                                                className="w-4 h-4 accent-drama cursor-pointer"
                                            />
                                            <span className="ml-3 text-sm group-hover:text-white transition-colors">Include Accommodation</span>
                                            <span className="ml-auto text-yellow-400 font-bold">+ ₹{selectedTier.accommodation_fee}</span>
                                        </label>
                                    </div>

                                    {accommodation && (
                                        <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded text-sm">
                                            <p className="text-blue-200 mb-2">Accommodation request requires additional details:</p>
                                            <a href="#" className="text-blue-400 font-bold underline hover:text-blue-300 flex items-center gap-1">
                                                Fill Accommodation Form <span aria-hidden="true">&rarr;</span>
                                            </a>
                                        </div>
                                    )}

                                    <div className="pt-3 border-t border-white/20 flex justify-between items-center">
                                        <span className="font-bold text-lg">Total Payable</span>
                                        <span className="font-bold text-2xl text-drama-light">₹{calculateTotal()}</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">
                                        {isAmityStudent ? 'Verify Amity Email (Required)' : 'Verify ID Card (Required)'}
                                    </label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={verificationInput}
                                            onChange={(e) => setVerificationInput(e.target.value)}
                                            placeholder={isAmityStudent ? "yourname@amity.edu" : "College ID Number"}
                                            disabled={isVerified}
                                        />
                                        <Button
                                            onClick={handleVerify}
                                            disabled={isVerified || isVerifying}
                                            className={`${isVerified ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} min-w-[100px]`}
                                        >
                                            {isVerifying ? '...' : isVerified ? <Check className="w-5 h-5" /> : 'Verify'}
                                        </Button>
                                    </div>
                                </div>

                                <Button
                                    disabled={!isVerified || isPaying}
                                    onClick={handlePayment}
                                    className={`w-full py-4 text-lg flex items-center justify-center gap-2 ${isPaying ? 'opacity-70 cursor-wait' : 'bg-green-600 hover:bg-green-700'}`}
                                >
                                    {isPaying ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Proceed to Pay"
                                    )}
                                </Button>
                                <button onClick={() => setStep(2)} className="mt-4 w-full text-sm underline opacity-60 hover:opacity-100">Change Zone</button>
                            </Card>
                        )}
                    </div>

                    {/* RIGHT PANEL: Info */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 bg-white/5 border-white/10 h-full">
                            <div className="flex items-center gap-3 mb-4 text-yellow-400">
                                <AlertCircle className="w-6 h-6" />
                                <h3 className="font-bold">Important Rules</h3>
                            </div>
                            <ul className="text-sm space-y-3 opacity-80 list-disc pl-4 leading-relaxed">
                                <li><strong>Strictly No Refunds:</strong> Tickets are non-refundable and non-transferable.</li>
                                <li><strong>Mandatory ID Proof:</strong> Valid College/Govt ID required for entry. Name on ticket must match ID.</li>
                                <li><strong>One Person Per Ticket:</strong> Each ticket allows entry for one person only.</li>
                                <li><strong>Entry Rights Reserved:</strong> Management reserves the right to deny entry or remove anyone violating rules.</li>
                                <li><strong>Prohibited Items:</strong> No alcohol, drugs, weapons,outside food/beverages or any other items listed by autority.</li>
                                <li><strong>QR Code Security:</strong> Keep your QR code safe. Only the first scan will be valid,,DO NOT TRY TO SCAN THE QR CODE YOURSELF AS IT WILL MARK YOU LOGGED IN AND WHILE ENTRY THE QR WILL ALREADY BE MARKED AS LOGGED IN.</li>
                                <li><strong>Gate Timings:</strong> Entry allowed only during specified slots.</li>
                                <li><strong>Zone Access:</strong>
                                    <ul className="list-circle pl-4 mt-1 space-y-1 text-xs opacity-70">
                                        <li>Tech Bazaar: Non-Amitians Only</li>
                                        <li>Star Circle: Amitians Only</li>
                                        <li>General Access: Amitians Only</li>
                                    </ul>
                                </li>
                            </ul>
                        </Card>
                    </div>

                </div>
            </div>

            {/* Notifications */}
            {toast && (
                <div className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-up border ${toast.type === 'error' ? 'bg-red-900/90 border-red-500 text-white' : 'bg-green-900/90 border-green-500 text-white'
                    }`}>
                    {toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                    <span className="font-bold">{toast.message}</span>
                    <button onClick={() => setToast(null)} className="ml-4 opacity-50 hover:opacity-100">✕</button>
                </div>
            )}
        </div>
    );
};