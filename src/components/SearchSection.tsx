import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, MicOff, History, HelpCircle, Loader2, RefreshCw } from 'lucide-react';
import { Language, SearchSuggestion } from '../types';

interface SearchSectionProps {
  language: Language;
  onSearchSubmit: (query: string) => void;
  isLoading: boolean;
}

const POPULAR_SPECIES = [
  "Dodo",
  "Woolly Mammoth",
  "Tyrannosaurus Rex",
  "Saber-Toothed Tiger",
  "Tasmanian Tiger",
  "Quagga",
  "Passenger Pigeon",
  "Great Auk",
  "Thylacine",
  "Megalodon"
];

export default function SearchSection({ language, onSearchSubmit, isLoading }: SearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Text translations
  const t = {
    placeholder: {
      en: "Search extinct animal (e.g. Dodo, Mammoth, T-Rex)...",
      hi: "विलुप्त जीव खोजें (जैसे- डोडो, मैमथ, टी-रेक्स)...",
      bn: "বিলুপ্ত প্রাণী খুঁজুন (যেমন- ডোডো, ম্যামথ, টি-রেক্স)..."
    },
    voiceActive: {
      en: "Listening...",
      hi: "सुन रहा हूँ...",
      bn: "শুনছি..."
    },
    recent: {
      en: "Recently Searched",
      hi: "हाल ही में खोजे गए",
      bn: "সাম্প্রতিক অনুসন্ধান"
    },
    popular: {
      en: "Popular Extinct Species",
      hi: "लोकप्रिय विलुप्त जीव",
      bn: "জনপ্রিয় বিলুপ্ত প্রজাতি"
    },
    random: {
      en: "Discover Random Animal",
      hi: "यादृच्छिक जीव खोजें",
      bn: "অজানা প্রাণী জানুন"
    }
  };

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('extinct_search_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Fetch suggestions as user types
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      const q = searchTerm.trim();
      if (q.length > 1) {
        try {
          const res = await fetch(`/api/suggestions?q=${encodeURIComponent(q)}`);
          if (res.ok) {
            const data = await res.json();
            setSuggestions(data);
          }
        } catch (err) {
          console.error("Failed to fetch suggestions:", err);
        }
      } else {
        setSuggestions([]);
      }
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Click outside suggestions close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerSearch = (query: string) => {
    const cleaned = query.trim();
    if (!cleaned) return;

    onSearchSubmit(cleaned);
    setSearchTerm(cleaned);
    setShowSuggestions(false);

    // Save to history
    setHistory(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== cleaned.toLowerCase());
      const updated = [cleaned, ...filtered].slice(0, 5);
      localStorage.setItem('extinct_search_history', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSearch(searchTerm);
  };

  const handleRandomSearch = () => {
    const randomIndex = Math.floor(Math.random() * POPULAR_SPECIES.length);
    const randomAnimal = POPULAR_SPECIES[randomIndex];
    triggerSearch(randomAnimal);
  };

  // Browser-native speech recognition
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

    // Set voice recognition language code based on user preference
    if (language === 'hi') {
      recognition.lang = 'hi-IN';
    } else if (language === 'bn') {
      recognition.lang = 'bn-IN';
    } else {
      recognition.lang = 'en-US';
    }

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (e: any) => {
      console.error("Speech recognition error", e);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const resultText = event.results[0][0].transcript;
      if (resultText) {
        setSearchTerm(resultText);
        triggerSearch(resultText);
      }
    };

    recognition.start();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="glass-panel p-6 sm:p-8 rounded-2xl relative border border-white/10 shadow-2xl">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder={t.placeholder[language]}
              className="w-full pl-12 pr-28 py-4 rounded-xl text-white text-sm sm:text-base glass-input"
            />
          </div>

          <div className="absolute right-3 flex items-center gap-1 sm:gap-2">
            {/* Voice button */}
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`p-2.5 rounded-lg transition-all flex items-center justify-center cursor-pointer ${
                isListening
                  ? 'bg-red-500/20 border border-red-500 text-red-400 animate-pulse'
                  : 'hover:bg-white/5 text-gray-400 hover:text-gold'
              }`}
              title="Voice Search"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gold hover:bg-gold/90 text-forest p-2.5 rounded-lg transition-all flex items-center justify-center cursor-pointer"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </button>
          </div>

          {/* Dynamic Auto-suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-white/15 bg-[#0b211a] p-2 shadow-2xl z-40 max-h-60 overflow-y-auto"
            >
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => triggerSearch(item.name)}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-all"
                >
                  <span className="font-medium text-white text-sm sm:text-base">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-emerald-950 text-gold font-semibold">
                      {item.type}
                    </span>
                    <span className="text-xs text-gray-400 italic shrink-0 hidden sm:inline">
                      {item.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>

        {isListening && (
          <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/20 border border-red-500/20 text-red-400 text-xs sm:text-sm font-medium animate-pulse">
            <Mic className="w-4 h-4" />
            <span>{t.voiceActive[language]}</span>
          </div>
        )}

        {/* Action Widgets beneath search */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
          {/* Recent Queries */}
          {history.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 font-mono">
                <History className="w-3.5 h-3.5 text-gold" />
                {t.recent[language]}
              </span>
              <div className="flex flex-wrap gap-2">
                {history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => triggerSearch(h)}
                    className="text-xs px-2.5 py-1.5 rounded-full border border-white/5 hover:border-gold/30 bg-white/5 hover:bg-gold/10 text-gray-300 hover:text-gold transition-all font-medium cursor-pointer"
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Direct Suggestions & Random buttons */}
          <div className="space-y-2 flex flex-col justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 font-mono">
              <HelpCircle className="w-3.5 h-3.5 text-gold" />
              {t.popular[language]}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_SPECIES.slice(0, 5).map((pop, i) => (
                <button
                  key={i}
                  onClick={() => triggerSearch(pop)}
                  className="text-[11px] px-2 py-1 rounded bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer border border-white/5"
                >
                  {pop}
                </button>
              ))}
            </div>

            <button
              onClick={handleRandomSearch}
              type="button"
              className="mt-3 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gold/10 hover:bg-gold/15 text-gold text-xs font-semibold border border-gold/20 transition-all cursor-pointer max-w-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
              {t.random[language]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
