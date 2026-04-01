'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { FormStatus } from '@/types';

export default function LeasingCalculator() {
  const [price, setPrice] = useState<number>(850000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [leaseTerm, setLeaseTerm] = useState<number>(24);
  const [interestRate] = useState<number>(22);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const calculations = useMemo(() => {
    const downPaymentAmount = (price * downPaymentPercent) / 100;
    const loanAmount = price - downPaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, leaseTerm)) /
      (Math.pow(1 + monthlyRate, leaseTerm) - 1);
    const totalPayment = monthlyPayment * leaseTerm + downPaymentAmount;
    const overpayment = totalPayment - price;

    return {
      downPaymentAmount,
      loanAmount,
      monthlyPayment,
      totalPayment,
      overpayment,
    };
  }, [price, downPaymentPercent, leaseTerm, interestRate]);

  const formatUZS = useCallback((num: number): string => {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }, []);

  const handleSubmitLeasing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setFormStatus('loading');
    try {
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          machine: 'Лизинг заявка',
          message: `Цена: ${formatUZS(price)} сум, Первый взнос: ${downPaymentPercent}%, Срок: ${leaseTerm} мес., Ежемесячный платёж: ${formatUZS(calculations.monthlyPayment)} сум`,
          leasingData: {
            machinePrice: price,
            downPaymentPercent,
            downPaymentAmount: calculations.downPaymentAmount,
            leaseTerm,
            interestRate,
            monthlyPayment: calculations.monthlyPayment,
            totalPayment: calculations.totalPayment,
          },
        }),
      });
      if (response.ok) {
        setFormStatus('success');
        setName('');
        setPhone('');
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

  const downPaymentStyle = { '--value': `${((downPaymentPercent - 20) / 30) * 100}%` } as React.CSSProperties;
  const termStyle = { '--value': `${((leaseTerm - 12) / 36) * 100}%` } as React.CSSProperties;

  return (
    <section id="leasing" className="section-padding bg-anthracite relative overflow-hidden noise-overlay">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sany-red/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sany-red/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block"
          >
            Финансирование
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4"
          >
            Лизинг <span className="gradient-text-red">калькулятор</span>
          </motion.h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Рассчитайте условия лизинга техники SANY в Узбекистане. Гибкие условия от 12 до 48 месяцев.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            {/* Price Input */}
            <div className="mb-8">
              <label className="text-white/50 text-sm font-medium mb-3 block">Стоимость техники (UZS)</label>
              <div className="relative">
                <input
                  type="text"
                  value={formatUZS(price)}
                  onChange={(e) => {
                    const num = parseInt(e.target.value.replace(/\D/g, ''));
                    if (!isNaN(num) && num >= 0) setPrice(num);
                  }}
                  className="form-input text-2xl font-heading font-bold !pr-16"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">сум</span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                <label className="text-white/50 text-sm font-medium">Первоначальный взнос</label>
                <span className="text-sany-red font-heading font-bold text-lg">{downPaymentPercent}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="50"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
                className="w-full"
                style={downPaymentStyle}
              />
              <div className="flex justify-between mt-2">
                <span className="text-white/30 text-xs">20%</span>
                <span className="text-white/50 text-xs font-semibold">{formatUZS(calculations.downPaymentAmount)} сум</span>
                <span className="text-white/30 text-xs">50%</span>
              </div>
            </div>

            {/* Term Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-white/50 text-sm font-medium">Срок лизинга</label>
                <span className="text-sany-red font-heading font-bold text-lg">{leaseTerm} мес.</span>
              </div>
              <input
                type="range"
                min="12"
                max="48"
                step="6"
                value={leaseTerm}
                onChange={(e) => setLeaseTerm(parseInt(e.target.value))}
                className="w-full"
                style={termStyle}
              />
              <div className="flex justify-between mt-2">
                <span className="text-white/30 text-xs">12 мес.</span>
                <span className="text-white/30 text-xs">48 мес.</span>
              </div>
            </div>

            {/* Interest Rate Display */}
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
              <svg className="w-5 h-5 text-sany-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white/40 text-sm">Годовая ставка: <span className="text-white font-semibold">{interestRate}%</span></span>
            </div>
          </motion.div>

          {/* Result & Application */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            {/* Result Card */}
            <div className="bg-gradient-to-br from-sany-red to-sany-red-dark rounded-2xl p-6 sm:p-8 mb-6 relative z-10">
              <p className="text-white/80 text-sm uppercase tracking-wider mb-2">Ежемесячный платёж</p>
              <div className="flex items-end flex-wrap gap-2 mb-6">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white break-all">
                  {formatUZS(calculations.monthlyPayment)}
                </span>
                <span className="text-lg font-medium text-white/80 mb-1 sm:mb-2">сум/мес</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/60 text-xs mb-1">Первый взнос</p>
                  <p className="text-white font-bold text-sm">{formatUZS(calculations.downPaymentAmount)} сум</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/60 text-xs mb-1">Сумма кредита</p>
                  <p className="text-white font-bold text-sm">{formatUZS(calculations.loanAmount)} сум</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/60 text-xs mb-1">Общая выплата</p>
                  <p className="text-white font-bold text-sm">{formatUZS(calculations.totalPayment)} сум</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/60 text-xs mb-1">Переплата</p>
                  <p className="text-white font-bold text-sm">{formatUZS(calculations.overpayment)} сум</p>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="glass rounded-2xl p-6 sm:p-8 flex-1 mt-4 relative z-10 w-full">
              <h3 className="text-white font-heading font-bold text-xl mb-6">Заявка на лизинг</h3>
              <form onSubmit={handleSubmitLeasing} className="flex flex-col gap-4">
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
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="btn-primary w-full justify-center !py-4 disabled:opacity-50"
                >
                  {formStatus === 'loading' && 'Отправка...'}
                  {formStatus === 'success' && '✓ Заявка отправлена!'}
                  {formStatus === 'error' && 'Ошибка. Попробуйте ещё раз'}
                  {formStatus === 'idle' && 'Отправить заявку'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
