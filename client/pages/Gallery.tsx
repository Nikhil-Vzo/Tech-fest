import React from 'react';
import { SectionTitle } from '../components/UIComponents';
import { GALLERY_IMAGES } from '../constants';

export const Gallery: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <SectionTitle title="Festival Gallery" subtitle="Memories of Magic" />

      <p className="text-center text-glitz-paper/70 mb-12 max-w-2xl mx-auto font-body italic">
        "Pictures speak a thousand words, but these capture a million emotions."
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 bg-bollywood-800/30 border-2 border-dashed border-bollywood-700 rounded-lg">
        {GALLERY_IMAGES.map((img, index) => (
          <div
            key={img.id}
            className="group relative bg-white p-3 pb-12 shadow-xl transform transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl"
            style={{
              transform: `rotate(${Math.random() * 6 - 3}deg)`,
            }}
          >
            {/* Tape effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-drama/80 opacity-80 shadow-sm transform -rotate-1"></div>

            <div className="overflow-hidden h-64 w-full bg-gray-200 relative">
              <div className="absolute inset-0 bg-sepia opacity-20 pointer-events-none mix-blend-multiply"></div>
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {/* Grain overlay */}
              <div className="absolute inset-0 bg-black opacity-10 mix-blend-overlay"></div>
            </div>

            <div className="absolute bottom-2 left-0 w-full text-center">
              <p className="font-display text-black text-xl transform -rotate-1">{img.caption}</p>
              <p className="font-body text-xs text-drama font-bold tracking-widest">FESTIVAL #{2020 + index}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <div className="border border-drama text-drama px-6 py-2 font-body text-sm animate-pulse">
          MORE MEMORIES COMING SOON
        </div>
      </div>
    </div>
  );
};