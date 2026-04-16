'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { ProductCategory } from '@/types';
import { useTranslation } from '@/lib/i18n';
import NextImage from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';

// Static categories fallback
export default function ProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const { t, locale } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'weight' | 'power' | 'default'>('name');

  const getSafeSrc = (src: any) => {
    if (!src || typeof src !== 'string') return '/images/sany-logo.svg';
    const trimmed = src.trim();
    if (trimmed.startsWith('/') || trimmed.startsWith('http')) return trimmed;
    return '/images/sany-logo.svg';
  };

  // Dynamically extract categories from products
  const categories = useMemo(() => {
    const map = new Map();
    initialProducts.forEach(p => {
      if (p.category && p.category_label) {
        map.set(p.category, p.category_label);
      }
    });
    return Array.from(map.entries());
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.short_description?.toLowerCase().includes(q) ||
          p.category_label?.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
      if (sortBy === 'weight') {
        const wA = parseInt((a.operating_weight || '0').replace(/\D/g, '')) || 0;
        const wB = parseInt((b.operating_weight || '0').replace(/\D/g, '')) || 0;
        return wA - wB;
      }
      if (sortBy === 'power') {
        const pA = parseInt((a.power || '0').replace(/\D/g, '')) || 0;
        const pB = parseInt((b.power || '0').replace(/\D/g, '')) || 0;
        return pA - pB;
      }
      return 0;
    });

    return result;
  }, [selectedCategory, searchQuery, sortBy, initialProducts]);

  return (
    <div className="pt-[82px] min-h-screen bg-light-grey">
      <Breadcrumbs items={[{ label: t.nav.products }]} />
      {/* Page Header */}
      <div className="bg-background py-16 relative overflow-hidden border-b border-border-color">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="catalog-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.05" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#catalog-grid)" />
          </svg>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block">
              {t.products.catalog}
            </span>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              {t.nav.products}
            </h1>
            <p className="text-text-muted max-w-xl">
              SANY qurilish, tog'-kon va yo'l texnikalarining to'liq assortimenti
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-72 shrink-0"
          >
            <div className="bg-card-bg rounded-xl shadow-sm p-6 sticky top-[100px] border border-border-color">
              {/* Search */}
              <div className="mb-6">
                <label className="text-foreground font-heading font-bold text-sm mb-3 block">
                  {t.contacts.formTitle}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t.products.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-input-light !pr-10 !text-sm"
                  />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="text-foreground font-heading font-bold text-sm mb-3 block">
                  {t.products.categories}
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-sany-red text-white'
                        : 'text-foreground/70 hover:bg-light-grey'
                    }`}
                  >
                    {t.products.allCategories}
                    <span className="float-right text-xs opacity-60">
                      {initialProducts.length}
                    </span>
                  </button>
                  {categories.map(([key, label]) => {
                    const count = initialProducts.filter(
                      (p) => p.category === key
                    ).length;
                    if (count === 0) return null;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedCategory(key as ProductCategory)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          selectedCategory === key
                            ? 'bg-sany-red text-white'
                            : 'text-foreground/70 hover:bg-light-grey'
                        }`}
                      >
                        {label}
                        <span className="float-right text-xs opacity-60">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="text-foreground font-heading font-bold text-sm mb-3 block">
                  {t.products.sorting}
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'weight' | 'power')}
                  className="form-input-light !text-sm !py-2.5"
                >
                  <option value="name">По названию</option>
                  <option value="weight">По массе</option>
                  <option value="power">По мощности</option>
                </select>
              </div>
            </div>
          </motion.aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-text-muted text-sm">
                {t.products.found}: <span className="font-semibold text-foreground">{filteredProducts.length}</span> {t.products.models}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + searchQuery + sortBy}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      className="block group"
                    >
                      <div className="bg-card-bg rounded-xl overflow-hidden card-hover shadow-sm border border-border-color h-full flex flex-col">
                        {/* Image Area */}
                        <div className="relative h-48 bg-gradient-to-br from-medium-grey/30 to-light-grey overflow-hidden shrink-0">
                          <NextImage 
                            src={getSafeSrc(product.thumbnail || product.images?.[0])} 
                            alt={`SANY ${product.name} ${product[`category_label_${locale}`] || product.category_label || product.category} - official distributor in Uzbekistan`}
                            fill
                            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80" 
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 bg-anthracite/80 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                              {product[`category_label_${locale}`] || product.category_label || product.category}
                            </span>
                          </div>
                          {/* Quick Specs on Hover */}
                          <div className="absolute inset-0 bg-anthracite/90 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-center p-5">
                            <p className="text-sany-red text-xs font-bold uppercase tracking-wider mb-3">
                              {t.products.specs}
                            </p>
                            <div className="space-y-2">
                              {product.specs?.slice(0, 4).map((spec: any, j: number) => (
                                <div
                                  key={j}
                                  className="flex justify-between items-center"
                                >
                                  <span className="text-white/50 text-xs">
                                    {spec.label}
                                  </span>
                                  <span className="text-white text-xs font-semibold">
                                    {spec.value} {spec.unit}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-sany-red transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-text-muted text-sm mt-1 line-clamp-2">
                              {product[`short_description_${locale}`] || product.short_description}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-text-muted">
                              <span>{product.power}</span>
                              <span className="opacity-30">|</span>
                              <span>{product.operating_weight}</span>
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
              </motion.div>
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4 opacity-20">🔍</div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                  {t.products.noResults}
                </h3>
                <p className="text-text-muted text-sm">
                  {t.products.noResultsDesc}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
