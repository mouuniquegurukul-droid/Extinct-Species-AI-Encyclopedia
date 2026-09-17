import React, { useState } from 'react';
import { Award, RefreshCw, CheckCircle2, AlertCircle, Share2, Printer, Sparkles, HelpCircle } from 'lucide-react';
import { Language, UserSession } from '../types';

interface QuizSectionProps {
  language: Language;
  user: UserSession;
}

interface Question {
  id: number;
  question: { en: string; hi: string; bn: string };
  options: { en: string; hi: string; bn: string }[];
  correctAnswerIndex: number;
  fact: { en: string; hi: string; bn: string };
}

const QUIZ_QUESTIONS: Record<string, Question[]> = {
  novice: [
    {
      id: 1,
      question: {
        en: "In which modern country did the flightless Dodo bird live?",
        hi: "उड़ान न भर पाने वाला डोडो पक्षी किस आधुनिक देश में रहता था?",
        bn: "উড়তে না পারা বিখ্যাত ডোডো পাখি কোন দ্বীপে বাস করত?"
      },
      options: [
        { en: "Madagascar", hi: "मेडागास्कर", bn: "মাদাগাস্কার" },
        { en: "Mauritius", hi: "मॉरीशस", bn: "মরিশাস" },
        { en: "Australia", hi: "ऑस्ट्रेलिया", bn: "অস্ট্রেলিয়া" },
        { en: "New Zealand", hi: "न्यूजीलैंड", bn: "নিউজিল্যান্ড" }
      ],
      correctAnswerIndex: 1,
      fact: {
        en: "Dodos were completely endemic to the island nation of Mauritius, located in the Indian Ocean.",
        hi: "डोडो पूरी तरह से हिंद महासागर में स्थित मॉरीशस द्वीप राष्ट्र के स्थानीय जीव थे।",
        bn: "ডোডো পাখি শুধুমাত্র ভারত মহাসাগরের মরিশাস দ্বীপেই একচেটিয়াভাবে পাওয়া যেত।"
      }
    },
    {
      id: 2,
      question: {
        en: "Which of these giant mammals was heavily coated in dense hair to survive Ice Age cold?",
        hi: "इनमें से कौन सा विशाल स्तनधारी जीव हिमयुग की ठंड में बचने के लिए घने बालों से ढका था?",
        bn: "তুষার যুগের প্রচণ্ড ঠাণ্ডায় বেঁচে থাকার জন্য কোন স্তন্যপায়ীর শরীরে ঘন বড় লোম ছিল?"
      },
      options: [
        { en: "Saber-Toothed Tiger", hi: "कृपाण-दंत बाघ", bn: "তলোয়ার-দাঁত বাঘ" },
        { en: "Irish Elk", hi: "आयरिश एल्क", bn: "আইরিশ এল্ক" },
        { en: "Woolly Mammoth", hi: "लोमश मैमथ (Woolly Mammoth)", bn: "উলি ম্যামথ" },
        { en: "Cave Bear", hi: "गुफा भालू", bn: "গুহা ভাল্লুক" }
      ],
      correctAnswerIndex: 2,
      fact: {
        en: "Woolly Mammoths had long shaggy outer guard hairs and a dense, insulating undercoat.",
        hi: "लोमश मैमथ की बाहरी परत पर लंबे घने बाल और त्वचा के नीचे मोटी चर्बी की सुरक्षात्मक परत होती थी।",
        bn: "উলি ম্যামথদের শরীর বড় বড় লোম এবং চামড়ার নিচে চর্বির পুরু স্তর দিয়ে আবৃত থাকত।"
      }
    },
    {
      id: 3,
      question: {
        en: "What was the primary cause of extinction for the Passenger Pigeon in 1914?",
        hi: "1914 में पैसेंजर कबूतर के विलुप्त होने का मुख्य कारण क्या था?",
        bn: "১৯১৪ সালে বিখ্যাত প্যাসেঞ্জার পিজিয়ন বা বুনো পায়রার বিলুপ্তির মূল কারণ কী ছিল?"
      },
      options: [
        { en: "Meteorite strike", hi: "उल्कापिंड का गिरना", bn: "মহাজাগতিক উল্কাপাত" },
        { en: "Ruthless mass commercial hunting", hi: "अंधाधुंध सामूहिक व्यावसायिक शिकार", bn: "অতিরিক্ত ও বাণিজ্যিক উদ্দেশ্যে শিকার" },
        { en: "A mysterious bird flu pandemic", hi: "एक रहस्यमयी बर्ड फ्लू महामारी", bn: "রহস্যময় ভাইরাস মহামারী" },
        { en: "Extreme solar flares", hi: "अत्यधिक सौर ज्वालाएं", bn: "তীব্র সৌর ঝড়" }
      ],
      correctAnswerIndex: 1,
      fact: {
        en: "Once numbering in billions, they were relentlessly shot and sold for cheap meat until the species collapsed.",
        hi: "एक समय अरबों की संख्या में रहने वाले इन कबूतरों का सस्ते मांस के लिए अंधाधुंध शिकार किया गया।",
        bn: "একদা এই পাখিদের সংখ্যা শত কোটিতে থাকলেও মানুষ সস্তা মাংসের লোভে এদের নির্বিচারে শিকার করে শেষ করে ফেলে।"
      }
    }
  ],
  expert: [
    {
      id: 11,
      question: {
        en: "What catastrophic event wiped out the non-avian dinosaurs about 66 million years ago?",
        hi: "लगभग 6.6 करोड़ वर्ष पहले किस विनाशकारी घटना ने गैर-एवियन डायनासोरों का सफाया कर दिया?",
        bn: "আজ থেকে প্রায় ৬.৬ কোটি বছর পূর্বে কোন মহাপ্রলয়ে ডাইনোসরদের বিলুপ্তি ঘটেছিল?"
      },
      options: [
        { en: "Supervolcanic eruptions in India", hi: "भारत में महाज्वालामुखी विस्फोट", bn: "ভারতে সুপার-ভলকানিক অগ্নুৎপাত" },
        { en: "Chicxulub Asteroid Impact", hi: "चिक्सुलब उल्कापिंड प्रभाव (Chicxulub Asteroid)", bn: "চিকশুলুব গ্রহাণুর আঘাত" },
        { en: "Severe ice age freezing", hi: "भीषण हिमयुग शीतलन", bn: "তীব্র বরফ যুগ" },
        { en: "Oxygen depletion in oceans", hi: "महासागरों में ऑक्सीजन की कमी", bn: "সমুদ্রে অক্সিজেনের হ্রাস" }
      ],
      correctAnswerIndex: 1,
      fact: {
        en: "An asteroid about 10 kilometers wide struck modern-day Mexico, triggering dust clouds that blocked solar light for years.",
        hi: "लगभग 10 किमी चौड़ा एक उल्कापिंड आज के मैक्सिको से टकराया, जिससे बने धूल के बादलों ने वर्षों तक सूर्य की रोशनी रोक दी।",
        bn: "মেক্সিকোর কাছে একটি বিশাল ১০ কিলোমিটার চওড়া গ্রহাণু আছড়ে পড়ে বৈশ্বিক সূর্যের আলো বছরের পর বছর ঢেকে রেখেছিল।"
      }
    },
    {
      id: 12,
      question: {
        en: "The Tasmanian Tiger (Thylacine) was not actually a cat/tiger. What class of mammal was it?",
        hi: "तस्मानियाई बाघ (थायलासीन) वास्तव में बिल्ली या बाघ नहीं था। यह किस वर्ग का स्तनधारी था?",
        bn: "তাসমানিয়ান বাঘ (থাইলাসিন) আসলে বিড়াল বা বাঘ প্রজাতির ছিল না। এটি কোন শ্রেণীর স্তন্যপায়ী ছিল?"
      },
      options: [
        { en: "Canid (Wild Dog)", hi: "कैनाइन (जंगली कुत्ता)", bn: "বুনো কুকুর গোত্রীয়" },
        { en: "Marsupial (Pouched mammal)", hi: "मार्सुपियल (थैलीदार स्तनधारी)", bn: "মারসুপিয়াল (পেটে থলেযুক্ত স্তন্যপায়ী)" },
        { en: "Rodent", hi: "कृंतक (Rodent)", bn: "ইঁদুর গোত্রীয়" },
        { en: "Monotreme (Egg-laying)", hi: "मोनोट्रीम (अंडे देने वाला)", bn: "ডিম পাড়া স্তন্যপায়ী" }
      ],
      correctAnswerIndex: 1,
      fact: {
        en: "Like kangaroos, Thylacines were marsupials, and mothers carried their vulnerable young in an abdominal pouch.",
        hi: "कंगारूओं की तरह, थायलासीन भी मार्सुपियल थे, और मादाएं अपने नवजात बच्चों को पेट की थैली में सुरक्षित रखती थीं।",
        bn: "ক্যাঙ্গারুর মতো থাইলাসিনদের পেটেও একটি বিশেষ থলি ছিল যেখানে তারা তাদের ছোট বাচ্চাদের বড় করে তুলত।"
      }
    },
    {
      id: 13,
      question: {
        en: "Which massive ancient shark is considered the largest predator to have ever swum Earth's oceans?",
        hi: "किस विशाल प्राचीन शार्क को पृथ्वी के महासागरों में तैरने वाला अब तक का सबसे बड़ा शिकारी माना जाता है?",
        bn: "কোন দানবীয় প্রাচীন হাঙরকে পৃথিবীর সমুদ্রের ইতিহাসের সর্বকালের বৃহত্তম হিংস্র শিকারী মনে করা হয়?"
      },
      options: [
        { en: "Megalodon", hi: "मेगालोडन (Megalodon)", bn: "মেগালোডন" },
        { en: "Helicoprion", hi: "हेलीकोप्रियन", bn: "হেলিকোপিসন" },
        { en: "Dunkleosteus", hi: "डंकलियोस्टियस", bn: "ডাঙ্ক্লিওস্টিয়াস" },
        { en: "Great White Shark", hi: "ग्रेट व्हाइट शार्क", bn: "গ্রেট হোয়াইট শার্ক" }
      ],
      correctAnswerIndex: 0,
      fact: {
        en: "Megalodon was an ancient super-predator shark that reached estimated lengths of up to 18 meters, preying on whales.",
        hi: "मेगालोडन एक विशाल प्राचीन शार्क थी जिसकी लंबाई लगभग 18 मीटर तक होती थी और यह व्हेल मछलियों का शिकार करती थी।",
        bn: "মেগালোডন হাঙর প্রায় ১৮ মিটার পর্যন্ত দীর্ঘ হতো এবং সমুদ্রের তিমিদের শিকার করে বেঁচে থাকত।"
      }
    }
  ]
};

