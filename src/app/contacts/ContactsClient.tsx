'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import type { FormStatus } from '@/types';

export default function ContactsClient({ settings }: { settings: any }) {
  const { t } = useTranslation();
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [machineInterest, setMachineInterest] = useState('');
  const [message, setMessage] = useState('');

  const isRu = t.nav.solutions === 'Решения';
  const s = settings || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setFormStatus('loading');
    try {
      const res = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, machine: machineInterest, message }),
      });
      if (res.ok) {
        setFormStatus('success');
        setName('');
        setPhone('');
        setMachineInterest('');
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

  const contactOptions = [
    { label: isRu ? 'ПРОДАЖИ' : 'SOTUV', number: s.phone_sales },
    { label: isRu ? 'СЕРВИС' : 'SERVIS', number: s.phone_service },
    { label: isRu ? 'ЛИЗИНГ' : 'LIZING', number: s.phone_leasing },
  ];

  return (
    <div className="pt-[82px]">
      {/* Hero */}
      <section className="bg-background py-20 relative overflow-hidden border-b border-border-color">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.05" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-grid)" />
          </svg>
        </div>
        <div className="container-custom relative z-10">
          <span className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block">
            {t.contacts.subtitle}
          </span>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-4">
            {t.contacts.title}
          </h1>
          <p className="text-text-muted max-w-xl text-lg">
            {t.contacts.description}
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-padding bg-light-grey">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
                {isRu ? 'Информация' : 'Ma\'lumotlar'}
              </h2>

              {/* Address */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-sany-red/10 text-sany-red flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-1">{t.contacts.address}</h3>
                  <p className="text-text-muted">{isRu ? s.address_ru : s.address_uz}</p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="space-y-4 mb-8">
                {contactOptions.map((ph, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-sany-red/10 text-sany-red flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-text-muted text-xs uppercase tracking-wider">{ph.label}</p>
                      <a href={`tel:${ph.number}`} className="font-heading font-bold text-lg text-foreground hover:text-sany-red transition-colors">
                        {ph.number}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-sany-red/10 text-sany-red flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-1">{t.contacts.workingHours}</h3>
                  <p className="text-text-muted">{isRu ? s.working_hours_ru : s.working_hours_uz}</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-8">
                {s.telegram_url && (
                  <a href={s.telegram_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#0088cc] flex items-center justify-center hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  </a>
                )}
                {s.whatsapp_url && (
                  <a href={s.whatsapp_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-card-bg rounded-2xl shadow-lg p-10 border border-border-color">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  {t.contacts.formTitle}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-sm text-foreground/70 font-medium mb-2 block">{isRu ? 'Имя' : 'Ismingiz'} *</label>
                    <input
                      type="text"
                      placeholder={isRu ? 'Имя' : 'Ismingiz'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input-light"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-foreground/70 font-medium mb-2 block">{isRu ? 'Телефон' : 'Telefon'} *</label>
                    <input
                      type="tel"
                      placeholder="+998 __ ___ __ __"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input-light"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-foreground/70 font-medium mb-2 block">{isRu ? 'Интересующая техника' : 'Texnika'}</label>
                    <input
                      type="text"
                      placeholder={isRu ? 'Например: SY215C' : 'Masalan: SY215C'}
                      value={machineInterest}
                      onChange={(e) => setMachineInterest(e.target.value)}
                      className="form-input-light"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-foreground/70 font-medium mb-2 block">{isRu ? 'Сообщение' : 'Xabar'}</label>
                    <textarea
                      placeholder={isRu ? 'Ваше сообщение...' : 'Xabaringiz...'}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="form-input-light resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="btn-primary w-full justify-center !py-4 disabled:opacity-50"
                  >
                    {formStatus === 'loading' && '...'}
                    {formStatus === 'success' && '✓'}
                    {formStatus === 'error' && '!'}
                    {formStatus === 'idle' && t.contacts.submit}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[450px]">
        <iframe
          src={s.map_iframe}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="SANY Uzbekistan Office"
        />
      </section>
    </div>
  );
}
