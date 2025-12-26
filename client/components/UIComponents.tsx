import React from 'react';

// Section Header with Typewriter style
export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-12 text-center relative">
    <h2 className="text-4xl md:text-6xl font-display text-white mb-2 uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(219,39,119,0.5)]">
      {title}
    </h2>
    {subtitle && (
      <p className="text-drama font-body font-bold text-sm md:text-base tracking-[0.2em] uppercase bg-bollywood-800 inline-block px-4 py-1 transform -rotate-1 border border-drama/30 shadow-lg">
        {subtitle}
      </p>
    )}
  </div>
);

// Evidence Card
export const EvidenceCard: React.FC<{ children: React.ReactNode; className?: string; badge?: string }> = ({ children, className = '', badge }) => (
  <div className={`group relative bg-bollywood-800 border border-bollywood-700 p-6 transition-all duration-300 hover:border-drama hover:shadow-[0_0_20px_rgba(219,39,119,0.2)] ${className}`}>
    {badge && (
      <div className="absolute -top-3 -right-3 bg-glitz-gold text-bollywood-900 text-xs font-bold px-3 py-1 transform rotate-3 shadow-md z-10">
        #{badge}
      </div>
    )}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-drama/50 to-transparent opacity-20 group-hover:via-drama transition-all"></div>
    {children}
  </div>
);

// Primary Button
export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-3 font-bold uppercase tracking-widest transition-all duration-300 relative overflow-hidden group";
  const variants = {
    primary: "bg-drama text-white hover:bg-drama-light shadow-[0_0_10px_rgba(219,39,119,0.5)]",
    secondary: "bg-transparent border border-glitz-paper/30 text-glitz-paper/70 hover:border-glitz-gold hover:text-glitz-gold",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      )}
    </button>
  );
};

// Modal Overlay
export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode; title: string }> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-bollywood-900 border-2 border-bollywood-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl animate-shimmer">

        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-bollywood-700 bg-bollywood-800 sticky top-0 z-10">
          <h3 className="text-xl font-display text-glitz-gold uppercase">{title}</h3>
          <button onClick={onClose} className="text-glitz-paper/60 hover:text-drama">
            CLOSE [X]
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {children}
        </div>

        {/* Decorative Tape */}
        <div className="h-2 w-full bg-festive-pattern absolute bottom-0 left-0" />
      </div>
    </div>
  );
};
// Input Field
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input
    className={`w-full bg-black/20 border border-white/10 p-3 text-white focus:border-drama outline-none transition-colors ${className}`}
    {...props}
  />
);

// Card Container
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-lg ${className}`}>
    {children}
  </div>
);
