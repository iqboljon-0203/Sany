'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import NextImage from 'next/image';
import { useTranslation } from '@/lib/i18n';

export default function HeroSection({ settings }: { settings?: any }) {
  const { t, locale } = useTranslation();
  
  const getSafeSrc = (src: any) => {
    if (!src || typeof src !== 'string') return '/images/products/excavator_site.png';
    const trimmed = src.trim();
    if (trimmed.startsWith('/') || trimmed.startsWith('http')) return trimmed;
    return '/images/products/excavator_site.png';
  };

  // Dynamic titles/desc from DB
  const dynamicTitle = locale === 'ru' ? settings?.hero_title_ru : settings?.hero_title_uz;
  const dynamicDesc = locale === 'ru' ? settings?.hero_desc_ru : settings?.hero_desc_uz;
  const dynamicImage = settings?.hero_image;

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 lg:pt-40 pb-32 overflow-hidden bg-anthracite">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <NextImage
          src={getSafeSrc(dynamicImage)}
          alt="SANY heavy excavator machine working on a large construction site in Uzbekistan"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/70 to-[#1A1A1A]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent" />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Red Accent Elements */}
      <div className="absolute top-0 left-0 w-2 h-full bg-sany-red/20" />
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: '40%' }}
        transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
        className="absolute top-[30%] left-0 w-2 bg-sany-red"
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-sany-red/10 border border-sany-red/30 rounded-full text-sany-red text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 bg-sany-red rounded-full animate-pulse" />
              {t.hero.subtitle}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6"
          >
            <span className="block mb-2 text-white/95">SANY:</span>
            <span className="block">
              <span className="gradient-text-red">{dynamicTitle ? dynamicTitle.split(' ')[0] : t.hero.titlePart1}</span>{' '}
              <span className="text-white/90">{dynamicTitle ? dynamicTitle.split(' ').slice(1).join(' ') : t.hero.titlePart2}</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-white/70 max-w-xl mb-10 leading-relaxed"
          >
            {dynamicDesc || t.hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/products" className="btn-primary group">
              <span>{t.hero.catalog}</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/leasing" className="btn-outline group">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>{t.leasing.title}</span>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-xs uppercase tracking-wider font-medium">{t.hero.scrollDown || 'Scroll Down'}</span>
          <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Decorative Corner */}
      <div className="absolute bottom-0 right-0 w-64 h-64">
        <div className="absolute bottom-0 right-0 w-full h-full border-r-2 border-b-2 border-sany-red/10" />
        <div className="absolute bottom-4 right-4 w-32 h-32 border-r-2 border-b-2 border-sany-red/5" />
      </div>
    </section>
  );
}
