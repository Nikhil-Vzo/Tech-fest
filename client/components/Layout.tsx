import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Instagram, Twitter, Facebook, Sparkles, Search, FileText, MessageCircle, MapPin } from 'lucide-react';
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
                  <Link to="/rahasya" className="font-mono font-bold text-blood border border-blood bg-black px-6 py-2 rounded-sm shadow-[0_0_10px_rgba(220,38,38,0.3)] hover:bg-blood hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.6)] transition-all tracking-widest transform hover:-translate-y-0.5">
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
                  <Link to="/rahasya/about" className="hover:text-blood">ABOUT</Link>
                  <Link to="/rahasya/timeline" className="hover:text-blood">TIMELINE</Link>
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
    </div>
  );
};