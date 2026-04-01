import { Metadata } from 'next';
import Link from 'next/link';
import { categoryLabels } from '@/data/products';

export const metadata: Metadata = {
  title: 'Решения SANY для вашего бизнеса',
  description: 'Комплексные решения SANY для строительства, горнодобычи, дорожного строительства и инфраструктурных проектов в Узбекистане.',
};

const solutions = [
  {
    title: 'Горнодобыча',
    description: 'Полный комплект техники для открытых и подземных горных работ: карьерные самосвалы, экскаваторы, буровые установки.',
    machines: ['SY365H', 'SRT95C', 'SR200C'],
    icon: '⛏️',
    features: ['Карьерные экскаваторы до 800 т', 'Жёсткие самосвалы до 400 т', 'Буровые установки', 'Интеллектуальная система управления парком'],
  },
  {
    title: 'Строительство',
    description: 'Универсальная техника для жилищного, промышленного и коммерческого строительства любого масштаба.',
    machines: ['SY215C', 'STC250', 'SY412C-8S'],
    icon: '🏗️',
    features: ['Экскаваторы от 1.5 до 80 т', 'Автокраны до 2000 т', 'Бетонная техника', 'Башенные краны'],
  },
  {
    title: 'Дорожное строительство',
    description: 'Комплексные решения для строительства и ремонта дорог: автогрейдеры, катки, погрузчики.',
    machines: ['SDG25S', 'SSR220AC', 'STL956H'],
    icon: '🛣️',
    features: ['Автогрейдеры', 'Вибрационные катки', 'Фронтальные погрузчики', 'Асфальтоукладчики'],
  },
  {
    title: 'Инфраструктура',
    description: 'Техника для строительства мостов, тоннелей, метрополитена и других крупных инфраструктурных объектов.',
    machines: ['SCC8000A', 'SR200C', 'SY215C'],
    icon: '🚇',
    features: ['Гусеничные краны до 3600 т', 'Роторные буровые установки', 'Сваебойные установки', 'Щитовые проходческие комплексы'],
  },
  {
    title: 'Энергетика',
    description: 'Специализированная техника для строительства электростанций, ЛЭП, подстанций и нефтегазовых объектов.',
    machines: ['SCC8000A', 'STC250', 'SR200C'],
    icon: '⚡',
    features: ['Тяжёлые гусеничные краны', 'Автокраны для монтажа', 'Буровые установки', 'Трейлеры и тягачи'],
  },
  {
    title: 'Логистика',
    description: 'Погрузочно-разгрузочная техника для портов, складов. Эффективные решения для логистических центров.',
    machines: ['STL956H', 'SY215C'],
    icon: '📦',
    features: ['Фронтальные погрузчики', 'Контейнерные погрузчики', 'Мини-экскаваторы', 'Телескопические погрузчики'],
  },
];

export default function SolutionsPage() {
  return (
    <div className="pt-[82px]">
      {/* Hero */}
      <section className="bg-anthracite py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="solutions-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#solutions-grid)" />
          </svg>
        </div>
        <div className="container-custom relative z-10">
          <span className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block">
            Решения
          </span>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-4">
            Решения для <span className="gradient-text-red">вашей отрасли</span>
          </h1>
          <p className="text-white/40 max-w-2xl text-lg">
            SANY предлагает комплексные решения для ключевых отраслей Узбекистана. 
            От подбора техники до полного сервисного сопровождения.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="section-padding bg-light-grey">
        <div className="container-custom">
          <div className="space-y-8">
            {solutions.map((solution, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Info */}
                  <div className="p-10 lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{solution.icon}</span>
                      <h2 className="text-3xl font-heading font-bold text-anthracite">
                        {solution.title}
                      </h2>
                    </div>
                    <p className="text-text-muted leading-relaxed mb-6 max-w-2xl">
                      {solution.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {solution.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-sany-red rounded-full shrink-0" />
                          <span className="text-sm text-anthracite/70">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {solution.machines.map((machine) => (
                        <span
                          key={machine}
                          className="px-3 py-1.5 bg-light-grey text-anthracite/70 text-xs font-semibold rounded-full"
                        >
                          {machine}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Side */}
                  <div className="bg-gradient-to-br from-anthracite to-anthracite-light flex flex-col items-center justify-center p-10 text-center">
                    <span className="text-7xl mb-4 opacity-30">{solution.icon}</span>
                    <Link
                      href="/contacts"
                      className="btn-primary !text-sm"
                    >
                      Получить предложение
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
