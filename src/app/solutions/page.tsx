'use client';

import { useTranslation } from '@/lib/i18n';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SolutionsPage() {
  const { t } = useTranslation();

  const solutions = [
    {
      title: t.nav.solutions === 'Решения' ? 'Горнодобыча' : t.nav.solutions === 'Yechimlar' ? 'Konchilik' : 'Mining',
      description: t.nav.solutions === 'Решения' ? 'Полный комплект техники для открытых и подземных горных работ.' : t.nav.solutions === 'Yechimlar' ? 'Ochiq va yopiq kon ishlari uchun texnikalar jamlanmasi.' : 'Full set of equipment for open and underground mining operations.',
      machines: ['SY365H', 'SRT95C', 'SR200C'],
      icon: '⛏️',
      features: t.nav.solutions === 'Решения' ? ['Карьерные экскаваторы', 'Самосвалы до 400 т', 'Буровые установки'] : ['Karyer ekskavatorlari', 'Samosvallar 400 t gacha', 'Burg\'ulash qurilmalari'],
    },
    {
      title: t.nav.solutions === 'Решения' ? 'Строительство' : t.nav.solutions === 'Yechimlar' ? 'Qurilish' : 'Construction',
      description: t.nav.solutions === 'Решения' ? 'Универсальная техника для жилищного и промышленного строительства.' : t.nav.solutions === 'Yechimlar' ? 'Turar-joy va sanoat qurilishi uchun universal texnika.' : 'Universal equipment for residential and industrial construction.',
      machines: ['SY215C', 'STC250', 'SY412C-8S'],
      icon: '🏗️',
      features: t.nav.solutions === 'Решения' ? ['Экскаваторы 1-80 т', 'Автокраны до 2000 т', 'Бетонная техника'] : ['Ekskavatorlar 1-80 t', 'Avtokranlar 2000 t gacha', 'Beton texnikasi'],
    },
    {
      title: t.nav.solutions === 'Решения' ? 'Дороги' : t.nav.solutions === 'Yechimlar' ? 'Yo\'llar' : 'Roads',
      description: t.nav.solutions === 'Решения' ? 'Комплексные решения для строительства и ремонта дорог.' : t.nav.solutions === 'Yechimlar' ? 'Yo\'l qurilishi va ta\'mirlash uchun kompleks yechimlar.' : 'Comprehensive solutions for road construction and repair.',
      machines: ['SDG25S', 'SSR220AC', 'STL956H'],
      icon: '🛣️',
      features: t.nav.solutions === 'Решения' ? ['Автогрейдеры', 'Дорожные катки', 'Погрузчики'] : ['Avtogreyderlar', 'Yo\'l katoklari', 'Yuklagichlar'],
    },
  ];

  return (
    <div className="pt-[82px] min-h-screen bg-light-grey">
      {/* Hero */}
      <section className="bg-background py-20 relative overflow-hidden border-b border-border-color">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="solutions-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.05" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#solutions-grid)" />
          </svg>
        </div>
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block">
              {t.solutions.title}
            </span>
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-4">
              {t.solutions.subtitle}
            </h1>
            <p className="text-text-muted max-w-2xl text-lg">
              {t.solutions.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="section-padding py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-8">
            {solutions.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card-bg rounded-2xl overflow-hidden shadow-sm border border-border-color"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  <div className="p-8 lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{solution.icon}</span>
                      <h2 className="text-3xl font-heading font-bold text-foreground">
                        {solution.title}
                      </h2>
                    </div>
                    <p className="text-text-muted mb-6">{solution.description}</p>
                    <div className="flex flex-wrap gap-4 mb-6">
                      {solution.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-sany-red rounded-full" />
                          <span className="text-sm text-foreground/70">{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {solution.machines.map(m => (
                        <span key={m} className="px-3 py-1 bg-background border border-border-color rounded-full text-xs font-bold text-foreground/60">{m}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-anthracite to-black p-8 flex flex-col items-center justify-center text-center">
                    <Link href="/contacts" className="btn-primary w-full justify-center">
                      {t.solutions.getOffer}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
