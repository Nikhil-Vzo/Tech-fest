import React, { useState } from 'react';
import { EVENTS, CATEGORY_ICONS } from '../constants';
import { Event } from '../types';
import { SectionTitle, EvidenceCard, Button, Modal } from '../components/UIComponents';
import { Calendar, Clock, MapPin } from 'lucide-react';

export const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(EVENTS.map(e => e.category)))];
  const filteredEvents = filter === 'All' ? EVENTS : EVENTS.filter(e => e.category === filter);

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle title="Festival Events" subtitle="The Main Attractions" />

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 font-mono text-sm uppercase tracking-wider border transition-all ${filter === cat
                ? 'bg-drama border-drama text-white'
                : 'bg-transparent border-bollywood-700 text-glitz-paper/70 hover:border-glitz-gold'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event, index) => (
          <div key={event.id} onClick={() => setSelectedEvent(event)} className="cursor-pointer h-full">
            <EvidenceCard badge={`00${index + 1}`} className="h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-bollywood-900 p-2 rounded-full border border-bollywood-700 text-glitz-gold">
                  {CATEGORY_ICONS[event.category]}
                </div>
                <span className="text-xs font-mono text-glitz-paper/60">{event.date.toUpperCase()}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-drama transition-colors line-clamp-2">
                {event.title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-glitz-paper/70 mb-4">
                <Clock className="w-3 h-3" /> {event.time}
              </div>

              <p className="text-glitz-paper/80 text-sm line-clamp-3 mb-6 flex-grow font-body">
                {event.description}
              </p>

              <div className="mt-auto pt-4 border-t border-dashed border-slate-700 flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-drama font-bold">Featured</span>
                <span className="text-glitz-paper/60 text-xs">View Details &rarr;</span>
              </div>
            </EvidenceCard>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title || 'EVENT DETAILS'}
      >
        {selectedEvent && (
          <div className="flex flex-col gap-6">
            <div className="flex gap-4 flex-wrap text-sm font-mono text-glitz-paper/80 border-b border-bollywood-700 pb-4">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-drama" /> {selectedEvent.date}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-drama" /> {selectedEvent.time}</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-drama" /> {selectedEvent.location}</span>
            </div>

            <div className="prose prose-invert max-w-none">
              <h4 className="text-white font-bold uppercase mb-2">Event Description</h4>
              <p className="text-glitz-paper/90 font-body text-lg leading-relaxed">{selectedEvent.description}</p>

              <h4 className="text-white font-bold uppercase mt-6 mb-2">Category: {selectedEvent.category}</h4>
              <p className="text-sm text-glitz-paper/60 italic">
                * Participation in this event requires a valid ticket.
                Don't miss out!
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <Button onClick={() => { setSelectedEvent(null); /* Navigate to booking */ }} className="bg-drama hover:bg-drama-light">
                Register Now
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
