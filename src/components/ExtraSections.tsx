import React, { useState } from 'react';
import { Layers, Clock, BookOpen, HelpCircle, Mail, Sparkles, Send, CheckCircle } from 'lucide-react';
import { Language } from '../types';

interface ExtraSectionsProps {
  language: Language;
  onSearchAnimal: (name: string) => void;
  activeSection: 'categories' | 'timeline' | 'about' | 'faq' | 'contact';
}

const CATEGORIES = [
  {
    title: { en: "Dinosaur Era", hi: "डायनासोर युग", bn: "ডাইনোসর যুগ" },
    desc: { en: "Magnificent reptiles that ruled the Earth during the Mesozoic Era.", hi: "मेसोज़ोइक युग के विशालकाय सरीसृप जो पृथ्वी पर राज करते थे।", bn: "মেসোজোয়িক যুগের রাজকীয় সরীসৃপ যারা পৃথিবী শাসন করেছিল।" },
    epoch: "Late Cretaceous (~66 Ma)",
    species: ["Tyrannosaurus Rex", "Triceratops", "Velociraptor", "Megalodon"]
  },
  {
    title: { en: "Ice Age Megafauna", hi: "हिमयुग के विशालकाय जीव", bn: "তুষার যুগের স্তন্যপায়ী" },
    desc: { en: "Mammals adapted to freezing climates during the Pleistocene epoch.", hi: "प्लीस्टोसिन युग के दौरान कड़ाके की ठंड के अनुकूल ढले विशाल स्तनधारी जीव।", bn: "প্লাইস্টোসিন যুগের চরম ঠাণ্ডায় বেঁচে থাকা বিশাল স্তন্যপায়ী প্রাণী।" },
    epoch: "Pleistocene (~10,000 years ago)",
    species: ["Woolly Mammoth", "Saber-Toothed Tiger", "Woolly Rhinoceros", "Irish Elk"]
  },
  {
    title: { en: "Modern Era Loss", hi: "आधुनिक युग का नुकसान", bn: "আধুনিক যুগের বিলুপ্তি" },
    desc: { en: "Species driven to extinction recently due to direct human interference.", hi: "मानवीय हस्तक्षेप और अत्यधिक शिकार के कारण हाल ही में विलुप्त हुई प्रजातियां।", bn: "মানুষের শিকার ও বাসস্থান ধ্বংসের ফলে অতি সম্প্রতি বিলুপ্ত হওয়া প্রাণী।" },
    epoch: "17th - 21st Century",
    species: ["Dodo", "Tasmanian Tiger", "Quagga", "Passenger Pigeon", "Great Auk", "Baiji Dolphin"]
  }
];

const HISTORIC_TIMELINE = [
  { year: "66 Million BC", name: "Tyrannosaurus Rex", event: "Chicxulub Asteroid Impact", desc: "A massive asteroid collision wipes out 75% of all species on Earth, ending the Mesozoic Era." },
  { year: "7,700 BC", name: "Irish Elk", event: "Climate & Hunt Pressures", desc: "The giant-antlered deer vanishes from mainland Europe due to rapidly changing post-glacial forest densities." },
  { year: "2,000 BC", name: "Woolly Mammoth", event: "Isolation in Wrangel Island", desc: "The last surviving isolated pocket of mammoths goes extinct on Wrangel Island, likely due to genetic inbreeding." },
  { year: "1662 AD", name: "Dodo", event: "The Flightless bird of Mauritius", desc: "Last reliable sighting. Introduced species (rats, pigs) and sailor hunting wiped out this unique flightless species." },
  { year: "1768 AD", name: "Steller's Sea Cow", event: "North Pacific Exploitation", desc: "Hunted to extinction by fur traders only 27 years after being discovered by European scientists." },
  { year: "1883 AD", name: "Quagga", event: "Amsterdam Zoo Extinction", desc: "The last living quagga (a unique zebra sub-species) dies in captivity, marking total extinction." },
  { year: "1914 AD", name: "Passenger Pigeon", event: "Death of Martha", desc: "Martha, the last passenger pigeon, dies in Cincinnati Zoo. Once numbering in billions, they were hunted relentlessly." },
  { year: "1936 AD", name: "Tasmanian Tiger (Thylacine)", event: "The Last Thylacine", desc: "The last confirmed Tasmanian Tiger dies in Hobart Zoo, Australia, ending the marsupial predator lineage." },
  { year: "2006 AD", name: "Baiji Dolphin", event: "Yangtze River Tragedy", desc: "A scientific expedition fails to find a single Baiji dolphin, declaring it functionally extinct due to industrial pollution." }
];

