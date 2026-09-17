import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, AlertCircle, RefreshCw, Layers, ShieldAlert, ArrowRight, HelpCircle } from 'lucide-react';
import { Language, UserSession, ExtinctAnimal } from './types';
import Login from './components/Login';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AnimalDetails from './components/AnimalDetails';
import ExtraSections from './components/ExtraSections';
import InteractiveMap from './components/InteractiveMap';
import TimelineSection from './components/TimelineSection';
import CausesSection from './components/CausesSection';
import QuizSection from './components/QuizSection';
import AiAssistant from './components/AiAssistant';

// Standard high-quality preloaded list for Featured extinct animals
const FEATURED_ANIMALS = [
  {
    name: "Dodo",
    scientificName: "Raphus cucullatus",
    time: "Extinct ~1662",
    desc: {
      en: "A flightless bird endemic to Mauritius, became a symbol of human-driven extinction.",
      hi: "मॉरीशस का एक न उड़ पाने वाला पक्षी, जो मानव-प्रेरित विलुप्ति का प्रतीक बन गया।",
      bn: "মরিশাসের একটি উড়তে না পারা পাখি, যা মানুষের দ্বারা বিলুপ্তির প্রধান প্রতীক হয়ে ওঠে।"
    },
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Woolly Mammoth",
    scientificName: "Mammuthus primigenius",
    time: "Extinct ~4,000 years ago",
    desc: {
      en: "An iconic Ice Age giant that roamed the frozen arctic tundras.",
      hi: "हिमयुग का एक प्रसिद्ध विशालकाय जीव जो जमी हुई आर्कटिक टुंड्रा पर घूमता था।",
      bn: "তুষার যুগের এক কিংবদন্তি স্তন্যপায়ী প্রাণী যে জমাট বাঁধা সুমেরীয় তুন্দ্রা অঞ্চলে ঘুরে বেড়াত।"
    },
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Tasmanian Tiger",
    scientificName: "Thylacinus cynocephalus",
    time: "Extinct 1936",
    desc: {
      en: "The largest known carnivorous marsupial of modern times, native to Australia.",
      hi: "आधुनिक समय का सबसे बड़ा ज्ञात मांसाहारी मार्सुपियल, जो ऑस्ट्रेलिया का मूल निवासी था।",
      bn: "আধুনিককালের বৃহত্তম মাংসাশী থলেযুক্ত স্তন্যপায়ী প্রাণী, যার আদি নিবাস ছিল অস্ট্রেলিয়ায়।"
    },
    image: "https://images.unsplash.com/photo-1547407139-3c921a66005c?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Saber-Toothed Tiger",
    scientificName: "Smilodon fatalis",
    time: "Extinct ~10,000 years ago",
    desc: {
      en: "A fearsome apex predator equipped with long, blade-like canine teeth.",
      hi: "लंबे, तलवार जैसे नुकीले दांतों से लैस हिमयुग का एक भयानक शिकारी जीव।",
      bn: "তলোয়ারের মতো লম্বা দাঁতযুক্ত তুষার যুগের এক ভয়ঙ্কর হিংস্র শিকারী প্রাণী।"
    },
    image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=600&auto=format&fit=crop"
  }
];

