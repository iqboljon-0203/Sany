'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { FormStatus } from '@/types';
import { useTranslation } from '@/lib/i18n';

export default function LeasingCalculator({ config }: { config?: any }) {
  const annualRate = config?.annual_rate ?? 22;
  const initPrice = 850000000;
  const initDP = config?.min_prepayment ?? 30;
  const initTerm = 24;

  const [price, setPrice] = useState<number>(initPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(initDP);
  const [leaseTerm, setLeaseTerm] = useState<number>(initTerm);
  const [interestRate] = useState<number>(annualRate);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { t } = useTranslation();

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
          machine: 'Leasing Request',
          message: `Price: ${formatUZS(price)} UZS, DP: ${downPaymentPercent}%, Term: ${leaseTerm} mo.`,
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
    <section id="leasing" className="section-padding bg-background relative overflow-hidden noise-overlay border-t border-border-color">
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
            {t.leasing.subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4"
          >
            {t.leasing.title}
          </motion.h2>
          <p className="text-text-muted max-w-xl mx-auto">
            {t.leasing.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card-bg border border-border-color rounded-2xl p-8"
          >
            {/* Price Input */}
            <div className="mb-8">
              <label className="text-foreground/50 text-sm font-medium mb-3 block">{t.leasing.price}</label>
              <div className="relative">
                <input
                  type="text"
                  value={formatUZS(price)}
                  onChange={(e) => {
                    const num = parseInt(e.target.value.replace(/\D/g, ''));
                    if (!isNaN(num) && num >= 0) setPrice(num);
                  }}
                  className="form-input-light text-2xl font-heading font-bold !pr-16"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30 text-sm">UZS</span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                <label className="text-foreground/50 text-sm font-medium">{t.leasing.downPayment}</label>
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
                <span className="text-foreground/30 text-xs">20%</span>
                <span className="text-foreground/50 text-xs font-semibold">{formatUZS(calculations.downPaymentAmount)} UZS</span>
                <span className="text-foreground/30 text-xs">50%</span>
              </div>
            </div>

            {/* Term Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-foreground/50 text-sm font-medium">{t.leasing.term}</label>
                <span className="text-sany-red font-heading font-bold text-lg">{leaseTerm} mo.</span>
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
                <span className="text-foreground/30 text-xs">12 mo.</span>
                <span className="text-foreground/30 text-xs">48 mo.</span>
              </div>
            </div>

            {/* Interest Rate Display */}
            <div className="flex items-center gap-3 p-4 bg-light-grey rounded-lg border border-border-color">
              <svg className="w-5 h-5 text-sany-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-foreground/40 text-sm">{t.leasing.interestRate}: <span className="text-foreground font-semibold">{interestRate}%</span></span>
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
              <p className="text-white/80 text-sm uppercase tracking-wider mb-2">{t.leasing.monthlyPayment}</p>
              <div className="flex items-end flex-wrap gap-2 mb-6">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white break-all">
                  {formatUZS(calculations.monthlyPayment)}
                </span>
                <span className="text-lg font-medium text-white/80 mb-1 sm:mb-2">sum/mo</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/60 text-xs mb-1">{t.leasing.downPayment}</p>
                  <p className="text-white font-bold text-sm">{formatUZS(calculations.downPaymentAmount)} sum</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/60 text-xs mb-1">{t.leasing.loanAmount}</p>
                  <p className="text-white font-bold text-sm">{formatUZS(calculations.loanAmount)} sum</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/60 text-xs mb-1">{t.leasing.totalPayment}</p>
                  <p className="text-white font-bold text-sm">{formatUZS(calculations.totalPayment)} sum</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/60 text-xs mb-1">{t.leasing.overpayment}</p>
                  <p className="text-white font-bold text-sm">{formatUZS(calculations.overpayment)} sum</p>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-card-bg border border-border-color rounded-2xl p-6 sm:p-8 flex-1 mt-4 relative z-10 w-full">
              <h3 className="text-foreground font-heading font-bold text-xl mb-6">{t.leasing.apply}</h3>
              <form onSubmit={handleSubmitLeasing} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder={t.leasing.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input-light"
                  required
                />
                <input
                  type="tel"
                  placeholder="+998 __ ___ __ __"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input-light"
                  required
                />
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="btn-primary w-full justify-center !py-4 disabled:opacity-50"
                >
                  {formStatus === 'loading' && '...'}
                  {formStatus === 'success' && '✓'}
                  {formStatus === 'error' && '!'}
                  {formStatus === 'idle' && t.leasing.apply}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
