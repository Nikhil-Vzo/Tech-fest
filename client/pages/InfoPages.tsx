import React from 'react';
import { SectionTitle } from '../components/UIComponents';

export const About: React.FC = () => (
  <div className="container mx-auto px-4 py-12">
    <SectionTitle title="About The Fest" subtitle="Our Story" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="prose prose-invert">
        <p className="text-xl font-body leading-relaxed text-glitz-paper/90">
          AMISPARK x RAHASYA is not just a festival; it's a celebration of culture, creativity, and cinema.
          We bring together the brightest stars and the biggest fans for a 3-day extravaganza.
        </p>
        <p className="text-lg font-body leading-relaxed text-glitz-paper/70 mt-4">
          From dance battles to fashion shows, from quizzes to film screenings, we have it all.
          Join us as we pay tribute to the magic of Bollywood.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="p-4 border border-drama bg-drama/10 text-center">
            <span className="block text-3xl font-display text-white">50+</span>
            <span className="text-xs uppercase tracking-widest text-drama">Events</span>
          </div>
          <div className="p-4 border border-glitz-gold bg-glitz-gold/10 text-center">
            <span className="block text-3xl font-display text-white">5000+</span>
            <span className="text-xs uppercase tracking-widest text-glitz-gold">Attendees</span>
          </div>
        </div>
      </div>
      <div className="relative">
        <img src="https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=600&auto=format&fit=crop" alt="Festival Crowd" className="w-full h-auto border-4 border-white transform rotate-2 shadow-2xl" />
        <div className="absolute inset-0 border-4 border-drama transform -rotate-2 mix-blend-multiply"></div>
      </div>
    </div>
  </div>
);