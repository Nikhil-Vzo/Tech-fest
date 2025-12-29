import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ticket, Users, CreditCard, Check, AlertCircle, Lock, Upload, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Button, Input, Card } from '../components/UIComponents';
import { useLocation, useNavigate } from 'react-router-dom';
import { CHHATTISGARH_COLLEGES } from '../constants';

// Ticket Tiers Data
interface TicketTier {
    id: string;
    name: string;
    basePrice: number;
    position: string;
    available: number;
    capacity: number;
    type: string;
    isReserved?: boolean;
}

const BOLLYWOOD_TIERS: TicketTier[] = [
    { id: 'tech-fest', name: 'Tech Bazaar', basePrice: 1299, position: 'left', available: 500, capacity: 500, type: 'General' },
    { id: 'faculty', name: 'Royal Box', basePrice: 0, position: 'right', available: 0, capacity: 50, type: 'VIP', isReserved: true },
    { id: 'fanpit', name: 'Star Circle', basePrice: 1499, position: 'center', available: 50, capacity: 50, type: 'VIP' },
    { id: 'general', name: 'General Access', basePrice: 999, position: 'bottom', available: 550, capacity: 550, type: 'General' },
    { id: 'food', name: 'Food Court', basePrice: 0, position: 'top-right', available: 0, capacity: 0, type: 'Service', isReserved: true },
];

const NOIR_TIERS: TicketTier[] = [
    { id: 'forensics', name: 'Forensics Lab (Tech)', basePrice: 499, position: 'left', available: 500, capacity: 500, type: 'General' },
    { id: 'high-command', name: 'High Command (Faculty)', basePrice: 0, position: 'right', available: 0, capacity: 50, type: 'VIP', isReserved: true },
    { id: 'inner-circle', name: 'The Inner Circle', basePrice: 999, position: 'center', available: 50, capacity: 50, type: 'VIP' },
    { id: 'general-pop', name: 'General Population', basePrice: 299, position: 'bottom', available: 550, capacity: 550, type: 'General' },
    { id: 'supply-depot', name: 'Supply Depot (Food)', basePrice: 199, position: 'bottom', available: 300, capacity: 300, type: 'General' },
];

const attendeeSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    gender: z.enum(["Male", "Female", "Other"], { message: "Please select a gender" }),
    college: z.string().min(1, "Please select a college"),
});

type AttendeeFormData = z.infer<typeof attendeeSchema>;

