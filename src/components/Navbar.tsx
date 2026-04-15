'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, phoneNumbers } from '@/data/projects';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '@/lib/i18n';

export default function Navbar({ settings }: { settings?: any }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { t } = useTranslation();

  const isRu = t.nav.solutions === 'Решения';
  const s = settings || {};
  const activePhones = [
    { label: isRu ? 'Отдел продаж' : 'Sotuv bo\'limi', number: s.phone_sales || '+998 91 772 72 73' },
    { label: isRu ? 'Cервис' : 'Servis', number: s.phone_service || '+998 93 555 00 95' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      {/* Top Bar with Phone Numbers */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-10 opacity-100'
      }`}>
        <div className="bg-background/95 backdrop-blur-md border-b border-border-color h-full">
          <div className="container-custom h-full flex items-center justify-between">
            <div className="flex items-center gap-6">
              {activePhones.map((phone, i) => (
                <a
                  key={i}
                  href={`tel:${phone.number}`}
                  className="hidden md:flex items-center gap-2 text-xs text-foreground/70 hover:text-sany-red transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium">{phone.label}:</span>
                  <span>{phone.number}</span>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-foreground/50">
                {t.contacts.workingHours}: {isRu ? s.working_hours_ru : s.working_hours_uz}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'top-0 bg-background/98 backdrop-blur-xl shadow-2xl border-b border-border-color' : 'top-10 bg-background/80 backdrop-blur-lg'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/" className="flex items-center group">
              <div className="flex flex-col items-center justify-center transform group-hover:scale-[1.02] transition-transform duration-300">
                <svg viewBox="0 0 200 50" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Rotor Mark */}
                  {/* Premium Official Sany Logo Mark */}
                  <defs>
                    <linearGradient id="logo-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e3000f" />
                      <stop offset="100%" stopColor="#8d000a" />
                    </linearGradient>
                  </defs>
                  <g>
                    {/* Background Circle */}
                    <circle cx="25" cy="25" r="24" fill="url(#logo-bg-grad)" />
                    <circle cx="25" cy="25" r="21.5" stroke="white" strokeWidth="0.8" fill="none" opacity="0.6" />
                    
                    {/* Interlocking "1" Blades */}
                    <g fill="white" transform="translate(25, 25)">
                      {[0, 120, 240].map((angle) => (
                        <path
                          key={angle}
                          d="M -2,-13 L 2,-13 L 2,2 L 14,2 L 14,6 L -2,6 Z"
                          transform={`rotate(${angle}) translate(0, 2)`}
                        />
                      ))}
                      {/* Central Triangle Hole Fix */}
                      <path d="M 0,-3 L 3,2 L -3,2 Z" fill="url(#logo-bg-grad)" />
                    </g>
                  </g>
                  {/* Typography */}
                  <text x="60" y="28" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="24" fill="var(--fg)" letterSpacing="1.5">SANY</text>
                  <text x="62" y="42" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="9.5" fill="var(--color-text-muted)" letterSpacing="3">CENTRAL ASIA</text>
                </svg>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {[
                { href: '/products', label: t.nav.products },
                { href: '/solutions', label: t.nav.solutions },
                { href: '/projects', label: t.nav.projects },
                { href: '/service', label: t.nav.service },
                { href: '/about', label: t.nav.about },
                { href: '/leasing', label: t.nav.leasing },
                { href: '/contacts', label: t.nav.contacts }
              ].map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={`relative px-4 py-2 text-[13px] font-semibold transition-all duration-300 rounded-lg ${
                      isActive 
                        ? 'text-sany-red bg-sany-red/5' 
                        : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span 
                        layoutId="active-nav"
                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-sany-red rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-3">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`lg:hidden flex justify-center items-center w-10 h-10 rounded-full transition-all duration-300 ${
                  isMobileOpen
                    ? 'bg-sany-red/10 border border-sany-red/30'
                    : 'hover:bg-foreground/5'
                }`}
                aria-label={isMobileOpen ? 'Yopish' : 'Menu'}
              >
                {isMobileOpen ? (
                  <svg className="w-5 h-5 text-sany-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <span className="flex flex-col gap-1.5">
                    <span className="w-6 h-0.5 bg-foreground rounded-full block" />
                    <span className="w-6 h-0.5 bg-foreground rounded-full block" />
                    <span className="w-4 h-0.5 bg-foreground rounded-full block" />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center min-h-full gap-2 pt-32 pb-10 overflow-y-auto"
            >
              {[
                { href: '/products', label: t.nav.products },
                { href: '/solutions', label: t.nav.solutions },
                { href: '/projects', label: t.nav.projects },
                { href: '/service', label: t.nav.service },
                { href: '/about', label: t.nav.about },
                { href: '/leasing', label: t.nav.leasing },
                { href: '/contacts', label: t.nav.contacts }
              ].map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    onClick={() => setIsMobileOpen(false)} 
                    className={`text-2xl font-heading font-bold py-3 block transition-colors ${
                      isActive ? 'text-sany-red' : 'text-foreground/80 hover:text-sany-red'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-col items-center gap-4"
              >
                {activePhones.map((phone, i) => (
                  <a
                    key={i}
                    href={`tel:${phone.number}`}
                    className="text-foreground/60 text-sm hover:text-sany-red transition-colors"
                  >
                    {phone.label}: {phone.number}
                  </a>
                ))}

                <div className="flex items-center gap-4 mt-4 py-4 px-8 bg-card-bg rounded-2xl border border-border-color shadow-sm">
                  <ThemeToggle />
                  <div className="w-px h-6 bg-border-color" />
                  <LanguageSwitcher />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
