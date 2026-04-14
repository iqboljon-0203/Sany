'use client';

import { useTranslation } from '@/lib/i18n';
import LeasingCalculator from '@/components/LeasingCalculator';
import { ChevronRight } from 'lucide-react';

interface LeasingClientProps {
  config?: any;
  advantages?: any[];
  steps?: any[];
}

export default function LeasingClient({ config, advantages = [], steps = [] }: LeasingClientProps) {
  const { t, locale } = useTranslation();

  const defaultAdvantages = [
    { icon: '📉', title: locale === 'ru' ? 'Первый взнос от 20%' : locale === 'uz' ? 'Birinchi to\'lov 20% dan' : 'Down payment from 20%', desc: locale === 'ru' ? 'Минимальный первоначальный взнос' : locale === 'uz' ? 'Minimal boshlang\'ich to\'lov' : 'Minimum down payment' },
    { icon: '📅', title: locale === 'ru' ? 'До 48 месяцев' : locale === 'uz' ? '48 oygacha' : 'Up to 48 months', desc: locale === 'ru' ? 'Выбирайте удобный срок лизинга' : locale === 'uz' ? 'Qulay lizing muddatini tanlang' : 'Choose a convenient leasing term' },
    { icon: '⚡', title: locale === 'ru' ? 'Быстрое одобрение' : locale === 'uz' ? 'Tezkor tasdiqlash' : 'Fast approval', desc: locale === 'ru' ? 'Решение в течение 2 рабочих дней' : locale === 'uz' ? '2 ish kuni ichida qaror' : 'Decision within 2 working days' },
    { icon: '🛡️', title: locale === 'ru' ? 'Страхование включено' : locale === 'uz' ? 'Sug\'urta kiritilgan' : 'Insurance included', desc: locale === 'ru' ? 'Полное КАСКО на весь срок' : locale === 'uz' ? 'Butun muddat uchun KASKO' : 'Full insurance for the entire term' },
  ];

  const defaultSteps = [
    { step: '01', title: locale === 'ru' ? 'Заявка' : locale === 'uz' ? 'Ariza' : 'Request', desc: locale === 'ru' ? 'Оставьте заявку на сайте' : locale === 'uz' ? 'Saytda ariza qoldiring' : 'Leave a request on the site' },
    { step: '02', title: locale === 'ru' ? 'Расчёт' : locale === 'uz' ? 'Hisob-kitob' : 'Calculation', desc: locale === 'ru' ? 'Наш менеджер подберёт условия' : locale === 'uz' ? 'Menejerimiz shartlarni tanlaydi' : 'Our manager will select terms' },
    { step: '03', title: locale === 'ru' ? 'Одобрение' : locale === 'uz' ? 'Tasdiqlash' : 'Approval', desc: locale === 'ru' ? 'Получите решение в течение 2 дней' : locale === 'uz' ? '2 kun ichida qaror oling' : 'Get a decision within 2 days' },
    { step: '04', title: locale === 'ru' ? 'Получение' : locale === 'uz' ? 'Qabul qilish' : 'Delivery', desc: locale === 'ru' ? 'Подписание договора и техники' : locale === 'uz' ? 'Shartnomani imzolash va texnikani olish' : 'Signing contract and delivery' },
  ];

  const displayAds = advantages.length > 0
    ? advantages.map(a => ({
        icon: a.icon,
        title: locale === 'ru' ? a.title_ru : locale === 'uz' ? a.title_uz : a.title_en || a.title_ru,
        desc: locale === 'ru' ? a.desc_ru : locale === 'uz' ? a.desc_uz : a.desc_en || a.desc_ru,
      }))
    : defaultAdvantages;

  const displaySteps = steps.length > 0
    ? steps.map(s => ({
        step: s.step_num,
        title: locale === 'ru' ? s.title_ru : locale === 'uz' ? s.title_uz : s.title_en || s.title_ru,
        desc: locale === 'ru' ? s.desc_ru : locale === 'uz' ? s.desc_uz : s.desc_en || s.desc_ru,
      }))
    : defaultSteps;

  return (
    <div className="pt-[82px]">
      <LeasingCalculator config={config} />

      {/* Leasing Advantages */}
      <section className="section-padding bg-light-grey">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block">
              {t.leasing.subtitle}
            </span>
            <h2 className="text-4xl font-heading font-bold text-anthracite mb-4">
              {t.leasing.advantagesTitle || (locale === 'ru' ? 'Преимущества лизинга' : locale === 'uz' ? 'Lizing afzalliklari' : 'Leasing Advantages')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayAds.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm card-hover text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-heading font-bold text-lg text-anthracite mb-2">{item.title}</h3>
                <p className="text-text-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Process Steps */}
          <div className="mt-20">
            <h3 className="text-3xl font-heading font-bold text-anthracite text-center mb-12">
              {t.leasing.howToTitle || (locale === 'ru' ? 'Как оформить лизинг?' : locale === 'uz' ? 'Lizingni qanday rasmiylashtirish kerak?' : 'How to get leasing?')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {displaySteps.map((item, i) => (
                <div key={i} className="relative">
                  <div className="bg-white rounded-xl p-6 shadow-sm h-full">
                    <span className="text-5xl font-heading font-bold text-sany-red/10 block mb-2">
                      {item.step}
                    </span>
                    <h4 className="font-heading font-bold text-lg text-anthracite mb-2">
                      {item.title}
                    </h4>
                    <p className="text-text-muted text-sm">{item.desc}</p>
                  </div>
                  {i < displaySteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 text-sany-red/30 z-10 translate-y-[-50%]">
                      <ChevronRight className="w-8 h-8" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