export const Booking: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isRahasya = location.pathname.includes('/rahasya');
    const TICKET_TIERS = isRahasya ? NOIR_TIERS : BOLLYWOOD_TIERS;

    const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState<AttendeeFormData | null>(null);
    const [ticketCount, setTicketCount] = useState(1);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [accommodation, setAccommodation] = useState(false);

    // Email/ID Verification State
    const [verificationEmail, setVerificationEmail] = useState('');
    const [verificationId, setVerificationId] = useState(''); // New state for ID card
    const [isVerified, setIsVerified] = useState(false); // Renamed from isEmailVerified to generic isVerified
    const [isVerifying, setIsVerifying] = useState(false);

    // Zoom / Pinch State
    const [scale, setScale] = useState(1);
    const initialPinchDistance = React.useRef<number | null>(null);
    const initialScale = React.useRef<number>(1);
    const gridRef = React.useRef<HTMLDivElement>(null);
    const summaryRef = React.useRef<HTMLDivElement>(null);
    const [gridDimensions, setGridDimensions] = useState({ width: 0, height: 0 });
    const [hasInteracted, setHasInteracted] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch } = useForm<AttendeeFormData>({
        resolver: zodResolver(attendeeSchema)
    });

    const selectedCollege = watch('college');
    const isAmity = selectedCollege === "Amity University Raipur";

    const onUserSubmit = (data: AttendeeFormData) => {
        setUserData(data);
        setStep(2);
    };

    const handleTierSelect = (tier: TicketTier) => {
        if (tier.isReserved) {
            setToast({ message: `Access Denied: ${tier.name} is restricted.`, type: 'error' });
            setTimeout(() => setToast(null), 3000);
            return;
        }

        // College-based Locking Logic
        if (!isRahasya) {
            if (isAmity) {
                // Amity Students: Can ONLY book General or Star Circle
                if (tier.id === 'tech-fest') {
                    setToast({ message: "Tech Bazaar is reserved for external participants.", type: 'error' });
                    setTimeout(() => setToast(null), 3000);
                    return;
                }
            } else {
                // Non-Amity: Can ONLY book Tech Bazar
                if (tier.id !== 'tech-fest') {
                    setToast({ message: "External participants can only book Tech Bazaar.", type: 'error' });
                    setTimeout(() => setToast(null), 3000);
                    return;
                }
            }
        }

        setSelectedTier(tier);
        setStep(3);
        setTicketCount(1);
        setAccommodation(false); // Reset accommodation
        setTicketCount(1);
        setAccommodation(false); // Reset accommodation
        setIsVerified(false); // Reset verification
        setVerificationEmail('');
        setVerificationId('');
        resetZoom();
    };

    // Zoom Handlers
    const resetZoom = () => setScale(1);

    const handleTouchStart = (e: React.TouchEvent) => {
        setHasInteracted(true);
        if (e.touches.length === 2) {
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            initialPinchDistance.current = dist;
            initialScale.current = scale;
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 2 && initialPinchDistance.current !== null) {
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const delta = dist / initialPinchDistance.current;
            const newScale = Math.min(Math.max(initialScale.current * delta, 0.5), 1.5); // Clamp between 0.5x and 1.5x
            setScale(newScale);
        }
    };

    const handleZoomIn = () => {
        setHasInteracted(true);
        setScale(prev => Math.min(prev + 0.1, 1.5));
    };
    const handleZoomOut = () => {
        setHasInteracted(true);
        setScale(prev => Math.max(prev - 0.1, 0.5));
    };

    useEffect(() => {
        if (gridRef.current) {
            setGridDimensions({
                width: gridRef.current.offsetWidth,
                height: gridRef.current.offsetHeight
            });
        }
    }, [step, isRahasya]); // Recalculate when view changes

    // Notify user about pinch gesture when entering step 2
    useEffect(() => {
        if (step === 2 && !isRahasya) {
            // Only show if on mobile/touch device roughly (or just always show as a hint)
            setToast({ message: "Tip: Pinch to zoom in/out of the layout!", type: 'success' });
            setTimeout(() => setToast(null), 4000);
        }
    }, [step, isRahasya]);

    // Auto-scroll to summary when reaching step 3
    useEffect(() => {
        if (step === 3 && summaryRef.current) {
            summaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [step]);

    const handleVerify = () => {
        if (isAmity) {
            // Amity Email Verification
            if (!verificationEmail) {
                setToast({ message: "Please enter your college email.", type: 'error' });
                setTimeout(() => setToast(null), 3000);
                return;
            }

            setIsVerifying(true);
            setTimeout(() => {
                setIsVerifying(false);
                if (verificationEmail.toLowerCase().includes('amity')) {
                    setIsVerified(true);
                    setToast({ message: "Email verified successfully!", type: 'success' });
                    setTimeout(() => setToast(null), 3000);
                } else {
                    setToast({ message: "Invalid Amity email address.", type: 'error' });
                    setTimeout(() => setToast(null), 3000);
                }
            }, 1000);
        } else {
            // Non-Amity ID Verification
            if (!verificationId || verificationId.length < 3) {
                setToast({ message: "Please enter a valid College ID Card No.", type: 'error' });
                setTimeout(() => setToast(null), 3000);
                return;
            }

            setIsVerifying(true);
            setTimeout(() => {
                setIsVerifying(false);
                setIsVerified(true);
                setToast({ message: "ID verified successfully!", type: 'success' });
                setTimeout(() => setToast(null), 3000);
            }, 1000);
        }
    };

    const handlePayment = () => {
        if (!isVerified) {
            setToast({ message: isAmity ? "Please verify your college email." : "Please verify your college ID.", type: 'error' });
            setTimeout(() => setToast(null), 3000);
            return;
        }

        // Simulate payment processing
        setTimeout(() => {
            setStep(4); // Success
        }, 1500);
    };

    const calculateTotal = () => {
        if (!selectedTier) return 0;
        let total = selectedTier.basePrice;

        // Add TechFest Fee (300) for everyone in Bollywood theme
        if (!isRahasya) {
            total += 300;
        }

        if (accommodation) {
            total += 300;
        }
        return total * ticketCount;
    };

    const isTierLocked = (tier: TicketTier) => {
        if (isRahasya) return false; // No locking for Rahasya (handled by redirect)
        if (tier.isReserved) return true;

        if (isAmity) {
            return tier.id === 'tech-fest';
        } else {
            return tier.id !== 'tech-fest';
        }
    };

    return (
        <div className={`min-h-screen py-20 px-4 ${isRahasya ? 'bg-noir-900 text-slate-300 font-mono' : 'bg-bollywood-900 text-glitz-paper font-body'}`}>
            <div className="container mx-auto max-w-6xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${isRahasya ? 'text-white font-typewriter tracking-tighter' : 'font-display text-glitz-gold'}`}>
                        {isRahasya ? 'SECURE PERMITS' : 'GET YOUR TICKETS'}
                    </h1>
                    <p className={`text-lg ${isRahasya ? 'text-blood tracking-widest uppercase' : 'text-glitz-paper/80'}`}>
                        {isRahasya ? 'AUTHORIZATION REQUIRED FOR ENTRY' : 'Join the biggest Bollywood celebration of the year!'}
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-12">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s
                                ? (isRahasya ? 'bg-blood text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-drama text-white')
                                : (isRahasya ? 'bg-slate-800 text-slate-500' : 'bg-bollywood-800 text-glitz-paper/50')
                                }`}>
                                {step > s ? <Check className="w-5 h-5" /> : s}
                            </div>
                            {s < 4 && <div className={`w-16 h-1 ${step > s ? (isRahasya ? 'bg-blood' : 'bg-drama') : (isRahasya ? 'bg-slate-800' : 'bg-bollywood-800')}`} />}
                        </div>
                    ))}
                </div>

                {/* Important Booking Rules Banner */}
                <div className={`mb-8 p-4 rounded border-l-4 ${isRahasya ? 'bg-red-950/40 border-blood text-red-200' : 'bg-amber-900/40 border-amber-500 text-amber-100'}`}>
                    <div className="flex items-start">
                        <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold uppercase mb-1">Important Booking Rules</h3>
                            <ul className="list-disc list-inside text-sm space-y-1 opacity-90">
                                <li>Purchase your ticket using <strong>ONLY your personal College ID</strong>.</li>
                                <li><strong>One ID Card = One Ticket</strong> only.</li>
                                <li>Using another student's ID is <strong>strictly forbidden</strong>.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Venue Layout & Selection */}
                    <div className="lg:col-span-2">

                        {step === 1 && (
                            <Card className={`p-6 ${isRahasya ? 'bg-black/40 border-slate-800' : 'bg-bollywood-800 border-drama'}`}>
                                <h2 className={`text-2xl font-bold mb-6 ${isRahasya ? 'text-white' : 'text-glitz-gold'}`}>Attendee Details</h2>
                                <form onSubmit={handleSubmit(onUserSubmit)} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Input {...register('firstName')} placeholder="First Name" className={isRahasya ? 'bg-slate-900 border-slate-700' : ''} />
                                            {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
                                        </div>
                                        <div>
                                            <Input {...register('lastName')} placeholder="Last Name" className={isRahasya ? 'bg-slate-900 border-slate-700' : ''} />
                                            {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
                                        </div>
                                    </div>

                                    <Input {...register('email')} placeholder="Email" type="email" className={isRahasya ? 'bg-slate-900 border-slate-700' : ''} />
                                    {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}

                                    <Input {...register('phone')} placeholder="Phone" className={isRahasya ? 'bg-slate-900 border-slate-700' : ''} />
                                    {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            {/* FIXED: Added [&>option]:bg-bollywood-900 to ensure dropdown visibility */}
                                            <select
                                                {...register('gender')}
                                                className={`w-full p-3 rounded border ${isRahasya ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white/10 border-white/20 text-white [&>option]:bg-bollywood-900'} focus:outline-none focus:border-drama`}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {errors.gender && <span className="text-red-500 text-xs">{errors.gender.message}</span>}
                                        </div>
                                        <div>
                                            {/* FIXED: Added [&>option]:bg-bollywood-900 to ensure dropdown visibility */}
                                            <select
                                                {...register('college')}
                                                className={`w-full p-3 rounded border ${isRahasya ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white/10 border-white/20 text-white [&>option]:bg-bollywood-900'} focus:outline-none focus:border-drama`}
                                            >
                                                <option value="">Select College</option>
                                                {CHHATTISGARH_COLLEGES.map(college => (
                                                    <option key={college} value={college}>{college}</option>
                                                ))}
                                            </select>
                                            {errors.college && <span className="text-red-500 text-xs">{errors.college.message}</span>}
                                        </div>
                                    </div>

                                    <Button type="submit" variant="primary" className={`w-full mt-4 ${isRahasya ? 'bg-blood hover:bg-red-700' : 'bg-drama hover:bg-drama-light'}`}>
                                        Next: Select Zone
                                    </Button>
                                </form>
                            </Card>
                        )}

                        {step >= 2 && (
                            <Card className={`p-6 ${isRahasya ? 'bg-black/40 border-slate-800' : 'bg-bollywood-800 border-drama'}`}>
                                <h2 className={`text-2xl font-bold mb-6 flex items-center ${isRahasya ? 'text-white font-typewriter' : 'font-display text-glitz-gold'}`}>
                                    <Ticket className="w-6 h-6 mr-3" />
                                    {isRahasya ? 'SELECT SECTOR' : 'SELECT YOUR ZONE'}
                                </h2>

                                {/* Custom Venue Layout (CSS Grid) */}
                                {isRahasya ? (
                                    <div className="flex flex-col items-center justify-center h-96 bg-black/40 border border-slate-800 rounded-lg p-8 text-center">
                                        <Lock className="w-16 h-16 text-red-600 mb-6" />
                                        <h3 className="text-2xl font-bold text-white mb-4 font-typewriter">RESTRICTED ACCESS</h3>
                                        <p className="text-slate-400 mb-8 max-w-md">
                                            Direct booking is not available in this sector. Please proceed to the main terminal for authorization.
                                        </p>
                                        <Button
                                            onClick={() => navigate('/tickets')}
                                            variant="primary"
                                            className="bg-blood hover:bg-red-700 text-white px-8 py-3"
                                        >
                                            Proceed to Amispark Booking
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        {/* Mobile Scroll Visuals */}
                                        <div className="relative">
                                            {/* Gradient Mask on Right to indicate scrollable content */}
                                            <div className="lg:hidden absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />

                                            {/* Animated Hand Icon Hint */}
                                            {!hasInteracted && (
                                                <div className="lg:hidden absolute inset-0 z-20 pointer-events-none flex items-center justify-center opacity-0 animate-[fadeInOut_3s_ease-in-out_infinite]">
                                                    <div className="bg-black/80 rounded-xl px-6 py-3 backdrop-blur-md border border-white/10 flex flex-col items-center gap-2 shadow-2xl">
                                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white animate-[swipe_1.5s_ease-in-out_infinite]">
                                                            <path d="M18 11.5C18 10.1193 16.8807 9 15.5 9C14.1193 9 13 10.1193 13 11.5V11.72C12.78 11.57 12.52 11.5 12.25 11.5C11.0074 11.5 10 12.5074 10 13.75V14H9.5C8.11929 14 7 15.1193 7 16.5C7 17.8807 8.11929 19 9.5 19H15.5C16.8807 19 18 17.8807 18 16.5V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <span className="text-white/90 text-sm font-medium whitespace-nowrap">Swipe to explore</span>
                                                    </div>
                                                </div>
                                            )}

                                            <div
                                                className="overflow-auto py-4 border border-white/10 rounded-lg relative touch-pan-x touch-pan-y"
                                                onTouchStart={handleTouchStart}
                                                onTouchMove={handleTouchMove}
                                            >
                                                {/* Zoom Controls */}
                                                <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
                                                    <button onClick={handleZoomIn} className="p-2 bg-black/60 text-white rounded-full backdrop-blur hover:bg-black/80"><ZoomIn className="w-5 h-5" /></button>
                                                    <button onClick={handleZoomOut} className="p-2 bg-black/60 text-white rounded-full backdrop-blur hover:bg-black/80"><ZoomOut className="w-5 h-5" /></button>
                                                    <button onClick={resetZoom} className="p-2 bg-black/60 text-white rounded-full backdrop-blur hover:bg-black/80" title="Reset View"><Maximize className="w-5 h-5" /></button>
                                                </div>

                                                <div
                                                    ref={gridRef}
                                                    className={`venue-grid ${isRahasya ? 'venue-noir' : 'venue-bollywood'} min-w-[600px] origin-top-left transition-transform duration-75 ease-out`}
                                                    style={{
                                                        transform: `scale(${scale})`,
                                                        marginBottom: gridDimensions.height * (scale - 1),
                                                        marginRight: gridDimensions.width * (scale - 1)
                                                    }}
                                                >
                                                    {/* Stage */}
                                                    <div className={`venue-area area-stage-top ${isRahasya ? 'bg-slate-800 border-slate-700' : 'bg-drama-dark border-drama'}`}>
                                                        <span>{isRahasya ? 'MAIN TERMINAL' : 'STAGE'}</span>
                                                    </div>
                                                    <div className={`venue-area area-stage-bottom ${isRahasya ? 'bg-slate-800 border-slate-700' : 'bg-drama-dark border-drama'}`}>
                                                        <span>{isRahasya ? 'ACCESS TUNNEL' : 'RAMP'}</span>
                                                    </div>

                                                    {/* Areas */}
                                                    {TICKET_TIERS.filter(t => t.id === (isRahasya ? 'forensics' : 'tech-fest')).map(tier => (
                                                        <div key={tier.id} className={`venue-area area-techfest ${isRahasya ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-purple-900/40 border-purple-500/30 hover:bg-purple-900/60'} ${isTierLocked(tier) ? 'opacity-50 cursor-not-allowed grayscale' : ''}`} onClick={() => handleTierSelect(tier)}>
                                                            <span>{tier.name}</span>
                                                            <div className="area-info">
                                                                <p className="font-bold">₹{tier.basePrice + 300}</p>
                                                                <p className="text-xs">{tier.available} / {tier.capacity} Seats</p>
                                                                {isTierLocked(tier) && <Lock className="w-4 h-4 mt-1" />}
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {TICKET_TIERS.filter(t => t.id === (isRahasya ? 'high-command' : 'faculty')).map(tier => (
                                                        <div key={tier.id} className={`venue-area area-faculty ${isRahasya ? 'bg-red-950 border-red-900/50 cursor-not-allowed text-red-800' : 'bg-red-900/40 border-red-500/30 cursor-not-allowed'}`} onClick={() => handleTierSelect(tier)}>
                                                            <span>{tier.name}</span>
                                                            <div className="absolute top-2 right-2"><Lock className="w-4 h-4" /></div>
                                                        </div>
                                                    ))}

                                                    {TICKET_TIERS.filter(t => t.id === (isRahasya ? 'inner-circle' : 'fanpit')).map(tier => (
                                                        <div key={tier.id} className={`venue-area area-fanpit ${isRahasya ? 'bg-black border-slate-600 text-white' : 'bg-pink-900/40 border-pink-500/30 hover:bg-pink-900/60'} ${isTierLocked(tier) ? 'opacity-50 cursor-not-allowed grayscale' : ''}`} onClick={() => handleTierSelect(tier)}>
                                                            <span>{tier.name}</span>
                                                            <div className="area-info">
                                                                <p className="font-bold">₹{tier.basePrice + 300}</p>
                                                                <p className="text-xs">{tier.available} / {tier.capacity} Seats</p>
                                                                {isTierLocked(tier) && <Lock className="w-4 h-4 mt-1" />}
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {TICKET_TIERS.filter(t => t.id === (isRahasya ? 'general-pop' : 'general')).map(tier => (
                                                        <div key={tier.id} className={`venue-area area-general ${isRahasya ? 'bg-slate-800 border-slate-600 text-slate-400' : 'bg-indigo-900/40 border-indigo-500/30 hover:bg-indigo-900/60'} ${isTierLocked(tier) ? 'opacity-50 cursor-not-allowed grayscale' : ''}`} onClick={() => handleTierSelect(tier)}>
                                                            <span>{tier.name}</span>
                                                            <div className="area-info">
                                                                <p className="font-bold">₹{tier.basePrice + 300}</p>
                                                                <p className="text-xs">{tier.available} / {tier.capacity} Seats</p>
                                                                {isTierLocked(tier) && <Lock className="w-4 h-4 mt-1" />}
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {TICKET_TIERS.filter(t => t.id === (isRahasya ? 'supply-depot' : 'food')).map(tier => (
                                                        <div key={tier.id} className={`venue-area area-food ${isRahasya ? 'bg-slate-900 border-slate-800 text-slate-500' : 'bg-orange-900/40 border-orange-500/30'}`}>
                                                            <span>{tier.name}</span>
                                                        </div>
                                                    ))}

                                                    {/* DJ / Control */}
                                                    <div className={`venue-area area-dj ${isRahasya ? 'bg-slate-900 border-slate-700' : 'bg-black border-drama'}`}>
                                                        <span>{isRahasya ? 'SURVEILLANCE' : 'DJ CONSOLE'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                            </Card>
                        )}
                    </div>

                    {/* Right Column: Details & Payment */}
                    <div className="lg:col-span-1">
                        {step === 1 && (
                            <Card className={`p-6 text-center h-full flex flex-col justify-center items-center ${isRahasya ? 'bg-black/40 border-slate-800' : 'bg-bollywood-800 border-drama'}`}>
                                <Users className={`w-16 h-16 mb-4 ${isRahasya ? 'text-slate-600' : 'text-glitz-paper/20'}`} />
                                <p className={isRahasya ? 'text-slate-400' : 'text-glitz-paper/60'}>Please fill in your details to proceed.</p>
                            </Card>
                        )}

                        {step === 2 && (
                            <Card className={`p-6 text-center h-full flex flex-col justify-center items-center ${isRahasya ? 'bg-black/40 border-slate-800' : 'bg-bollywood-800 border-drama'}`}>
                                <Ticket className={`w-16 h-16 mb-4 ${isRahasya ? 'text-slate-600' : 'text-glitz-paper/20'}`} />
                                <p className={isRahasya ? 'text-slate-400' : 'text-glitz-paper/60'}>Select a zone from the layout to proceed.</p>
                            </Card>
                        )}

                        {step === 3 && selectedTier && (
                            <div ref={summaryRef}>
                                <Card className={`p-6 ${isRahasya ? 'bg-black/40 border-slate-800' : 'bg-bollywood-800 border-drama'}`}>
                                    <h3 className={`text-xl font-bold mb-6 ${isRahasya ? 'text-white' : 'text-glitz-gold'}`}>Order Summary</h3>

                                    <div className="space-y-4 mb-6 text-sm">
                                        <div className="flex justify-between">
                                            <span>Zone</span>
                                            <span className="font-bold">{selectedTier.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Base Price</span>
                                            <span className="font-bold">₹{selectedTier.basePrice}</span>
                                        </div>
                                        <div className="flex justify-between text-glitz-paper/70">
                                            <span>TechFest & Games</span>
                                            <span className="font-bold">+ ₹300</span>
                                        </div>

                                        {/* Accommodation Checkbox for All Students */}
                                        {/* Show for Tech Bazaar (External) OR Any Amity Booking */}
                                        {(selectedTier.id === 'tech-fest' || isAmity) && (
                                            <div className="border-t border-white/10 pt-4 mt-4">
                                                <div className="mb-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded text-sm">
                                                    <p className="mb-2">Looking for accommodation?</p>
                                                    <a
                                                        href="https://forms.google.com/your-form-url"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-400 hover:text-blue-300 underline font-bold"
                                                    >
                                                        Fill this Google Form first
                                                    </a>
                                                </div>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={accommodation}
                                                        onChange={(e) => setAccommodation(e.target.checked)}
                                                        className="w-4 h-4 rounded border-gray-300 text-drama focus:ring-drama"
                                                    />
                                                    <span>Include Accommodation (+₹300)</span>
                                                </label>
                                            </div>
                                        )}

                                        <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-4">
                                            <span>Total</span>
                                            <span>₹{calculateTotal()}</span>
                                        </div>
                                    </div>

                                    {/* Verification Section (Email for Amity, ID for others) */}
                                    <div className="mb-6 border-t border-white/10 pt-4">
                                        <h4 className="font-bold mb-3">{isAmity ? 'College Email Verification' : 'Student Identity Verification'}</h4>
                                        <div className="flex gap-2">
                                            {isAmity ? (
                                                <Input
                                                    placeholder="Amity Email ID"
                                                    value={verificationEmail}
                                                    onChange={(e) => setVerificationEmail(e.target.value)}
                                                    className={`flex-1 min-w-0 ${isRahasya ? 'bg-slate-900 border-slate-700' : ''}`}
                                                    disabled={isVerified}
                                                />
                                            ) : (
                                                <Input
                                                    placeholder="College ID No."
                                                    value={verificationId}
                                                    onChange={(e) => setVerificationId(e.target.value)}
                                                    className={`flex-1 min-w-0 ${isRahasya ? 'bg-slate-900 border-slate-700' : ''}`}
                                                    disabled={isVerified}
                                                />
                                            )}
                                            <Button
                                                onClick={handleVerify}
                                                disabled={isVerified || isVerifying}
                                                className={`${isVerified ? 'bg-green-600' : 'bg-blue-600'} text-white px-4`}
                                            >
                                                {isVerifying ? '...' : isVerified ? <Check className="w-4 h-4" /> : 'Verify'}
                                            </Button>
                                        </div>
                                        {isVerified && <p className="text-green-500 text-xs mt-1">
                                            {isAmity ? "Email verified successfully" : "ID verified successfully"}
                                        </p>}
                                    </div>

                                    <Button onClick={handlePayment} variant="primary" className={`w-full ${isRahasya ? 'bg-blood hover:bg-red-700' : 'bg-drama hover:bg-drama-light'}`} disabled={!isVerified}>
                                        <CreditCard className="w-4 h-4 mr-2 inline" />
                                        Pay Now
                                    </Button>
                                    <button onClick={() => setStep(2)} className="w-full mt-4 text-sm underline opacity-60 hover:opacity-100">Back</button>
                                </Card>
                            </div>
                        )}

                        {step === 4 && (
                            <Card className={`p-8 text-center ${isRahasya ? 'bg-black/40 border-slate-800' : 'bg-bollywood-800 border-drama'}`}>
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${isRahasya ? 'bg-green-900/30 text-green-500' : 'bg-green-500/20 text-green-500'}`}>
                                    <Check className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
                                <p className="opacity-80 mb-6">Your tickets have been sent to your email.</p>
                                <Button onClick={() => { setStep(1); setSelectedTier(null); setUserData(null); }} variant="secondary">Book More</Button>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className={`fixed bottom-8 right-8 px-6 py-3 rounded shadow-lg flex items-center animate-bounce ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {toast.message}
                </div>
            )}
        </div>
    );
};