'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import NextImage from 'next/image';
import { useTranslation } from '@/lib/i18n';

export default function FeaturedProducts({ productsList = [] }: { productsList?: any[] }) {
  const { t } = useTranslation();
  if (!productsList || productsList.length === 0) return null;

  const getSafeSrc = (src: any) => {
    if (!src || typeof src !== 'string') return '/images/sany-logo.svg';
    const trimmed = src.trim();
    if (trimmed.startsWith('/') || trimmed.startsWith('http')) return trimmed;
    return '/images/sany-logo.svg';
  };

  return (
    <section className="section-padding bg-light-grey relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block"
            >
              {t.nav.products}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-heading font-bold text-anthracite"
            >
              SANY
              <span className="gradient-text-red ml-3">{t.products.catalog}</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/products"
              className="btn-primary !bg-anthracite hover:!bg-sany-red group"
            >
              <span>{t.hero.catalog}</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsList.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/products/${product.slug}`} className="block group">
                <div className="bg-card-bg rounded-xl overflow-hidden card-hover shadow-sm border border-border-color">
                  {/* Image Area */}
                  <div className="relative h-52 bg-anthracite-light overflow-hidden">
                    <NextImage 
                      src={getSafeSrc(product.thumbnail || product.images?.[0])}
                      alt={`SANY ${product.name} ${product.categoryLabel} - official distributor in Uzbekistan`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-anthracite-light/20 to-transparent mix-blend-overlay opacity-60" />
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-sany-red text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                        {product.categoryLabel}
                      </span>
                    </div>
                    {/* Quick Specs Overlay */}
                    <div className="absolute inset-0 bg-anthracite/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center p-5">
                      <p className="text-sany-red text-xs font-bold uppercase tracking-wider mb-3">{t.products.specifications}</p>
                      <div className="space-y-2">
                        {product.specs.slice(0, 4).map((spec: any, j: number) => (
                          <div key={j} className="flex justify-between items-center border-b border-white/5 pb-1 last:border-0">
                            <span className="text-white/70 text-[11px] uppercase tracking-tight">{spec.label}</span>
                            <span className="text-white text-[11px] font-bold">{spec.value} {spec.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-sany-red transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-text-muted text-sm mt-1 line-clamp-2">{product.shortDescription}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-muted">{product.power}</span>
                        <span className="text-text-muted/30">|</span>
                        <span className="text-xs text-text-muted">{product.operatingWeight}</span>
                      </div>
                      <svg className="w-5 h-5 text-sany-red opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
