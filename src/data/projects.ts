import { Project, Partner, NavLink, PhoneNumber } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'АГМК — МОФ-3',
    location: 'Алмалык, Ташкентская область',
    description: 'Поставка и сервисное обслуживание тяжёлых экскаваторов и карьерных самосвалов для модернизации Алмалыкского ГМК — одного из крупнейших горнодобывающих предприятий в Центральной Азии.',
    image: '/images/projects/agmk_mining.png',
    category: 'Горнодобыча',
    machines: ['SY365H', 'SRT95C', 'SCC8000A'],
  },
  {
    id: '2',
    title: 'Мурунтау',
    location: 'Навоийская область',
    description: 'Оснащение крупнейшего в мире открытого золотого рудника техникой SANY: экскаваторы, буровые установки и карьерные самосвалы для круглосуточной добычи.',
    image: '/images/projects/muruntau_gold.png',
    category: 'Горнодобыча',
    machines: ['SY365H', 'SR200C', 'SRT95C'],
  },
  {
    id: '3',
    title: 'Uzbekistan GTL',
    location: 'Кашкадарьинская область',
    description: 'Поставка строительной и грузоподъёмной техники для строительства газоперерабатывающего завода по технологии Gas-to-Liquids мощностью 1.5 млн тонн в год.',
    image: '/images/projects/uz_gtl_plant.png',
    category: 'Нефть и газ',
    machines: ['STC250', 'SCC8000A', 'SY215C'],
  },
  {
    id: '4',
    title: 'Ташкентское метро — Новая линия',
    location: 'Ташкент',
    description: 'Участие в строительстве новой ветки Ташкентского метрополитена: поставка экскаваторов, буровых установок и автобетоносмесителей для подземных работ.',
    image: '/images/projects/tashkent_metro.png',
    category: 'Инфраструктура',
    machines: ['SY215C', 'SR200C', 'SY412C-8S'],
  },
  {
    id: '5',
    title: 'Автодорога M-39',
    location: 'Самарканд — Бухара',
    description: 'Комплексная поставка дорожно-строительной техники для реконструкции автомагистрали M-39: автогрейдеры, дорожные катки и фронтальные погрузчики.',
    image: '/images/projects/m39_highway.png',
    category: 'Дорожное строительство',
    machines: ['SDG25S', 'SSR220AC', 'STL956H'],
  },
  {
    id: '6',
    title: 'Жилой комплекс «Tashkent City»',
    location: 'Ташкент',
    description: 'Поставка автокранов, экскаваторов и бетонной техники для возведения делового и жилого комплекса в центре Ташкента.',
    image: '/images/projects/tashkent_city.png',
    category: 'Строительство',
    machines: ['STC250', 'SY215C', 'SY412C-8S'],
  },
];

export const partners: Partner[] = [
  { id: '1', name: 'Министерство водного хозяйства', logo: 'https://www.google.com/s2/favicons?domain=water.gov.uz&sz=128' },
  { id: '2', name: 'Enter Engineering', logo: 'https://www.google.com/s2/favicons?domain=ent-en.com&sz=128' },
  { id: '3', name: 'Трест-12', logo: 'https://www.google.com/s2/favicons?domain=trest12.uz&sz=128' },
  { id: '4', name: 'Навоийский ГМК', logo: 'https://www.google.com/s2/favicons?domain=ngmk.uz&sz=128' },
  { id: '5', name: 'Алмалыкский ГМК', logo: 'https://www.google.com/s2/favicons?domain=agmk.uz&sz=128' },
  { id: '6', name: 'Узбекнефтегаз', logo: 'https://www.google.com/s2/favicons?domain=ung.uz&sz=128' },
  { id: '7', name: 'UzGTL', logo: 'https://www.google.com/s2/favicons?domain=uzgtl.com&sz=128' },
  { id: '8', name: 'Узбекистон темир йуллари', logo: 'https://www.google.com/s2/favicons?domain=railway.uz&sz=128' },
  { id: '9', name: 'Тошкент Метрополитени', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Tashkent_Metro_logo.svg/200px-Tashkent_Metro_logo.svg.png' },
  { id: '10', name: 'UzAuto', logo: 'https://www.google.com/s2/favicons?domain=uzautomotors.com&sz=128' },
];

export const navLinks: NavLink[] = [
  { label: 'Продукция', href: '/products' },
  { label: 'Решения', href: '/solutions' },
  { label: 'Проекты', href: '/projects' },
  { label: 'Сервис', href: '/service' },
  { label: 'О компании', href: '/about' },
  { label: 'Лизинг', href: '/leasing' },
  { label: 'Контакты', href: '/contacts' },
];

export const phoneNumbers: PhoneNumber[] = [
  { number: '+998917727273', label: 'Продажи' },
  { number: '+998935550095', label: 'Сервис' },
  { number: '+998998593114', label: 'Лизинг' },
];

export const companyInfo = {
  name: 'SANY Uzbekistan',
  fullName: 'ИП ООО «SANY AUTOMOBILE MANUFACTURING CENTRAL ASIA»',
  address: 'г. Ташкент, Сергелийский район, ул. 2- Алишер Навои пр.2, дом 22',
  email: 'info@sany.uz',
  workingHours: 'Пн-Пт: 09:00 - 18:00, Сб: 09:00 - 15:00',
  telegram: 'https://t.me/SANY_TAJIBAEVA',
  whatsapp: 'https://wa.me/998917727273',
  mapCoords: { lat: 41.311081, lng: 69.279737 },
};
