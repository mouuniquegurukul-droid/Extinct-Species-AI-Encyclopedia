import React, { useState, useEffect, useRef } from 'react';
import { 
  LogIn, User, Sparkles, AlertCircle, Globe, Volume2, VolumeX, 
  Sun, Moon, Compass, Brain, Dna, ArrowDown, HelpCircle, Eye, EyeOff 
} from 'lucide-react';
import { Language, UserSession } from '../types';
import AnimatedGradient from './AnimatedGradient';
import { motion, AnimatePresence } from 'motion/react';

interface LoginProps {
  onLoginSuccess: (session: UserSession, lang: Language) => void;
}

// 24 Curated Prehistoric/Historic Lost Specimens
const SPECIMENS = [
  { name: "Tyrannosaurus Rex", period: "66 Mya", img: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=350&q=80" },
  { name: "Woolly Mammoth", period: "10,000 BC", img: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=350&q=80" },
  { name: "Dodo Bird", period: "1681", img: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=350&q=80" },
  { name: "Saber-Toothed Cat", period: "10,000 BC", img: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=350&q=80" },
  { name: "Velociraptor", period: "71 Mya", img: "https://images.unsplash.com/photo-1606856521215-75383688e322?w=350&q=80" },
  { name: "Great Auk", period: "1844", img: "https://images.unsplash.com/photo-1481137314489-083022111d43?w=350&q=80" },
  { name: "Tasmanian Tiger", period: "1936", img: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=350&q=80" },
  { name: "Irish Elk", period: "8,000 BC", img: "https://images.unsplash.com/photo-1484406566174-9da000fda645?w=350&q=80" },
  { name: "Quagga", period: "1883", img: "https://images.unsplash.com/photo-1501705388883-4ed8a543392c?w=350&q=80" },
  { name: "Steller's Sea Cow", period: "1768", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=350&q=80" },
  { name: "Passenger Pigeon", period: "1914", img: "https://images.unsplash.com/photo-1552084090-248477ff3645?w=350&q=80" },
  { name: "Moa Bird", period: "1445", img: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=350&q=80" },
  { name: "Trilobite Fossil", period: "251 Mya", img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=350&q=80" },
  { name: "Megatherium", period: "8,000 BC", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=350&q=80" },
  { name: "Pterodactyl", period: "148 Mya", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=350&q=80" },
  { name: "Amber Insect", period: "99 Mya", img: "https://images.unsplash.com/photo-1599809275671-b5941cbf7f54?w=350&q=80" },
  { name: "Giganotosaurus", period: "97 Mya", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=350&q=80" },
  { name: "Glyptodon", period: "10,000 BC", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=350&q=80" },
  { name: "Archaeopteryx", period: "150 Mya", img: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=350&q=80" },
  { name: "Elasmosaurus", period: "80 Mya", img: "https://images.unsplash.com/photo-1513553404607-988bf2703777?w=350&q=80" },
  { name: "Ankylosaurus", period: "66 Mya", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=350&q=80" },
  { name: "Diplodocus", period: "152 Mya", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=350&q=80" },
  { name: "Dunkleosteus", period: "358 Mya", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=350&q=80" },
  { name: "Neanderthal", period: "40,000 BC", img: "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?w=350&q=80" }
];

// Pre-seeded randomized coordinates for Scattered mode to maintain stability across renders
const SCATTERED_COORDS = SPECIMENS.map((_, i) => {
  const angle = (i / 24) * 2 * Math.PI;
  return {
    x: 15 + (i % 5) * 16 + Math.sin(angle) * 8,
    y: 12 + Math.floor(i / 5) * 16 + Math.cos(angle) * 6,
    rot: (i * 15) % 40 - 20,
    depth: i % 4
  };
});

type MorphPhase = 'SCATTERED' | 'FOSSIL_CIRCLE' | 'DNA_HELIX' | 'AI_BRAIN';

export default function Login({ onLoginSuccess }: LoginProps) {
  // Authentication & language states
  const [selectedLang, setSelectedLang] = useState<Language>('en');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [welcomeLangIndex, setWelcomeLangIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Animation layout states
  const [activePhase, setActivePhase] = useState<MorphPhase>('SCATTERED');
  const [scrollPercent, setScrollPercent] = useState(0);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const leftPaneRef = useRef<HTMLDivElement>(null);

  const welcomeLanguages: { code: Language; name: string; title: string; greeting: string }[] = [
    {
      code: 'en',
      name: 'English',
      title: "Extinct Animals Encyclopedia",
      greeting: "Welcome to the Extinct Animals Encyclopedia. Explore the fascinating history of Earth's lost species."
    },
    {
      code: 'hi',
      name: 'हिन्दी',
      title: "विलुप्त जीव विश्वकोश",
      greeting: "विलुप्त जीव विश्वकोश में आपका स्वागत है। आइए पृथ्वी से विलुप्त हो चुके अद्भुत जीवों के बारे में जानें।"
    },
    {
      code: 'bn',
      name: 'বাংলা',
      title: "বিলুপ্ত প্রাণী বিশ্বকোষ",
      greeting: "বিলুপ্ত প্রাণী বিশ্বকোষে আপনাকে স্বাগতম। পৃথিবী থেকে হারিয়ে যাওয়া প্রাণীদের সম্পর্কে জানুন।"
    }
  ];

  const [playlistIndex, setPlaylistIndex] = useState<number | null>(null);
  const [hasStartedAutoPlay, setHasStartedAutoPlay] = useState(false);

  const langMap = {
    en: 'en-US',
    hi: 'hi-IN',
    bn: 'bn-IN'
  };

  // Sync dark mode class with document body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Trilingual audio sequence
  const speakGreeting = (text: string, langCode: Language) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langMap[langCode] || 'en-US';

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(langMap[langCode]) || v.lang.includes(langCode));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    setPlaylistIndex(null);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Auto-play trigger helper
  const startTrilingualSequence = () => {
    if (hasStartedAutoPlay) return;
    setHasStartedAutoPlay(true);
    setPlaylistIndex(0);
  };

  useEffect(() => {
    if (playlistIndex === null) return;

    const currentItem = welcomeLanguages[playlistIndex];
    setWelcomeLangIndex(playlistIndex);
    setSelectedLang(currentItem.code);

    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(currentItem.greeting);
    utterance.lang = langMap[currentItem.code] || 'en-US';

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(langMap[currentItem.code]) || v.lang.includes(currentItem.code));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (playlistIndex < 2) {
        setTimeout(() => {
          setPlaylistIndex(prev => (prev !== null && prev < 2) ? prev + 1 : null);
        }, 1200);
      } else {
        setTimeout(() => {
          setPlaylistIndex(prev => (prev !== null) ? 0 : null);
        }, 5000); // 5 seconds gap before starting the welcome loop again
      }
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      if (playlistIndex < 2) {
        setTimeout(() => {
          setPlaylistIndex(prev => (prev !== null && prev < 2) ? prev + 1 : null);
        }, 1200);
      } else {
        setTimeout(() => {
          setPlaylistIndex(prev => (prev !== null) ? 0 : null);
        }, 5000);
      }
    };

    window.speechSynthesis.speak(utterance);
  }, [playlistIndex]);

  // Handle manual/first interaction autoplay bypassing browser rules
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasStartedAutoPlay) {
        startTrilingualSequence();
      }
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    const autoPlayTimer = setTimeout(() => {
      if (!hasStartedAutoPlay) startTrilingualSequence();
    }, 2000);

    return () => {
      cleanup();
      clearTimeout(autoPlayTimer);
    };
  }, [hasStartedAutoPlay]);

  // Slowly rotate welcome slide text when not speaking
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSpeaking && playlistIndex === null) {
        setWelcomeLangIndex((prev) => (prev + 1) % welcomeLanguages.length);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [isSpeaking, playlistIndex]);

  // Clean up synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Morph state-machine automatic cycle (looping Scattered -> Fossil Circle -> DNA Helix -> AI Brain)
  useEffect(() => {
    const sequence: MorphPhase[] = ['SCATTERED', 'FOSSIL_CIRCLE', 'DNA_HELIX', 'AI_BRAIN'];
    const timer = setInterval(() => {
      // Only auto-cycle if the user is not actively scrolling the left pane
      if (scrollPercent < 0.05) {
        setActivePhase(current => {
          const nextIdx = (sequence.indexOf(current) + 1) % sequence.length;
          return sequence[nextIdx];
        });
      }
    }, 4500);

    return () => clearInterval(timer);
  }, [scrollPercent]);

  // Mouse Parallax movement tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 45;
      const y = (e.clientY - innerHeight / 2) / 45;
      setMouseParallax({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Monitor scroll height on the left pane to blend layouts into a rainbow arc
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = target.scrollTop / (target.scrollHeight - target.clientHeight || 1);
    setScrollPercent(progress);
  };

  // Coordinates Interpolator Engine
  // Computes precise 2D/3D responsive coordinates based on active phase and scroll state
  const getCardPosition = (idx: number) => {
    const isRainbowArc = scrollPercent > 0.05;
    const lerpFactor = Math.min(1, scrollPercent * 2.5); // Fast morph into Rainbow Arc on scroll

    // 1. Rainbow Arc Coordinates (Default scroll-driven layout)
    const tArc = idx / 23;
    const arcX = 10 + tArc * 80;
    const arcY = 50 - Math.sin(tArc * Math.PI) * 25;
    const arcRot = (tArc - 0.5) * -65;
    const arcZ = 20;

    // 2. Base Phase Coordinates
    let baseX = 50;
    let baseY = 50;
    let baseRot = 0;
    let baseZ = 10;

    if (activePhase === 'SCATTERED') {
      const coord = SCATTERED_COORDS[idx];
      baseX = coord.x;
      baseY = coord.y;
      baseRot = coord.rot;
      baseZ = coord.depth * 5;
    } else if (activePhase === 'FOSSIL_CIRCLE') {
      const angle = (idx / 24) * 2 * Math.PI;
      const radius = 33; 
      baseX = 50 + radius * Math.cos(angle);
      baseY = 50 + radius * Math.sin(angle); 
      baseRot = angle * (180 / Math.PI) + 90;
      baseZ = 15;
    } else if (activePhase === 'DNA_HELIX') {
      const isStrandA = idx % 2 === 0;
      const t = idx / 24;
      const phaseOffset = isStrandA ? 0 : Math.PI;
      baseX = 15 + t * 70;
      baseY = 50 + Math.sin(t * Math.PI * 3 + phaseOffset) * 22; 
      baseRot = Math.cos(t * Math.PI * 3 + phaseOffset) * 45;
      baseZ = Math.sin(t * Math.PI * 3 + phaseOffset) > 0 ? 25 : 5;
    } else if (activePhase === 'AI_BRAIN') {
      const isLeftLobe = idx < 12;
      const localIdx = isLeftLobe ? idx : idx - 12;
      const angle = (localIdx / 12) * Math.PI * 2;
      
      const cx = isLeftLobe ? 34 : 66;
      const cy = 48; 
      const rx = 14 + Math.sin(angle * 2) * 2;
      const ry = 18 + Math.cos(angle * 3) * 2;
      
      baseX = cx + rx * Math.cos(angle);
      baseY = cy + ry * Math.sin(angle);
      baseRot = (isLeftLobe ? -1 : 1) * (localIdx * 12);
      baseZ = 15;
    }

    // Interpolate towards Rainbow Arc based on Scroll
    const finalX = isRainbowArc ? baseX + (arcX - baseX) * lerpFactor : baseX;
    const finalY = isRainbowArc ? baseY + (arcY - baseY) * lerpFactor : baseY;
    const finalRot = isRainbowArc ? baseRot + (arcRot - baseRot) * lerpFactor : baseRot;
    const finalZ = isRainbowArc ? baseZ + (arcZ - baseZ) * lerpFactor : baseZ;

    return {
      left: `${finalX}%`,
      top: `${finalY}%`,
      transform: `translate(-50%, -50%) rotate(${finalRot}deg) translateZ(${finalZ}px)`,
      zIndex: hoveredCard === idx ? 50 : Math.round(finalZ)
    };
  };

  // Auth Submit Callbacks
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError(selectedLang === 'hi' ? 'कृपया ईमेल दर्ज करें' : selectedLang === 'bn' ? 'অনুগ্রহ করে ইমেল লিখুন' : 'Please enter an email.');
      return;
    }
    const displayName = name || email.split('@')[0];
    onLoginSuccess({
      email: email,
      name: displayName,
      isGuest: false,
      photoUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(displayName)}`
    }, selectedLang);
  };

  const handleGoogleLogin = () => {
    onLoginSuccess({
      email: "explorer@gmail.com",
      name: "Alex Mercer",
      isGuest: false,
      photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    }, selectedLang);
  };

  const handleGuestLogin = () => {
    onLoginSuccess({
      email: null,
      name: selectedLang === 'hi' ? 'अतिथि पाठक' : selectedLang === 'bn' ? 'অতিথি পাঠক' : 'Guest Explorer',
      isGuest: true,
      photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
    }, selectedLang);
  };

  // UI labels translation map
  const labels = {
    welcome: { en: "Welcome Back", hi: "सुस्वागतम", bn: "স্বাগতম" },
    journey: { en: "Continue your prehistoric journey.", hi: "अपनी प्रागैतिहासिक यात्रा जारी रखें।", bn: "আপনার প্রাগৈতিহাসিক যাত্রা শুরু করুন।" },
    or: { en: "Or continue with", hi: "अथवा इसके साथ जारी रखें", bn: "অথবা প্রবেশ করুন" },
    google: { en: "Sign In with Google", hi: "गूगल के साथ लॉगिन करें", bn: "গুগল সাইন ইন" },
    guest: { en: "Enter as Guest Explorer", hi: "अतिथि के रूप में प्रवेश करें", bn: "অতিথি হিসেবে প্রবেশ করুন" },
    nameLabel: { en: "Your Name", hi: "आपका नाम", bn: "আপনার নাম" },
    namePlaceholder: { en: "Alex Mercer (Optional)", hi: "नाम दर्ज करें (वैकल्पिक)", bn: "নাম লিখুন (ঐচ্ছিক)" },
    emailLabel: { en: "Email Address", hi: "ईमेल आईडी", bn: "ইমেল ঠিকানা" },
    emailPlaceholder: { en: "explorer@domain.com", hi: "ईमेल दर्ज करें", bn: "ইমেল লিখুন" },
    passwordLabel: { en: "Secret Access Pin", hi: "गुप्त पासवर्ड", bn: "পাসওয়ার্ড" },
    passwordPlaceholder: { en: "••••••••", hi: "पासवर्ड दर्ज करें", bn: "পাসওয়ার্ড লিখুন" },
    actionSignIn: { en: "Begin Expedition", hi: "खोज यात्रा शुरू करें", bn: "অভিযান শুরু করুন" },
    actionSignUp: { en: "Create New Account", hi: "नया खाता बनाएं", bn: "নতুন অ্যাকাউন্ট তৈরি করুন" },
    toggleNew: { en: "New explorer? Create credentials", hi: "नए पाठक? खाता बनाएं", bn: "নতুন সদস্য? অ্যাকাউন্ট খুলুন" },
    toggleExisting: { en: "Have credentials? Sign In", hi: "पूर्व पंजीकृत हैं? लॉगिन करें", bn: "আগের অ্যাকাউন্ট আছে? লগ ইন" }
  };

  return (
    <div className={`relative min-h-screen flex flex-col lg:flex-row bg-[#020c08] text-white overflow-hidden transition-colors duration-500`}>
      
      {/* Cinematic Aurora Ambient Canvas */}
      <AnimatedGradient config={{ preset: "Aurora" }} radius="0px" />

      {/* Floating Sparkles & Prehistoric Fog Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Subtle sliding light beam */}
        <div className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.015] to-transparent transform -skew-x-12 animate-beam" />
        {/* Floating amber and emerald dust motes */}
        <div className="absolute top-[15%] left-[10%] w-1.5 h-1.5 bg-gold/50 rounded-full animate-ping duration-[6000ms]" />
        <div className="absolute top-[75%] left-[80%] w-1.5 h-1.5 bg-emerald-400/40 rounded-full animate-pulse duration-[4000ms]" />
        <div className="absolute top-[40%] left-[85%] w-1 h-1 bg-white/70 rounded-full animate-ping duration-[5000ms]" />
      </div>

      {/* =================================================== */}
      {/* LEFT SIDE (55%): IMMERSIVE SCROLL MORPH HERO STAGE  */}
      {/* =================================================== */}
      <div 
        ref={leftPaneRef}
        onScroll={handleScroll}
        className="relative lg:w-[55%] h-[50vh] lg:h-screen overflow-y-auto overflow-x-hidden border-b lg:border-b-0 lg:border-r border-white/5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-emerald-500/20 pointer-events-auto z-20 flex flex-col justify-between"
      >
        {/* Absolute Floating Specimen Canvas Stage */}
        <div className="sticky top-0 left-0 w-full h-[50vh] lg:h-screen overflow-hidden pointer-events-none select-none">
          
          {/* Parallax background silhouette layer */}
          <div 
            className="absolute bottom-6 inset-x-0 flex justify-between px-10 opacity-[0.04] transition-transform duration-500 ease-out z-0"
            style={{ transform: `translate3d(${-mouseParallax.x * 0.4}px, ${-mouseParallax.y * 0.4}px, 0)` }}
          >
            {/* Dino fossil silhouette */}
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-40 h-40 text-emerald-400">
              <path d="M50,10 C70,10 85,25 85,45 C85,65 65,85 50,90 C35,85 15,65 15,45 C15,25 30,10 50,10 Z M50,30 C45,30 40,35 40,40 C40,45 45,50 50,50 C55,50 60,45 60,40 C60,35 55,30 50,30 Z" />
            </svg>
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-32 h-32 text-gold">
              <path d="M30,30 C40,25 50,35 45,45 C40,50 30,55 25,65 L20,82 L12,82 L17,68 C8,62 0,52 5,42 C10,32 20,35 30,30 Z" />
            </svg>
          </div>

          {/* Core Specimen Cards Container */}
          <div 
            className="absolute inset-0 transition-transform duration-300 ease-out z-10"
            style={{ transform: `translate3d(${mouseParallax.x * 0.2}px, ${mouseParallax.y * 0.2}px, 0)` }}
          >
            {SPECIMENS.map((animal, idx) => {
              const posStyle = getCardPosition(idx);
              const isHovered = hoveredCard === idx;
              
              return (
                <div
                  key={idx}
                  style={posStyle}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="absolute pointer-events-auto transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                >
                  <motion.div 
                    whileHover={{ scale: 1.25, rotateY: 15, rotateX: -10, zIndex: 100 }}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden glass-card border transition-all duration-300 shadow-xl cursor-pointer ${
                      isHovered 
                        ? 'border-gold shadow-[0_0_20px_rgba(255,209,102,0.4)] scale-110' 
                        : 'border-white/10 hover:border-emerald-500/40'
                    }`}
                  >
                    {/* Polaroid Reflection Layer */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
                    
                    {/* Specimen image */}
                    <img 
                      src={animal.img} 
                      alt={animal.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-[70%] object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                    />

                    {/* Polaroid Label Footer */}
                    <div className="h-[30%] bg-black/70 px-1 py-0.5 flex flex-col justify-center text-center">
                      <span className="text-[7px] font-bold text-white font-mono truncate uppercase leading-none">
                        {animal.name}
                      </span>
                      <span className="text-[5px] text-gold font-mono leading-none mt-0.5 block">
                        {animal.period}
                      </span>
                    </div>

                    {/* Holographic specimen grid matrix lines on card */}
                    <div className="absolute inset-0 border border-emerald-500/10 pointer-events-none" />
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Top Title Content overlay (visible when not scrolled) */}
          <div className={`absolute inset-x-4 top-[18%] lg:top-[20%] -translate-y-1/2 flex flex-col items-center text-center gap-2 transition-opacity duration-700 pointer-events-none select-none z-20 ${
            scrollPercent > 0.2 ? 'opacity-0 scale-95' : 'opacity-100'
          }`}>
            <span className="text-3xl sm:text-4xl animate-bounce duration-[3000ms]">🦴</span>
            <div className="space-y-1 max-w-lg">
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight font-display drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Discover Earth's <span className="bg-gradient-to-r from-emerald-400 via-gold to-blue-400 bg-clip-text text-transparent">Lost Species</span>
              </h2>
              <p className="text-[10px] sm:text-xs text-gray-300 font-sans px-4 max-w-sm mx-auto drop-shadow-md">
                Explore thousands of extinct lineages with AI-powered search, timelines, world maps and scientific classifications.
              </p>
            </div>
          </div>

          {/* Bottom Interactive Phase Controls (visible when not scrolled) */}
          <div className={`absolute inset-x-4 bottom-[12%] lg:bottom-[14%] flex flex-col items-center gap-2 transition-opacity duration-700 select-none z-20 ${
            scrollPercent > 0.2 ? 'opacity-0 scale-95' : 'opacity-100'
          }`}>
            <div className="flex gap-2.5 pointer-events-auto bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/5 shadow-2xl scale-90 sm:scale-100">
              {[
                { phase: 'SCATTERED', icon: <Compass className="w-3 h-3" />, label: "Scattered" },
                { phase: 'FOSSIL_CIRCLE', icon: <span className="text-[9px]">🦴</span>, label: "Fossil Ring" },
                { phase: 'DNA_HELIX', icon: <Dna className="w-3 h-3" />, label: "Helix" },
                { phase: 'AI_BRAIN', icon: <Brain className="w-3 h-3" />, label: "Brain Grid" }
              ].map((p) => (
                <button
                  key={p.phase}
                  onClick={() => setActivePhase(p.phase as MorphPhase)}
                  className={`px-2 py-1 rounded-full text-[9px] font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    activePhase === p.phase 
                      ? 'bg-gold text-forest shadow-md font-black scale-105' 
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                  title={`Morph to ${p.label}`}
                >
                  {p.icon}
                  <span className="hidden sm:inline">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Indicator bar: scroll hint */}
          <div className={`absolute bottom-3 inset-x-0 flex flex-col items-center justify-center gap-0.5 text-gray-400 text-[9px] font-mono uppercase tracking-widest transition-opacity duration-500 pointer-events-none ${
            scrollPercent > 0.15 ? 'opacity-0' : 'opacity-80 animate-pulse'
          }`}>
            <span>Scroll Left pane to bend into a Rainbow Arc</span>
            <ArrowDown className="w-3.5 h-3.5 text-gold" />
          </div>

        </div>

        {/* Dummy scroll spacer to enable scroll interaction & morphs */}
        <div className="h-[200vh] w-full pointer-events-none" />
      </div>

      {/* =================================================== */}
      {/* RIGHT SIDE (45%): EXQUISITE GLASS AUTHENTICATION CARD */}
      {/* =================================================== */}
      <div className="relative lg:w-[45%] min-h-[50vh] lg:min-h-screen flex flex-col items-center justify-center p-6 md:p-12 bg-black/30 backdrop-blur-md z-30 border-t lg:border-t-0 lg:border-l border-white/5">
        
        {/* Top bar controls: Language, Theme & Audio state indicators */}
        <div className="absolute top-6 right-6 flex items-center gap-2.5 z-40">
          
          {/* Dark mode switcher */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-gold transition-all cursor-pointer flex items-center justify-center"
            title={isDarkMode ? "Light Theme" : "Dark Theme"}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-gold animate-spin-slow" /> : <Moon className="w-4 h-4 text-blue-400" />}
          </button>

          {/* Interactive language panel dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 glass-card text-white text-xs sm:text-sm">
            <Globe className="w-4 h-4 text-gold animate-pulse" />
            <select
              value={selectedLang}
              onChange={(e) => {
                const lang = e.target.value as Language;
                setSelectedLang(lang);
                const idx = welcomeLanguages.findIndex(l => l.code === lang);
                if (idx !== -1) setWelcomeLangIndex(idx);
              }}
              className="bg-transparent border-none text-white focus:outline-none cursor-pointer font-bold text-xs"
            >
              <option value="en" className="bg-[#020c08] text-white">EN</option>
              <option value="hi" className="bg-[#020c08] text-white">हिन्दी</option>
              <option value="bn" className="bg-[#020c08] text-white">বাংলা</option>
            </select>
          </div>
        </div>

        {/* Glassmorphic Auth card container (24px padding + blur) */}
        <div className="w-full max-w-md space-y-5 my-12">
          
          {/* Header Banner - Greeting Slider Board */}
          <div className="glass-panel rounded-3xl p-5 border border-gold/15 text-center relative overflow-hidden shadow-2xl bg-gradient-to-b from-white/[0.02] to-transparent">
            
            <div className="flex justify-center gap-1.5 mb-2">
              {welcomeLanguages.map((wl, idx) => (
                <button
                  key={wl.code}
                  onClick={() => {
                    setWelcomeLangIndex(idx);
                    setSelectedLang(wl.code);
                    speakGreeting(wl.greeting, wl.code);
                  }}
                  className={`text-[8px] sm:text-[9px] font-mono px-2 py-0.5 rounded transition-all cursor-pointer ${
                    welcomeLangIndex === idx 
                      ? 'bg-gold text-forest font-bold shadow-md scale-105' 
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {wl.name}
                </button>
              ))}
            </div>

            <div className="min-h-[90px] flex flex-col justify-between py-1">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white font-display mb-1">
                  {welcomeLanguages[welcomeLangIndex].title}
                </h2>
                <p className="text-[11px] sm:text-xs text-gold/90 font-medium leading-relaxed max-w-xs mx-auto">
                  {welcomeLanguages[welcomeLangIndex].greeting}
                </p>
              </div>

              {/* Soundwaves visualizer & button */}
              <div className="flex items-center justify-center gap-2.5 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    if (isSpeaking) {
                      stopSpeaking();
                    } else {
                      setPlaylistIndex(0);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md border ${
                    isSpeaking 
                      ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse' 
                      : 'bg-gold text-forest border-gold hover:bg-gold/90 hover:scale-[1.02]'
                  }`}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3 h-3" />
                      <span>Stop Voice</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3 h-3" />
                      <span>Listen Guide (বলো / सुनो)</span>
                    </>
                  )}
                </button>

                {isSpeaking && (
                  <div className="flex items-end gap-0.5 h-3">
                    <div className="w-0.5 bg-gold animate-bounce rounded" style={{ animationDuration: '0.6s', height: '100%' }} />
                    <div className="w-0.5 bg-gold animate-bounce rounded" style={{ animationDuration: '0.4s', height: '60%' }} />
                    <div className="w-0.5 bg-gold animate-bounce rounded" style={{ animationDuration: '0.8s', height: '80%' }} />
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Form and Social Sign In Container */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-3xl bg-black/40 backdrop-blur-2xl">
            
            <div className="text-center mb-5">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {labels.welcome[selectedLang]}
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                {labels.journey[selectedLang]}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded bg-red-950/40 border border-red-500/30 flex items-center gap-2 text-red-300 text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Custom Interactive Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              
              {isSignUp && (
                <div className="animate-fade-in">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    {labels.nameLabel[selectedLang]}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder={labels.namePlaceholder[selectedLang]}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-white text-xs sm:text-sm glass-input placeholder-gray-500 font-sans font-medium"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  {labels.emailLabel[selectedLang]}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    placeholder={labels.emailPlaceholder[selectedLang]}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-white text-xs sm:text-sm glass-input placeholder-gray-500 font-sans font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {labels.passwordLabel[selectedLang]}
                  </label>
                  <button 
                    type="button"
                    onClick={() => setError(selectedLang === 'hi' ? 'पासवर्ड रीसेट ईमेल भेजा गया' : selectedLang === 'bn' ? 'পাসওয়ার্ড রিসেট ইমেল পাঠানো হয়েছে' : 'Demo Mode: Enter any PIN to sign in.')}
                    className="text-[9px] text-gold hover:underline font-mono"
                  >
                    Forgot Access PIN?
                  </button>
                </div>
                
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={labels.passwordPlaceholder[selectedLang]}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-white text-xs sm:text-sm glass-input placeholder-gray-400 font-mono font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-forest font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all hover:bg-gold/90 hover:scale-[1.01] active:scale-[0.99] shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{isSignUp ? labels.actionSignUp[selectedLang] : labels.actionSignIn[selectedLang]}</span>
              </button>
            </form>

            {/* Link to Toggle Account Modes */}
            <div className="text-center mt-3">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[10px] sm:text-xs text-gold/80 hover:text-white hover:underline transition font-semibold"
              >
                {isSignUp ? labels.toggleExisting[selectedLang] : labels.toggleNew[selectedLang]}
              </button>
            </div>

            {/* Google Authentication Divider */}
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <span className="relative bg-[#020c08] px-3.5 text-[10px] text-gray-400 uppercase font-mono tracking-wider">
                {labels.or[selectedLang]}
              </span>
            </div>

            {/* Social Authentication buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full py-2.5 px-4 rounded-xl text-white text-xs sm:text-sm font-semibold border border-white/10 hover:border-gold/30 hover:bg-white/5 transition-all flex items-center justify-center gap-2.5 cursor-pointer bg-white/[0.02]"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 15 1 12 1 7.35 1 3.4 3.65 1.51 7.51l3.74 2.9C6.15 7.42 8.87 5.04 12 5.04z" />
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.74 2.9c2.18-2.02 3.69-4.99 3.69-8.63z" />
                  <path fill="#FBBC05" d="M5.25 14.11c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.51 6.63C.54 8.56 0 10.72 0 13s.54 4.44 1.51 6.37l3.74-3.26z" />
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.74-2.9c-1.1.74-2.51 1.18-4.22 1.18-3.13 0-5.85-2.38-6.75-5.37l-3.74 2.9C3.4 20.35 7.35 23 12 23z" />
                </svg>
                <span>{labels.google[selectedLang]}</span>
              </button>

              <button
                onClick={handleGuestLogin}
                type="button"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-950/40 text-gold text-xs sm:text-sm font-bold border border-gold/20 hover:bg-emerald-900/40 hover:border-gold/40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 shrink-0 text-gold animate-pulse" />
                <span>{labels.guest[selectedLang]}</span>
              </button>
            </div>

            {/* Footer citation stamp */}
            <div className="mt-5 text-center flex items-center justify-center gap-1.5 text-gray-500 font-mono text-[9px] uppercase tracking-wider">
              <HelpCircle className="w-3 h-3 text-gold" />
              <span>National Geographic + Wikipedia Museum Edition</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
