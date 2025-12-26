
import React, { useState } from 'react';
import { EVENTS, CATEGORY_ICONS } from '../constants';
import { SectionTitle, EvidenceCard } from '../components/UIComponents';
import { Clock, MapPin, Calendar } from 'lucide-react';

export const Schedule: React.FC = () => {
  const uniqueDays = Array.from(new Set(EVENTS.map(e => e.date))).sort();
  const [selectedDay, setSelectedDay] = useState(uniqueDays[0] || 'Day 1');

  const filteredEvents = EVENTS.filter(e => e.date === selectedDay);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <SectionTitle title="Festival Schedule" subtitle="Don't Miss a Moment" />

      {/* Day Selection Tabs */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex bg-noir-800 border border-slate-700 p-1 rounded-sm shadow-2xl">
          {uniqueDays.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-8 py-3 text-sm font-bold font-display tracking-widest uppercase transition-all duration-300 ${selectedDay === day
                  ? 'bg-drama text-white shadow-lg'
                  : 'text-glitz-paper/60 hover:text-white hover:bg-white/5'
                }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Center Line (Desktop) / Left Line (Mobile) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-bollywood-700 -translate-x-1/2">
          <div className="absolute top-0 bottom-0 w-full bg-gradient-to-b from-transparent via-drama/50 to-transparent opacity-50"></div>
        </div>

        {filteredEvents.map((event, index) => {
          // Alternate sides for desktop
          const isLeft = index % 2 === 0;

          return (
            <div key={event.id} className={`relative flex items-center justify-between md:justify-normal mb-12 w-full ${isLeft ? 'md:flex-row-reverse' : ''}`}>

              {/* Desktop Spacer for alternate side */}
              <div className="hidden md:block w-1/2" />

              {/* Timeline Node/Marker */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-bollywood-900 border-2 border-glitz-gold rounded-full z-10 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.4)]">
                <div className="w-2 h-2 bg-drama rounded-full animate-pulse"></div>
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                <EvidenceCard className="p-6 transform hover:scale-[1.02] transition-transform border-l-4 border-l-drama relative overflow-hidden">

                  {/* Time Stamp Badge */}
                  <div className="absolute top-0 right-0 bg-bollywood-900 px-3 py-1 border-b border-l border-bollywood-700 text-glitz-gold font-mono text-xs">
                    {event.time}
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-drama">
                    {CATEGORY_ICONS[event.category]}
                    <span className="text-xs font-bold uppercase tracking-wider">{event.category}</span>
                  </div>

                  <h3 className="text-xl font-display text-white mb-2">{event.title}</h3>

                  <div className="flex flex-col gap-1 text-sm text-glitz-paper/70 font-mono mb-4">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" /> {event.location}
                    </span>
                  </div>

                  <p className="text-glitz-paper/80 text-sm line-clamp-2 font-body">
                    {event.description}
                  </p>

                </EvidenceCard>
              </div>
            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-bollywood-700 text-glitz-paper/50 font-mono">
            NO EVENTS SCHEDULED FOR THIS DAY
          </div>
        )}
      </div>
    </div>
  );
};
