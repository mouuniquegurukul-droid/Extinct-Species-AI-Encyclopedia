import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, LogOut, Globe, User, Sun, Moon } from 'lucide-react';
import { Language, UserSession } from '../types';
import AnimatedLogo from './AnimatedLogo';

interface NavbarProps {
  user: UserSession;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLogout: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Navbar({
  user,
  language,
  onLanguageChange,
  onLogout,
  activeSection,
  setActiveSection,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Sync dark mode class with document body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const sections = [
    { id: 'home', label: { en: 'Home', hi: 'होम', bn: 'হোম' } },
    { id: 'map', label: { en: 'Explore', hi: 'मानचित्र', bn: 'অনুসন্ধান' } },
    { id: 'timeline', label: { en: 'Timeline', hi: 'समयरेखा', bn: 'টাইমলাইন' } },
    { id: 'categories', label: { en: 'Categories', hi: 'श्रेणियां', bn: 'বিভাগ' } },
    { id: 'assistant', label: { en: 'AI Search', hi: 'एआई खोज', bn: 'এআই অনুসন্ধান' } },
    { id: 'quiz', label: { en: 'Quiz', hi: 'प्रश्नोत्तरी', bn: 'কুইজ' } },
    { id: 'extinction', label: { en: 'Conservation', hi: 'संरक्षण', bn: 'সংরক্ষণ' } },
    { id: 'about', label: { en: 'About', hi: 'परिचय', bn: 'পরিচিতি' } },
  ];

  const logoTitle = {
    en: "🦴 Extinct Animals Encyclopedia",
    hi: "🦴 विलुप्त जीव विश्वकोश",
    bn: "🦴 বিলুপ্ত প্রাণী বিশ্বকোষ"
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-forest/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveSection('home')}>
            <AnimatedLogo />
            <span className="font-display font-bold text-white tracking-widest text-sm sm:text-base">
              {logoTitle[language]}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`text-xs sm:text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  activeSection === sec.id ? 'text-gold border-b-2 border-gold/70 pb-1 font-semibold' : 'text-gray-300 hover:text-white'
                }`}
              >
                {sec.label[language]}
              </button>
            ))}
          </div>

          {/* Right hand controls (User, Language selection & Logout) */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Dark Mode toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded-lg border border-white/10 hover:border-gold/30 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-gold transition-all cursor-pointer flex items-center justify-center"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-gold animate-spin-slow" /> : <Moon className="w-4 h-4 text-blue-400" />}
            </button>

            {/* Language dropdown in navbar */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 text-white text-xs z-50">
              <Globe className="w-3.5 h-3.5 text-gold" />
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent border-none text-white focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-forest">EN</option>
                <option value="hi" className="bg-forest">HI</option>
                <option value="bn" className="bg-forest">BN</option>
              </select>
            </div>

            {/* Profile widget */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-4">
              {user.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  className="w-7 h-7 rounded-full border border-gold/30 object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-7 h-7 rounded-full bg-white/10 p-1 text-white" />
              )}
              <span className="text-xs font-semibold text-gray-200 tracking-wide truncate max-w-[100px]">
                {user.name}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="text-gray-400 hover:text-gold p-1.5 rounded-full hover:bg-white/5 transition-all cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Quick language switch for mobile */}
            <button
              onClick={() => {
                const order: Language[] = ['en', 'hi', 'bn'];
                const nextIndex = (order.indexOf(language) + 1) % order.length;
                onLanguageChange(order[nextIndex]);
              }}
              className="px-2 py-1 rounded bg-white/5 border border-white/10 text-gold text-xs font-semibold uppercase cursor-pointer"
            >
              {language}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white p-1"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-white/10 px-4 pt-2 pb-4 space-y-2 animate-fade-in">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSection(sec.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === sec.id ? 'bg-gold/10 text-gold font-semibold' : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {sec.label[language]}
            </button>
          ))}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between px-3">
            <div className="flex items-center gap-2">
              <img
                src={user.photoUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                alt={user.name}
                className="w-8 h-8 rounded-full border border-gold/30 object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="text-sm font-semibold text-gray-200">{user.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1.5 py-1 px-2 rounded hover:bg-red-500/10 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
