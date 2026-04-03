'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/data/products';
import type { FormStatus } from '@/types';

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'specs' | 'description'>('specs');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setFormStatus('loading');
    try {
      const res = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, machine: product.name, message }),
      });
      if (res.ok) {
        setFormStatus('success');
        setName('');
        setPhone('');
        setMessage('');
        setTimeout(() => setFormStatus('idle'), 4000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  return (
    <div className="pt-[82px] min-h-screen bg-light-grey">
      {/* Breadcrumb */}
      <div className="bg-anthracite py-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Каталог</Link>
            <span>/</span>
            <span className="text-white/70">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Hero */}
      <section className="bg-anthracite pb-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-80 lg:h-[450px] bg-gradient-to-br from-anthracite-light to-anthracite rounded-2xl flex items-center justify-center overflow-hidden"
            >
              <div className="text-[150px] opacity-20">
                {product.category === 'excavator' && '🏗️'}
                {product.category === 'crane' && '🏗️'}
                {product.category === 'loader' && '🚜'}
                {product.category === 'grader' && '🛤️'}
                {product.category === 'roller' && '🛣️'}
                {product.category === 'concrete' && '🏛️'}
                {product.category === 'piling' && '⛏️'}
                {product.category === 'mining' && '⛰️'}
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-sany-red text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  {product.categoryLabel}
                </span>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sany-red text-sm font-bold uppercase tracking-widest mb-2 block">
                {product.categoryLabel}
              </span>
              <h1 className="text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
                {product.name}
              </h1>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                {product.shortDescription}
              </p>

              {/* Key Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Мощность</p>
                  <p className="text-white font-heading font-bold text-lg">{product.power}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Масса</p>
                  <p className="text-white font-heading font-bold text-lg">{product.operatingWeight}</p>
                </div>
                {product.bucketCapacity && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Ковш</p>
                    <p className="text-white font-heading font-bold text-lg">{product.bucketCapacity}</p>
                  </div>
                )}
                {product.maxLiftCapacity && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Грузоподъёмность</p>
                    <p className="text-white font-heading font-bold text-lg">{product.maxLiftCapacity}</p>
                  </div>
                )}
              </div>

              {/* Price & Actions */}
              {product.price && (
                <div className="mb-6">
                  <p className="text-white/30 text-xs mb-1">Ориентировочная цена</p>
                  <p className="text-sany-red font-heading font-bold text-2xl">{formatPrice(product.price)}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Link href="/leasing" className="btn-primary">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Рассчитать лизинг
                </Link>
                <a href="#inquiry" className="btn-outline">
                  Запрос цены
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specs & Description Tabs */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex gap-1 mb-8 bg-card-bg p-1 rounded-xl shadow-sm w-fit border border-border-color">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'specs'
                      ? 'bg-sany-red text-white'
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  Характеристики
                </button>
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'description'
                      ? 'bg-sany-red text-white'
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  Описание
                </button>
              </div>

              {activeTab === 'specs' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-card-bg rounded-xl shadow-sm p-8 border border-border-color"
                >
                  <h2 className="font-heading font-bold text-2xl text-foreground mb-6">
                    Технические характеристики
                  </h2>
                  <div className="space-y-0">
                    {product.specs.map((spec, i) => (
                      <div
                        key={i}
                        className={`flex justify-between items-center py-4 ${
                          i < product.specs.length - 1 ? 'border-b border-light-grey' : ''
                        }`}
                      >
                        <span className="text-text-muted">{spec.label}</span>
                        <span className="font-heading font-bold text-foreground text-lg">
                          {spec.value}{' '}
                          <span className="text-text-muted text-sm font-normal">{spec.unit}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'description' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-card-bg rounded-xl shadow-sm p-8 border border-border-color"
                >
                  <h2 className="font-heading font-bold text-2xl text-foreground mb-6">
                    Описание
                  </h2>
                  <p className="text-text-muted leading-relaxed text-lg">
                    {product.description}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Inquiry Form */}
            <div id="inquiry">
              <div className="bg-anthracite rounded-xl p-8 sticky top-[100px]">
                <h3 className="font-heading font-bold text-xl text-white mb-2">
                  Запрос по {product.name}
                </h3>
                <p className="text-white/40 text-sm mb-6">
                  Оставьте заявку и наш менеджер свяжется с вами
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="+998 __ ___ __ __"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                    required
                  />
                  <textarea
                    placeholder="Ваш вопрос или комментарий"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="form-input resize-none"
                  />
                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="btn-primary w-full justify-center disabled:opacity-50"
                  >
                    {formStatus === 'loading' && 'Отправка...'}
                    {formStatus === 'success' && '✓ Заявка отправлена!'}
                    {formStatus === 'error' && 'Ошибка. Попробуйте ещё раз'}
                    {formStatus === 'idle' && 'Отправить запрос'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-heading font-bold text-3xl text-foreground mb-8">
                Похожая техника
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link key={p.id} href={`/products/${p.slug}`} className="block group">
                    <div className="bg-card-bg rounded-xl overflow-hidden card-hover shadow-sm border border-border-color">
                      <div className="h-40 bg-gradient-to-br from-medium-grey/30 to-light-grey flex items-center justify-center">
                        <span className="text-5xl opacity-20">
                          {p.category === 'excavator' && '🏗️'}
                          {p.category === 'crane' && '🏗️'}
                          {p.category === 'loader' && '🚜'}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-sany-red transition-colors">
                          {p.name}
                        </h3>
                        <p className="text-text-muted text-sm mt-1">{p.shortDescription}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
