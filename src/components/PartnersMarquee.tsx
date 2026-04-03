'use client';

import { motion } from 'framer-motion';
import { partners } from '@/data/projects';

export default function PartnersMarquee() {
  // Duplicate the array for seamless infinite scroll
  const doubledPartners = [...partners, ...partners];

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
            Доверие и надёжность
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-heading font-bold text-foreground"
          >
            Наши клиенты и партнёры
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
                  <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center relative bg-anthracite/5 rounded-xl group-hover:bg-card-bg transition-colors">
                    <img 
                      src={partner.logo}
                      alt={partner.name}
                      title={partner.name}
                      className="w-10 h-10 object-contain group-hover:scale-110 drop-shadow-sm transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(partner.name)}&background=1A1A1A&color=fff&bold=true`;
                      }}
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
