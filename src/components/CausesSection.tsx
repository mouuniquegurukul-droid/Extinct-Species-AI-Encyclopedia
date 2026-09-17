import React, { useState } from 'react';
import { AlertTriangle, Sparkles, BookOpen, Heart, HelpCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import { Language } from '../types';

interface CausesSectionProps {
  language: Language;
}

interface ExtinctionCause {
  id: string;
  title: { en: string; hi: string; bn: string };
  icon: string;
  shortDesc: { en: string; hi: string; bn: string };
  fullDetails: { en: string; hi: string; bn: string };
  historicalVictim: {
    name: string;
    details: { en: string; hi: string; bn: string };
  };
}

const EXTINCTION_CAUSES: ExtinctionCause[] = [
  {
    id: "asteroid",
    title: { en: "Asteroid Impact", hi: "उल्कापिंड प्रभाव", bn: "মহাজাগতিক গ্রহাণু" },
    icon: "☄️",
    shortDesc: {
      en: "Colossal cosmic collisions causing instant firestorms, acid rain, and prolonged nuclear winters.",
      hi: "भारी अंतरिक्षीय टक्कर जिससे आग के तूफान, अम्लीय वर्षा और परमाणु सर्दियों जैसी स्थिति पैदा हुई।",
      bn: "মহাজাগতিক গ্রহাণুর আঘাতে তৈরি হয় তীব্র অগ্নিকাণ্ড, এসিড বৃষ্টি এবং কোটি বছরের সূর্যহীন পরিবেশ।"
    },
    fullDetails: {
      en: "66 million years ago, a 10km wide asteroid struck Chicxulub, Mexico, creating dust clouds that blocked sunlight for years, stopping photosynthesis.",
      hi: "6.6 करोड़ वर्ष पहले, मेक्सिको के चिक्सुलब में एक 10 किमी चौड़ा उल्कापिंड टकराया, जिससे बने धूल के बादलों ने सालों तक सूर्य के प्रकाश को रोका।",
      bn: "৬.৬ কোটি বছর পূর্বে মেক্সিকোর চিক্সুলুবে একটি ১০ কিমি চওড়া গ্রহাণু আঘাত হানে। এর ফলে সৃষ্ট ধুলাবালি বছরের পর বছর সূর্যের আলো আটকে রেখেছিল।"
    },
    historicalVictim: {
      name: "Tyrannosaurus Rex & Triceratops",
      details: {
        en: "Wiped out 75% of all species, ending the Mesozoic Era of dinosaurs.",
        hi: "75% प्रजातियों का सफाया हो गया, जिससे डायनासोर का युग समाप्त हो गया।",
        bn: "পৃথিবীর ৭৫% প্রজাতি চিরতরে বিলুপ্ত হয়ে যায় এবং ডাইনোসর যুগের অবসান ঘটে।"
      }
    }
  },
  {
    id: "hunting",
    title: { en: "Human Overhunting", hi: "अत्यधिक शिकार", bn: "অতিরিক্ত শিকার" },
    icon: "🏹",
    shortDesc: {
      en: "Ruthless slaughter by human settlers, explorers, and colonial fur traders.",
      hi: "मानव बस्तियों, खोजकर्ताओं और औपनिवेशिक शिकारियों द्वारा अंधाधुंध शिकार।",
      bn: "মানুষের সীমাহীন লোভ, শিকার এবং বাণিজ্যিক চামড়া ও মাংসের জন্য অতিরিক্ত পশু হত্যা।"
    },
    fullDetails: {
      en: "As humans colonized isolated islands, species with no natural fear of humans were hunted to extinction in mere decades.",
      hi: "जैसे-जैसे मनुष्यों ने अलग-थलग द्वीपों पर बस्तियां बसाईं, इंसानों से न डरने वाले जीवों का कुछ ही दशकों में पूरी तरह शिकार कर लिया गया।",
      bn: "মানুষ যখন দ্বীপগুলোতে পা রাখে, তখন মানুষের প্রতি কোনো ভয় না থাকা সরল প্রাণীদের কয়েক দশকের মধ্যে শিকার করে শেষ করে ফেলা হয়।"
    },
    historicalVictim: {
      name: "Dodo Bird & Passenger Pigeon",
      details: {
        en: "Dodo in Mauritius and billions of Passenger Pigeons in North America were wiped out.",
        hi: "मॉरीशस में डोडो और उत्तरी अमेरिका में अरबों पैसेंजर कबूतरों का शिकार कर अंत कर दिया गया।",
        bn: "মরিশাসের ডোডো পাখি এবং উত্তর আমেরিকার শত কোটি প্যাসেঞ্জার পিজিয়ন শিকারের ফলে বিলুপ্ত হয়।"
      }
    }
  },
  {
    id: "habitat",
    title: { en: "Habitat Destruction", hi: "आवास का नुकसान", bn: "বাসস্থান ধ্বংস" },
    icon: "🚜",
    shortDesc: {
      en: "Clearing forests for agriculture, urbanization, and timber industries.",
      hi: "कृषि, शहरीकरण और लकड़ी उद्योगों के लिए जंगलों का विनाश।",
      bn: "কৃষিকাজ, শিল্পায়ন এবং নগরায়নের জন্য বনভূমি উজাড় ও প্রাকৃতিক জলাশয় ভরাট করা।"
    },
    fullDetails: {
      en: "Habitat fragmentation cuts breeding populations into small, isolated pockets, inducing genetic inbreeding and rapid collapse.",
      hi: "आवास विखंडन प्रजनन आबादी को छोटे, अलग-थलग हिस्सों में विभाजित करता है, जिससे अनुवांशिक विकार और तेजी से पतन होता है।",
      bn: "প্রাকৃতিক আবাসস্থল ধ্বংস হওয়ার ফলে প্রজনন বাধাগ্রস্ত হয় এবং প্রাণীরা ছোট ছোট দলে ভাগ হয়ে একপর্যায়ে হারিয়ে যায়।"
    },
    historicalVictim: {
      name: "Tasmanian Tiger & Baiji Dolphin",
      details: {
        en: "Encroached by livestock farming and industrial shipping in the Yangtze River.",
        hi: "यांग्त्ज़ी नदी में औद्योगिक नौवहन और ऑस्ट्रेलिया में भेड़ पालन के कारण विलुप्त।",
        bn: "ইয়াংসি নদীতে শিল্প বর্জ্য ও নৌযান চলাচল এবং অস্ট্রেলিয়ায় ভেড়া চাষের আগ্রাসনে হারিয়ে যায়।"
      }
    }
  },
  {
    id: "climate",
    title: { en: "Climate Shifts", hi: "जलवायु परिवर्तन", bn: "জলবায়ুর পরিবর্তন" },
    icon: "🌡️",
    shortDesc: {
      en: "Rapid warming or cooling cycles that surpass species adaptability.",
      hi: "तीव्र तापमान वृद्धि या हिमयुग चक्र जो प्रजातियों की अनुकूलन क्षमता से अधिक होते हैं।",
      bn: "আকস্মিক বৈশ্বিক তাপমাত্রা বৃদ্ধি বা হ্রাস যা প্রাণীদের সহ্যক্ষমতার বাইরে চলে যায়।"
    },
    fullDetails: {
      en: "As the planet warms at the end of ice ages, specialized megafauna unable to shed heat or migrate disappear.",
      hi: "हिमयुग की समाप्ति पर जैसे ही तापमान बढ़ा, गर्मी न सह पाने वाले और पलायन न कर पाने वाले विशाल जीव गायब हो गए।",
      bn: "তুষার যুগের অবসানে পৃথিবী হঠাৎ উষ্ণ হতে শুরু করলে অতিমাত্রায় মানিয়ে নেওয়া লোমশ প্রাণীরা তাপমাত্রা পরিবর্তন সহ্য করতে না পেরে বিলুপ্ত হয়।"
    },
    historicalVictim: {
      name: "Woolly Mammoth",
      details: {
        en: "Warming temperatures shrank their grasslands tundra habitat.",
        hi: "बढ़ते तापमान ने उनके घास के मैदान वाले टुंड्रा आवास को सिकोड़ दिया।",
        bn: "উষ্ণ আবহাওয়ার কারণে ম্যামথদের প্রধান চারণভূমি তুন্দ্রা অঞ্চল সংকুचित হয়ে পড়ে।"
      }
    }
  }
];

const CONSERVATION_TIPS = [
  {
    title: { en: "Protect Natural Habitats", hi: "प्राकृतिक आवासों की रक्षा करें", bn: "প্রাকৃতিক আবাসস্থল রক্ষা" },
    desc: {
      en: "Support national parks and wildlife sanctuaries. Refuse products sourced from illegal deforestation or rainforest clearance.",
      hi: "राष्ट्रीय उद्यानों और वन्यजीव अभयारण्यों का समर्थन करें। अवैध वनों की कटाई से बने उत्पादों का बहिष्कार करें।",
      bn: "জাতীয় উদ্যান ও বন্যপ্রাণী অভয়ারণ্য রক্ষা করুন। বনভূমি ধ্বংস করে তৈরি করা কাঠ ও কাগজের পণ্য বর্জন করুন।"
    }
  },
  {
    title: { en: "Prevent Wildlife Trade", hi: "अवैध वन्यजीव व्यापार रोकें", bn: "বন্যপ্রাণী পাচার রোধ" },
    desc: {
      en: "Never purchase fashion items made of ivory, tortoise shells, reptile skins, or rare feathers.",
      hi: "हाथी दांत, कछुए के खोल, रेंगने वाले जीवों की खाल या दुर्लभ पंखों से बनी फैशन वस्तुएं कभी न खरीदें।",
      bn: "হাতির দাঁত, কচ্ছপের খোসা, সাপ বা কুমিরের চামড়া এবং বিরল পাখির পালক দিয়ে তৈরি বিলাসবহুল জিনিস কেনা বন্ধ করুন।"
    }
  },
  {
    title: { en: "Combat Climate Change", hi: "जलवायु परिवर्तन का मुकाबला करें", bn: "জলবায়ু সংকট মোকাবেলা" },
    desc: {
      en: "Reduce your carbon footprint. Pivot to solar energy, ride bicycles, and plant native trees to enrich bird life.",
      hi: "कार्बन उत्सर्जन कम करें। सौर ऊर्जा का उपयोग करें, साइकिल चलाएं और पक्षियों के लिए स्थानीय पेड़ लगाएं।",
      bn: "কার্বন নিঃসরণ হ্রাস করুন। নবায়নযোগ্য শক্তি ব্যবহার করুন এবং স্থানীয় গাছ লাগিয়ে জীববৈচিত্র্য ফিরিয়ে আনুন।"
    }
  }
];

export default function CausesSection({ language }: CausesSectionProps) {
  const [activeCause, setActiveCause] = useState<ExtinctionCause>(EXTINCTION_CAUSES[1]); // default to human hunting

  return (
    <div className="space-y-12 animate-fade-in">
      
      {/* SECTION 1: Infographics Grid of Extinction Causes */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-gold animate-bounce" />
            {language === 'hi' ? 'पर्यावरणीय संकट सूचकांक' : language === 'bn' ? 'পরিবেশগত সংকট সূচক' : 'Ecological Threat Index'}
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
            {language === 'hi' ? 'जीवों के विलुप्त होने के मुख्य कारण' : language === 'bn' ? 'প্রাণী বিলুপ্তির প্রধান কারণসমূহ' : 'The Drivers of Extinction'}
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            {language === 'hi'
              ? 'ब्रह्मांडीय आपदाओं से लेकर मानवीय हस्तक्षेप तक, उन कारकों का अन्वेषण करें जिन्होंने पृथ्वी पर जीवन का ढांचा बदल दिया।'
              : language === 'bn'
              ? 'মহাজাগতিক গ্রহাণুর আঘাত থেকে শুরু করে আধুনিক মানুষের নির্মম শিকার—কীভাবে চিরতরে হারিয়ে গেল এই প্রজাতিগুলো?'
              : 'From prehistoric cosmic catastrophes to modern anthropogenic impacts, explore the catastrophic forces that altered the tree of life.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Grid: Clickable Cause blocks */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EXTINCTION_CAUSES.map((cause) => {
              const isSelected = activeCause.id === cause.id;
              return (
                <button
                  key={cause.id}
                  onClick={() => setActiveCause(cause)}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer space-y-3 relative overflow-hidden h-40 flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-gradient-to-br from-[#0e3527] to-[#061811] border-gold text-white shadow-xl scale-[1.02]' 
                      : 'bg-[#0d271e]/40 border-white/5 text-gray-400 hover:border-white/10 hover:bg-white/5 hover:text-gray-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-2xl mb-1">{cause.icon}</div>
                    <h4 className="text-base font-extrabold font-display text-white">
                      {cause.title[language]}
                    </h4>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-2">
                    {cause.shortDesc[language]}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Panel: Selected Cause deep-dive info */}
          <div className="lg:col-span-6 glass-panel rounded-2xl border border-white/10 p-6 bg-gradient-to-b from-[#0b271d] to-[#05140f] shadow-2xl space-y-5">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-gold">
                Crisis Deep-Dive
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display flex items-center gap-2">
                <span>{activeCause.icon}</span>
                <span>{activeCause.title[language]}</span>
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
              <p>{activeCause.fullDetails[language]}</p>

              {/* Historical Case study */}
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 space-y-2">
                <span className="text-[9px] font-bold font-mono uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                  <span>{language === 'hi' ? 'ऐतिहासिक उदाहरण:' : language === 'bn' ? 'ঐতিহাসিক উদাহরণ:' : 'Historical Case Study:'}</span>
                </span>
                <h5 className="text-xs sm:text-sm font-bold text-white font-display">
                  {activeCause.historicalVictim.name}
                </h5>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {activeCause.historicalVictim.details[language]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Modern Conservation & Protection Guides */}
      <div className="border-t border-white/5 pt-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl font-bold text-white font-display">
            {language === 'hi' ? 'भविष्य को बचाना: आधुनिक संरक्षण' : language === 'bn' ? 'ভবিষ্যৎ বাঁচানো: আধুনিক বন্যপ্রাণী সংরক্ষণ' : 'Preserving the Future: Conservation'}
          </h3>
          <p className="text-gray-400 text-sm">
            {language === 'hi'
              ? 'इतिहास हमें चेतावनी देता है। आज पृथ्वी की हजारों अन्य अनमोल प्रजातियों को बचाने के लिए हम सब मिलकर प्रयास कर सकते हैं।'
              : language === 'bn'
              ? 'ইতিহাস আমাদের শিক্ষা দেয়। আসুন আজ ধ্বংসের মুখে দাঁড়িয়ে থাকা হাজারো বিপন্ন প্রাণীকে বাঁচাতে আমরা সচেতন হই।'
              : 'History serves as a solemn warning. Discover actionable pathways to protect endangered species and rich ecosystems before they fade into history.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {CONSERVATION_TIPS.map((tip, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold font-mono">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-white font-display">
                  {tip.title[language]}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {tip.desc[language]}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-3 border-t border-white/5 flex justify-end">
                <a 
                  href="https://www.iucn.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-gold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>IUCN Red List</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Global Organizations donation/volunteer highlights card */}
        <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-[#0b271d]/60 border border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white font-display flex items-center justify-center sm:justify-start gap-2">
              <Heart className="w-5 h-5 text-red-400 animate-pulse" />
              <span>{language === 'hi' ? 'आज ही योगदान दें' : language === 'bn' ? 'আজই অবদান রাখুন' : 'Act Now for Wildlife'}</span>
            </h4>
            <p className="text-xs text-gray-300 max-w-xl">
              {language === 'hi'
                ? 'डब्ल्यूडब्ल्यूएफ (WWF), ग्रीनपीस जैसी वैश्विक संरक्षण संस्थाओं से जुड़ें या संकटग्रस्त जीवों की सुरक्षा के लिए दान दें।'
                : language === 'bn'
                ? 'ডব্লিউডব্লিউএফ (WWF) বা আইইউসিএন (IUCN) এর মতো বিশ্বমানের সংরক্ষণাগার সংস্থাগুলোকে অনুদান দিয়ে বিপন্ন প্রাণী বাঁচাতে এগিয়ে আসুন।'
                : 'Directly support global champions like the World Wildlife Fund (WWF), the IUCN, and local conservation initiatives safeguarding our rich biodiversity.'}
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <a
              href="https://www.worldwildlife.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold text-forest bg-gold rounded-xl hover:bg-gold/90 transition-all cursor-pointer shadow-md uppercase tracking-wider"
            >
              WWF Org
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
