'use client';

import { motion } from 'framer-motion';
import NextImage from 'next/image';
import { useTranslation } from '@/lib/i18n';

export default function PartnersMarquee({ partnersList = [] }: { partnersList?: any[] }) {
  const { t } = useTranslation();
  // If no DB partners loaded, fallback to these
  const staticFallback = [
    { id: 1, name: 'Enter Engineering', logo: '/images/partners/enter-engineering.svg' },
    { id: 2, name: 'Трест 12', logo: '/images/partners/trest12.svg' },
    { id: 3, name: 'Навоийский ГМК', logo: '/images/partners/ngmk.svg' },
    { id: 4, name: 'Алмалыкский ГМК', logo: '/images/partners/agmk.svg' },
    { id: 5, name: 'Узбекнефтегаз', logo: '/images/partners/uzneftegaz.svg' },
    { id: 6, name: 'UzGTL', logo: '/images/partners/uzgtl.svg' }
  ];

  const displayPartners = partnersList.length > 0 ? partnersList : staticFallback;

  // Duplicate the array for seamless infinite scroll
  const doubledPartners = [...displayPartners, ...displayPartners];

  return (
    <section className="py-20 bg-light-grey overflow-hidden border-y border-medium-grey/50">
      <div className="container-custom mb-10">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block"
          >
            {t.partners?.subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-heading font-bold text-foreground"
          >
            {t.partners?.title}
          </motion.h2>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-light-grey to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-light-grey to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee w-max">
          {doubledPartners.map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="flex-shrink-0 mx-6"
            >
              <div className="w-56 h-auto min-h-[120px] py-5 bg-card-bg rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-border-color flex items-center justify-center px-4 hover:shadow-[0_8px_30px_-4px_rgba(190,17,26,0.1)] hover:-translate-y-1 transition-all duration-400 group">
                <div className="text-center w-full flex flex-col items-center">
                  <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center relative bg-anthracite/5 rounded-xl group-hover:bg-card-bg transition-colors overflow-hidden">
                    <NextImage 
                      src={partner.logo}
                      alt={`SANY partner - ${partner.name}`}
                      width={40}
                      height={40}
                      className="object-contain group-hover:scale-110 drop-shadow-sm transition-transform duration-300"
                    />
                  </div>
                  <p className="text-[13px] text-foreground/80 font-bold leading-tight line-clamp-2 group-hover:text-sany-red transition-colors">
                    {partner.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
