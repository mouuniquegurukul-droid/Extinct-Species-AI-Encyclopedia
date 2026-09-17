import React, { useState } from 'react';
import { Clock, Layers, Sparkles, ArrowRight, BookOpen, AlertTriangle } from 'lucide-react';
import { Language } from '../types';

interface TimelineSectionProps {
  language: Language;
  onSearchAnimal: (name: string) => void;
}

interface EraData {
  id: string;
  name: { en: string; hi: string; bn: string };
  period: string;
  summary: { en: string; hi: string; bn: string };
  fossilInsight: { en: string; hi: string; bn: string };
  matchingAnimals: {
    name: string;
    scientificName: string;
    desc: { en: string; hi: string; bn: string };
    image: string;
  }[];
}

const GEOLOGICAL_ERAS: EraData[] = [
  {
    id: "triassic",
    name: { en: "Triassic Era", hi: "ट्रायसिक युग", bn: "ট্রায়াসিক যুগ" },
    period: "~252 to 201 Million Years Ago",
    summary: {
      en: "The beginning of the dinosaurs. Earth was unified into one supercontinent, Pangaea. A massive volcanic extinction ended this period.",
      hi: "डायनासोर की शुरुआत का काल। सभी महाद्वीप एक विशाल सुपरकॉन्टिनेंट पंजिया में जुड़े थे। एक ज्वालामुखी विस्फोट से यह समाप्त हुआ।",
      bn: "ডাইনোসরদের উত্থানের যুগ। সমগ্র পৃথিবী প্যানজিয়া নামক এক একক সুপারমহাদেশে একত্রিত ছিল। এক বিধ্বংসী আগ্নেয়গিরির কারণে এর অবসান ঘটে।"
    },
    fossilInsight: {
      en: "Fossilized footprints and teeth discovered in dry basin sedimentary stones.",
      hi: "सूखे बेसिन के तलछटी पत्थरों में जीवाश्म पैरों के निशान और दांत पाए गए।",
      bn: "শুষ্ক অববাহিকার পাললিক পাথরে ডাইনোসরদের পায়ের ছাপ এবং দাঁতের জীবাশ্ম আবিষ্কৃত হয়েছে।"
    },
    matchingAnimals: [
      {
        name: "Coelophysis",
        scientificName: "Coelophysis bauri",
        desc: {
          en: "One of the earliest agile carnivorous dinosaurs that ran fast on hind legs.",
          hi: "शुरुआती चुस्त मांसाहारी डायनासोरों में से एक जो पिछले पैरों पर तेजी से दौड़ते थे।",
          bn: "অন্যতম প্রাথমিক এবং দ্রুতগামী মাংসাশী ডাইনোসর যা পিছনের পায়ে ভর দিয়ে দৌড়াতে পারত।"
        },
        image: "https://images.unsplash.com/photo-1547407139-3c921a66005c?q=80&w=400&auto=format&fit=crop"
      },
      {
        name: "Plateosaurus",
        scientificName: "Plateosaurus trossingensis",
        desc: {
          en: "A robust leaf-eating giant with a long neck, ancestor to the colossal sauropods.",
          hi: "लंबी गर्दन वाला एक बड़ा शाकाहारी जीव, जो बाद के भीमकाय सॉरोपोड्स का पूर्वज था।",
          bn: "লম্বা গলাযুক্ত একটি বিশাল তৃণভোজী প্রাণী, যা পরবর্তীকালের দানবীয় ডাইনোসরদের পূর্বপুরুষ।"
        },
        image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=400&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "jurassic",
    name: { en: "Jurassic Era", hi: "जुरासिक युग", bn: "জুরাসিক যুগ" },
    period: "~201 to 145 Million Years Ago",
    summary: {
      en: "The golden age of giant herbivore sauropods and armored dinosaurs. Warm tropical climates spanned the entire planet.",
      hi: "विशाल शाकाहारी सॉरोपोड्स और बख्तरबंद डायनासोरों का स्वर्ण युग। गर्म उष्णकटिबंधीय जलवायु पूरे ग्रह पर फैली थी।",
      bn: "বিশাল তৃণভোজী সওরোপড এবং আর্মার্ড ডাইনোসরদের সোনালী যুগ। সারা পৃথিবী জুড়ে তখন উষ্ম ক্রান্তীয় আবহাওয়া বিরাজ করত।"
    },
    fossilInsight: {
      en: "Perfect complete skeleton fossils in North American quarry deposits.",
      hi: "उत्तरी अमेरिकी खदान जमा में पाए गए पूर्ण कंकाल जीवाश्म।",
      bn: "উত্তর আমেরিকার খনিগুলোতে পাওয়া গেছে চমৎকার ও সম্পূর্ণ হাড়ের অবশিষ্টাংশ।"
    },
    matchingAnimals: [
      {
        name: "Stegosaurus",
        scientificName: "Stegosaurus stenops",
        desc: {
          en: "Known for the double row of leaf-like plates along its back and tail spikes.",
          hi: "अपनी पीठ पर दो कतारों में पत्ती जैसी प्लेटों और पूंछ के तीखे कांटों के लिए प्रसिद्ध।",
          bn: "পিঠ বরাবর পাতার মতো ডাবল সারির হাড়ের প্লেট এবং লেজের শক্তিশালী কাঁটার জন্য পরিচিত।"
        },
        image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=400&auto=format&fit=crop"
      },
      {
        name: "Brachiosaurus",
        scientificName: "Brachiosaurus altithorax",
        desc: {
          en: "A colossal plant-eater with extremely long front legs, enabling it to feed from high treetops.",
          hi: "बेहद लंबे सामने के पैरों वाला एक विशाल शाकाहारी जीव, जो ऊंचे पेड़ों की चोटियों से पत्तियां खाता था।",
          bn: "লম্বা সামনের পা এবং গলাযুক্ত দানবীয় তৃণভোজী প্রাণী যা গাছের মগডাল থেকে খাবার খেত।"
        },
        image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=400&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "cretaceous",
    name: { en: "Cretaceous Era", hi: "क्रेटेशियस युग", bn: "ক্রিটেশিয়াস যুগ" },
    period: "~145 to 66 Million Years Ago",
    summary: {
      en: "The apex of dinosaur evolution. Ended abruptly by the colossal Chicxulub asteroid impact in Mexico, wipeout of 75% of life.",
      hi: "डायनासोर के विकास की पराकाष्ठा। मेक्सिको में हुए भीषण चिक्लुब उल्कापिंड के प्रभाव से अचानक समाप्त हो गया, जिससे 75% जीवन नष्ट हो गया।",
      bn: "ডাইনোসর বিবর্তনের চূড়ান্ত শিখর। মেক্সিকোতে বিশাল চিক্সুলুব গ্রহাণু আছড়ে পড়ার ফলে হঠাৎ করেই ৭৫% জীবের বিলুপ্তি ঘটে।"
    },
    fossilInsight: {
      en: "Fossilized amber with trapped feather details, and iridium dust levels globally.",
      hi: "पंखों के विवरण वाले जीवाश्म एम्बर, और वैश्विक स्तर पर इरिडियम धूल की परतें।",
      bn: "পালকের অবশিষ্টাংশ সহ জীবাশ্ম অ্যাম্বার এবং বিশ্বজুড়ে ইরিডিয়াম মহাজাগতিক ধুলার স্তর।"
    },
    matchingAnimals: [
      {
        name: "Tyrannosaurus Rex",
        scientificName: "Tyrannosaurus rex",
        desc: {
          en: "The king of dinosaurs, equipped with a massive skull and an extremely powerful bite force.",
          hi: "डायनासोरों का राजा, एक विशाल खोपड़ी और अविश्वसनीय रूप से शक्तिशाली काटने की क्षमता से लैस।",
          bn: "ডাইনোসরদের রাজা, এক বিশাল করোটি এবং অবিশ্বাস্য কামড়ের শক্তি সম্পন্ন এক পরম শিকারী।"
        },
        image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=400&auto=format&fit=crop"
      },
      {
        name: "Triceratops",
        scientificName: "Triceratops horridus",
        desc: {
          en: "A heavy, three-horned herbivore with a large bony frill to defend against predators.",
          hi: "एक भारी, तीन सींगों वाला शाकाहारी जीव जिसके पास शिकारियों से बचने के लिए एक विशाल बोनी फ्रिल थी।",
          bn: "একটি ভারী, তিন শিংওয়ালা তৃণভোজী যার মাথায় শিকারীদের থেকে বাঁচার জন্য বড় হাড়ের ঢাল ছিল।"
        },
        image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=400&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "iceage",
    name: { en: "Ice Age (Pleistocene)", hi: "हिमयुग (प्लीस्टोसिन)", bn: "তুষার যুগ (প্লাইস্টোসিন)" },
    period: "~2.5 Million to 11,700 Years Ago",
    summary: {
      en: "Colossal cold-adapted mammals roamed the frozen tundra. Shifting glaciers and warming cycles caused mass megafauna extinctions.",
      hi: "कड़ाके की ठंड के अनुकूल ढले विशाल स्तनधारी जीव जमी हुई टुंड्रा पर घूमते थे। ग्लेशियरों के खिसकने और गर्म होने के चक्र से ये विलुप्त हुए।",
      bn: "চরম ঠাণ্ডা আবহাওয়ায় মানিয়ে নেওয়া বিশাল আকারের স্তন্যপায়ী প্রাণীরা তুন্দ্রা অঞ্চলে ঘুরে বেড়াত। বরফ গলে যাওয়া ও আবহাওয়ার পরিবর্তনে এরা বিলুপ্ত হয়।"
    },
    fossilInsight: {
      en: "Perfect mummified specimens preserved in Siberian permafrost and tar pits.",
      hi: "साइबेरियाई पर्माफ्रॉस्ट और कोलतार के कुओं में सुरक्षित रूप से संरक्षित ममीकृत जीवाश्म।",
      bn: "সাইবেরিয়ার জমে থাকা বরফ এবং আলকাতরার গর্তে সম্পূর্ণ সংরক্ষিত মমি করা অবশিষ্টাংশ।"
    },
    matchingAnimals: [
      {
        name: "Woolly Mammoth",
        scientificName: "Mammuthus primigenius",
        desc: {
          en: "Coated in dense shaggy hair with massive curved tusks to clear snow from plants.",
          hi: "मोटे घने बालों से ढका शरीर और बर्फ हटाने के लिए विशाल मुड़े हुए दांत।",
          bn: "ঘন লোমে ঢাকা শরীর এবং বরফ সরিয়ে ঘাস খাওয়ার জন্য বিশাল বাঁকানো দাঁত বিশিষ্ট ম্যামথ।"
        },
        image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=400&auto=format&fit=crop"
      },
      {
        name: "Saber-Toothed Tiger",
        scientificName: "Smilodon fatalis",
        desc: {
          en: "An apex pack hunter equipped with extremely long sword-like canine teeth.",
          hi: "हिमयुग का सबसे बड़ा मांसाहारी शिकारी जिसके पास लंबे तलवार जैसे नुकीले दांत थे।",
          bn: "তলোয়ারের মতো লম্বা হিংস্র দাঁত বিশিষ্ট তুষার যুগের প্রধান শিকারী স্তন্যপায়ী।"
        },
        image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=400&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "modern",
    name: { en: "Modern Extinctions (Anthropocene)", hi: "आधुनिक विलुप्ति (मानव निर्मित)", bn: "আধুনিক বিলুপ্তি (মানুষের যুগ)" },
    period: "Last 500 Years to Present",
    summary: {
      en: "Species driven to extinction directly or indirectly by human expansion, habitat destruction, deforestation, and overhunting.",
      hi: "मानवीय विस्तार, जंगलों की कटाई, अंधाधुंध शिकार और प्रदूषण के कारण विलुप्त हुई जीव प्रजातियां।",
      bn: "মানুষের জনসংখ্যা বৃদ্ধি, বনাঞ্চল নিধন, অতিরিক্ত শিকার এবং জলবায়ু পরিবর্তনের ফলে হারিয়ে যাওয়া অতি সাম্প্রতিক প্রজাতি।"
    },
    fossilInsight: {
      en: "Preserved taxidermy specimens in museums, historical paintings, and written logs.",
      hi: "संग्रहालयों में संरक्षित टैक्सिडर्मी नमूने, ऐतिहासिक पेंटिंग और लिखित दस्तावेज।",
      bn: "জাদুঘরে সংরক্ষিত স্টাফ করা মমি, প্রাচীন চিত্রকর্ম এবং মানুষের লিখিত প্রত্যক্ষদর্শী রেকর্ড।"
    },
    matchingAnimals: [
      {
        name: "Dodo",
        scientificName: "Raphus cucullatus",
        desc: {
          en: "A friendly, flightless island bird that nested on the ground, became extinct in less than a century of human contact.",
          hi: "जमीन पर घोंसला बनाने वाला एक सीधा-साधा, न उड़ने वाला पक्षी जो मनुष्यों के संपर्क में आने के सौ साल के भीतर विलुप्त हो गया।",
          bn: "মরিশাসের শান্ত ও উড়তে না পারা পাখি, মানুষের সংস্পর্শে আসার ১০০ বছরের মাথায় চিরতরে বিলুপ্ত হয়ে যায়।"
        },
        image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=400&auto=format&fit=crop"
      },
      {
        name: "Tasmanian Tiger",
        scientificName: "Thylacinus cynocephalus",
        desc: {
          en: "The largest carnivorous marsupial of modern times, hunted to extinction in Australia after false claims of livestock killing.",
          hi: "आधुनिक समय का सबसे बड़ा मार्सुपियल शिकारी, जिसे पशुधन को नुकसान पहुंचाने के झूठे आरोपों के चलते मार दिया गया।",
          bn: "আধুনিক কালের বৃহত্তম মাংসাশী থলেযুক্ত স্তন্যপায়ী, পশুপালনের ক্ষতির মিথ্যা অপবাদে ব্যাপক শিকারের ফলে বিলুপ্ত।"
        },
        image: "https://images.unsplash.com/photo-1547407139-3c921a66005c?q=80&w=400&auto=format&fit=crop"
      }
    ]
  }
];

export default function TimelineSection({ language, onSearchAnimal }: TimelineSectionProps) {
  const [selectedEra, setSelectedEra] = useState<EraData>(GEOLOGICAL_ERAS[4]); // default to Modern Era

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5 animate-spin-slow" />
          {language === 'hi' ? 'जियोलॉजिकल समयरेखा' : language === 'bn' ? 'ভূতাত্ত্বিক কালানুক্রম' : 'Geological Chronology'}
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
          {language === 'hi' ? 'पृथ्वी का इतिहास और महा-विलुप्ति' : language === 'bn' ? 'পৃথিবীর ইতিহাস ও মহা-বিলোপন' : 'Earth\'s Geological Countdown'}
        </h2>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          {language === 'hi'
            ? 'लाखों वर्षों के भूवैज्ञानिक समय के माध्यम से यात्रा करें। किसी युग का चयन करें और देखें कि उस समय कौन से राजसी जीव पृथ्वी पर घूमते थे।'
            : language === 'bn'
            ? 'কোটি কোটি বছরের ভূতাত্ত্বিক ইতিহাসের মধ্য দিয়ে ভ্রমণ করুন। একটি যুগ নির্বাচন করে দেখুন কোন কোন প্রাণী একদা রাজত্ব করত।'
            : 'Travel back in time across millions of years of Earth history. Select an epoch below to reveal its atmospheric climate, fossil insights, and lost species.'}
        </p>
      </div>

      {/* Horizontal Interactive Timeline Bar */}
      <div className="relative max-w-5xl mx-auto px-4 py-8">
        {/* Connector Line behind the steps */}
        <div className="absolute top-1/2 left-8 right-8 h-1 bg-white/5 -translate-y-1/2 z-0 hidden md:block" />

        {/* Horizontal Navigation Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-4">
          {GEOLOGICAL_ERAS.map((era) => {
            const isSelected = selectedEra.id === era.id;
            return (
              <button
                key={era.id}
                onClick={() => setSelectedEra(era)}
                className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between h-36 ${
                  isSelected 
                    ? 'bg-gradient-to-b from-[#0e3527] to-[#061811] border-gold text-white shadow-2xl scale-105' 
                    : 'bg-[#0d271e]/40 border-white/5 text-gray-400 hover:border-white/10 hover:bg-white/5 hover:text-gray-200'
                }`}
              >
                <div>
                  <Clock className={`w-5 h-5 mx-auto mb-2 ${isSelected ? 'text-gold' : 'text-gray-500'}`} />
                  <h4 className="text-sm font-extrabold font-display leading-tight">{era.name[language]}</h4>
                </div>
                <span className="text-[9px] font-mono tracking-wider opacity-80 block mt-2 text-gold font-medium uppercase">
                  {era.period.split(" Years")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Era Deep Dive Dashboard */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Era scientific summary card */}
        <div className="lg:col-span-5 glass-panel rounded-2xl border border-white/10 p-6 bg-gradient-to-b from-[#0b271d] to-[#05140f] space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-gold">
              Epoch Overview
            </span>
            <h3 className="text-2xl font-bold text-white font-display">
              {selectedEra.name[language]}
            </h3>
            <p className="text-[11px] font-mono text-gold italic">
              {selectedEra.period}
            </p>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed">
            {selectedEra.summary[language]}
          </p>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
            <h5 className="text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-gold" />
              <span>{language === 'hi' ? 'जीवाश्म विज्ञान अंतर्दृष्टि' : language === 'bn' ? 'জীবাশ্ম সংক্রান্ত তথ্য' : 'Paleontology Insight'}</span>
            </h5>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              {selectedEra.fossilInsight[language]}
            </p>
          </div>
        </div>

        {/* Era Species grid */}
        <div className="lg:col-span-7 space-y-4">
          <h4 className="text-xs font-bold text-gold uppercase tracking-wider font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            <span>{language === 'hi' ? 'इस युग की प्रजातियाँ' : language === 'bn' ? 'এই যুগের কিছু বিশেষ প্রজাতি' : 'Exhibits of this Era'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedEra.matchingAnimals.map((spec) => (
              <div
                key={spec.name}
                onClick={() => onSearchAnimal(spec.name)}
                className="glass-panel rounded-xl overflow-hidden border border-white/10 hover:border-gold/30 hover:bg-white/5 transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="aspect-video relative overflow-hidden bg-forest/40">
                    <img 
                      src={spec.image} 
                      alt={spec.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute top-2 left-2 bg-forest/80 border border-white/5 text-[9px] px-2 py-0.5 rounded text-gold font-bold">
                      {selectedEra.name[language]}
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-1.5">
                    <h5 className="text-base font-bold text-white group-hover:text-gold transition-colors font-display">
                      {spec.name}
                    </h5>
                    <span className="text-[11px] italic text-gray-400 block font-mono">
                      {spec.scientificName}
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                      {spec.desc[language]}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex justify-end">
                  <span className="text-[10px] font-bold text-gold flex items-center gap-1 group-hover:underline">
                    <span>View Exhibit</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
