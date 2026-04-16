'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { ShieldCheck, Wrench, Clock, Settings, Package, Star } from 'lucide-react';

const iconMap: Record<string, any> = {
  ShieldCheck: <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />,
  Wrench: <Wrench className="w-8 h-8" strokeWidth={1.5} />,
  Clock: <Clock className="w-8 h-8" strokeWidth={1.5} />,
  Settings: <Settings className="w-8 h-8" strokeWidth={1.5} />,
  Package: <Package className="w-8 h-8" strokeWidth={1.5} />,
  Star: <Star className="w-8 h-8" strokeWidth={1.5} />
};

export default function WhySanySection({ advantagesList = [] }: { advantagesList?: any[] }) {
  const { t } = useTranslation();

  // Fallback items if DB is empty
  const fallbackAdvantages = [
    {
      title: t.nav.solutions === 'Решения' ? 'Официальная гарантия' : t.nav.solutions === 'Yechimlar' ? 'Rasmiy kafolat' : 'Official Warranty',
      description: t.nav.solutions === 'Решения' ? 'Полная гарантия производителя на всю технику.' : t.nav.solutions === 'Yechimlar' ? 'Barcha texnikalar uchun ishlab chiqaruvchining to\'liq kafolati.' : 'Full manufacturer\'s warranty on all equipment.',
      icon: <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
    },
    {
      title: t.nav.solutions === 'Решения' ? 'Запчасти в Ташкенте' : t.nav.solutions === 'Yechimlar' ? 'Toshkentda ehtiyot qismlar' : 'Parts in Tashkent',
      description: t.nav.solutions === 'Решения' ? 'Крупный склад оригинальных запчастей в Сергели.' : t.nav.solutions === 'Yechimlar' ? 'Sergelida original ehtiyot qismlarning yirik ombori.' : 'Large warehouse of original spare parts in Sergeli.',
      icon: <Wrench className="w-8 h-8" strokeWidth={1.5} />
    },
    {
      title: t.nav.solutions === 'Решения' ? 'Сервис 24/7' : t.nav.solutions === 'Yechimlar' ? 'Servis 24/7' : 'Service 24/7',
      description: t.nav.solutions === 'Решения' ? 'Круглосуточная поддержка и выездные бригады.' : t.nav.solutions === 'Yechimlar' ? 'Kecha-yu kunduz qo\'llab-quvvatlash va chiqish brigadalari.' : 'Round-the-clock support and field service teams.',
      icon: <Clock className="w-8 h-8" strokeWidth={1.5} />
    },
  ];

  const advantages = advantagesList.length > 0 
    ? advantagesList.map((a: any) => ({
        title: t.nav.solutions === 'Решения' ? a.title_ru : t.nav.solutions === 'Yechimlar' ? a.title_uz : a.title_en || a.title_ru,
        description: t.nav.solutions === 'Решения' ? a.desc_ru : t.nav.solutions === 'Yechimlar' ? a.desc_uz : a.desc_en || a.desc_ru,
        icon: iconMap[a.icon] || <Star className="w-8 h-8" strokeWidth={1.5} />
      }))
    : fallbackAdvantages;

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-sany-red/5 to-transparent rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3" />
      
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
          {advantages.map((adv: any, i: number) => (
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
