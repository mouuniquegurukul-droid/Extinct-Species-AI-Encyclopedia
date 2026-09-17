import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ShieldAlert, Award, FileText, Compass, ExternalLink, Leaf, Clock, BookOpen, Layers, Heart, Share2, Download, Sparkles, RotateCw, Scale } from 'lucide-react';
import { ExtinctAnimal, Language } from '../types';

interface AnimalDetailsProps {
  animal: ExtinctAnimal;
  language: Language;
}

export default function AnimalDetails({ animal, language }: AnimalDetailsProps) {
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'discovery' | 'timeline' | 'conservation' | 'hologram'>('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [rotate3D, setRotate3D] = useState(0);
  const [scale3D, setScale3D] = useState(1);

  // Auto check favorites and handle automatic 3D hologram sweep timer
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('extinct_favorites') || '[]');
    setIsFavorite(favs.includes(animal.commonName));

    // Rotate hologram sweep
    const interval = setInterval(() => {
      setRotate3D(prev => (prev + 3) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, [animal]);

  // Toggle favorite trigger
  const handleToggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('extinct_favorites') || '[]');
    let updated;
    if (favs.includes(animal.commonName)) {
      updated = favs.filter((f: string) => f !== animal.commonName);
      setIsFavorite(false);
    } else {
      updated = [...favs, animal.commonName];
      setIsFavorite(true);
    }
    localStorage.setItem('extinct_favorites', JSON.stringify(updated));
  };

  // Share animal profile trigger
  const handleShareProfile = () => {
    const text = `Explore the ${animal.commonName} (${animal.scientificName}) in the Extinct Animals Encyclopedia! 🌌`;
    if (navigator.share) {
      navigator.share({
        title: animal.commonName,
        text: text,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Simulated PDF download (using window.print for supreme quality layout, or fallback alert)
  const handleDownloadPDF = () => {
    window.print();
  };

  // Stop any active speech if animal changes
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeech(false);
    }
  }, [animal]);

  // Handle TTS text to speech summary read out
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isPlayingSpeech) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeech(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(animal.summary);
      
      // Determine language voice code
      if (language === 'hi') {
        utterance.lang = 'hi-IN';
      } else if (language === 'bn') {
        utterance.lang = 'bn-IN';
      } else {
        utterance.lang = 'en-US';
      }

      utterance.onend = () => {
        setIsPlayingSpeech(false);
      };

      utterance.onerror = () => {
        setIsPlayingSpeech(false);
      };

      setIsPlayingSpeech(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const labels = {
    taxonomy: { en: "Scientific Taxonomy", hi: "वैज्ञानिक वर्गीकरण", bn: "বৈজ্ঞানিক শ্রেণীবিন্যাস" },
    fastFacts: { en: "Species Overview", hi: "प्रजाति अवलोकन", bn: "প্রজাতি পরিচিতি" },
    kingdom: { en: "Kingdom", hi: "जगत", bn: "রাজ্য" },
    phylum: { en: "Phylum", hi: "संघ", bn: "পর্ব" },
    class: { en: "Class", hi: "वर्ग", bn: "শ্রেণী" },
    order: { en: "Order", hi: "गण", bn: "বর্গ" },
    family: { en: "Family", hi: "कुल", bn: "গোত্র" },
    habitat: { en: "Habitat", hi: "प्राकृतिक वास", bn: "বাসস্থান" },
    diet: { en: "Diet", hi: "आहार", bn: "খাদ্যাভ্যাস" },
    lifespan: { en: "Lifespan", hi: "जीवनकाल", bn: "জীবনকাল" },
    size: { en: "Size", hi: "आकार", bn: "আকার" },
    weight: { en: "Weight", hi: "वजन", bn: "ওজন" },
    period: { en: "Time Period", hi: "काल अवधि", bn: "সময়কাল" },
    distribution: { en: "Distribution", hi: "भौगोलिक वितरण", bn: "ভৌগোলিক বণ্টন" },
    extinctDate: { en: "Extinction Date", hi: "विलुप्त होने की तिथि", bn: "বিলুপ্তির সময়" },
    extinctCause: { en: "Cause of Extinction", hi: "विलुप्त होने का कारण", bn: "বিলুপ্তির কারণ" },
    fossil: { en: "Fossil Evidence", hi: "जीवाश्म साक्ष्य", bn: "জীবাশ্মের প্রমাণ" },
    facts: { en: "Interesting Facts", hi: "रोचक तथ्य", bn: "আকর্ষণীয় তথ্য" },
    lessons: { en: "Conservation Lessons", hi: "संरक्षण सीख", bn: "সংরক্ষণ শিক্ষা" },
    related: { en: "Related & Modern Species", hi: "संबंधित और आधुनिक प्रजातियां", bn: "সম্পর্কিত ও আধুনিক প্রজাতি" },
    tabOverview: { en: "Overview", hi: "अवलोकन", bn: "সংক্ষিপ্ত বিবরণ" },
    tabDiscovery: { en: "Discovery & Fossils", hi: "खोज और जीवाश्म", bn: "আবিষ্কার ও জীবাশ্ম" },
    tabTimeline: { en: "Milestone Timeline", hi: "समयरेखा", bn: "মাইলস্টোন টাইমলাইন" },
    audioBtn: { en: "Audio Summary", hi: "ऑडियो सारांश", bn: "অডিও সারাংশ" },
    cite: { en: "Citational Source", hi: "उद्धरण स्रोत", bn: "উৎস উদ্ধৃতি" }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 animate-fade-in font-sans">
      {/* Upper header section */}
      <div className="flex flex-col lg:flex-row gap-8 items-start mb-8">
        
        {/* Large Media display / Primary image block */}
        <div className="w-full lg:w-3/5 space-y-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
            <img
              src={animal.images[0] || "https://images.unsplash.com/photo-1574158622643-69d34d72650a?q=80&w=1000&auto=format&fit=crop"}
              alt={animal.commonName}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Common and scientific naming overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs uppercase tracking-widest text-gold font-semibold font-mono">
                {animal.timePeriod}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-display tracking-tight">
                {animal.commonName}
              </h2>
              <p className="text-sm sm:text-base italic text-gray-300 mt-1 font-mono">
                {animal.scientificName}
              </p>
            </div>

            {/* Audio Synthesis Trigger Widget */}
            <button
              onClick={handleToggleSpeech}
              className={`absolute top-6 right-6 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all border shadow-lg ${
                isPlayingSpeech
                  ? 'bg-gold text-forest border-gold animate-pulse font-bold'
                  : 'bg-forest/80 text-white border-white/15 hover:bg-forest hover:border-gold'
              }`}
            >
              {isPlayingSpeech ? <VolumeX className="w-4 h-4 animate-bounce" /> : <Volume2 className="w-4 h-4" />}
              <span>{labels.audioBtn[language]}</span>
            </button>
          </div>

          {/* Interactive Curator Utility Bar */}
          <div className="flex flex-wrap gap-3 items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 shadow-md">
            <div className="flex gap-2">
              <button
                onClick={handleToggleFavorite}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isFavorite 
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400 font-bold' 
                    : 'bg-white/5 border-white/5 text-gray-300 hover:border-rose-500/40 hover:text-rose-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isFavorite ? 'Saved to Favorites' : 'Save as Favorite'}</span>
              </button>

              <button
                onClick={handleShareProfile}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/5 text-gray-300 hover:border-gold/30 hover:text-gold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>{isCopied ? 'Link Copied!' : 'Share Profile'}</span>
              </button>
            </div>

            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gold/10 border border-gold/25 text-gold hover:bg-gold hover:text-forest transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Exhibit</span>
            </button>
          </div>

          {/* Quick summary text vocalized or read */}
          <div className="p-4 rounded-xl bg-gold/5 border border-gold/15 text-gray-200 text-sm leading-relaxed italic">
            "{animal.summary}"
          </div>

          {/* Additional image galleries */}
          {animal.images.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {animal.images.slice(1, 4).map((img, idx) => (
                <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-white/5 shadow hover:border-gold/30 transition-all">
                  <img src={img} alt={`${animal.commonName} reconstruction ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Taxonomic sidebar (Museum style display board) */}
        <div className="w-full lg:w-2/5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-2xl">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4 border-b border-white/10 pb-2 font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-gold" />
              {labels.taxonomy[language]}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-sm">
              <div>
                <span className="text-gray-400 block text-xs">{labels.kingdom[language]}</span>
                <span className="text-white font-medium">{animal.kingdom}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-xs">{labels.phylum[language]}</span>
                <span className="text-white font-medium">{animal.phylum}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-xs">{labels.class[language]}</span>
                <span className="text-white font-medium">{animal.class}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-xs">{labels.order[language]}</span>
                <span className="text-white font-medium">{animal.order}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400 block text-xs">{labels.family[language]}</span>
                <span className="text-white font-medium">{animal.family}</span>
              </div>
            </div>
          </div>

          {/* High risk extinction banner and metadata facts */}
          <div className="glass-panel p-6 rounded-2xl border border-red-500/10 bg-red-950/5 shadow-2xl">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-red-400 mb-3 font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
              {labels.extinctDate[language]}
            </h3>
            <span className="text-2xl font-extrabold text-white tracking-wide block mb-3">
              {animal.extinctionDate}
            </span>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
              <strong className="text-red-300 block mb-1 uppercase text-xs font-mono tracking-wider">{labels.extinctCause[language]}</strong>
              {animal.causeOfExtinction}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Menu navigation for extended wiki records */}
      <div className="flex border-b border-white/10 mb-8 overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-6 text-sm font-medium border-b-2 transition-all cursor-pointer ${
            activeTab === 'overview' ? 'border-gold text-gold font-bold' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          {labels.tabOverview[language]}
        </button>
        <button
          onClick={() => setActiveTab('discovery')}
          className={`py-3 px-6 text-sm font-medium border-b-2 transition-all cursor-pointer ${
            activeTab === 'discovery' ? 'border-gold text-gold font-bold' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          {labels.tabDiscovery[language]}
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`py-3 px-6 text-sm font-medium border-b-2 transition-all cursor-pointer ${
            activeTab === 'timeline' ? 'border-gold text-gold font-bold' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          {labels.tabTimeline[language]}
        </button>
        <button
          onClick={() => setActiveTab('hologram')}
          className={`py-3 px-6 text-sm font-medium border-b-2 transition-all cursor-pointer ${
            activeTab === 'hologram' ? 'border-gold text-gold font-bold' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          🌌 {language === 'hi' ? '3D होलोग्राम' : language === 'bn' ? '৩ডি হলোগ্রাম' : '3D Hologram'}
        </button>
      </div>

      {/* Tab Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main interactive Tab Content column (takes 2/3 space) */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Biological fast facts board */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-gold" />
                  {labels.fastFacts[language]}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3.5 rounded bg-white/5 border border-white/5">
                    <span className="text-gray-400 block text-xs uppercase font-mono">{labels.habitat[language]}</span>
                    <span className="text-white font-semibold">{animal.habitat}</span>
                  </div>
                  <div className="p-3.5 rounded bg-white/5 border border-white/5">
                    <span className="text-gray-400 block text-xs uppercase font-mono">{labels.diet[language]}</span>
                    <span className="text-white font-semibold">{animal.diet}</span>
                  </div>
                  <div className="p-3.5 rounded bg-white/5 border border-white/5">
                    <span className="text-gray-400 block text-xs uppercase font-mono">{labels.lifespan[language]}</span>
                    <span className="text-white font-semibold">{animal.lifespan}</span>
                  </div>
                  <div className="p-3.5 rounded bg-white/5 border border-white/5">
                    <span className="text-gray-400 block text-xs uppercase font-mono">{labels.size[language]} / {labels.weight[language]}</span>
                    <span className="text-white font-semibold">{animal.size} ({animal.weight})</span>
                  </div>
                  <div className="col-span-1 sm:col-span-2 p-3.5 rounded bg-white/5 border border-white/5">
                    <span className="text-gray-400 block text-xs uppercase font-mono">{labels.distribution[language]}</span>
                    <span className="text-white font-semibold">{animal.geographicDistribution}</span>
                  </div>
                </div>
              </div>

              {/* Bulleted list of fun, interesting characteristics */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-gold" />
                  {labels.facts[language]}
                </h3>
                <ul className="space-y-3.5 text-sm sm:text-base text-gray-300">
                  {animal.interestingFacts.map((fact, i) => (
                    <li key={i} className="flex gap-2.5 items-start">
                      <span className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'discovery' && (
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gold" />
                  Discovery History
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {animal.discoveryHistory}
                </p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-emerald-950/10">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gold" />
                  {labels.fossil[language]}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {animal.fossilEvidence}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold" />
                History Timeline
              </h3>
              
              <div className="relative border-l border-white/15 pl-6 ml-2 space-y-6">
                {animal.timeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle timeline dot */}
                    <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-gold bg-forest z-10" />
                    <span className="text-xs uppercase tracking-wider text-gold font-mono font-bold block mb-1">
                      {item.year}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                      {item.event}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hologram' && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-[#01140e] to-[#000503] space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                    Quantum Holographic Bio-Scan
                  </h3>
                  <span className="text-[10px] text-gray-400 font-mono uppercase">Interactive Volumetric Mesh Reconstitution</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setScale3D(prev => Math.max(0.5, prev - 0.15))}
                    className="p-1.5 rounded bg-white/5 border border-white/5 text-gray-300 hover:text-white"
                    title="Zoom Out"
                  >
                    <Scale className="w-4 h-4 scale-x-[-1]" />
                  </button>
                  <button 
                    onClick={() => setScale3D(prev => Math.min(2.0, prev + 0.15))}
                    className="p-1.5 rounded bg-white/5 border border-white/5 text-gray-300 hover:text-white"
                    title="Zoom In"
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Glowing Interactive Vector Viewport */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-emerald-500/10 bg-black/90 flex items-center justify-center">
                {/* Scan Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                {/* Horizontal Sweeping Line */}
                <div className="absolute left-0 w-full h-[1.5px] bg-emerald-500/20 shadow-[0_0_10px_#10b981] animate-pulse pointer-events-none" />

                {/* Simulated Holographic Rotating Wireframe of Specimen */}
                <div 
                  className="transition-transform duration-150 ease-out"
                  style={{
                    transform: `rotate(${rotate3D}deg) scale(${scale3D})`,
                    perspective: '1000px'
                  }}
                >
                  <svg width="180" height="180" viewBox="0 0 100 100" className="text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]">
                    {/* Circle Scope lines */}
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" className="opacity-40" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-20" />
                    
                    {/* Species specific skeletal stylized vectors */}
                    {animal.commonName.toLowerCase().includes('dodo') ? (
                      <path d="M50,30 C60,25 70,35 65,45 C60,50 50,55 45,65 L40,75 L35,75 L42,65 C32,60 25,50 30,40 C35,30 45,35 50,30 Z M50,35 C48,35 46,37 46,39 C46,41 48,43 50,43 C52,43 54,41 54,39 C54,37 52,35 50,35 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    ) : animal.commonName.toLowerCase().includes('mammoth') ? (
                      <path d="M30,55 C20,50 15,35 25,25 C35,15 55,20 65,30 C75,40 85,50 82,65 C80,75 70,78 60,70 L55,75 L50,75 L53,68 C45,70 35,65 30,55 Z M45,30 C42,30 40,32 40,35 C40,38 42,40 45,40 C48,40 50,38 50,35 C50,32 48,30 45,30 Z M70,50 C75,52 80,48 82,42 C83,38 80,32 75,35" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    ) : (
                      <path d="M50,20 C40,20 30,30 30,50 C30,70 40,80 50,80 C60,80 70,70 70,50 C70,30 60,20 50,20 Z M50,35 L50,65 M35,50 L65,50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    )}
                    
                    {/* Outer scope tick marks */}
                    <line x1="50" y1="5" x2="50" y2="10" stroke="currentColor" strokeWidth="1" />
                    <line x1="50" y1="90" x2="50" y2="95" stroke="currentColor" strokeWidth="1" />
                    <line x1="5" y1="50" x2="10" y2="50" stroke="currentColor" strokeWidth="1" />
                    <line x1="90" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>

                {/* Scanning Telemetry Stats overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[10px] font-mono text-emerald-400/80 bg-black/40 px-2 py-1.5 rounded border border-emerald-500/10">
                  <span>FREQ: 5.82 GHz</span>
                  <span className="hidden sm:inline">MATRIX RESOLUTION: 1024LPS</span>
                  <span>ROT: {rotate3D}°</span>
                  <span>SYS: NOMINAL</span>
                </div>
              </div>

              {/* Bio-Scan Analysis */}
              <div className="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/10 space-y-2">
                <span className="text-xs font-bold text-emerald-400 font-mono block uppercase">Anatomical Reconstruction Analysis:</span>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  The volumetric mesh scan reconstructs the morphological attributes of the {animal.commonName} based on cataloged skeletal remains and soft-tissue preservation studies. The {animal.size} proportions are benchmarked against current modern relatives ({animal.relatedSpecies[0]?.name || 'equivalent fauna'}) for evolutionary alignment.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar panels for conservation and modern relatives (takes 1/3 space) */}
        <div className="space-y-6">
          {/* Moral ecological lessons section */}
          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/20">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold mb-3 font-mono flex items-center gap-2">
              <Leaf className="w-4 h-4 text-gold animate-bounce" />
              {labels.lessons[language]}
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed italic">
              "{animal.conservationLessons}"
            </p>
          </div>

          {/* Related/Descendant modern equivalent species */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 font-mono">
              {labels.related[language]}
            </h3>
            <div className="space-y-4">
              {animal.relatedSpecies.map((rel, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-gold/20 transition-all">
                  <span className="text-sm font-bold text-white block mb-1">
                    {rel.name}
                  </span>
                  <span className="text-xs text-gray-300 leading-relaxed block">
                    {rel.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer references and citations */}
      <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono gap-4">
        <span>Powered by server-side Gemini AI | Museum Heritage Archive</span>
        <div className="flex items-center gap-1.5 hover:text-gold transition-colors">
          <span>{labels.cite[language]}:</span>
          <a
            href={animal.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-bold text-gray-400 hover:text-gold underline"
          >
            Wikipedia Citation
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
