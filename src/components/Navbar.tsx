'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, phoneNumbers } from '@/data/projects';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
        <div className="bg-anthracite/95 backdrop-blur-md border-b border-white/5 h-full">
          <div className="container-custom h-full flex items-center justify-between">
            <div className="flex items-center gap-6">
              {phoneNumbers.map((phone, i) => (
                <a
                  key={i}
                  href={`tel:${phone.number}`}
                  className="hidden md:flex items-center gap-2 text-xs text-white/70 hover:text-sany-red transition-colors"
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
              <span className="text-xs text-white/50">Пн-Пт: 09:00 - 18:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'top-0 bg-anthracite/98 backdrop-blur-xl shadow-2xl shadow-black/30' : 'top-10 bg-anthracite/80 backdrop-blur-lg'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/" className="flex items-center group">
              <div className="flex flex-col items-center justify-center transform group-hover:scale-[1.02] transition-transform duration-300">
                <svg viewBox="0 0 200 50" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Rotor Mark */}
                  <g transform="translate(0, 0)">
                    <circle cx="25" cy="25" r="22" stroke="#e3000f" strokeWidth="4.5" />
                    {/* Three blades */}
                    <path d="M25 6 L20 26 L30 26 Z" fill="#e3000f" />
                    <path d="M8 38 L20 22 L27 20 Z" fill="#e3000f" />
                    <path d="M42 38 L30 22 L23 20 Z" fill="#e3000f" />
                    {/* Center cutout */}
                    <circle cx="25" cy="23" r="3" fill="#1A1A1A" />
                  </g>
                  {/* Typography */}
                  <text x="60" y="28" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="24" fill="#ffffff" letterSpacing="1.5">SANY</text>
                  <text x="62" y="42" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="9.5" fill="#a0a0a0" letterSpacing="3">CENTRAL ASIA</text>
                </svg>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-sany-red transition-all duration-300 group-hover:w-3/4" />
                </Link>
              ))}
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+998917727273"
                className="hidden md:flex items-center gap-2 text-sm text-white/80 hover:text-sany-red transition-colors"
              >
                <div className="w-9 h-9 rounded-full border border-sany-red/40 flex items-center justify-center group-hover:bg-sany-red transition-colors">
                  <svg className="w-4 h-4 text-sany-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </a>

              <Link
                href="/contacts"
                className="hidden sm:inline-flex btn-primary !py-2.5 !px-5 !text-xs"
              >
                Связаться
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
                aria-label="Menu"
              >
                <motion.span
                  animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-white rounded-full block"
                />
                <motion.span
                  animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 bg-white rounded-full block"
                />
                <motion.span
                  animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-white rounded-full block"
                />
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
            className="fixed inset-0 z-40 bg-anthracite/98 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col justify-center items-center h-full gap-2 pt-20"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-2xl font-heading font-bold text-white/80 hover:text-sany-red transition-colors py-3 block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-col items-center gap-4"
              >
                {phoneNumbers.map((phone, i) => (
                  <a
                    key={i}
                    href={`tel:${phone.number}`}
                    className="text-white/60 text-sm hover:text-sany-red transition-colors"
                  >
                    {phone.label}: {phone.number}
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