const FAQS = [
  {
    q: { en: "What is the primary cause of modern animal extinction?", hi: "आधुनिक जीव विलुप्ति का मुख्य कारण क्या है?", bn: "আধুনিক প্রাণী বিলুপ্তির প্রধান কারণ কী?" },
    a: { en: "While prehistoric extinctions were caused by natural disasters like asteroids or ice ages, modern extinctions are almost entirely driven by human activities, including habitat destruction, deforestation, overhunting, industrial pollution, and climate change.", hi: "प्रागैतिहासिक काल की विलुप्ति प्राकृतिक आपदाओं जैसे उल्कापिंड या हिमयुग से हुई थी, परंतु आधुनिक काल की विलुप्ति पूरी तरह से मानवीय गतिविधियों जैसे वनों की कटाई, अंधाधुंध शिकार, प्रदूषण और जलवायु परिवर्तन के कारण हो रही है।", bn: "প্রাগৈতিহাসিক বিলুপ্তিগুলো গ্রহাণুর আঘাত বা বরফ যুগের মতো প্রাকৃতিক কারণে হলেও, আধুনিক বিলুপ্তির প্রধান কারণ মানুষের কার্যকলাপ—যেমন বনভূমি ধ্বংস, অতিরিক্ত শিকার, শিল্প দূষণ এবং বৈশ্বিক জলবায়ু পরিবর্তন।" }
  },
  {
    q: { en: "Can we clone or resurrect extinct species?", hi: "क्या हम विलुप्त जीवों को वापस क्लोन कर सकते हैं?", bn: "আমরা কি বিলুপ্ত প্রাণীদের পুনরায় ক্লোন করতে পারি?" },
    a: { en: "De-extinction science (using fossil DNA) is actively being researched for species like the Mammoth or Tasmanian Tiger. While we can reconstruct parts of their genome, ethical and environmental questions remain about where these resurrected species would live.", hi: "मैमथ या तस्मानियाई टाइगर जैसे जीवों के लिए जीवाश्म डीएनए का उपयोग करके डी-एक्सटिंक्शन विज्ञान पर शोध चल रहा है। हालाँकि हम उनके जीनोम के कुछ हिस्सों का पुनर्निर्माण कर सकते हैं, पर उनके रहने के स्थान को लेकर नैतिक और पर्यावरणीय प्रश्न बने हुए हैं।", bn: "ম্যামথ বা তাসমানিয়ান টাইগারের মতো প্রাণীদের জীবাশ্ম ডিএনএ ব্যবহার করে 'ডি-বিলুপ্তি' বা পুনরায় ফিরিয়ে আনার বিজ্ঞান নিয়ে গবেষণা চলছে। তবে তাদের বসবাসের পরিবেশ এবং নৈতিকতা নিয়ে এখনো অনেক বিতর্ক রয়েছে।" }
  },
  {
    q: { en: "Why should we study animals that are already gone?", hi: "हमें पहले से विलुप्त हो चुके जीवों का अध्ययन क्यों करना चाहिए?", bn: "যেসব প্রাণী ইতিমধ্যেই হারিয়ে গেছে তাদের নিয়ে পড়াশোনা করা কেন প্রয়োজন?" },
    a: { en: "Studying extinct species helps us understand the vulnerability of current ecosystems. It reveals ecological tipping points and provides powerful warning signs and conservation lessons to protect critically endangered species today.", hi: "विलुप्त प्रजातियों का अध्ययन हमें वर्तमान पारिस्थितिकी तंत्र की संवेदनशीलता को समझने में मदद करता है। यह हमें पारिस्थितिक संतुलन और वर्तमान समय में संकटग्रस्त प्रजातियों को बचाने के लिए सीख प्रदान करता है।", bn: "বিলুপ্ত প্রজাতিগুলো নিয়ে আলোচনা আমাদের বর্তমান বাস্তুতন্ত্রের ভঙ্গুরতা বুঝতে সাহায্য করে। এটি আমাদের পরিবেশের ভারসাম্য এবং আজকের বিপন্ন প্রাণীদের রক্ষা করার জন্য গুরুত্বপূর্ণ শিক্ষা দেয়।" }
  }
];

