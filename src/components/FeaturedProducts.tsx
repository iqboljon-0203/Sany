'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { getFeaturedProducts, formatPrice } from '@/data/products';

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

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
              Продукция
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-heading font-bold text-anthracite"
            >
              Флагманы
              <span className="gradient-text-red ml-3">каталога</span>
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
              <span>Весь каталог</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/products/${product.slug}`} className="block group">
                <div className="bg-white rounded-xl overflow-hidden card-hover shadow-sm">
                  {/* Image Area */}
                  <div className="relative h-52 bg-anthracite-light overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${product.images[0] || '/images/products/excavator.png'})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-anthracite-light/50 to-transparent mix-blend-multiply" />
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-anthracite/80 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {product.categoryLabel}
                      </span>
                    </div>
                    {/* Quick Specs Overlay */}
                    <div className="absolute inset-0 bg-anthracite/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center p-5">
                      <p className="text-sany-red text-xs font-bold uppercase tracking-wider mb-3">Характеристики</p>
                      <div className="space-y-2">
                        {product.specs.slice(0, 4).map((spec, j) => (
                          <div key={j} className="flex justify-between items-center">
                            <span className="text-white/50 text-xs">{spec.label}</span>
                            <span className="text-white text-xs font-semibold">{spec.value} {spec.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-lg text-anthracite group-hover:text-sany-red transition-colors">
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
