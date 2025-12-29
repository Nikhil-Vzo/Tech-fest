import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

// Lazy Load Pages
const Home = React.lazy(() => import('../pages/Home').then(module => ({ default: module.Home })));
const Events = React.lazy(() => import('../pages/Events').then(module => ({ default: module.Events })));
const Booking = React.lazy(() => import('../pages/Booking').then(module => ({ default: module.Booking })));
const About = React.lazy(() => import('../pages/InfoPages').then(module => ({ default: module.About })));
const Schedule = React.lazy(() => import('../pages/Schedule').then(module => ({ default: module.Schedule })));
const Gallery = React.lazy(() => import('../pages/Gallery').then(module => ({ default: module.Gallery })));
const Receipt = React.lazy(() => import('../pages/Receipt').then(module => ({ default: module.Receipt })));
// NEW: Digital Ticket Page
const DigitalTicket = React.lazy(() => import('../pages/DigitalTicket').then(module => ({ default: module.DigitalTicket })));

const RahasyaHome = React.lazy(() => import('../pages/RahasyaHome').then(module => ({ default: module.RahasyaHome })));
const RahasyaEvents = React.lazy(() => import('../pages/RahasyaEvents').then(module => ({ default: module.RahasyaEvents })));
const RahasyaTimeline = React.lazy(() => import('../pages/RahasyaTimeline').then(module => ({ default: module.RahasyaTimeline })));
const RahasyaAbout = React.lazy(() => import('../pages/RahasyaAbout').then(module => ({ default: module.RahasyaAbout })));

const LoadingSpinner = () => (
    <div className="w-full h-screen flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
    </div>
);

export const AnimatedRoutes: React.FC = () => {
    const location = useLocation();
    const isRahasya = location.pathname.includes('/rahasya');

    return (
        <div className="relative w-full min-h-screen grid grid-cols-1 grid-rows-1 overflow-x-hidden">
            <AnimatePresence initial={false}>
                <Routes location={location} key={location.pathname}>
                    <Route path="*" element={
                        <PageWrapper isRahasya={isRahasya}>
                            <Suspense fallback={null}>
                                <Routes location={location}>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/events" element={<Events />} />
                                    <Route path="/schedule" element={<Schedule />} />
                                    <Route path="/gallery" element={<Gallery />} />
                                    <Route path="/tickets" element={<Booking />} />
                                    <Route path="/receipt" element={<Receipt />} />
                                    
                                    {/* NEW: Public Ticket View Route */}
                                    <Route path="/ticket-view" element={<DigitalTicket />} />

                                    {/* Rahasya Routes */}
                                    <Route path="/rahasya" element={<RahasyaHome />} />
                                    <Route path="/rahasya/booking" element={<Booking />} />
                                    <Route path="/rahasya/events" element={<RahasyaEvents />} />
                                    <Route path="/rahasya/about" element={<RahasyaAbout />} />
                                    <Route path="/rahasya/timeline" element={<RahasyaTimeline />} />
                                    <Route path="/rahasya/receipt" element={<Receipt />} />
                                </Routes>
                            </Suspense>
                        </PageWrapper>
                    } />
                </Routes>
            </AnimatePresence>
        </div>
    );
};

// Wrapper that handles the animation lifecycle
const PageWrapper: React.FC<{ children: React.ReactNode, isRahasya: boolean }> = ({ children, isRahasya }) => {
    const slideVariants = {
        initial: { x: '100%', zIndex: 20 },
        animate: { x: 0, zIndex: 20 },
        exit: { x: '-25%', zIndex: 0, opacity: 0.5 },
    };

    const staticVariants = {
        initial: { opacity: 1, x: 0 },
        animate: { opacity: 1, x: 0, transition: { duration: 0 } },
        exit: { opacity: 1, x: 0, transition: { duration: 0 } }
    };

    return (
        <div className="col-start-1 row-start-1 w-full min-h-screen">
            <motion.div
                className={`w-full min-h-screen ${isRahasya ? 'bg-noir-900 overflow-hidden' : 'bg-bollywood-900'}`}
                variants={isRahasya ? staticVariants : slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
};