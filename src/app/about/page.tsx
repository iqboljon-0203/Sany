import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'О компании SANY Uzbekistan',
  description: 'SANY — официальный представитель в Узбекистане и Центральной Азии. Узнайте о нашей истории, миссии и ценностях.',
};

export default function AboutPage() {
  return (
    <div className="pt-[82px]">
      {/* Hero */}
      <section className="bg-anthracite py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-grid)" />
          </svg>
        </div>
        <div className="container-custom relative z-10">
          <span className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block">
            О нас
          </span>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-4">
            Quality Changes <span className="gradient-text-red">the World</span>
          </h1>
          <p className="text-white/40 max-w-2xl text-lg">
            Компания ИП ООО «SANY AUTOMOBILE MANUFACTURING CENTRAL ASIA» является официальным представительством заводов производителей техники «SANY GROUP» (Китай) на территории Республики Узбекистан и Центральной Азии.
            <br /><br />
            Компания «SANY GROUP» является крупнейшим в Китае и четвёртым по величине в мире производителем тяжёлой строительной техники (занимает первое место в мире по производству экскаваторов, бетономешалок и кранов).
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-sany-red py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '1989', label: 'Год основания SANY' },
              { value: '150+', label: 'Стран присутствия' },
              { value: '100 000+', label: 'Сотрудников по миру' },
              { value: 'ТОП-5', label: 'В мировом рейтинге' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-light-grey">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block">
                Наша миссия
              </span>
              <h2 className="text-4xl font-heading font-bold text-anthracite mb-6">
                Строим будущее Узбекистана вместе
              </h2>
              <p className="text-text-muted leading-relaxed mb-6">
                Техника «SANY» на территории Республики Узбекистан участвует в строительстве важных государственных объектов таких как: строительство Медно-Обогатительной Фабрики <strong>(МОФ-3) в г. Алмалыке</strong>; На карьере <strong>«Мурунтау»</strong> при добыче золота; <strong>Байсунский газоперерабатывающий завод</strong>; Завод по производству сжиженного газа <strong>«Uzbekistan GTL»</strong> в Кашкадарьинской области; <strong>Надземное метро</strong> в г. Ташкенте; <strong>Ташкент-Сити</strong>; <strong>Самарканд-Сити</strong>; Строительство гидроэлектростанций, водных и дорожных объектов по всей республике и многих других.
              </p>
              <p className="text-text-muted leading-relaxed mb-8">
                Крупные клиенты компании, эксплуатирующие технику «SANY»: МИНИСТЕРСТВО ВОДНОГО ХОЗЯЙСТВА РУз; МИНИСТЕРСТВО АВТОМОБИЛЬНЫХ ДОРОГ РУз подразделения; МИНИСТЕРСТВО ЖЕЛЕЗНЫХ ДОРОГ РУз; <strong>АГМК; ENTER ENGINEERING; УЗБЕКГИДРОЭНЕРГО; КУПРИККУРИЛИШ; ТРЕСТ-12; KRANTAS; ELLIPS (подряд НГМК)</strong> и многие другие.
              </p>
              <Link href="/contacts" className="btn-primary !bg-anthracite hover:!bg-sany-red">
                Связаться с нами
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Продажи', desc: 'Полный ассортимент техники SANY', icon: '📦' },
                { title: 'Лизинг', desc: 'Гибкие финансовые решения', icon: '💰' },
                { title: 'Сервис', desc: '24/7 техническая поддержка', icon: '🔧' },
                { title: 'Запчасти', desc: 'Склад в Ташкенте', icon: '⚙️' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm card-hover">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-heading font-bold text-anthracite mb-1">{item.title}</h3>
                  <p className="text-text-muted text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-anthracite">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block">
              Ценности
            </span>
            <h2 className="text-4xl font-heading font-bold text-white">
              Наши принципы
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Качество',
                desc: 'Каждая единица техники проходит строгий контроль качества на заводах SANY. Мы гарантируем надёжность и долговечность.',
                num: '01',
              },
              {
                title: 'Инновации',
                desc: 'Непрерывные инвестиции в R&D. Более 10 000 патентов и постоянное совершенствование технологий производства.',
                num: '02',
              },
              {
                title: 'Партнёрство',
                desc: 'Долгосрочные отношения с клиентами. Индивидуальный подход и комплексные решения для каждого проекта.',
                num: '03',
              },
            ].map((item, i) => (
              <div key={i} className="glass rounded-xl p-10 group hover:border-sany-red/30 transition-all">
                <span className="text-6xl font-heading font-bold text-sany-red/10 group-hover:text-sany-red/20 transition-colors block mb-4">
                  {item.num}
                </span>
                <h3 className="font-heading font-bold text-2xl text-white mb-4">{item.title}</h3>
                <p className="text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
