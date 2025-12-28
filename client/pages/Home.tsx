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

      {/* Quick Details */}
      <section className="py-20 bg-bollywood-900 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-bollywood-800 p-8 border-l-4 border-drama rounded-r-xl">
            <Calendar className="w-10 h-10 text-drama mb-4" />
            <h3 className="text-2xl font-display text-white mb-2">FESTIVAL DATES</h3>
            <p className="text-glitz-paper/80">February 17-19, 2026</p>
            <p className="text-drama-light text-sm mt-2">Mark your calendar!</p>
          </div>
          <div className="bg-bollywood-800 p-8 border-l-4 border-glitz-gold rounded-r-xl">
            <MapPin className="w-10 h-10 text-glitz-gold mb-4" />
            <h3 className="text-2xl font-display text-white mb-2">VENUE</h3>
            <p className="text-glitz-paper/80">University Main Campus</p>
            <p className="text-glitz-gold/80 text-sm mt-2">Amity University Chhattisgarh, Raipur</p>
          </div>
          <div className="bg-bollywood-800 p-8 border-l-4 border-white rounded-r-xl">
            <Clock className="w-10 h-10 text-white mb-4" />
            <h3 className="text-2xl font-display text-white mb-2">DURATION</h3>
            <p className="text-glitz-paper/80">3 Days of Fun</p>
            <p className="text-glitz-paper/60 text-sm mt-2">Non-stop entertainment.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
