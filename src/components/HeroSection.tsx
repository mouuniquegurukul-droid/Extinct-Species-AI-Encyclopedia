import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Mic, MicOff, Compass, Sparkles, Map, Calendar, Layers, Database, FileText, ArrowDown } from 'lucide-react';
import { Language } from '../types';
import DnaReconstitution from './DnaReconstitution';
import AnimatedGradient from './AnimatedGradient';

interface HeroSectionProps {
  language: Language;
  onSearchSubmit: (query: string) => void;
  isLoading: boolean;
  onExploreClick: () => void;
  onAskAiClick: () => void;
}

export default function HeroSection({
  language,
  onSearchSubmit,
  isLoading,
  onExploreClick,
  onAskAiClick
}: HeroSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Mouse move parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 35;
        const y = (e.clientY - rect.top - rect.height / 2) / 35;
        setMousePos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Web Speech API Voice Search
  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser. Please try typing instead.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'bn' ? 'bn-IN' : 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      if (text) {
        setSearchTerm(text);
        onSearchSubmit(text);
      }
    };

    recognition.start();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearchSubmit(searchTerm.trim());
    }
  };

  const handleChipClick = (term: string) => {
    setSearchTerm(term);
    onSearchSubmit(term);
  };

  // Translations
  const t = {
    badge: {
      en: "🧬 AI Powered Educational Encyclopedia",
      hi: "🧬 एआई संचालित शैक्षणिक विश्वकोश",
      bn: "🧬 এআই চালিত শিক্ষামূলক বিশ্বকোষ"
    },
    headingPre: {
      en: "Discover Earth's ",
      hi: "खोजें पृथ्वी के ",
      bn: "খুঁজে নিন পৃথিবীর "
    },
    headingHighlight: {
      en: "Lost Species",
      hi: "खोए हुए जीवों को",
      bn: "হারিয়ে যাওয়া প্রজাতি"
    },
    subtitle: {
      en: "Explore thousands of extinct animals with AI-powered search, interactive timelines, world maps, scientific classifications and fascinating historical discoveries.",
      hi: "एआई-संचालित खोज, इंटरैक्टिव समयसीमा, विश्व मानचित्र, वैज्ञानिक वर्गीकरण और आकर्षक ऐतिहासिक खोजों के साथ हजारों विलुप्त जीवों का अन्वेषण करें।",
      bn: "এআই-চালিত অনুসন্ধান, ইন্টারেক্টিভ টাইমলাইন, বিশ্ব মানচিত্র, বৈজ্ঞানিক শ্রেণীবিন্যাস এবং চিত্তাকর্ষক ঐতিহাসিক আবিষ্কারের সাথে হাজার হাজার বিলুপ্ত প্রাণী অন্বেষণ করুন।"
    },
    placeholder: {
      en: "Search extinct animals (e.g., Dodo, Mammoth, T-Rex)...",
      hi: "विलुप्त जीवों को खोजें (जैसे- डोडो, मैमथ, टी-रेक्स)...",
      bn: "বিলুপ্ত প্রাণী খুঁজুন (যেমন- ডোডো, ম্যামথ, টি-রেক্স)..."
    },
    btnExplore: {
      en: "Explore Animals",
      hi: "जीवों का अन्वेषण करें",
      bn: "প্রাণী অন্বেষণ করুন"
    },
    btnAsk: {
      en: "Ask AI",
      hi: "एआई से पूछें",
      bn: "এআই চ্যাট করুন"
    },
    listening: {
      en: "Listening...",
      hi: "सुन रहा हूँ...",
      bn: "শুনছি..."
    },
    scrollDown: {
      en: "Scroll down to discover featured exhibits",
      hi: "विशेष प्रदर्शनों को खोजने के लिए नीचे स्क्रॉल करें",
      bn: "বিশেষ প্রদর্শনী দেখতে নিচে স্ক্রোল করুন"
    }
  };

  return (
    <div 
      ref={heroRef}
      className="relative min-h-[92vh] flex flex-col justify-between items-center text-center overflow-hidden py-16 px-4 md:px-8 bg-gradient-to-b from-[#02130e] via-[#041d14] to-[#081c15] border-b border-white/10"
    >
      
      {/* ================= BACKGROUND LAYERS ================= */}
      
      {/* Premium Aurora Animated Gradient Background */}
      <AnimatedGradient config={{ preset: "Aurora" }} radius="0px" />
      
      {/* 1. Cinematic Light Ray Sweeps & Ambient Aurora Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle sliding light beam */}
        <div className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.015] to-transparent transform -skew-x-12 animate-beam pointer-events-none" />
      </div>

      {/* 2. Interactive Floating Particles / Star Nodes */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[12%] left-[8%] w-1.5 h-1.5 rounded-full bg-white animate-ping duration-[4000ms]" />
        <div className="absolute top-[35%] left-[85%] w-1 h-1 rounded-full bg-gold/80 animate-pulse duration-[3000ms]" />
        <div className="absolute top-[68%] left-[15%] w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse duration-[5000ms]" />
        <div className="absolute top-[25%] left-[55%] w-1.5 h-1.5 rounded-full bg-white/70 animate-ping duration-[6000ms]" />
        <div className="absolute top-[80%] left-[75%] w-2 h-2 rounded-full bg-blue-400/80 animate-pulse duration-[3500ms]" />
      </div>

      {/* 3. Subtle Animated Fog Layers */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#081c15] via-[#041d14]/40 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#081c15] to-transparent opacity-90 pointer-events-none z-10" />
      <div className="absolute bottom-6 left-0 right-0 h-16 bg-white/[0.015] blur-xl animate-fog-drift pointer-events-none" />

      {/* 4. Prehistoric Silhouette Horizon Parallax Layer */}
      <div 
        className="absolute bottom-0 w-full flex justify-between items-end px-4 sm:px-12 md:px-24 select-none pointer-events-none z-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.2}px, 0)`,
        }}
      >
        {/* Left Side Silhouettes: Woolly Mammoth & Dodo */}
        <div className="flex items-end gap-6 sm:gap-12 md:gap-20 opacity-[0.09] hover:opacity-15 transition-opacity duration-500">
          {/* Woolly Mammoth Silhouette */}
          <div className="w-20 sm:w-36 md:w-48 text-emerald-300 transform scale-x-[-1]">
            <svg viewBox="0 0 120 100" fill="currentColor">
              <path d="M10,80 C15,75 22,78 28,75 C35,72 38,62 42,50 C46,38 52,25 65,18 C78,11 92,15 98,28 C104,41 108,55 106,68 C104,78 98,82 92,80 L88,95 L80,95 L84,80 C78,82 72,83 68,85 L65,95 L57,95 L61,82 C55,83 48,84 42,85 C38,70 32,60 25,65 C18,70 12,75 10,80 Z M90,35 C88,35 86,37 86,39 C86,41 88,43 90,43 C92,43 94,41 94,39 C94,37 92,35 90,35 Z" />
            </svg>
          </div>
          
          {/* Dodo Silhouette */}
          <div className="w-12 sm:w-20 md:w-24 text-emerald-300 hidden sm:block">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50,30 C60,25 70,35 65,45 C60,50 50,55 45,65 L40,82 L32,82 L37,68 C28,62 20,52 25,42 C30,32 40,35 50,30 Z" />
            </svg>
          </div>
        </div>

        {/* Center Silhouettes: T-Rex standing grandly */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-28 sm:w-44 md:w-56 opacity-[0.06] text-emerald-200">
          <svg viewBox="0 0 150 150" fill="currentColor">
            <path d="M30,120 C35,115 42,100 48,85 C54,70 65,55 75,40 C85,25 95,15 105,10 C112,8 118,12 116,22 C114,32 108,45 102,52 C96,59 88,65 82,72 L85,95 L78,125 L70,125 L75,100 C68,102 62,105 55,108 L50,125 L42,125 L47,112 C40,114 34,117 30,120 Z M100,25 C98,25 96,27 96,29 C96,31 98,33 100,33 C102,33 104,31 104,29 C104,27 102,25 100,25 Z" />
          </svg>
        </div>

        {/* Right Side Silhouettes: Saber Tooth Tiger & Great Auk */}
        <div className="flex items-end gap-6 sm:gap-12 md:gap-20 opacity-[0.09] hover:opacity-15 transition-opacity duration-500">
          {/* Great Auk Silhouette */}
          <div className="w-10 sm:w-16 md:w-20 text-emerald-300 hidden md:block">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M45,20 C52,20 58,25 56,35 C54,45 42,65 42,80 L38,80 C38,65 34,50 36,35 C38,25 42,20 45,20 Z" />
            </svg>
          </div>

          {/* Saber Tooth Tiger Silhouette */}
          <div className="w-20 sm:w-36 md:w-44 text-emerald-300">
            <svg viewBox="0 0 120 100" fill="currentColor">
              <path d="M15,70 C10,65 5,55 12,45 C20,35 35,30 50,32 C65,34 80,45 92,55 C104,65 112,78 108,85 L102,85 L98,75 L80,75 L82,85 L74,85 L76,75 L55,75 C45,78 35,76 25,72 L18,85 L10,85 L15,70 Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* ================= HERO CONTENT AREA ================= */}
      <div 
        className="relative z-20 max-w-5xl mx-auto flex-1 flex flex-col justify-center items-center gap-6 md:gap-8 pt-8 md:pt-12 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 0.15}px, ${mousePos.y * 0.1}px, 0)`,
        }}
      >
        
        {/* Split upper section: Left for titles, Right for live DNA restore widget */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full px-4 text-center lg:text-left">
          
          <div className="flex-1 flex flex-col items-center lg:items-start gap-4 sm:gap-5">
            {/* Animated Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-950/60 to-forest/80 border border-emerald-500/30 text-gold text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-md animate-pulse duration-[6000ms]"
            >
              <Sparkles className="w-4 h-4 text-gold animate-spin-slow" />
              <span>{t.badge[language]}</span>
            </motion.div>

            {/* Epic Title Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-display drop-shadow-md">
                {t.headingPre[language]}
                <span className="bg-gradient-to-r from-emerald-400 via-gold to-blue-400 bg-clip-text text-transparent drop-shadow-lg block sm:inline pl-1.5">
                  {t.headingHighlight[language]}
                </span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-300/95 max-w-2xl font-sans leading-relaxed">
                {t.subtitle[language]}
              </p>
            </motion.div>
          </div>

          {/* Right Column: Custom Animated Paleontology Reconstitution DNA Strand Widget */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex-shrink-0 relative"
          >
            {/* Ambient gold glow background orb behind DNA helix */}
            <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full" />
            <DnaReconstitution />
          </motion.div>

        </div>

        {/* REDESIGNED: Premium Large Glass Search Bar & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-3xl px-4 space-y-4"
        >
          <form onSubmit={handleSubmit} className="relative flex items-center group">
            {/* Glowing ring shadow backing */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 via-gold/15 to-blue-500/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            
            <div className="relative w-full flex items-center bg-black/40 backdrop-blur-xl border border-white/10 group-hover:border-emerald-500/40 rounded-2xl p-1.5 transition-all duration-300 shadow-2xl">
              <Search className="absolute left-4.5 w-5 h-5 text-gray-400 group-hover:text-gold transition-colors duration-300" />
              
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.placeholder[language]}
                className="w-full bg-transparent pl-12 pr-44 py-4 rounded-xl text-white text-sm sm:text-base focus:outline-none placeholder-gray-400/80 font-sans font-medium"
              />

              {/* Action Buttons within Search Container */}
              <div className="absolute right-2 flex items-center gap-1.5">
                {/* Voice button */}
                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  className={`p-3 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer ${
                    isListening
                      ? 'bg-red-500/20 border border-red-500 text-red-400 animate-pulse scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-gold border border-white/5'
                  }`}
                  title="Voice Search"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                {/* Submitting Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-[#10b981] hover:from-gold hover:to-[#ffb703] hover:scale-[1.02] text-forest font-bold px-5 py-3 rounded-xl transition-all duration-300 cursor-pointer text-xs sm:text-sm shadow-md flex items-center gap-2"
                >
                  {isLoading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }}>
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span className="hidden sm:inline">Search</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Voice active label */}
          <AnimatePresence>
            {isListening && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 justify-center text-red-400 text-xs font-mono font-bold animate-pulse"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>{t.listening[language]}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Action buttons: Explore & Ask AI with Gooey/Magnetic styling */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-gold/10 text-white hover:text-gold border border-white/10 hover:border-gold/40 text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>{t.btnExplore[language]}</span>
            </button>
            
            <button
              onClick={onAskAiClick}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#0d271e] to-forest hover:from-gold/20 hover:to-gold/10 text-gold hover:text-white border border-gold/40 hover:border-white/20 text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-gold animate-bounce" />
              <span>{t.btnAsk[language]}</span>
            </button>
          </div>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-gray-400 font-medium mr-1 uppercase tracking-wider text-[10px]">Quick Search:</span>
            {['Dodo', 'Mammoth', 'T-Rex', 'Great Auk', 'Tasmanian Tiger'].map((chip) => (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-950/40 text-gray-300 hover:text-white border border-white/5 hover:border-emerald-500/30 transition-all duration-200 cursor-pointer font-medium hover:shadow-[0_0_10px_rgba(16,185,129,0.15)]"
              >
                {chip}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Floating Glass Bento Cards (6 Cards) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full px-4 pt-6"
        >
          {/* Card 1: Species count */}
          <div className="glass-card hover:bg-white/10 p-4 rounded-2xl flex flex-col justify-between text-left border border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(16,185,129,0.1)] group">
            <Layers className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300 mb-4" />
            <div>
              <span className="block text-xl sm:text-2xl font-black text-white font-mono leading-none">15,000+</span>
              <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold font-mono block mt-1">Species Listed</span>
            </div>
          </div>

          {/* Card 2: AI Search status */}
          <div className="glass-card hover:bg-white/10 p-4 rounded-2xl flex flex-col justify-between text-left border border-white/5 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,209,102,0.1)] group">
            <Sparkles className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-300 mb-4" />
            <div>
              <span className="block text-xl sm:text-2xl font-black text-white font-mono leading-none">AI Search</span>
              <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold font-mono block mt-1">Gemini AI Synthesis</span>
            </div>
          </div>

          {/* Card 3: Interactive Timeline */}
          <div className="glass-card hover:bg-white/10 p-4 rounded-2xl flex flex-col justify-between text-left border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(59,130,246,0.1)] group">
            <Calendar className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300 mb-4" />
            <div>
              <span className="block text-xl sm:text-2xl font-black text-white font-mono leading-none">Interactive</span>
              <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold font-mono block mt-1">Era Timeline</span>
            </div>
          </div>

          {/* Card 4: World Map */}
          <div className="glass-card hover:bg-white/10 p-4 rounded-2xl flex flex-col justify-between text-left border border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(16,185,129,0.1)] group">
            <Map className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300 mb-4" />
            <div>
              <span className="block text-xl sm:text-2xl font-black text-white font-mono leading-none">World Map</span>
              <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold font-mono block mt-1">Paleo-Locations</span>
            </div>
          </div>

          {/* Card 5: Sources API */}
          <div className="glass-card hover:bg-white/10 p-4 rounded-2xl flex flex-col justify-between text-left border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(168,85,247,0.1)] group">
            <Database className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform duration-300 mb-4" />
            <div>
              <span className="block text-xl sm:text-2xl font-black text-white font-mono leading-none">Wikipedia</span>
              <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold font-mono block mt-1">+ Wikidata Index</span>
            </div>
          </div>

          {/* Card 6: Taxonomy classifications */}
          <div className="glass-card hover:bg-white/10 p-4 rounded-2xl flex flex-col justify-between text-left border border-white/5 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,209,102,0.1)] group">
            <FileText className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-300 mb-4" />
            <div>
              <span className="block text-xl sm:text-2xl font-black text-white font-mono leading-none">Scientific</span>
              <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold font-mono block mt-1">Classification</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ================= BOTTOM ANCHOR SCROLL INDICATOR ================= */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative z-20 flex flex-col items-center gap-1.5 mt-8 pointer-events-none group"
      >
        <span className="text-[10px] uppercase tracking-widest font-mono text-gray-400/80 group-hover:text-gold transition-colors duration-300">
          {t.scrollDown[language]}
        </span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-gold/80" />
        </motion.div>
      </motion.div>

    </div>
  );
}
