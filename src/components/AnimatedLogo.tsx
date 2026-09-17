import React from 'react';

export default function AnimatedLogo() {
  return (
    <div className="relative flex items-center justify-center w-11 h-11 group">
      
      {/* Golden Glowing Ambient Halo */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gold/30 via-emerald-500/20 to-blue-500/30 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 group-hover:scale-110" />

      {/* Rotating Cyber-Orbit/Timeline Ring */}
      <div className="absolute inset-0 rounded-full border border-dashed border-gold/40 animate-spin-slow group-hover:border-gold/80 transition-colors" />

      {/* Dynamic Inverse Scanning Ring */}
      <div className="absolute inset-1 rounded-full border border-emerald-500/20 animate-reverse-spin pointer-events-none" />

      {/* Central Fossil Amber Core */}
      <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#123524] via-[#081c15] to-black border border-gold/30 flex items-center justify-center overflow-hidden shadow-inner group-hover:border-gold/60 transition-all duration-300">
        
        {/* Subtle holographic beam sweeping across the fossil */}
        <div className="absolute inset-0 w-full h-[2px] bg-gold/40 shadow-[0_0_8px_#ffd166] opacity-0 group-hover:opacity-100 animate-scanner pointer-events-none" />

        {/* Custom Hand-Crafted Prehistoric T-Rex / Fossil Skull Vector */}
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gold group-hover:text-white drop-shadow-[0_0_6px_rgba(255,209,102,0.8)] transition-all duration-300 transform group-hover:scale-110"
        >
          {/* T-Rex Fossil Skull Silhouette Details */}
          <path 
            d="M80,50 
               C80,42 75,30 65,28 
               C55,26 45,30 38,32 
               C30,34 22,38 20,44 
               C18,50 18,58 22,62 
               C25,65 32,66 38,64 
               C42,63 48,64 52,66 
               C58,68 68,68 74,62 
               C78,58 80,54 80,50 Z" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Eye Socket Hole */}
          <circle cx="42" cy="42" r="5" fill="currentColor" className="opacity-80 animate-pulse" />
          
          {/* Fossil Nasal Cavity */}
          <ellipse cx="28" cy="48" rx="3" ry="2" fill="currentColor" className="opacity-70" />
          
          {/* Jaw / Teeth bone details */}
          <path 
            d="M32,60 L36,54 M40,62 L44,55 M48,63 L51,56 M56,63 L58,56" 
            stroke="currentColor" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
          />

          {/* Temporal Fenestra back skull opening */}
          <path 
            d="M60,40 C65,40 70,44 68,50 C66,54 60,52 60,40 Z" 
            fill="currentColor" 
            className="opacity-40" 
          />
        </svg>

        {/* Ambient Prehistoric Star Dust Sparkles inside */}
        <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-gold animate-ping pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-emerald-400 animate-ping pointer-events-none duration-[2500ms]" />
      </div>
    </div>
  );
}
