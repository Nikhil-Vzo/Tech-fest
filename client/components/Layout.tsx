import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Instagram, Twitter, Facebook, Sparkles, Search, FileText, MessageCircle, MapPin } from 'lucide-react';
import { ThemeTransition } from './ThemeTransition';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isFading, setIsFading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isRahasya = location.pathname.includes('/rahasya');
  const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  // Reset fade state on route change
  useEffect(() => {
    if (isFading) {
      setIsFading(false);
    }
  }, [location.pathname]);

  return (
    <div className={`min-h-screen flex flex-col w-full overflow-x-hidden ${isRahasya ? 'bg-noir-900 text-slate-300 font-mono' : 'bg-bollywood-900 text-glitz-paper font-body'} ${isFading ? 'fade-out' : ''} transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <ThemeTransition />
      {/* Top Decoration */}
      <div className={`h-2 w-full ${isRahasya ? 'bg-caution-tape' : 'bg-festive-pattern'}`} />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isRahasya
        ? 'bg-noir-900/95 border-b border-slate-800 backdrop-blur-md top-0'
        : 'bg-bollywood-900/90 border-b border-drama backdrop-blur-md top-0'
        }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to={isRahasya ? "/rahasya" : "/"} className="text-2xl font-bold tracking-tighter flex items-center group">
              {isRahasya ? (
                <>
                  <span className="text-white group-hover:text-blood transition-colors">RAहस्य</span>
                  <span className="text-blood ml-1 animate-pulse">_</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 text-glitz-gold mr-2 animate-spin-slow" />
                  <span className="font-display text-transparent bg-clip-text bg-gradient-to-r from-glitz-gold to-drama-light">AMISPARK</span>
                </>
              )}
            </Link>

            {/* Desktop Menu with Sliding Blob */}
            <div className="hidden md:flex relative items-center" onMouseLeave={() => setHoverStyle((prev) => ({ ...prev, opacity: 0 }))}>
              {/* The Blob */}
              <div
                className={`absolute transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] rounded-full z-0 ${isRahasya
                  ? 'bg-blood/20 border border-blood/40 shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                  : 'bg-gradient-to-b from-white/70 to-white/30 backdrop-blur-xl border border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.5)]'
                  }`}
                style={{
                  left: hoverStyle.left,
                  width: hoverStyle.width,
                  height: '36px', // Fixed height for consistency
                  opacity: hoverStyle.opacity,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />

              {/* Menu Items */}
              <div className="flex space-x-2 relative z-10">
                {isRahasya ? (
                  <>
                    {[
                      { path: '/rahasya', label: 'HOME' },
                      { path: '/rahasya/about', label: 'ABOUT RAहस्य' },
                      { path: '/rahasya/events', label: 'EVENTS' },
                      { path: '/rahasya/timeline', label: 'TIMELINE' },
                    ].map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="px-4 py-2 text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-blood transition-colors rounded-md"
                        onMouseEnter={(e) => {
                          const target = e.currentTarget;
                          setHoverStyle({
                            left: target.offsetLeft,
                            width: target.offsetWidth,
                            opacity: 1
                          });
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}

                    {/* Access Buttons (No Blob) */}
                    <div className="flex items-center ml-4 space-x-2" onMouseEnter={() => setHoverStyle(prev => ({ ...prev, opacity: 0 }))}>
                      <Link to="/" className="bg-transparent hover:bg-white/10 text-white border border-white/20 px-4 py-2 text-xs tracking-widest uppercase transition-all">
                        AMISPARK
                      </Link>
                      <button onClick={() => setShowBookingModal(true)} className="bg-blood hover:bg-red-700 text-white px-6 py-2 rounded-none font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] clip-path-slanted">
                        BUY TICKETS
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {[
                      { path: '/', label: 'Home' },
                      { path: '/about', label: 'About' },
                      { path: '/events', label: 'Events' },
                      { path: '/schedule', label: 'Schedule' },
                      { path: '/gallery', label: 'Gallery' },
                      { path: '/tickets', label: 'Tickets' },
                    ].map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="px-4 py-2 text-white font-semibold hover:text-bollywood-900 transition-colors duration-300 rounded-full z-10 relative"
                        onMouseEnter={(e) => {
                          const target = e.currentTarget;
                          setHoverStyle({
                            left: target.offsetLeft,
                            width: target.offsetWidth,
                            opacity: 1
                          });
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}

                    {/* Rahasya Button (No Blob) */}
                    <div className="ml-4" onMouseEnter={() => setHoverStyle(prev => ({ ...prev, opacity: 0 }))}>
                      <Link to="/rahasya" className="font-mono font-bold text-blood border border-blood bg-black px-6 py-2 rounded-sm shadow-[0_0_10px_rgba(220,38,38,0.3)] hover:bg-blood hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.6)] transition-all tracking-widest transform hover:-translate-y-0.5">
                        RAहस्य
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white ml-auto" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden fixed inset-0 top-[73px] w-full h-[calc(100vh-73px)] ${isRahasya ? 'bg-noir-900 border-t border-slate-800' : 'bg-bollywood-900 border-t border-drama/30'} p-6 overflow-y-auto slide-in-bottom z-40`}>
            <div className="flex flex-col space-y-4 text-center text-xl mt-10">
              {isRahasya ? (
                <>
                  <Link to="/rahasya" className="hover:text-blood">HOME</Link>
                  <Link to="/rahasya/about" className="hover:text-blood">ABOUT</Link>
                  <Link to="/rahasya/timeline" className="hover:text-blood">TIMELINE</Link>
                  <Link to="/rahasya/events" className="hover:text-blood">EVIDENCE</Link>
                  <Link to="/rahasya/events" className="hover:text-blood">EVIDENCE</Link>
                  <button onClick={() => { setIsMenuOpen(false); setShowBookingModal(true); }} className="hover:text-blood text-center w-full">BUY TICKETS</button>
                  <Link to="/" className="text-blood font-bold mt-4 border border-blood p-2 inline-block mx-auto">EXIT INVESTIGATION</Link>
                </>
              ) : (
                <>
                  <Link to="/" className="hover:text-glitz-gold">Home</Link>
                  <Link to="/about" className="hover:text-glitz-gold">About</Link>
                  <Link to="/events" className="hover:text-glitz-gold">Events</Link>
                  <Link to="/schedule" className="hover:text-glitz-gold">Schedule</Link>
                  <Link to="/gallery" className="hover:text-glitz-gold py-2">Gallery</Link>
                  <Link to="/tickets" className="bg-gradient-to-r from-drama to-drama-dark text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all mt-2 w-auto min-w-[200px] mx-auto">
                    BOOK TICKETS
                  </Link>
                  <Link to="/rahasya" className="font-mono font-bold text-blood border-2 border-blood bg-black py-3 px-6 rounded-sm shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:bg-blood hover:text-white transition-all tracking-[0.2em] transform hover:-translate-y-1 mt-4 w-auto min-w-[200px] mx-auto text-lg">
                    RAहस्य_ENTER
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className={`flex-grow pt-24 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </main>

      {/* Footer */}
      {isRahasya ? (
        // Rahasya Footer (Screenshot based)
        <footer className="bg-noir-900 border-t-4 border-slate-800 relative mt-10 md:mt-20 text-slate-400 font-mono text-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-caution-tape"></div>
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Column 1 */}
              <div>
                <h3 className="text-white font-bold tracking-widest mb-4 uppercase border-l-2 border-blood pl-3">CONFIDENTIAL FILES</h3>
                <p className="leading-relaxed opacity-80">
                  AMISPARK x RAHASYA 2026 represents the pinnacle of forensic technology and digital investigation. Join us to uncover the truth hidden within the code.
                </p>
                <div className="flex gap-4 mt-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blood hover:text-white transition-colors cursor-pointer">
                      <Search className="w-3 h-3" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2 */}
              <div>
                <h3 className="text-blood font-bold tracking-widest mb-4 uppercase">NAVIGATION</h3>
                <ul className="space-y-3">
                  <li><Link to="/rahasya" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/rahasya/about" className="hover:text-white transition-colors">About Case</Link></li>
                  <li><Link to="/rahasya/events" className="hover:text-white transition-colors">Evidence (Events)</Link></li>
                  <li><Link to="/rahasya/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <h3 className="text-blood font-bold tracking-widest mb-4 uppercase">HQ CONTACT</h3>
                <ul className="space-y-3 opacity-80">
                  <li className="flex items-center"><FileText className="w-4 h-4 mr-2" /> Case #402-B, Tech Building</li>
                  <li>University Campus, Sector 9</li>
                  <li>detective@amispark.edu</li>
                  <li>+1 (555) 019-2026</li>
                </ul>
              </div>
            </div>

            {/* WhatsApp Contact */}
            <div className="mt-8 md:mt-12 text-center">
              <a
                href="https://wa.me/919098893505"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-blood hover:bg-red-700 text-white px-6 py-3 md:px-8 md:py-4 font-bold text-xs md:text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] group"
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-pulse" />
                CONTACT US ON WHATSAPP
              </a>
            </div>

            <div className="border-t border-slate-800 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-wider opacity-50 gap-4 md:gap-0 text-center md:text-left">
              <p>© 2026 AMISPARK x RAHASYA. All rights reserved. CLASSIFIED.</p>
              <div className="space-x-4">
                <a href="#" className="hover:text-white">Privacy Protocol</a>
                <a href="#" className="hover:text-white">Terms of Investigation</a>
              </div>
            </div>
          </div>
        </footer>
      ) : (
        // Amispark Premium Footer
        <footer className="bg-gradient-to-t from-bollywood-900 to-drama-dark border-t-4 border-glitz-gold relative mt-12 text-glitz-paper">
          {/* Curtain Effect Decor */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 -mt-1">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[50px] fill-drama">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
            </svg>
          </div>

          <div className="container mx-auto px-4 pt-16 pb-8">
            <div className="flex flex-col items-center text-center mb-8">
              <Sparkles className="w-10 h-10 text-glitz-gold mb-3 animate-spin-slow" />
              <h2 className="text-3xl md:text-5xl font-display text-transparent bg-clip-text bg-gradient-to-r from-glitz-gold via-white to-glitz-gold mb-3 tracking-tighter">
                AMISPARK 2026
              </h2>
              <p className="max-w-2xl text-base text-glitz-paper/80 font-light italic">
                "Where the magic of cinema meets the spirit of youth."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-white/10 pt-8">
              <div className="md:col-span-2 text-left">
                <h3 className="font-display text-xl text-white mb-4">STAY CONNECTED</h3>
                <p className="mb-6 leading-relaxed opacity-90 text-sm">
                  Follow us for exclusive behind-the-scenes content, artist reveals, and daily updates. Be the star of your own story.
                </p>
                <div className="flex gap-4 justify-start">
                  {[
                    { icon: Instagram, color: "hover:bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500" },
                    { icon: Twitter, color: "hover:bg-blue-400" },
                    { icon: Facebook, color: "hover:bg-blue-600" }
                  ].map((social, idx) => (
                    <a key={idx} href="#" className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white transition-all transform hover:-translate-y-2 hover:shadow-lg ${social.color}`}>
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-glitz-gold mb-4 tracking-widest text-xs">QUICK LINKS</h4>
                <ul className="space-y-2 text-sm text-glitz-paper/80 font-medium">
                  <li><Link to="/about" className="hover:text-drama-light transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-glitz-gold rounded-full mr-2"></span> About Us</Link></li>
                  <li><Link to="/schedule" className="hover:text-drama-light transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-glitz-gold rounded-full mr-2"></span> Schedule</Link></li>
                  <li><Link to="/gallery" className="hover:text-drama-light transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-glitz-gold rounded-full mr-2"></span> Gallery</Link></li>
                  <li><Link to="/tickets" className="hover:text-drama-light transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-glitz-gold rounded-full mr-2"></span> Book Tickets</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-glitz-gold mb-4 tracking-widest text-xs">CONTACT INFO</h4>
                <ul className="space-y-2 text-sm text-glitz-paper/80">
                  <li className="flex items-start"><MapPin className="w-4 h-4 mr-3 text-drama-light shrink-0" /> Amity University<br />Sector 125, Noida</li>
                  <li className="flex items-center"><FileText className="w-4 h-4 mr-3 text-drama-light shrink-0" /> contact@amispark.com</li>
                  <li className="flex items-center"><MessageCircle className="w-4 h-4 mr-3 text-drama-light shrink-0" /> +91 98765 43210</li>
                </ul>
              </div>
            </div>

            {/* WhatsApp Contact */}
            <div className="mt-10 text-center">
              <a
                href="https://wa.me/919098893505"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-drama to-purple-600 hover:from-drama-light hover:to-purple-500 text-white px-8 py-3 rounded-full font-bold shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(139,92,246,0.4)] transition-all transform hover:-translate-y-1 border border-white/20 group text-sm"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
                <span className="bg-white/20 rounded-full px-2 py-0.5 text-[10px] ml-1">24/7</span>
              </a>
            </div>

            <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-glitz-paper/40 tracking-wider">
              <p>&copy; 2026 AMISPARK. All rights reserved.</p>
              <div className="space-x-4 mt-2 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      )}


      {/* Redirection Modal used in Layout to cover Navbar triggers */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-noir-900 border-2 border-blood max-w-lg w-full p-8 relative shadow-[0_0_50px_rgba(220,38,38,0.3)]"
            >
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-blood -mt-1 -ml-1"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-blood -mb-1 -mr-1"></div>

              <h2 className="text-2xl md:text-3xl font-special-elite text-white mb-6 tracking-widest text-center border-b border-blood/30 pb-4">
                ⚠ TRANSMISSION INTERCEPTED
              </h2>

              <p className="font-mono text-slate-300 mb-8 leading-relaxed text-center">
                Intelligence Report: <span className="text-blood font-bold">Rahasya</span> events are integrated into the central <span className="text-white font-bold">Amispark Access Pass</span>.
                <br /><br />
                You will be redirected to the secure Amispark Booking Terminal. One ticket grants access to both realities.
              </p>

              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-3 border border-slate-600 hover:bg-slate-800 text-slate-400 font-bold tracking-widest uppercase transition-all font-mono"
                >
                  ABORT
                </button>
                <Link to="/tickets" onClick={() => setShowBookingModal(false)} className="flex-1">
                  <button className="w-full py-3 bg-blood hover:bg-red-700 text-white font-bold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] font-mono animate-pulse">
                    PROCEED
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};