export default function ExtraSections({ language, onSearchAnimal, activeSection }: ExtraSectionsProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [species, setSpecies] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && message) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setMessage('');
        setSpecies('');
        setSubmitted(false);
      }, 4000);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 animate-fade-in font-sans">
      
      {/* 1. CATEGORIES VIEW */}
      {activeSection === 'categories' && (
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Layers className="w-10 h-10 text-gold mx-auto mb-3 animate-pulse" />
            <h2 className="text-3xl font-extrabold text-white font-display">
              {language === 'hi' ? 'श्रेणियों के अनुसार खोजें' : language === 'bn' ? 'বিভাগ অনুযায়ী অন্বেষণ' : 'Explore by Categories'}
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              {language === 'hi' ? 'पृथ्वी के इतिहास के महत्वपूर्ण युगों और पारिस्थितिक अध्यायों को नेविगेट करें।' : language === 'bn' ? 'পৃথিবীর ইতিহাসের গুরুত্বপূর্ণ যুগ এবং বাস্তুতন্ত্রের অধ্যায়গুলো দেখুন।' : 'Navigate through pivotal epochs of Earth\'s history and discover lost fauna.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-gold px-2 py-0.5 rounded bg-white/5 border border-white/5 inline-block mb-3">
                    {cat.epoch}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {cat.title[language]}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {cat.desc[language]}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-3">
                    {language === 'hi' ? 'प्रजातियों का अन्वेषण करें:' : language === 'bn' ? 'প্রজাতি অনুসন্ধান করুন:' : 'Explore Species:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.species.map((sp, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => onSearchAnimal(sp)}
                        className="text-xs px-2.5 py-1.5 rounded bg-emerald-950/40 border border-gold/15 hover:border-gold/50 text-gold font-medium transition-all cursor-pointer"
                      >
                        {sp}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. TIMELINE VIEW */}
      {activeSection === 'timeline' && (
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Clock className="w-10 h-10 text-gold mx-auto mb-3 animate-spin-slow" />
            <h2 className="text-3xl font-extrabold text-white font-display">
              {language === 'hi' ? 'ऐतिहासिक विलुप्ति समयरेखा' : language === 'bn' ? 'ঐতিহাসিক বিলুপ্তি টাইমলাইন' : 'The Chronicle of Extinction'}
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              {language === 'hi' ? 'लाखों साल पुराने उल्कापिंडों से लेकर आधुनिक मानव युग के नुकसानों तक की कहानी।' : language === 'bn' ? 'লাখ লাখ বছর আগের গ্রহাণু আঘাত থেকে শুরু করে আধুনিক মানুষের যুগের বিলুপ্তির বিবরণ।' : 'A linear geological countdown of species lost over deep time.'}
            </p>
          </div>

          <div className="relative border-l border-white/10 max-w-4xl mx-auto pl-6 sm:pl-10 space-y-12">
            {HISTORIC_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline circle dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 border-gold bg-forest group-hover:bg-gold transition-colors z-15" />
                
                <div className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-white/15 transition-all">
                  <span className="text-xs font-bold text-gold font-mono uppercase tracking-widest block mb-1">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {item.name}
                  </h3>
                  <span className="text-xs font-semibold text-emerald-400 block mb-3 uppercase tracking-wider">
                    {item.event}
                  </span>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. ABOUT VIEW */}
      {activeSection === 'about' && (
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <BookOpen className="w-10 h-10 text-gold mx-auto mb-3" />
            <h2 className="text-3xl font-extrabold text-white font-display">
              {language === 'hi' ? 'हमारे बारे में' : language === 'bn' ? 'আমাদের সম্পর্কে' : 'About the Archive'}
            </h2>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              {language === 'hi' 
                ? 'विलुप्त जीव विश्वकोश पृथ्वी पर जीवन के खोए हुए इतिहास को संरक्षित करने के लिए समर्पित एक डिजिटल संग्रहालय है। हम विश्वसनीय वैज्ञानिक डेटा को आधुनिक कृत्रिम बुद्धिमत्ता के साथ जोड़कर एक शानदार और शैक्षिक अनुभव प्रदान करते हैं।'
                : language === 'bn'
                ? 'বিলুপ্ত প্রাণী বিশ্বকোষ হলো একটি ডিজিটাল জাদুঘর যা পৃথিবীতে একদা বসবাসকারী বিলুপ্ত প্রাণীদের স্মৃতি এবং ইতিহাস সংরক্ষণের জন্য তৈরি। বিজ্ঞানসম্মত তথ্য এবং আধুনিক কৃত্রিম বুদ্ধিমত্তা ব্যবহার করে আমরা এই আর্কাইভ গড়ে তুলেছি।'
                : 'The Extinct Animals Encyclopedia is a premium digital museum archive dedicated to chronicling Earth\'s lost biodiversity. By combining authentic curated taxonomy with cutting-edge server-side AI, we resurrect historical records for students, researchers, and nature enthusiasts.'}
            </p>

            <div className="p-5 rounded-xl bg-gold/5 border border-gold/15 space-y-3">
              <h4 className="font-bold text-white uppercase text-xs tracking-wider font-mono">
                {language === 'hi' ? 'डेटा स्रोत और एकीकरण:' : language === 'bn' ? 'তথ্য উৎস ও সংযোগসমূহ:' : 'Integrated Scientific Data Sources:'}
              </h4>
              <ul className="space-y-2 text-xs text-gray-400 list-disc pl-4 font-mono">
                <li>Wikipedia API - For broad article summaries, discoveries and historical sighting notes.</li>
                <li>Wikimedia Commons API - For high-fidelity historical illustrations, taxidermy photos, and skeletal reconstructions.</li>
                <li>Wikidata API - For deep queryable taxonomic structures and evolutionary lineage matches.</li>
                <li>Gemini 3.5 Flash Model - For schema extraction, fuzzy lookup correction, and translation in English, Hindi, and Bengali.</li>
              </ul>
            </div>

            <p>
              {language === 'hi'
                ? 'हमारा उद्देश्य केवल इतिहास सिखाना नहीं है, बल्कि पारिस्थितिक संतुलन के प्रति लोगों को सचेत करना भी है। डोडो पक्षी और तस्मानियाई बाघ जैसे उदाहरण आज आधुनिक मानव को प्रकृति संरक्षण और जैव विविधता की सुरक्षा के लिए प्रेरित करते हैं।'
                : language === 'bn'
                ? 'আমাদের উদ্দেশ্য কেবল হারিয়ে যাওয়া প্রাণীদের ইতিহাস শেখানো নয়, বরং বর্তমান বিশ্বের জীববৈচিত্র্য রক্ষার জন্য সচেতনতা তৈরি করা। ডোডো পাখি বা তাসমানিয়ান বাঘের করুণ বিলুপ্তি আজ আমাদের পরিবেশ সংরক্ষণের শিক্ষা দেয়।'
                : 'Our underlying mission is conservation through digital reflection. The tragic collapses of species like the Dodo or the Steller\'s Sea Cow provide urgent moral guidance for preserving vulnerable species facing extinction in the Anthropocene epoch today.'}
            </p>
          </div>
        </div>
      )}

      {/* 4. FAQ VIEW */}
      {activeSection === 'faq' && (
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <HelpCircle className="w-10 h-10 text-gold mx-auto mb-3" />
            <h2 className="text-3xl font-extrabold text-white font-display">
              {language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : language === 'bn' ? 'জিজ্ঞাসিত প্রশ্নোত্তর' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="glass-panel p-5 rounded-2xl border border-white/5 space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-start gap-2.5">
                  <span className="text-gold font-mono">Q{idx + 1}.</span>
                  <span>{faq.q[language]}</span>
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed pl-7">
                  {faq.a[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. CONTACT VIEW */}
      {activeSection === 'contact' && (
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <Mail className="w-10 h-10 text-gold mx-auto mb-3" />
            <h2 className="text-3xl font-extrabold text-white font-display">
              {language === 'hi' ? 'हमसे संपर्क करें' : language === 'bn' ? 'আমাদের সাথে যোগাযোগ' : 'Connect with the Curators'}
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              {language === 'hi' ? 'हमारे वैज्ञानिकों या संपादकों को अपनी प्रतिक्रिया या सुझाव भेजें।' : language === 'bn' ? 'আমাদের বিজ্ঞানী বা আর্কাইভ প্যানেলের কাছে আপনার মতামত পাঠান।' : 'Send feedback or suggest an extinct species to be cataloged by our AI paleontologist.'}
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative">
            {submitted ? (
              <div className="p-6 text-center space-y-3 animate-scale-up">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-xl font-bold text-white">
                  {language === 'hi' ? 'सफलतापूर्वक भेजा गया!' : language === 'bn' ? 'সফলভাবে পাঠানো হয়েছে!' : 'Feedback Received!'}
                </h3>
                <p className="text-sm text-gray-300">
                  {language === 'hi' ? 'अपनी मूल्यवान प्रतिक्रिया के लिए धन्यवाद। हमारी विज्ञान टीम जल्द ही आपसे संपर्क करेगी।' : language === 'bn' ? 'আপনার মূল্যবান মতামতের জন্য ধন্যবাদ। আমাদের আর্কাইভ দল শীঘ্রই যোগাযোগ করবে।' : 'Thank you for your valuable feedback. Our archival scientific team will review your submission shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    required
                    className="w-full px-4 py-2.5 rounded-lg text-white text-sm glass-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Species of Interest (Optional)
                  </label>
                  <input
                    type="text"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    placeholder="e.g. Quagga, Moa, Megalodon"
                    className="w-full px-4 py-2.5 rounded-lg text-white text-sm glass-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Message / Feedback
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={language === 'hi' ? 'अपने सुझाव यहां लिखें...' : language === 'bn' ? 'আপনার মতামত এখানে লিখুন...' : 'Write your suggestions or inquiries here...'}
                    required
                    className="w-full px-4 py-2.5 rounded-lg text-white text-sm glass-input"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold text-forest font-semibold py-3 px-4 rounded-lg text-sm transition-all hover:bg-gold/90 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {language === 'hi' ? 'संदेश भेजें' : language === 'bn' ? 'বার্তা পাঠান' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