export default function QuizSection({ language, user }: QuizSectionProps) {
  const [difficulty, setDifficulty] = useState<'novice' | 'expert'>('novice');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = QUIZ_QUESTIONS[difficulty];
  const currentQuestion = questions[currentQuestionIndex];

  const startQuiz = (diff: 'novice' | 'expert') => {
    setDifficulty(diff);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || isAnswered) return;
    
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const shareResult = () => {
    const text = `I scored ${score}/${questions.length} on the Extinct Animals Encyclopedia Quiz as a ${difficulty} explorer! Test your paleontology knowledge too! ☄️🦅`;
    if (navigator.share) {
      navigator.share({
        title: "Paleontology Quiz Completed",
        text: text,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
      alert("Result text copied to clipboard! Share it with your friends.");
    }
  };

  const printCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
      {/* 1. DIFFICULTY SELECTION SCREEN */}
      {!quizStarted && (
        <div className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 bg-gradient-to-b from-[#0b271d] to-[#05140f] text-center space-y-6 shadow-2xl">
          <div className="space-y-2">
            <Award className="w-12 h-12 text-gold mx-auto animate-bounce" />
            <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
              {language === 'hi' ? 'पुरातत्व विज्ञान प्रश्नोत्तरी' : language === 'bn' ? 'জীবাশ্ম বিজ্ঞান কুইজ' : 'Paleontology Trivia Challenge'}
            </h2>
            <p className="text-gray-300 text-sm max-w-xl mx-auto">
              {language === 'hi'
                ? 'अपने ज्ञान का परीक्षण करें! डोडो, मैमथ और डायनासोर के इतिहास के बारे में पूछे गए सवालों का सही जवाब दें और पुरातात्विक प्रमाण पत्र जीतें।'
                : language === 'bn'
                ? 'আপনার মেধা যাচাই করুন! বিলুপ্ত ডোডো পাখি, ম্যামথ এবং ডাইনোসর সম্পর্কিত চমৎকার প্রশ্নের উত্তর দিয়ে অর্জন করুন বিশেষ সার্টিফিকেট।'
                : 'Test your grasp of Earth\'s extinct fauna and geologic periods. Score perfectly to earn an honorary Certificate in Paleontological Archiving.'}
            </p>
          </div>

          <div className="pt-4 border-t border-white/5 space-y-4">
            <h4 className="text-xs font-bold text-gold uppercase tracking-wider font-mono">
              Choose Exploration Difficulty:
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <button
                onClick={() => startQuiz('novice')}
                className="p-4 rounded-xl border border-emerald-500/20 hover:border-gold bg-emerald-950/30 text-left space-y-1 group transition-all cursor-pointer"
              >
                <span className="text-xs font-bold text-gold font-mono uppercase">Level 1: Novice Explorer</span>
                <h5 className="text-base font-bold text-white group-hover:text-gold transition-colors">Dodos & Mammoths</h5>
                <p className="text-[11px] text-gray-400">Perfect for junior paleontologists and casual history fans.</p>
              </button>

              <button
                onClick={() => startQuiz('expert')}
                className="p-4 rounded-xl border border-emerald-500/20 hover:border-gold bg-emerald-950/30 text-left space-y-1 group transition-all cursor-pointer"
              >
                <span className="text-xs font-bold text-gold font-mono uppercase">Level 2: Expert Curator</span>
                <h5 className="text-base font-bold text-white group-hover:text-gold transition-colors">Titans & Asteroids</h5>
                <p className="text-[11px] text-gray-400">Deep taxonomic details, causes of extinction and fossil eras.</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. ACTIVE QUIZ PLAY SCREEN */}
      {quizStarted && !quizCompleted && (
        <div className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 bg-gradient-to-b from-[#0b271d] to-[#05140f] space-y-6 shadow-2xl relative">
          
          {/* Header info */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-gold font-mono uppercase tracking-widest">
                Difficulty: {difficulty}
              </span>
              <h3 className="text-sm font-bold text-white">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Score</span>
              <span className="text-sm font-extrabold text-gold">{score} pts</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-gold to-emerald-500 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="py-4">
            <h4 className="text-lg sm:text-xl font-bold text-white leading-relaxed font-display">
              {currentQuestion.question[language]}
            </h4>
          </div>

          {/* Options list */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt, oIdx) => {
              const isSelected = selectedOption === oIdx;
              const isCorrect = oIdx === currentQuestion.correctAnswerIndex;
              
              let btnClass = "border-white/5 bg-white/5 hover:bg-white/10 text-gray-200";
              if (isAnswered) {
                if (isCorrect) {
                  btnClass = "border-emerald-500 bg-emerald-950/40 text-emerald-300 font-semibold";
                } else if (isSelected) {
                  btnClass = "border-red-500 bg-red-950/30 text-red-400";
                } else {
                  btnClass = "border-white/5 bg-white/5 opacity-50 text-gray-400";
                }
              } else if (isSelected) {
                btnClass = "border-gold bg-gold/10 text-gold font-semibold";
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleOptionSelect(oIdx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <span>{opt[language]}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Submit/Next Actions and Fun Facts */}
          <div className="pt-4 border-t border-white/5 space-y-4">
            {isAnswered && (
              <div className="p-4 rounded-xl bg-[#071a14] border border-gold/15 space-y-1 animate-scale-up">
                <span className="text-[9px] font-bold font-mono text-gold uppercase tracking-wider block">
                  Paleo Fact File:
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {currentQuestion.fact[language]}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3">
              {!isAnswered ? (
                <button
                  onClick={handleAnswerSubmit}
                  disabled={selectedOption === null}
                  className="px-6 py-2.5 bg-gold hover:bg-gold/90 text-forest font-bold text-xs rounded-xl shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wider"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer uppercase tracking-wider flex items-center gap-1"
                >
                  <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Challenge'}</span>
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. FINAL RESULTS & DIPLOMA CERTIFICATE */}
      {quizCompleted && (
        <div className="space-y-6">
          
          {/* Certificate Board Frame Container */}
          <div className="p-6 sm:p-10 border-8 border-double border-gold/30 rounded-3xl bg-[#05140f] relative overflow-hidden shadow-2xl space-y-6 text-center max-w-2xl mx-auto border-gold/40">
            {/* Elegant corner watermark decorations */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold/40 pointer-events-none" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold/40 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-gold/40 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold/40 pointer-events-none" />

            {/* Content block */}
            <div className="space-y-2">
              <Award className="w-16 h-16 text-gold mx-auto animate-pulse" />
              <span className="text-[10px] font-bold font-mono tracking-widest text-gold uppercase block">
                Honorary Museum Archive Diploma
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide font-display uppercase">
                Certificate of Paleontology
              </h2>
            </div>

            <p className="text-xs text-gray-400 italic max-w-md mx-auto">
              This digital certificate verifies that the recipient has demonstrated expert taxonomic and historical knowledge regarding the extinct species of planet Earth.
            </p>

            {/* Recipient Name */}
            <div className="py-4 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 block uppercase">Presented to</span>
              <h4 className="text-xl sm:text-2xl font-bold text-gold border-b border-gold/30 pb-2 inline-block px-8 max-w-xs truncate font-display">
                {user.name}
              </h4>
            </div>

            {/* Scores and Stamp */}
            <div className="flex items-center justify-between max-w-md mx-auto py-2 border-t border-b border-white/5">
              <div className="text-left space-y-0.5">
                <span className="text-[9px] text-gray-400 font-mono uppercase block">Rank Achieved</span>
                <span className="text-xs font-bold text-white uppercase">{difficulty === 'expert' ? 'Senior Curator' : 'Junior Biologist'}</span>
              </div>
              <div className="text-right space-y-0.5">
                <span className="text-[9px] text-gray-400 font-mono uppercase block">Accuracy Score</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">{score} / {questions.length} Correct</span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-gray-500 font-mono">
              Verified by AI Studio Paleontology Mainframe • July 2026
            </div>
          </div>

          {/* Social actions & print */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => startQuiz(difficulty)}
              className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>

            <button
              onClick={shareResult}
              className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-gold" />
              <span>Share Result</span>
            </button>

            <button
              onClick={printCertificate}
              className="px-5 py-2.5 rounded-xl bg-gold text-forest font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md hover:bg-gold/90"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Diploma</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
