import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Cpu, CheckCircle } from 'lucide-react';

export default function DnaReconstitution() {
  const [alignmentPercent, setAlignmentPercent] = useState(84.6);
  const [activeSpecies, setActiveSpecies] = useState('Mammoth Genome');

  useEffect(() => {
    const speciesList = ['Mammoth Genome', 'Dodo DNA Matrix', 'T-Rex Bone Marrow', 'Saber-Tooth Helix', 'Great Auk Ribosomal'];
    
    // Smooth random ticker simulating sequencing/alignment
    const interval = setInterval(() => {
      setAlignmentPercent(prev => {
        const delta = (Math.random() - 0.48) * 0.6;
        const next = prev + delta;
        return Number(Math.max(75, Math.min(99.9, next)).toFixed(1));
      });
    }, 1500);

    // Randomly change active species Restoring
    const speciesInterval = setInterval(() => {
      setActiveSpecies(speciesList[Math.floor(Math.random() * speciesList.length)]);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearInterval(speciesInterval);
    };
  }, []);

  // Compute positions for 15 base-pairs to form a double helix
  const pairsCount = 14;

  return (
    <div className="relative glass-panel p-5 rounded-2xl border border-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.08)] bg-gradient-to-br from-[#021812]/90 via-[#010c09]/95 to-black w-72 h-auto flex flex-col gap-4 text-left pointer-events-auto group hover:border-gold/30 transition-all duration-500">
      
      {/* Decorative scanner grid backing */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.01)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none rounded-2xl" />

      {/* Top Telemetry Header */}
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span className="text-[10px] font-mono text-gold font-bold uppercase tracking-wider">DNA Bio-Reconstitution</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
          <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest">ACTIVE RESTORE</span>
        </div>
      </div>

      {/* Rotating DNA Helix Stage */}
      <div className="relative h-28 w-full flex items-center justify-center overflow-hidden bg-black/40 rounded-xl border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/10 to-transparent" />
        
        {/* Double Helix Sine-Wave Strands */}
        <div className="flex items-center justify-between w-full px-6 relative h-20">
          {Array.from({ length: pairsCount }).map((_, idx) => {
            // Sine cycle with offset based on index for smooth rotation feel
            const phase = (idx / pairsCount) * Math.PI * 2.5;
            
            return (
              <div key={idx} className="relative flex flex-col items-center justify-center h-full w-2">
                
                {/* Connecting horizontal bond lines */}
                <div 
                  className="absolute w-[1px] bg-gradient-to-b from-emerald-500/30 via-gold/40 to-blue-500/30 opacity-70"
                  style={{
                    height: '100%',
                    transform: 'scaleY(0.7)'
                  }}
                />

                {/* Left/Front Node moving on a custom animation */}
                <div 
                  className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300 shadow-[0_0_10px_#10b981] animate-bounce"
                  style={{
                    animationDelay: `${idx * 160}ms`,
                    animationDuration: '1.8s',
                    transform: `translateY(${Math.sin(phase) * 24}px)`
                  }}
                />

                {/* Right/Back Node moving offset to create double helix depth */}
                <div 
                  className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-gold to-yellow-300 shadow-[0_0_8px_#ffd166] opacity-90 animate-bounce"
                  style={{
                    animationDelay: `${idx * 160 + 900}ms`,
                    animationDuration: '1.8s',
                    transform: `translateY(${Math.sin(phase + Math.PI) * 24}px)`
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Reconstitution Telemetry Metrics */}
      <div className="space-y-2 z-10">
        <div className="flex justify-between text-[10px] font-mono text-gray-400">
          <span>TARGET SEQUENCE:</span>
          <span className="text-white font-bold">{activeSpecies}</span>
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-mono text-gray-300">
            <span>SEQUENCE ALIGNMENT:</span>
            <span className="text-emerald-400 font-extrabold">{alignmentPercent}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/5 border border-white/5 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-500 via-gold to-blue-500 rounded-full"
              style={{ width: `${alignmentPercent}%` }}
              animate={{ width: `${alignmentPercent}%` }}
              transition={{ ease: "easeOut", duration: 0.8 }}
            />
          </div>
        </div>
        
        {/* Verification Status list */}
        <div className="flex items-center gap-1.5 pt-1 border-t border-white/5">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[9px] font-mono text-gray-400">Genomic scaffolding complete</span>
        </div>
      </div>

    </div>
  );
}
