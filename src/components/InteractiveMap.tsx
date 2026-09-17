import React, { useState } from 'react';
import { Compass, Sparkles, MapPin, Search, ArrowRight, Layers, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface InteractiveMapProps {
  language: Language;
  onSearchAnimal: (name: string) => void;
}

interface ContinentData {
  id: string;
  name: { en: string; hi: string; bn: string };
  description: { en: string; hi: string; bn: string };
  famousSpecies: {
    name: string;
    scientificName: string;
    period: string;
    cause: { en: string; hi: string; bn: string };
    image: string;
    coords: { x: number; y: number }; // Percentage coords on SVG Map
  }[];
}

const CONTINENTS_DATA: ContinentData[] = [
  {
    id: "asia",
    name: { en: "Asia", hi: "एशिया", bn: "এশিয়া" },
    description: { 
      en: "From the Siberian ice tundras to the tropical river basins, Asia hosted titans like Mammoths and river dolphins.",
      hi: "साइबेरियाई टुंड्रा से लेकर उष्णकटिबंधीय नदी घाटियों तक, एशिया में मैमथ और नदी डॉल्फ़िन जैसे जीव रहते थे।",
      bn: "সাইবেরিয়ার বরফ তুন্দ্রা থেকে গ্রীষ্মমন্ডলীয় নদীর অববাহিকা পর্যন্ত, এশিয়ায় ম্যামথ এবং নদীর ডলফিন বাস করত।"
    },
    famousSpecies: [
      {
        name: "Woolly Mammoth",
        scientificName: "Mammuthus primigenius",
        period: "Pleistocene Epoch",
        cause: { en: "Climate warming & hunting", hi: "जलवायु परिवर्तन और अत्यधिक शिकार", bn: "জলবায়ু পরিবর্তন এবং অতিরিক্ত শিকার" },
        image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=400&auto=format&fit=crop",
        coords: { x: 72, y: 22 }
      },
      {
        name: "Baiji Dolphin",
        scientificName: "Lipotes vexillifer",
        period: "Extinct ~2006",
        cause: { en: "River pollution & overfishing", hi: "नदी प्रदूषण और औद्योगिक मत्स्य पालन", bn: "নদী দূষণ এবং অতিরিক্ত মাছ ধরা" },
        image: "https://images.unsplash.com/photo-1570481662006-a33af0a65906?q=80&w=400&auto=format&fit=crop",
        coords: { x: 80, y: 46 }
      },
      {
        name: "Siberian Unicorn",
        scientificName: "Elasmotherium sibiricum",
        period: "Extinct ~36,000 years ago",
        cause: { en: "Environmental changes", hi: "पर्यावरणीय बदलाव", bn: "পরিবেশগত পরিবর্তন" },
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop",
        coords: { x: 65, y: 32 }
      }
    ]
  },
  {
    id: "africa",
    name: { en: "Africa", hi: "अफ्रीका", bn: "আফ্রিকা" },
    description: {
      en: "The cradle of life, home to giants like the Quagga zebra and Madagascar's flightless Elephant Birds.",
      hi: "जीवन का पालना, क्वागा ज़ेबरा और मेडागास्कर के न उड़ने वाले एलिफेंट बर्ड्स जैसे जीवों का घर।",
      bn: "জীবনের দোলনা, কুয়াগা জেব্রা এবং মাদাগাস্কারের উড়তে না পারা এলিফ্যান্ট বার্ডের মতো প্রাণীদের আবাসস্থল।"
    },
    famousSpecies: [
      {
        name: "Quagga",
        scientificName: "Equus quagga quagga",
        period: "Extinct 1883",
        cause: { en: "Ruthless colonial hunting", hi: "औपनिवेशिक काल का शिकार", bn: "উপনিবেশবাদী যুগে অতিরিক্ত শিকার" },
        image: "https://images.unsplash.com/photo-1501535085622-c348d56f4a45?q=80&w=400&auto=format&fit=crop",
        coords: { x: 54, y: 72 }
      },
      {
        name: "Elephant Bird",
        scientificName: "Aepyornis maximus",
        period: "Extinct ~1000 AD",
        cause: { en: "Human settlement & egg hunting", hi: "मानव बस्तियां और अंडों का शिकार", bn: "মানব বসতি এবং ডিমের অতিরিক্ত সংগ্রহ" },
        image: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=400&auto=format&fit=crop",
        coords: { x: 59, y: 78 }
      }
    ]
  },
  {
    id: "europe",
    name: { en: "Europe", hi: "यूरोप", bn: "ইউরোপ" },
    description: {
      en: "Once roamed by fearsome Saber-Toothed Cats and the colossal Irish Elk with massive antlers.",
      hi: "कभी भयानक कृपाण-दंत बिल्लियों और विशाल सींगों वाले आयरिश एल्क का घर हुआ करता था।",
      bn: "একদা ভয়ঙ্কর তলোয়ার-দাঁতযুক্ত বাঘ এবং বিশাল শিংযুক্ত আইরিশ এল্কের চারণভূমি ছিল।"
    },
    famousSpecies: [
      {
        name: "Irish Elk",
        scientificName: "Megaloceros giganteus",
        period: "Extinct ~7,700 years ago",
        cause: { en: "Forest densities & hunting", hi: "घने वन और शिकार के दबाव", bn: "বনের ঘনত্ব বৃদ্ধি এবং শিকার" },
        image: "https://images.unsplash.com/photo-1484406566174-9da000fda645?q=80&w=400&auto=format&fit=crop",
        coords: { x: 48, y: 28 }
      },
      {
        name: "Cave Bear",
        scientificName: "Ursus spelaeus",
        period: "Extinct ~24,000 years ago",
        cause: { en: "Habitat loss during glaciation", hi: "हिमयुग के दौरान आवास का नुकसान", bn: "বরফ যুগে গুহার বাসস্থানের অভাব" },
        image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=400&auto=format&fit=crop",
        coords: { x: 52, y: 35 }
      }
    ]
  },
  {
    id: "northamerica",
    name: { en: "North America", hi: "उत्तरी अमेरिका", bn: "উত্তর আমেরিকা" },
    description: {
      en: "Fearsome Smilodons and millions of Passenger Pigeons once occupied these expansive forests and plains.",
      hi: "भयानक स्मिलोडन और करोड़ों पैसेंजर कबूतर कभी इन विशाल जंगलों और मैदानों में रहते थे।",
      bn: "ভয়ঙ্কর স্মিলোডন এবং কোটি কোটি প্যাসেঞ্জার পিজিয়ন একসময় এই বনভূমি ও সমভূমিতে বাস করত।"
    },
    famousSpecies: [
      {
        name: "Saber-Toothed Tiger",
        scientificName: "Smilodon fatalis",
        period: "Extinct ~10,000 years ago",
        cause: { en: "Loss of megafauna prey", hi: "बड़े शिकार जीवों की कमी", bn: "বড় শিকারী খাদ্যের অভাব ও জলবায়ু" },
        image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=400&auto=format&fit=crop",
        coords: { x: 22, y: 38 }
      },
      {
        name: "Passenger Pigeon",
        scientificName: "Ectopistes migratorius",
        period: "Extinct 1914",
        cause: { en: "Commercialized mass slaughter", hi: "व्यावसायिक स्तर पर सामूहिक शिकार", bn: "বাণিজ্যিক উদ্দেশ্যে ব্যাপক হত্যা" },
        image: "https://images.unsplash.com/photo-1500622339340-ec34bf494216?q=80&w=400&auto=format&fit=crop",
        coords: { x: 28, y: 32 }
      }
    ]
  },
  {
    id: "southamerica",
    name: { en: "South America", hi: "दक्षिण अमेरिका", bn: "দক্ষিণ আমেরিকা" },
    description: {
      en: "Isolated for millions of years, South America birthed unique armor giants like Glyptodonts.",
      hi: "लाखों वर्षों तक अलग-थलग रहने के कारण, दक्षिण अमेरिका में ग्लिप्टोडॉन्ट जैसे विशाल कवच वाले जीवों का जन्म हुआ।",
      bn: "লাখ লাখ বছর ধরে আলাদা থাকায়, দক্ষিণ আমেরিকায় গ্লিপ্টোডন্টের মতো অনন্য আর্মারযুক্ত প্রাণীর জন্ম হয়েছিল।"
    },
    famousSpecies: [
      {
        name: "Glyptodon",
        scientificName: "Glyptodon clavipes",
        period: "Extinct ~10,000 years ago",
        cause: { en: "Hunting & climate changes", hi: "मानव शिकार और हिमयुग की समाप्ति", bn: "মানব শিকার এবং পরিবেশের ভারসাম্যহীনতা" },
        image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=400&auto=format&fit=crop",
        coords: { x: 32, y: 68 }
      }
    ]
  },
  {
    id: "oceania",
    name: { en: "Oceania & Australia", hi: "ओशिनिया और ऑस्ट्रेलिया", bn: "ওশেনিয়া এবং অস্ট্রেলিয়া" },
    description: {
      en: "Isolated ecosystems that produced specialized marsupials like the Thylacine and giant birds like the Moa.",
      hi: "अलग पारिस्थितिकी तंत्र जिसने थायलासीन जैसे मार्सुपियल और मोआ जैसे विशाल पक्षी पैदा किए।",
      bn: "বিচ্ছিন্ন বাস্তুতন্ত্র যা থাইলাসিনের মতো স্তন্যপায়ী এবং মোয়ার মতো বিশাল পাখির জন্ম দিয়েছিল।"
    },
    famousSpecies: [
      {
        name: "Tasmanian Tiger",
        scientificName: "Thylacinus cynocephalus",
        period: "Extinct 1936",
        cause: { en: "Bounties & dingo competition", hi: "इनाम के लिए अत्यधिक शिकार और बीमारी", bn: "পুরস্কারের জন্য শিকার ও মানুষের আক্রমণ" },
        image: "https://images.unsplash.com/photo-1547407139-3c921a66005c?q=80&w=400&auto=format&fit=crop",
        coords: { x: 86, y: 78 }
      },
      {
        name: "Moa",
        scientificName: "Dinornithidae",
        period: "Extinct ~1440s",
        cause: { en: "Overhunting by Maori settlers", hi: "माओरी निवासियों द्वारा अत्यधिक शिकार", bn: "মাওরি উপজাতিদের দ্বারা অতিরিক্ত শিকার" },
        image: "https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?q=80&w=400&auto=format&fit=crop",
        coords: { x: 92, y: 84 }
      }
    ]
  }
];

export default function InteractiveMap({ language, onSearchAnimal }: InteractiveMapProps) {
  const [selectedContinent, setSelectedContinent] = useState<ContinentData>(CONTINENTS_DATA[0]);
  const [hoveredPin, setHoveredPin] = useState<any>(null);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title block */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 animate-spin-slow" />
          {language === 'hi' ? 'इंटरैक्टिव भू-स्थानिक मानचित्र' : language === 'bn' ? 'ইন্টারেক্টিভ ভৌগলিক মানচিত্র' : 'Interactive Geospatial Map'}
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
          {language === 'hi' ? 'महाद्वीपीय विलुप्ति अन्वेषक' : language === 'bn' ? 'মহাদেশীয় বিলুপ্তি অন্বেষণকারী' : 'Continental Extinction Explorer'}
        </h2>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          {language === 'hi' 
            ? 'महाद्वीप के अनुसार पृथ्वी के विलुप्त जीवों का पता लगाएं। मानचित्र पर पिन पर क्लिक करें या विस्तृत गैलरी देखने के लिए महाद्वीप चुनें।'
            : language === 'bn'
            ? 'মহাদেশ ভিত্তিক হারিয়ে যাওয়া প্রজাতির ভৌগোলিক চারণভূমি অন্বেষণ করুন। মানচিত্রের পিনগুলিতে ক্লিক করুন।'
            : 'Explore the historical distribution of extinct animals across global continents. Tap pins on the digital map to open individual exhibits.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: interactive Map Container */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-panel rounded-2xl border border-white/10 p-4 relative overflow-hidden bg-[#071d15] aspect-[16/9] select-none flex items-center justify-center">
            
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 pointer-events-none" />

            {/* Stylized SVG Outline Map of the World */}
            <svg 
              viewBox="0 0 1000 500" 
              className="w-full h-full opacity-65 text-emerald-800 transition-all duration-300"
              style={{ stroke: 'rgba(212,175,55,0.15)', fill: 'none', strokeWidth: '1.5' }}
            >
              {/* Simplified high contrast mock continents path for elegant design */}
              {/* North America */}
              <path d="M 50 100 Q 150 50 250 120 T 350 150 T 380 200 Q 300 230 250 260 T 150 300 Z" fill="rgba(16,185,129,0.05)" />
              {/* South America */}
              <path d="M 230 280 Q 280 320 330 380 T 340 450 T 290 480 Q 230 350 220 300 Z" fill="rgba(16,185,129,0.05)" />
              {/* Europe */}
              <path d="M 400 100 Q 500 80 550 150 T 600 220 Q 520 220 450 180 Z" fill="rgba(16,185,129,0.05)" />
              {/* Africa */}
              <path d="M 430 220 Q 520 200 600 280 T 580 430 Q 480 380 420 320 Z" fill="rgba(16,185,129,0.05)" />
              {/* Asia */}
              <path d="M 540 120 Q 750 50 900 150 T 850 300 Q 700 320 620 250 Z" fill="rgba(16,185,129,0.05)" />
              {/* Oceania */}
              <path d="M 760 350 Q 850 340 920 400 T 850 480 Q 760 450 780 380 Z" fill="rgba(16,185,129,0.05)" />
            </svg>

            {/* Pulsing Pins for all famous species in database */}
            {CONTINENTS_DATA.flatMap(cont => 
              cont.famousSpecies.map(spec => {
                const isActive = hoveredPin?.name === spec.name;
                return (
                  <button
                    key={spec.name}
                    className="absolute group transition-transform duration-300 hover:scale-125 focus:outline-none cursor-pointer"
                    style={{ left: `${spec.coords.x}%`, top: `${spec.coords.y}%` }}
                    onMouseEnter={() => {
                      setHoveredPin(spec);
                      const parentCont = CONTINENTS_DATA.find(c => c.famousSpecies.some(s => s.name === spec.name));
                      if (parentCont) {
                        setSelectedContinent(parentCont);
                      }
                    }}
                    onClick={() => onSearchAnimal(spec.name)}
                  >
                    {/* Ring Pulse Effect */}
                    <span className="absolute inline-flex h-6 w-6 rounded-full bg-gold/30 animate-ping -left-1.5 -top-1.5 pointer-events-none" />
                    
                    {/* Location Icon pin */}
                    <div className={`p-1.5 rounded-full border shadow-lg transition-all ${
                      isActive 
                        ? 'bg-gold text-forest border-white scale-110' 
                        : 'bg-[#0d271e]/90 text-gold border-gold/40 hover:bg-gold hover:text-forest'
                    }`}>
                      <MapPin className="w-3.5 h-3.5" />
                    </div>

                    {/* Miniature Hover Label Card */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-8 opacity-0 group-hover:opacity-100 transition-all pointer-events-none duration-200 z-30 bg-forest border border-gold/30 p-2 rounded-lg shadow-xl w-36 text-center">
                      <p className="text-[10px] font-bold text-white tracking-wide truncate">{spec.name}</p>
                      <p className="text-[8px] font-mono text-gold italic truncate">{spec.scientificName}</p>
                    </div>
                  </button>
                );
              })
            )}

            {/* Hovered Pin Info Panel Overlap */}
            {hoveredPin && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 glass-panel border border-gold/20 p-4 rounded-xl flex gap-3 items-center animate-scale-up z-20 bg-forest/95 backdrop-blur-md">
                <img 
                  src={hoveredPin.image} 
                  alt={hoveredPin.name} 
                  className="w-16 h-16 object-cover rounded-lg border border-white/10 shrink-0" 
                />
                <div className="overflow-hidden space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white truncate">{hoveredPin.name}</h4>
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-gold/10 border border-gold/20 text-gold font-bold uppercase tracking-wider">{hoveredPin.period}</span>
                  </div>
                  <p className="text-[10px] italic text-gray-400 font-mono truncate">{hoveredPin.scientificName}</p>
                  <p className="text-[10px] text-gray-300 line-clamp-1">
                    <span className="text-gold font-semibold">Cause: </span>
                    {hoveredPin.cause[language]}
                  </p>
                  <button
                    onClick={() => onSearchAnimal(hoveredPin.name)}
                    className="text-[10px] font-bold text-gold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>Read Full Exhibit</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick instructions indicator */}
          <div className="flex justify-center gap-6 text-[11px] text-gray-400 font-mono">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gold animate-pulse" /> Pulsing Golden Pins represent notable extinct animal records</span>
          </div>
        </div>

        {/* Right Side: Detailed Continent card & Species list */}
        <div className="lg:col-span-4 space-y-4">
          {/* Continent Selector Tabs */}
          <div className="grid grid-cols-3 gap-2">
            {CONTINENTS_DATA.map((cont) => (
              <button
                key={cont.id}
                onClick={() => {
                  setSelectedContinent(cont);
                  setHoveredPin(null);
                }}
                className={`text-[10px] font-mono py-2 rounded-lg border transition-all cursor-pointer ${
                  selectedContinent.id === cont.id 
                    ? 'bg-gold text-forest border-gold font-bold shadow' 
                    : 'bg-white/5 text-gray-300 border-white/5 hover:bg-white/10'
                }`}
              >
                {cont.name[language]}
              </button>
            ))}
          </div>

          {/* Selected Continent Exhibit Detail Card */}
          <div className="glass-panel rounded-2xl border border-white/10 p-5 space-y-4 bg-gradient-to-b from-[#0b271d] to-[#05140f] shadow-xl">
            <div className="space-y-1">
              <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-gold">
                Continent Profile
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                {selectedContinent.name[language]}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {selectedContinent.description[language]}
              </p>
            </div>

            {/* List of species in this continent */}
            <div className="space-y-3 pt-3 border-t border-white/5">
              <h4 className="text-xs font-bold text-gold uppercase tracking-wider font-mono">
                {language === 'hi' ? 'स्थानीय विलुप्त जीव:' : language === 'bn' ? 'আঞ্চলিক বিলুপ্ত প্রজাতি:' : 'Regional Lost Linages:'}
              </h4>
              
              <div className="space-y-2.5">
                {selectedContinent.famousSpecies.map((spec) => (
                  <div
                    key={spec.name}
                    onClick={() => onSearchAnimal(spec.name)}
                    className="p-3 rounded-xl border border-white/5 hover:border-gold/30 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img 
                        src={spec.image} 
                        alt={spec.name} 
                        className="w-10 h-10 object-cover rounded-lg border border-white/10 shrink-0" 
                      />
                      <div className="overflow-hidden">
                        <h5 className="text-xs font-bold text-white group-hover:text-gold transition-colors truncate">
                          {spec.name}
                        </h5>
                        <p className="text-[9px] text-gray-400 font-mono italic truncate">
                          {spec.scientificName}
                        </p>
                      </div>
                    </div>
                    
                    <button className="text-gold shrink-0 p-1.5 rounded-lg bg-white/5 group-hover:bg-gold group-hover:text-forest transition-all">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
