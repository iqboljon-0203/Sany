'use client';

import { useTranslation } from '@/lib/i18n';
import { Clock, Package, Users, BarChart, Truck, ShieldCheck, Wrench, Settings, Star } from 'lucide-react';

const iconMap: Record<string, any> = {
  Clock, Package, Users, BarChart, Truck, ShieldCheck, Wrench, Settings, Star,
};

export default function ServiceClient({ servicesList = [] }: { servicesList?: any[] }) {
  const { t } = useTranslation();
  const isRu = t.nav.solutions === 'Решения';

  const fallback = [
    { icon: 'Clock', title: isRu ? 'Поддержка 24/7' : 'Qo\'llab-quvvatlash 24/7', desc: isRu ? 'Круглосуточная горячая линия для экстренных вызовов. Минимальное время реагирования в Ташкентской области — 2 часа.' : 'Shoshilinch chaqiruvlar uchun kundalik ishchi liniya. Toshkent viloyatida minimal javob vaqti — 2 soat.' },
    { icon: 'Package', title: isRu ? 'Оригинальные запчасти' : 'Original ehtiyot qismlar', desc: isRu ? 'Крупный склад оригинальных запасных частей SANY на базе в Сергели, Ташкент.' : 'Sergelida SANY ning original ehtiyot qismlari ombori.' },
    { icon: 'Users', title: isRu ? 'Обученные инженеры' : 'Malakali muhandislar', desc: isRu ? 'Более 50 сертифицированных специалистов, прошедших обучение на заводах SANY.' : '50 dan ortiq sertifikatlangan mutaxassislar.' },
    { icon: 'BarChart', title: isRu ? 'Диагностика' : 'Diagnostika', desc: isRu ? 'Современное диагностическое оборудование для любых моделей техники SANY.' : 'SANY texnikasining barcha modellari uchun zamonaviy diagnostika.' },
    { icon: 'Truck', title: isRu ? 'Выездные бригады' : 'Chiqish brigadalari', desc: isRu ? 'Мобильные сервисные бригады по всему Узбекистану.' : 'O\'zbekiston bo\'ylab mobil servis brigadalari.' },
    { icon: 'ShieldCheck', title: isRu ? 'Гарантийное обслуживание' : 'Kafolatli xizmat', desc: isRu ? 'Полное гарантийное обслуживание от производителя.' : 'Ishlab chiqaruvchidan to\'liq kafolat xizmati.' },
  ];

  const displayServices = servicesList.length > 0
    ? servicesList.map(s => ({
        icon: s.icon,
        title: isRu ? s.title_ru : s.title_uz,
        desc: isRu ? s.desc_ru : s.desc_uz,
      }))
    : fallback;

  const warehouseItems = isRu
    ? ['Фильтры и масла', 'Гидравлические компоненты', 'Электрические системы', 'Ходовая часть', 'Двигатели и комплектующие', 'Навесное оборудование']
    : ['Filtrlar va moylar', 'Gidravlik komponentlar', 'Elektr tizimlari', 'Yugurish qismi', 'Dvigatellar va butlovchi qismlar', 'Osma jihozlar'];

  return (
    <div className="pt-[82px]">
      {/* Hero */}
      <section className="bg-anthracite py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="svc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#svc-grid)" />
          </svg>
        </div>
        <div className="container-custom relative z-10">
          <span className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block">
            {isRu ? 'Поддержка' : 'Qo\'llab-quvvatlash'}
          </span>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-4">
            {isRu ? 'Сервис и ' : 'Servis va '}<span className="gradient-text-red">{isRu ? 'запчасти' : 'ehtiyot qismlar'}</span>
          </h1>
          <p className="text-white/40 max-w-xl text-lg">
            {isRu ? 'Полный цикл послепродажного обслуживания: от диагностики до капитального ремонта. Круглосуточная техническая поддержка.' : 'Diagnostikadan kapital ta\'mirgacha to\'liq sotuvdan keyingi xizmat. Kundalik texnik qo\'llab-quvvatlash.'}
          </p>
        </div>
      </section>

      {/* Service Features */}
      <section className="section-padding bg-light-grey">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((item, i) => {
              const IconComponent = iconMap[item.icon] || Clock;
              return (
                <div key={i} className="bg-white rounded-xl p-8 shadow-sm card-hover group">
                  <div className="w-14 h-14 rounded-xl bg-sany-red/10 text-sany-red flex items-center justify-center mb-5 group-hover:bg-sany-red group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-anthracite mb-3">{item.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Warehouse Section */}
      <section className="section-padding bg-anthracite">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block">
                {isRu ? 'Склад запчастей' : 'Ehtiyot qismlar ombori'}
              </span>
              <h2 className="text-4xl font-heading font-bold text-white mb-6">
                {isRu ? 'Сергели, Ташкент' : 'Sergeli, Toshkent'}
              </h2>
              <p className="text-white/50 mb-8 leading-relaxed">
                {isRu ? 'Наш основной склад оригинальных запасных частей расположен в районе Сергели, Ташкент. Площадь склада — более 2000 м². В наличии более 5000 наименований запчастей для всех моделей техники SANY.' : 'Bizning asosiy ehtiyot qismlar omborimiz Toshkent, Sergeli tumanida joylashgan. Ombor maydoni — 2000 m² dan ortiq. SANY texnikasining barcha modellari uchun 5000 dan ortiq turdagi ehtiyot qismlar mavjud.'}
              </p>
              <div className="space-y-4">
                {warehouseItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sany-red rounded-full" />
                    <span className="text-white/60 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-80 lg:h-[400px] rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.5!2d69.279737!3d41.311081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzM5LjkiTiA2OcKwMTYnNDcuMSJF!5e0!3m2!1sru!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.3)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SANY Uzbekistan - Склад запчастей"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
