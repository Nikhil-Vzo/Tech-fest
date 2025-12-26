import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Instagram, Twitter, Facebook, Sparkles, Search, FileText, MessageCircle } from 'lucide-react';
import { ThemeTransition } from './ThemeTransition';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isFading, setIsFading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isRahasya = location.pathname.includes('/rahasya');

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
    <div className={`min-h-screen flex flex-col ${isRahasya ? 'bg-noir-900 text-slate-300 font-mono' : 'bg-bollywood-900 text-glitz-paper font-body'} ${isFading ? 'fade-out' : ''} transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <ThemeTransition />
      {/* Top Decoration */}
      <div className={`h-2 w-full ${isRahasya ? 'bg-caution-tape' : 'bg-festive-pattern'}`} />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isRahasya
        ? 'bg-noir-900/95 border-b border-slate-800 backdrop-blur-md top-2'
        : 'bg-bollywood-900/90 border-b border-drama backdrop-blur-md top-2'
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

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {isRahasya ? (
                // Rahasya / Tech Fest Menu (Refined)
                <>
                  <Link to="/rahasya" className="hover:text-blood transition-colors text-xs font-bold tracking-widest uppercase text-slate-400">HOME</Link>
                  <Link to="/rahasya/about" className="hover:text-blood transition-colors text-xs font-bold tracking-widest uppercase text-slate-400">ABOUT RAहस्य</Link>
                  <Link to="/rahasya/events" className="hover:text-blood transition-colors text-xs font-bold tracking-widest uppercase text-slate-400">EVENTS</Link>
                  <Link to="/rahasya/timeline" className="hover:text-blood transition-colors text-xs font-bold tracking-widest uppercase text-slate-400">TIMELINE</Link>
                  <Link to="/" className="bg-transparent hover:bg-white/10 text-white border border-white/20 px-4 py-2 text-xs tracking-widest uppercase transition-all">
                    AMISPARK
                  </Link>
                  <Link to="/rahasya/booking" className="bg-blood hover:bg-red-700 text-white px-6 py-2 rounded-none font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] clip-path-slanted">
                    BUY TICKETS
                  </Link>
                </>
              ) : (
                // Amispark / Bollywood Menu
                <>
                  <Link to="/" className="hover:text-glitz-gold transition-colors font-medium">Home</Link>
                  <Link to="/about" className="hover:text-glitz-gold transition-colors font-medium">About</Link>
                  <Link to="/events" className="hover:text-glitz-gold transition-colors font-medium">Events</Link>
                  <Link to="/schedule" className="hover:text-glitz-gold transition-colors font-medium">Schedule</Link>
                  <Link to="/gallery" className="hover:text-glitz-gold transition-colors font-medium">Gallery</Link>
                  <Link to="/tickets" className="hover:text-glitz-gold transition-colors font-medium">Tickets</Link>
                  <Link to="/rahasya" className="bg-drama hover:bg-drama-light text-white px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 border border-glitz-gold/30">
                    RAहस्य
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden absolute w-full h-screen ${isRahasya ? 'bg-noir-900' : 'bg-bollywood-900'} p-4 top-full left-0`}>
            <div className="flex flex-col space-y-4 text-center text-xl mt-10">
              {isRahasya ? (
                <>
                  <Link to="/rahasya" className="hover:text-blood">HOME</Link>
                  <Link to="/rahasya/events" className="hover:text-blood">EVIDENCE</Link>
                  <Link to="/rahasya/booking" className="hover:text-blood">PERMITS</Link>
                  <Link to="/" className="text-blood font-bold mt-4 border border-blood p-2 inline-block mx-auto">EXIT INVESTIGATION</Link>
                </>
              ) : (
                <>
                  <Link to="/" className="hover:text-glitz-gold">Home</Link>
                  <Link to="/about" className="hover:text-glitz-gold">About</Link>
                  <Link to="/events" className="hover:text-glitz-gold">Events</Link>
                  <Link to="/schedule" className="hover:text-glitz-gold">Schedule</Link>
                  <Link to="/gallery" className="hover:text-glitz-gold">Gallery</Link>
                  <Link to="/tickets" className="hover:text-glitz-gold">Tickets</Link>
                  <Link to="/rahasya" className="text-drama hover:text-drama-light font-bold mt-4" onClick={(e) => {
                    e.preventDefault();
                    setIsFading(true);
                    setTimeout(() => navigate('/rahasya'), 500);
                  }}>रहस्य (Tech Fest)</Link>
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
        <footer className="bg-noir-900 border-t-4 border-slate-800 relative mt-20 text-slate-400 font-mono text-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-caution-tape"></div>
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
            <div className="mt-12 text-center">
              <a
                href="https://wa.me/919098893505"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-blood hover:bg-red-700 text-white px-8 py-4 font-bold text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] group"
              >
                <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
                CONTACT US ON WHATSAPP
              </a>
            </div>

            <div className="border-t border-slate-800 mt-12 pt-8 flex justify-between items-center text-xs uppercase tracking-wider opacity-50">
              <p>© 2026 AMISPARK x RAHASYA. All rights reserved. CLASSIFIED.</p>
              <div className="space-x-4">
                <a href="#" className="hover:text-white">Privacy Protocol</a>
                <a href="#" className="hover:text-white">Terms of Investigation</a>
              </div>
            </div>
          </div>
        </footer>
      ) : (
        // Amispark Footer (Original)
        <footer className="bg-bollywood-800 border-t-4 border-bollywood-700 relative mt-20">
          <div className="absolute top-0 left-0 w-full h-1 bg-festive-pattern"></div>
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

              <div className="col-span-1 md:col-span-2">
                <h3 className="font-display text-2xl text-white mb-4">FESTIVAL HIGHLIGHTS</h3>
                <p className="text-glitz-paper/80 max-w-md mb-6 leading-relaxed">
                  AMISPARK 2026 represents the pinnacle of Bollywood celebration and cultural extravaganza.
                  Join us to experience the magic, music, and magnificence of India's greatest cultural festival.
                </p>
                <div className="flex gap-4">
                  {['twitter', 'instagram', 'linkedin'].map(social => (
                    <div key={social} className="w-10 h-10 bg-bollywood-700 rounded-full flex items-center justify-center hover:bg-drama cursor-pointer transition-colors">
                      <span className="sr-only">{social}</span>
                      <Search className="w-4 h-4" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-glitz-gold mb-4 tracking-wider">QUICK LINKS</h4>
                <ul className="space-y-2 text-sm text-glitz-paper/70">
                  <li><Link to="/about" className="hover:text-drama transition-colors">About Us</Link></li>
                  <li><Link to="/schedule" className="hover:text-drama transition-colors">Schedule</Link></li>
                  <li><Link to="/gallery" className="hover:text-drama transition-colors">Gallery</Link></li>
                  <li><Link to="/tickets" className="hover:text-drama transition-colors">Book Tickets</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-glitz-gold mb-4 tracking-wider">CONTACT</h4>
                <ul className="space-y-2 text-sm text-glitz-paper/70">
                  <li>Amity University</li>
                  <li>Sector 125, Noida</li>
                  <li>contact@amispark.com</li>
                  <li>+91 98765 43210</li>
                </ul>
              </div>

            </div>

            {/* WhatsApp Contact */}
            <div className="mt-12 text-center">
              <a
                href="https://wa.me/919098893505"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-drama hover:bg-drama-light text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-glitz-gold/30 group"
              >
                <MessageCircle className="w-5 h-5 group-hover:animate-bounce" />
                Contact Us on WhatsApp
              </a>
            </div>

            <div className="border-t border-bollywood-700 mt-12 pt-8 text-center text-sm text-glitz-paper/40">
              <p>&copy; 2026 Amity University. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};