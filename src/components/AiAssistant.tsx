import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, HelpCircle, User, Loader2, Globe } from 'lucide-react';
import { Language } from '../types';

interface AiAssistantProps {
  language: Language;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const SUGGESTED_PROMPTS = [
  {
    en: "Why did the Dodo become extinct?",
    hi: "डोडो पक्षी विलुप्त क्यों हुआ?",
    bn: "ডোডো পাখি কেন বিলুপ্ত হয়েছিল?"
  },
  {
    en: "Show extinct animals from India.",
    hi: "भारत के विलुप्त जीवों के बारे में बताएं।",
    bn: "ভারতের বিলুপ্ত প্রাণীদের তালিকা দেখাও।"
  },
  {
    en: "Compare Mammoth and modern Elephant.",
    hi: "मैमथ और आधुनिक हाथी की तुलना करें।",
    bn: "ম্যামথ এবং আধুনিক হাতির তুলনা করো।"
  },
  {
    en: "What was the speed of Tyrannosaurus Rex?",
    hi: "टी-रेक्स डायनासोर की गति कितनी थी?",
    bn: "টি-রেক্স ডাইনোসর কত দ্রুত দৌড়াতে পারত?"
  }
];

export default function AiAssistant({ language }: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: language === 'hi' 
        ? "नमस्ते! मैं आपका एआई पुरातत्व वैज्ञानिक सहायक हूँ। मुझसे विलुप्त जीवों, जीवाश्मों और उनके इतिहास के बारे में कुछ भी पूछें।"
        : language === 'bn'
        ? "নমস্কার! আমি আপনার এআই জীবাশ্মবিদ সহকারী। বিলুপ্ত প্রাণী, ফসিল বা প্রাচীন পৃথিবীর ইতিহাস নিয়ে আমাকে যেকোনো প্রশ্ন করতে পারেন।"
        : "Welcome, explorer! I am your AI Paleontology Guide. Ask me anything about prehistoric titans, recent extinctions, fossil locations, or evolutionary comparisons."
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSend = async (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || loading) return;

    setInputVal('');
    const updatedMessages = [...messages, { role: 'user', text: trimmed } as Message];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      // Create conversation history structure for Gemini
      const history = updatedMessages.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        text: msg.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          language: language,
          history: history
        })
      });

      const data = await res.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.text }]);
      } else {
        throw new Error("Could not fetch chatbot response");
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: language === 'hi' 
          ? "क्षमा करें, नेटवर्क में समस्या आ रही है। कृपया पुनः प्रयास करें।"
          : language === 'bn'
          ? "দুঃখিত, সংযোগে ত্রুটি দেখা দিয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
          : "Apologies, I couldn't reach the paleontological database. Please verify your connection and try again."
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[580px] bg-gradient-to-b from-[#0b271d] to-[#05140f] shadow-2xl">
      
      {/* Bot Chat Header */}
      <div className="p-4 border-b border-white/5 bg-forest/80 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center relative">
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#05140f]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-display">
              {language === 'hi' ? 'एआई शोध सहायक' : language === 'bn' ? 'এআই গবেষণা সহকারী' : 'Interstellar Paleo AI'}
            </h3>
            <span className="text-[10px] text-gray-400 font-mono block">
              Powered by Gemini 3.5 Flash
            </span>
          </div>
        </div>

        {/* Current language badge indicator */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5 text-xs text-gold font-mono font-bold uppercase">
          <Globe className="w-3 h-3 text-gold" />
          <span>{language}</span>
        </div>
      </div>

      {/* Chat Messages Log Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => {
          const isAssistant = msg.role === 'assistant';
          return (
            <div 
              key={idx} 
              className={`flex gap-3 max-w-[85%] ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              {/* Profile/Bot icon */}
              <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border text-xs ${
                isAssistant 
                  ? 'bg-gold/10 border-gold/30 text-gold' 
                  : 'bg-emerald-950 border-emerald-500/30 text-white'
              }`}>
                {isAssistant ? <Sparkles className="w-4 h-4 text-gold" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Bubble text content */}
              <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                isAssistant 
                  ? 'bg-white/5 border border-white/5 text-gray-200' 
                  : 'bg-gradient-to-r from-emerald-950 to-emerald-900 border border-emerald-500/20 text-white shadow-md'
              }`}>
                {/* Parse newline characters for clean display formatting */}
                {msg.text.split('\n').map((line, lIdx) => (
                  <p key={lIdx} className={lIdx > 0 ? 'mt-1.5' : ''}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          );
        })}

        {/* Loading shimmer indicator */}
        {loading && (
          <div className="flex gap-3 mr-auto max-w-[80%] animate-pulse">
            <div className="w-8 h-8 rounded-full shrink-0 bg-white/5 border border-white/5 flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-gold animate-spin" />
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs text-gray-400 italic">
              Synthesizing response from fossil archives...
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Interactive preset click chips */}
      {messages.length === 1 && !loading && (
        <div className="p-4 border-t border-white/5 space-y-2">
          <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">
            Suggested prehistoric queries:
          </span>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt[language])}
                className="text-[11px] px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-gold/30 text-gray-300 hover:text-white transition-all cursor-pointer text-left font-medium"
              >
                {prompt[language]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat input box */}
      <div className="p-4 border-t border-white/5 bg-[#05140f] flex gap-3">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend(inputVal);
          }}
          placeholder={language === 'hi' ? 'सवाल पूछें...' : language === 'bn' ? 'প্রশ্ন জিজ্ঞাসা করুন...' : 'Ask about dodos, mammoths, dinosaurs...'}
          className="flex-1 px-4 py-2.5 rounded-xl text-white text-xs sm:text-sm glass-input"
          disabled={loading}
        />
        <button
          onClick={() => handleSend(inputVal)}
          disabled={loading || !inputVal.trim()}
          className="p-3 bg-gold text-forest rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:scale-100 shadow-md cursor-pointer flex items-center justify-center shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
