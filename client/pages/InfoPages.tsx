import React from 'react';
import { Sparkles, Trophy, Users, Star } from 'lucide-react';

export const About: React.FC = () => (
  <div className="relative min-h-[80vh] flex items-center overflow-hidden py-20">
    {/* Background Elements */}
    <div className="absolute inset-0 bg-bollywood-900">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-drama/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-glitz-gold/10 to-transparent blur-3xl" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Column: The Script (Content) */}
        <div className="space-y-8 animate-slide-up">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Star className="w-4 h-4 text-glitz-gold fill-current animate-spin-slow" />
            <span className="text-xs font-bold tracking-[0.2em] text-glitz-gold uppercase">Est. 2014</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
            <span className="text-white drop-shadow-lg">THE</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-glitz-gold via-yellow-300 to-amber-600 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
              LEGACY
            </span>
          </h1>

          <div className="prose prose-lg prose-invert opacity-90">
            <p className="text-xl leading-relaxed font-light text-slate-300 border-l-4 border-drama pl-6 italic">
              "AMISPARK x RAHASYA is not just a festival; it's a cinematic universe where culture meets chaos, and creativity writes the script."
            </p>
            <p className="text-slate-400 font-body">
              For 3 days, we transform the campus into a living, breathing blockbuster. From the high-octane dance battles to the suspense of Rahasya, every moment is a scene waiting to be captured.
            </p>
          </div>

          {/* Stats Cards: Box Office Records */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-glitz-gold/50 transition-all duration-300 backdrop-blur-sm hover:transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]">
              <Trophy className="w-8 h-8 text-glitz-gold mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-display font-bold text-white mb-1">50+</div>
              <div className="text-xs font-bold tracking-widest text-slate-400 uppercase group-hover:text-glitz-gold transition-colors">Events</div>
            </div>
            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-drama/50 transition-all duration-300 backdrop-blur-sm hover:transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]">
              <Users className="w-8 h-8 text-drama mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-display font-bold text-white mb-1">5K+</div>
              <div className="text-xs font-bold tracking-widest text-slate-400 uppercase group-hover:text-drama transition-colors">Attendees</div>
            </div>
          </div>
        </div>

        {/* Right Column: The Poster (Image) */}
        <div className="relative group perspective-1000">
          <div className="absolute -inset-4 bg-gradient-to-r from-glitz-gold to-drama opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500 rounded-2xl" />

          <div className="relative transform transition-all duration-700 group-hover:rotate-y-6 group-hover:scale-[1.02]">
            {/* Golden Frame */}
            <div className="absolute inset-0 border-2 border-white/20 rounded-2xl transform translate-x-4 translate-y-4 z-0" />
            <div className="absolute inset-0 border-2 border-glitz-gold/50 rounded-2xl transform -translate-x-4 -translate-y-4 z-0" />

            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop"
                alt="Festival Crowd"
                className="w-full h-auto transform transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-glitz-gold animate-pulse" />
                  <span className="text-glitz-gold font-bold tracking-widest text-sm uppercase">Official Aftermovie</span>
                </div>
                <h3 className="text-2xl font-bold text-white">The Crowd Goes Wild</h3>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);