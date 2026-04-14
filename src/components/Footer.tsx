'use client';

import Link from 'next/link';
import { companyInfo, phoneNumbers } from '@/data/projects';
import { categoryLabels } from '@/data/products';
import { useTranslation } from '@/lib/i18n';

export default function Footer({ settings }: { settings?: any }) {
  const { t } = useTranslation();
  const isRu = t.nav.solutions === 'Решения';
  const s = settings || {};
  const activePhones = [
    { label: isRu ? 'Отдел продаж' : 'Sotuv bo\'limi', number: s.phone_sales || '+998 91 772 72 73' },
    { label: isRu ? 'Cервис' : 'Servis', number: s.phone_service || '+998 93 555 00 95' },
    { label: isRu ? 'Лизинг' : 'Lizing', number: s.phone_leasing || '+998 99 859 31 14' }
  ];

  return (
    <footer className="bg-anthracite text-white relative overflow-hidden">
      {/* Top Accent Line */}
      <div className="h-1 bg-gradient-to-r from-sany-red via-sany-red-light to-sany-red" />

      {/* Main Footer */}
      <div className="container-custom pt-16 lg:pt-24 pb-8 lg:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <svg viewBox="0 0 200 50" className="h-11 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Premium Official Sany Logo Mark */}
                <defs>
                  <linearGradient id="footer-logo-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e3000f" />
                    <stop offset="100%" stopColor="#8d000a" />
                  </linearGradient>
                </defs>
                <g>
                  {/* Background Circle */}
                  <circle cx="25" cy="25" r="24" fill="url(#footer-logo-bg-grad)" />
                  <circle cx="25" cy="25" r="21.5" stroke="white" strokeWidth="0.8" fill="none" opacity="0.6" />
                  
                  {/* Interlocking "1" Blades */}
                  <g fill="white" transform="translate(25, 25)">
                    <path d="M -2.5,-14 L 2.5,-14 L 2.5,2.5 L 14.5,2.5 L 14.5,6.5 L -2.5,6.5 Z" transform="rotate(0) translate(0, 1.5)" />
                    <path d="M -2.5,-14 L 2.5,-14 L 2.5,2.5 L 14.5,2.5 L 14.5,6.5 L -2.5,6.5 Z" transform="rotate(120) translate(0, 1.5)" />
                    <path d="M -2.5,-14 L 2.5,-14 L 2.5,2.5 L 14.5,2.5 L 14.5,6.5 L -2.5,6.5 Z" transform="rotate(240) translate(0, 1.5)" />
                    {/* Central Triangle Hole Fix */}
                    <path d="M 0,-3.5 L 4,2.5 L -4,2.5 Z" fill="url(#footer-logo-bg-grad)" />
                  </g>
                </g>
                <text x="60" y="28" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="24" fill="#ffffff" letterSpacing="1.5">SANY</text>
                <text x="62" y="42" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="9.5" fill="#a0a0a0" letterSpacing="3">CENTRAL ASIA</text>
              </svg>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
               SANY AUTOMOBILE MANUFACTURING CENTRAL ASIA. {t.hero.description.slice(0, 80)}...
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-white">{t.nav.about}</h3>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-white/50 text-sm hover:text-sany-red transition-colors flex items-center gap-2 underline-offset-4 hover:underline">{t.nav.products}</Link></li>
              <li><Link href="/solutions" className="text-white/50 text-sm hover:text-sany-red transition-colors flex items-center gap-2 underline-offset-4 hover:underline">{t.nav.solutions}</Link></li>
              <li><Link href="/projects" className="text-white/50 text-sm hover:text-sany-red transition-colors flex items-center gap-2 underline-offset-4 hover:underline">{t.nav.projects}</Link></li>
              <li><Link href="/contacts" className="text-white/50 text-sm hover:text-sany-red transition-colors flex items-center gap-2 underline-offset-4 hover:underline">{t.nav.contacts}</Link></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-white">{t.nav.products}</h3>
            <ul className="space-y-3">
              <li><Link href="/products?category=excavator" className="text-white/50 text-sm hover:text-sany-red transition-colors flex items-center gap-2 underline-offset-4 hover:underline">{isRu ? 'Экскаваторы' : 'Ekskavatorlar'}</Link></li>
              <li><Link href="/products?category=crane" className="text-white/50 text-sm hover:text-sany-red transition-colors flex items-center gap-2 underline-offset-4 hover:underline">{isRu ? 'Краны' : 'Kranlar'}</Link></li>
              <li><Link href="/products?category=truck" className="text-white/50 text-sm hover:text-sany-red transition-colors flex items-center gap-2 underline-offset-4 hover:underline">{isRu ? 'Самосвалы' : 'Agregatlar'}</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-white">{t.contacts.title}</h3>
            <div className="space-y-4">
              <p className="text-white/50 text-sm">{isRu ? s.address_ru : s.address_uz}</p>
              <div className="flex flex-col gap-2">
                {activePhones.map((ph, i) => (
                  <a key={i} href={`tel:${ph.number}`} className="text-white/60 text-sm hover:text-sany-red transition-colors">{ph.number}</a>
                ))}
              </div>
              <p className="text-white/30 text-xs">{isRu ? s.working_hours_ru : s.working_hours_uz}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm text-center">
            © {new Date().getFullYear()} SANY Uzbekistan. 
            {t.nav.solutions === 'Решения' ? ' Все права защищены.' : t.nav.solutions === 'Yechimlar' ? ' Barcha huquqlar himoyalangan.' : ' All rights reserved.'}
          </p>
          <p className="text-white/10 text-[10px] uppercase tracking-widest">Quality Changes the World</p>
        </div>
      </div>
    </footer>
  );
}
