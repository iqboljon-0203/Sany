import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Сервис и запчасти SANY',
  description: 'Сервисное обслуживание техники SANY в Узбекистане. Круглосуточная поддержка 24/7. Склад запасных частей в Ташкенте, Сергели.',
};

export default function ServicePage() {
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
            Поддержка
          </span>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-4">
            Сервис и <span className="gradient-text-red">запчасти</span>
          </h1>
          <p className="text-white/40 max-w-xl text-lg">
            Полный цикл послепродажного обслуживания: от диагностики до капитального ремонта. Круглосуточная техническая поддержка.
          </p>
        </div>
      </section>

      {/* Service Features */}
      <section className="section-padding bg-light-grey">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Поддержка 24/7',
                desc: 'Круглосуточная горячая линия для экстренных вызовов. Минимальное время реагирования в Ташкентской области — 2 часа.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                title: 'Оригинальные запчасти',
                desc: 'Крупный склад оригинальных запасных частей SANY на базе в Сергели, Ташкент. Доставка по всему Узбекистану.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Обученные инженеры',
                desc: 'Более 50 сертифицированных специалистов, прошедших обучение на заводах SANY. Регулярное повышение квалификации.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'Диагностика',
                desc: 'Современное диагностическое оборудование для любых моделей техники SANY. Компьютерная диагностика электронных систем.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                ),
                title: 'Выездные бригады',
                desc: 'Мобильные сервисные бригады по всему Узбекистану. Ремонт непосредственно на объекте заказчика.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Гарантийное обслуживание',
                desc: 'Полное гарантийное обслуживание от производителя. Расширенная гарантия при заключении сервисного контракта.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm card-hover group">
                <div className="w-14 h-14 rounded-xl bg-sany-red/10 text-sany-red flex items-center justify-center mb-5 group-hover:bg-sany-red group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-anthracite mb-3">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warehouse Section */}
      <section className="section-padding bg-anthracite">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block">
                Склад запчастей
              </span>
              <h2 className="text-4xl font-heading font-bold text-white mb-6">
                Сергели, Ташкент
              </h2>
              <p className="text-white/50 mb-8 leading-relaxed">
                Наш основной склад оригинальных запасных частей расположен в районе Сергели, Ташкент. 
                Площадь склада — более 2000 м². В наличии более 5000 наименований запчастей для всех моделей техники SANY.
              </p>
              <div className="space-y-4">
                {[
                  'Фильтры и масла',
                  'Гидравлические компоненты',
                  'Электрические системы',
                  'Ходовая часть',
                  'Двигатели и комплектующие',
                  'Навесное оборудование',
                ].map((item, i) => (
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