export default function App() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [currentAnimal, setCurrentAnimal] = useState<ExtinctAnimal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<string>('');

  // Auto load active session if stored in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('extinct_user_session');
    const savedLang = localStorage.getItem('extinct_user_language');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedLang) {
      setLanguage(savedLang as Language);
    }
  }, []);

  const handleLoginSuccess = (session: UserSession, lang: Language) => {
    setUser(session);
    setLanguage(lang);
    localStorage.setItem('extinct_user_session', JSON.stringify(session));
    localStorage.setItem('extinct_user_language', lang);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentAnimal(null);
    setActiveSection('home');
    localStorage.removeItem('extinct_user_session');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('extinct_user_language', lang);
    // If we have an active animal displayed, let's query it again in the new language!
    if (currentAnimal) {
      handleSearch(currentAnimal.commonName, lang);
    }
  };

  const handleSearch = async (queryName: string, langOverride?: Language) => {
    const lang = langOverride || language;
    setIsLoading(true);
    setSearchError(null);

    // Dynamic loading messages to entertain user during synthesis
    const loadingStates = {
      en: [
        "Consulting global paleontological indexes...",
        "Querying Wikipedia and Wikidata archives...",
        "Fetching fossil reconstruction illustrations...",
        "Translating taxonomy trees via Gemini AI..."
      ],
      hi: [
        "वैश्विक जीवाश्म सूचकांकों की खोज की जा रही है...",
        "विकिपीडिया और विकिडाटा अभिलेखागार से डेटा लाया जा रहा है...",
        "फॉसिल चित्रों और पुनर्निर्माण चित्रों को एकत्र किया जा रहा है...",
        "जेमिनी एआई के माध्यम से अनुवाद किया जा रहा है..."
      ],
      bn: [
        "বৈশ্বিক জীবাশ্ম সূচিপত্র অনুসন্ধান করা হচ্ছে...",
        "উইকিপিডিয়া ও উইকিডাটা আর্কাইভ থেকে তথ্য সংগ্রহ করা হচ্ছে...",
        "জীবাশ্ম ও অন্যান্য ছবি সংগ্রহ করা হচ্ছে...",
        "জেমিনি এআই-এর সাহায্যে বাংলা অনুবাদ করা হচ্ছে..."
      ]
    };

    const steps = loadingStates[lang] || loadingStates.en;
    let stepIdx = 0;
    setLoadingStep(steps[0]);

    const stepInterval = setInterval(() => {
      stepIdx = (stepIdx + 1) % steps.length;
      setLoadingStep(steps[stepIdx]);
    }, 1500);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryName, language: lang })
      });

      clearInterval(stepInterval);

      if (response.ok) {
        const data = await response.json();
        setCurrentAnimal(data);
        setActiveSection('home'); // ensures detail page is shown on the primary home screen!
      } else {
        setCurrentAnimal(null);
        setSearchError(
          lang === 'hi'
            ? "क्षमा करें, कोई जानकारी नहीं मिली।"
            : lang === 'bn'
            ? "দুঃখিত, কোনো তথ্য পাওয়া যায়নি।"
            : "Sorry, no information was found."
        );
      }
    } catch (err) {
      clearInterval(stepInterval);
      console.error(err);
      setCurrentAnimal(null);
      setSearchError(
        lang === 'hi'
          ? "क्षमा करें, कोई जानकारी नहीं मिली।"
          : lang === 'bn'
          ? "দুঃখিত, কোনো তথ্য পাওয়া যায়নি।"
          : "Sorry, no information was found."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // If user is not authenticated, render Login Page
  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-forest flex flex-col justify-between">
      <div>
        {/* Header Navigation Menu bar */}
        <Navbar
          user={user}
          language={language}
          onLanguageChange={handleLanguageChange}
          onLogout={handleLogout}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Home Screen View */}
        {activeSection === 'home' && (
          <div className="animate-fade-in">
            {/* Redesigned Premium Hero Section */}
            <HeroSection
              language={language}
              onSearchSubmit={(q) => handleSearch(q)}
              isLoading={isLoading}
              onExploreClick={() => handleSearch('Woolly Mammoth')}
              onAskAiClick={() => setActiveSection('assistant')}
            />

            {/* Error indicators */}
            {searchError && (
              <div className="max-w-4xl mx-auto px-4 mb-8">
                <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-8 h-8 text-red-400 shrink-0" />
                    <div>
                      <h4 className="font-bold text-white text-base">Search Failed</h4>
                      <p className="text-sm text-red-300">{searchError}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSearchError(null)}
                    className="text-xs font-semibold px-4 py-2 rounded bg-white/5 border border-white/10 hover:border-white/20 text-white transition-all shrink-0 cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            )}

            {/* Animated Loading screen */}
            {isLoading && (
              <div className="max-w-4xl mx-auto px-4 py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto animate-spin">
                  <RefreshCw className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-lg font-bold text-white">Synthesizing Digital Exhibit</h3>
                <p className="text-xs sm:text-sm text-gray-400 font-mono italic">{loadingStep}</p>
              </div>
            )}

            {/* Animal Exhibit Details panel */}
            {currentAnimal && !isLoading && (
              <div className="border-t border-white/5 bg-[#0a231a]/40 pt-4">
                <AnimalDetails animal={currentAnimal} language={language} />
              </div>
            )}

            {/* Featured Extinct Species Grid (shown when not showing details, or as recommendations) */}
            {(!currentAnimal || activeSection !== 'home') && !isLoading && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/5 pb-4 gap-2">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-gold animate-pulse" />
                      {language === 'hi' ? 'विशेष विलुप्त जीव' : language === 'bn' ? 'বিশেষভাবে আলোচিত বিলুপ্ত প্রাণী' : 'Featured Extinct Fauna'}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {language === 'hi' ? 'मानव इतिहास की कुछ सबसे प्रसिद्ध खोई हुई प्रजातियां।' : language === 'bn' ? 'মানব ইতিহাসের অন্যতম কয়েকটি জনপ্রিয় হারিয়ে যাওয়া প্রজাতি।' : 'Explore some of the most notable species lost in human memory.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {FEATURED_ANIMALS.map((animal, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSearch(animal.name)}
                      className="glass-panel rounded-2xl overflow-hidden border border-white/10 group cursor-pointer hover:border-gold/30 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-video relative overflow-hidden bg-forest">
                          <img
                            src={animal.image}
                            alt={animal.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-forest/80 text-[10px] font-bold uppercase tracking-wider text-gold border border-white/5">
                            {animal.time}
                          </span>
                        </div>

                        <div className="p-4 space-y-1">
                          <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors font-display">
                            {animal.name}
                          </h3>
                          <span className="text-xs italic text-gray-400 font-mono block">
                            {animal.scientificName}
                          </span>
                          <p className="text-xs text-gray-300 leading-relaxed pt-2">
                            {animal.desc[language]}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 pt-0 flex items-center gap-1.5 text-xs text-gold font-semibold group-hover:underline justify-end">
                        <span>Read Exhibit</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Content Router for new and existing sections */}
        {activeSection !== 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {activeSection === 'map' && (
              <InteractiveMap
                language={language}
                onSearchAnimal={(name) => {
                  handleSearch(name);
                  setActiveSection('home');
                }}
              />
            )}
            {activeSection === 'timeline' && (
              <TimelineSection
                language={language}
                onSearchAnimal={(name) => {
                  handleSearch(name);
                  setActiveSection('home');
                }}
              />
            )}
            {activeSection === 'extinction' && (
              <CausesSection language={language} />
            )}
            {activeSection === 'quiz' && (
              <QuizSection language={language} user={user} />
            )}
            {activeSection === 'assistant' && (
              <AiAssistant language={language} />
            )}
            {['categories', 'about', 'faq', 'contact'].includes(activeSection) && (
              <ExtraSections
                language={language}
                onSearchAnimal={(name) => {
                  handleSearch(name);
                  setActiveSection('home');
                }}
                activeSection={activeSection as any}
              />
            )}
          </div>
        )}
      </div>

      {/* Cinematic Museum Footer */}
      <footer className="w-full border-t border-white/5 bg-[#05140f] py-8 px-4 text-center space-y-3 mt-12">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-500 font-mono uppercase tracking-wider">
          <span>Powered by AI</span>
          <span>•</span>
          <span>Wikipedia API</span>
          <span>•</span>
          <span>Wikimedia Commons</span>
          <span>•</span>
          <span>Wikidata</span>
        </div>
        <p className="text-[10px] text-gray-600 font-mono">
          &copy; {new Date().getFullYear()} Extinct Animals Encyclopedia. Natural History Digital Museum Edition.
        </p>
      </footer>
    </div>
  );
}
