'use client';

import { useTranslation } from '@/lib/i18n';
import Link from 'next/link';

interface AboutClientProps {
  aboutContent?: any;
  valuesList?: any[];
}

export default function AboutClient({ aboutContent, valuesList = [] }: AboutClientProps) {
  const { t, locale } = useTranslation();
  const isRu = locale === 'ru';
  const c = aboutContent || {};

  const stats = [
    { value: c.stat1_value || '1989', label: locale === 'ru' ? (c.stat1_label_ru || 'Год основания') : locale === 'uz' ? (c.stat1_label_uz || 'Tashkil etilgan yili') : (c.stat1_label_en || 'Established Year') },
    { value: c.stat2_value || '150+', label: locale === 'ru' ? (c.stat2_label_ru || 'Стран присутствия') : locale === 'uz' ? (c.stat2_label_uz || 'Davlatlarda mavjud') : (c.stat2_label_en || 'Countries Present') },
    { value: c.stat3_value || '100 000+', label: locale === 'ru' ? (c.stat3_label_ru || 'Сотрудников') : locale === 'uz' ? (c.stat3_label_uz || 'Xodimlar soni') : (c.stat3_label_en || 'Employees Worldwide') },
    { value: c.stat4_value || 'TOP-5', label: locale === 'ru' ? (c.stat4_label_ru || 'В мировом рейтинге') : locale === 'uz' ? (c.stat4_label_uz || 'Jahon reytingida') : (c.stat4_label_en || 'World Rating') },
  ];

  const missionText = locale === 'ru'
    ? (c.mission_text_ru || 'Техника «SANY» участвует в строительстве важных государственных объектов.')
    : locale === 'uz' ? (c.mission_text_uz || 'Texnika «SANY» muhim davlat ob\'ektlari qurilishida ishtirok etmoqda.')
    : (c.mission_text_en || 'SANY equipment is involved in the construction of important state facilities.');

  const clientsText = locale === 'ru'
    ? (c.clients_text_ru || '')
    : locale === 'uz' ? (c.clients_text_uz || '')
    : (c.clients_text_en || '');

  const heroDesc = locale === 'ru'
    ? (c.hero_desc_ru || t.about.description)
    : locale === 'uz' ? (c.hero_desc_uz || t.about.description)
    : (c.hero_desc_en || t.about.description);

  const fallbackValues = [
    { title: locale === 'ru' ? 'Качество' : locale === 'uz' ? 'Sifat' : 'Quality', desc: locale === 'ru' ? 'Каждая единица техники проходит строгий контроль качества на заводах SANY.' : locale === 'uz' ? 'Har bir texnika SANY zavodlarida qattiq nazoratdan o\'tadi.' : 'Every piece of equipment undergoes strict quality control at SANY factories.', num: '01' },
    { title: locale === 'ru' ? 'Инновации' : locale === 'uz' ? 'Innovatsiya' : 'Innovation', desc: locale === 'ru' ? 'Непрерывные инвестиции в R&D. Более 10 000 патентов.' : locale === 'uz' ? 'Tadqiqot va ishlanmaga uzluksiz investitsiyalar. 10 000 dan ortiq patent.' : 'Continuous investment in R&D. Over 10,000 patents.', num: '02' },
    { title: locale === 'ru' ? 'Партнёрство' : locale === 'uz' ? 'Hamkorlik' : 'Partnership', desc: locale === 'ru' ? 'Долгосрочные отношения с клиентами.' : locale === 'uz' ? 'Mijozlar bilan uzoq muddatli munosabatlar.' : 'Long-term relationships with customers.', num: '03' },
  ];

  const displayValues = valuesList.length > 0
    ? valuesList.map((v, i) => ({
        title: locale === 'ru' ? v.title_ru : locale === 'uz' ? v.title_uz : v.title_en || v.title_ru,
        desc: locale === 'ru' ? v.desc_ru : locale === 'uz' ? v.desc_uz : v.desc_en || v.desc_ru,
        num: String(i + 1).padStart(2, '0'),
      }))
    : fallbackValues;

  return (
    <div className="pt-[82px]">
      {/* Hero */}
      <section className="bg-background py-20 relative overflow-hidden border-b border-border-color">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.05" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-grid)" />
          </svg>
        </div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block">
                {t.about.subtitle}
              </span>
              <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-4">
                {c.hero_title ? (
                  c.hero_title.toLowerCase().includes('the world') ? (
                    <span>{c.hero_title.replace(/the world/i, '')} <span className="gradient-text-red">the World</span></span>
                  ) : (
                    <span>{c.hero_title} <span className="gradient-text-red">the World</span></span>
                  )
                ) : (
                  <span>Quality Changes <span className="gradient-text-red">the World</span></span>
                )}
              </h1>
              <p className="text-text-muted max-w-xl text-lg">
                {heroDesc}
              </p>
            </div>
            <div className="relative h-[300px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
              <img 
                src={c.office_image || '/images/sany_office.png'} 
                alt="SANY Uzbekistan Office" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-sany-red py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block">
                {t.about.mission}
              </span>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
                {t.about.mission}
              </h2>

              <p className="text-text-muted leading-relaxed mb-6">{missionText}</p>
              {clientsText && (
                <p className="text-text-muted leading-relaxed mb-8">{clientsText}</p>
              )}
              <Link href="/contacts" className="btn-primary !bg-anthracite hover:!bg-sany-red">
                {isRu ? 'Связаться с нами' : 'Bog\'lanish'}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: isRu ? 'Продажи' : 'Sotuvlar', desc: isRu ? 'Полный ассортимент техники SANY' : 'SANY texnikasining to\'liq assortimenti', icon: '📦' },
                { title: isRu ? 'Лизинг' : 'Lizing', desc: isRu ? 'Гибкие финансовые решения' : 'Moslashuvchan moliyaviy yechimlar', icon: '💰' },
                { title: isRu ? 'Сервис' : 'Servis', desc: isRu ? '24/7 техническая поддержка' : '24/7 texnik qo\'llab-quvvatlash', icon: '🔧' },
                { title: isRu ? 'Запчасти' : 'Ehtiyot qismlar', desc: isRu ? 'Склад в Ташкенте' : 'Toshkentda ombor', icon: '⚙️' },
              ].map((item, i) => (
                <div key={i} className="bg-card-bg rounded-xl p-6 shadow-sm card-hover border border-border-color">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-heading font-bold text-foreground mb-1">{item.title}</h3>
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
              {isRu ? 'Ценности' : 'Qadriyatlar'}
            </span>
            <h2 className="text-4xl font-heading font-bold text-white">
              {isRu ? 'Наши принципы' : 'Bizning tamoyillarimiz'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayValues.map((item, i) => (
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
