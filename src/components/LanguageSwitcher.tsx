'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { Locale } from '@/data/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';

const languages: { code: Locale; label: string; name: string; flagUrl: string }[] = [
  { code: 'ru', label: 'RU', name: 'Русский', flagUrl: 'https://purecatamphetamine.github.io/country-flag-icons/3x2/RU.svg' },
  { code: 'uz', label: 'UZ', name: 'O\'zbekcha', flagUrl: 'https://purecatamphetamine.github.io/country-flag-icons/3x2/UZ.svg' },
  { code: 'en', label: 'EN', name: 'English', flagUrl: 'https://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg' },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-card-bg/60 backdrop-blur-md border border-border-color rounded-xl hover:border-sany-red/50 transition-all shadow-sm focus:outline-none min-w-[80px] justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-3.5 rounded-sm overflow-hidden shadow-sm flex-shrink-0">
            <img 
              src={currentLang.flagUrl} 
              alt={currentLang.label} 
              className="w-full h-full object-cover" 
            />
          </div>
          <span className="text-[12px] font-bold tracking-wider text-foreground/80 uppercase">{currentLang.label}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-foreground/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-44 origin-top-right rounded-xl bg-card-bg/95 backdrop-blur-xl border border-border-color shadow-2xl z-[100] overflow-hidden"
          >
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLocale(lang.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-[11px] font-medium transition-colors hover:bg-sany-red/10 group ${
                    locale === lang.code ? 'text-sany-red bg-sany-red/5' : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <div className="w-6 h-4 rounded-sm overflow-hidden shadow-sm flex-shrink-0 opacity-90 group-hover:opacity-100">
                    <img 
                      src={lang.flagUrl} 
                      alt={lang.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex flex-col items-start min-w-0">
                    <span className="tracking-wide truncate w-full">{lang.name}</span>
                    <span className="text-[8px] font-bold opacity-30 group-hover:opacity-60 uppercase">{lang.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
