'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';

export default function WhySanySection() {
  const { t } = useTranslation();

  const advantages = [
    {
      title: t.nav.solutions === 'Решения' ? 'Официальная гарантия' : t.nav.solutions === 'Yechimlar' ? 'Rasmiy kafolat' : 'Official Warranty',
      description: t.nav.solutions === 'Решения' ? 'Полная гарантия производителя на всю технику.' : t.nav.solutions === 'Yechimlar' ? 'Barcha texnikalar uchun ishlab chiqaruvchining to\'liq kafolati.' : 'Full manufacturer\'s warranty on all equipment.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: t.nav.solutions === 'Решения' ? 'Запчасти в Ташкенте' : t.nav.solutions === 'Yechimlar' ? 'Toshkentda ehtiyot qismlar' : 'Parts in Tashkent',
      description: t.nav.solutions === 'Решения' ? 'Крупный склад оригинальных запчастей в Сергели.' : t.nav.solutions === 'Yechimlar' ? 'Sergelida original ehtiyot qismlarning yirik ombori.' : 'Large warehouse of original spare parts in Sergeli.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547" />
        </svg>
      ),
    },
    {
      title: t.nav.solutions === 'Решения' ? 'Сервис 24/7' : t.nav.solutions === 'Yechimlar' ? 'Servis 24/7' : 'Service 24/7',
      description: t.nav.solutions === 'Решения' ? 'Круглосуточная поддержка и выездные бригады.' : t.nav.solutions === 'Yechimlar' ? 'Kecha-yu kunduz qo\'llab-quvvatlash va chiqish brigadalari.' : 'Round-the-clock support and field service teams.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* ... */}
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block"
          >
            {t.whySany.title}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4"
          >
            {t.whySany.subtitle.split(' ')[0]} <span className="gradient-text-red">{t.whySany.subtitle.split(' ')[1]}</span>
          </motion.h2>
          <p className="text-text-muted max-w-lg mx-auto">
            {t.whySany.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card-bg border border-border-color rounded-xl p-8 group hover:border-sany-red/30 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-sany-red/10 text-sany-red flex items-center justify-center mb-5 group-hover:bg-sany-red group-hover:text-white transition-all duration-500">
                {adv.icon}
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-3">{adv.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{adv.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
