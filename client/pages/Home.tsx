import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UIComponents';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { AmisparkFloatingIcons } from '../components/AmisparkFloatingIcons';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set your event date here
    const targetDate = new Date("2026-02-17T00:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="bg-bollywood-800 border border-bollywood-700 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center text-2xl md:text-4xl font-display text-glitz-gold shadow-[0_0_10px_rgba(251,191,36,0.3)] rounded-full">
        {value.toString().padStart(2, '0')}
      </div>
      <span className="mt-2 text-xs font-mono text-drama-light uppercase tracking-widest">{label}</span>
    </div>
  );

  return (
    <div className="flex justify-center flex-wrap my-8">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-stage-glow opacity-90 z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-20 z-0 mix-blend-overlay" />

        {/* Floating Party Icons */}
        <AmisparkFloatingIcons />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <div className="mb-4 inline-block bg-drama text-white px-4 py-1 text-sm font-bold tracking-[0.3em] uppercase transform -rotate-2 shadow-lg">
            Lights, Camera, Action!
          </div>

          <div className="mb-8 w-full flex justify-center">
            <img
              src="https://i.ibb.co/fz6gHG0L/Untitled-design-removebg-preview.png"
              alt="AMISPARK x RAHASYA"
              className="w-full max-w-3xl h-auto object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.1)] filter brightness-110 contrast-125"
            />
          </div>

          <p className="text-xl md:text-2xl font-light text-glitz-paper mb-8 max-w-2xl mx-auto border-t border-b border-bollywood-700 py-4 font-body italic">
            "Experience the magic, the drama, and the music of Bollywood!"
          </p>

          <Countdown />

          <div className="flex flex-col md:flex-row gap-6 justify-center mt-12">
            <Button onClick={() => navigate('/tickets')} className="min-w-[200px] bg-drama hover:bg-drama-light">
              Book Tickets
            </Button>
            <Button variant="secondary" onClick={() => navigate('/events')} className="min-w-[200px] border-glitz-gold text-glitz-gold hover:bg-glitz-gold hover:text-bollywood-900">
              View Events
            </Button>
          </div>
        </div>
      </section>

      {/* Info Strip */}
      <div className="bg-glitz-gold text-bollywood-900 py-4 font-bold font-body text-sm overflow-hidden whitespace-nowrap border-y-4 border-drama mt-12">
        <div className="flex animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-4 flex items-center">
              ★ WELCOME TO THE BIGGEST BOLLYWOOD FESTIVAL OF THE YEAR ★ GET YOUR TICKETS NOW
            </span>
          ))}
        </div>
      </div>



      {/* Quick Details - Premium Revamp */}
      <section className="py-24 bg-bollywood-900 container mx-auto px-4 relative">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-drama opacity-20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-glitz-gold opacity-10 blur-3xl rounded-full pointer-events-none"></div>

        <h2 className="text-4xl md:text-5xl font-display text-center text-transparent bg-clip-text bg-gradient-to-r from-glitz-gold via-white to-glitz-gold mb-16 drop-shadow-md">
          THE GRAND PREMIERE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1: Dates */}
          <div className="group relative bg-bollywood-800 rounded-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-drama to-glitz-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-bollywood-700/50 flex items-center justify-center mb-6 group-hover:bg-drama/20 transition-colors">
                <Calendar className="w-8 h-8 text-glitz-gold group-hover:text-drama-light transition-colors" />
              </div>
              <h3 className="text-2xl font-display text-white mb-2 tracking-wide">SHOW DATES</h3>
              <p className="text-glitz-paper/80 font-medium text-lg">February 17-19, 2026</p>
              <div className="mt-4 w-12 h-0.5 bg-white/20 group-hover:w-full transition-all duration-500"></div>
              <p className="text-drama-light text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">Block your dates!</p>
            </div>
          </div>

          {/* Card 2: Venue */}
          <div className="group relative bg-bollywood-800 rounded-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-glitz-gold to-drama transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-bollywood-700/50 flex items-center justify-center mb-6 group-hover:bg-glitz-gold/20 transition-colors">
                <MapPin className="w-8 h-8 text-drama-light group-hover:text-glitz-gold transition-colors" />
              </div>
              <h3 className="text-2xl font-display text-white mb-2 tracking-wide">THE STAGE</h3>
              <p className="text-glitz-paper/80 font-medium text-lg">University Main Campus</p>
              <div className="mt-4 w-12 h-0.5 bg-white/20 group-hover:w-full transition-all duration-500"></div>
              <p className="text-glitz-gold text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">Raipur, Chhattisgarh</p>
            </div>
          </div>

          {/* Card 3: Duration */}
          <div className="group relative bg-bollywood-800 rounded-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-drama to-glitz-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-bollywood-700/50 flex items-center justify-center mb-6 group-hover:bg-drama/20 transition-colors">
                <Clock className="w-8 h-8 text-white group-hover:text-drama-light transition-colors" />
              </div>
              <h3 className="text-2xl font-display text-white mb-2 tracking-wide">SCREEN TIME</h3>
              <p className="text-glitz-paper/80 font-medium text-lg">72 Hours Non-Stop</p>
              <div className="mt-4 w-12 h-0.5 bg-white/20 group-hover:w-full transition-all duration-500"></div>
              <p className="text-drama-light text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">The show never ends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rahasya CTA - The Glitch */}
      <section className="relative py-16 bg-black overflow-hidden group cursor-pointer" onClick={() => navigate('/rahasya')}>
        {/* Background Noise */}
        <div className="absolute inset-0 opacity-20 bg-static-noise pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>

        <div className="container mx-auto px-4 relative z-20 flex flex-col md:flex-row items-center justify-between">
          <div className="text-left md:w-2/3">
            <h2 className="text-3xl md:text-5xl font-mono text-white font-bold tracking-tighter mb-2 group-hover:text-blood transition-colors duration-300">
              <span className="inline-block animate-pulse text-blood mr-2">⚠</span>
              CLASSIFIED_ACCESS
            </h2>
            <p className="font-mono text-slate-400 text-sm md:text-base max-w-xl">
              Unknown signal detected. Origin: Sector 9. Probability of mystery: 100%.
              <br />
              <span className="text-blood/70"> {">>"} Do you dare to investigate?</span>
            </p>
          </div>

          <div className="mt-8 md:mt-0">
            <Button className="bg-transparent border-2 border-blood text-blood font-mono hover:bg-blood hover:text-white px-8 py-6 text-lg tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] rounded-sm">
              ENTER_RAहासYA
            </Button>
          </div>
        </div>

        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blood to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blood to-transparent opacity-50"></div>
      </section>
    </div>
  );
};
