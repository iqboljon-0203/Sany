import { Metadata } from 'next';
import LeasingCalculator from '@/components/LeasingCalculator';

export const metadata: Metadata = {
  title: 'Лизинг техники SANY',
  description: 'Рассчитайте лизинг техники SANY в Узбекистане. Гибкие условия от 12 до 48 месяцев. Первый взнос от 20%.',
};

export default function LeasingPage() {
  return (
    <div className="pt-[82px]">
      <LeasingCalculator />

      {/* Leasing Advantages */}
      <section className="section-padding bg-light-grey">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block">
              Условия
            </span>
            <h2 className="text-4xl font-heading font-bold text-anthracite mb-4">
              Преимущества лизинга
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '📉',
                title: 'Первый взнос от 20%',
                desc: 'Минимальный первоначальный взнос для старта работы',
              },
              {
                icon: '📅',
                title: 'До 48 месяцев',
                desc: 'Выбирайте удобный срок лизинга',
              },
              {
                icon: '⚡',
                title: 'Быстрое одобрение',
                desc: 'Решение по заявке в течение 2 рабочих дней',
              },
              {
                icon: '🛡️',
                title: 'Страхование включено',
                desc: 'Полное КАСКО на весь срок лизинга',
              },
            ].map((item, i) => (
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
              Как оформить лизинг?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Заявка', desc: 'Оставьте заявку на сайте или по телефону' },
                { step: '02', title: 'Расчёт', desc: 'Наш менеджер подберёт оптимальные условия' },
                { step: '03', title: 'Одобрение', desc: 'Получите решение в течение 2 дней' },
                { step: '04', title: 'Получение', desc: 'Подписание договора и получение техники' },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <span className="text-5xl font-heading font-bold text-sany-red/10 block mb-2">
                      {item.step}
                    </span>
                    <h4 className="font-heading font-bold text-lg text-anthracite mb-2">
                      {item.title}
                    </h4>
                    <p className="text-text-muted text-sm">{item.desc}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 text-sany-red/30">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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
