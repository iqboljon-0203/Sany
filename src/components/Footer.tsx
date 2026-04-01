import Link from 'next/link';
import { navLinks, phoneNumbers, companyInfo } from '@/data/projects';
import { categoryLabels } from '@/data/products';

export default function Footer() {
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
              <svg viewBox="0 0 200 50" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0, 0)">
                  <circle cx="25" cy="25" r="22" stroke="#e3000f" strokeWidth="4.5" />
                  <path d="M25 6 L20 26 L30 26 Z" fill="#e3000f" />
                  <path d="M8 38 L20 22 L27 20 Z" fill="#e3000f" />
                  <path d="M42 38 L30 22 L23 20 Z" fill="#e3000f" />
                  <circle cx="25" cy="23" r="3" fill="#1A1A1A" />
                </g>
                <text x="60" y="28" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="24" fill="#ffffff" letterSpacing="1.5">SANY</text>
                <text x="62" y="42" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="9.5" fill="#a0a0a0" letterSpacing="3">CENTRAL ASIA</text>
              </svg>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {companyInfo.fullName}. Поставка, сервис и лизинг строительной и горнодобывающей техники мирового класса.
            </p>
            <div className="flex gap-3">
              <a href={companyInfo.telegram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-sany-red flex items-center justify-center transition-all duration-300 group">
                <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href={companyInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#25D366] flex items-center justify-center transition-all duration-300 group">
                <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-white">Навигация</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-sany-red transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-sany-red/40 rounded-full group-hover:bg-sany-red transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-white">Продукция</h3>
            <ul className="space-y-3">
              {Object.entries(categoryLabels).slice(0, 7).map(([key, label]) => (
                <li key={key}>
                  <Link
                    href={`/products?category=${key}`}
                    className="text-white/50 text-sm hover:text-sany-red transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-sany-red/40 rounded-full group-hover:bg-sany-red transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-white">Контакты</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-sany-red mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-white/50 text-sm">{companyInfo.address}</p>
              </div>
              {phoneNumbers.map((phone, i) => (
                <div key={i} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-sany-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-white/30 text-xs">{phone.label}</p>
                    <a href={`tel:${phone.number}`} className="text-white/60 text-sm hover:text-sany-red transition-colors">
                      {phone.number}
                    </a>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-sany-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-white/50 text-sm">{companyInfo.workingHours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 mt-8 lg:mt-12">
        <div className="container-custom py-6 lg:py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} SANY Uzbekistan. Все права защищены.
          </p>
          <p className="text-white/20 text-xs">
            SANY Group Co., Ltd. — Quality Changes the World
          </p>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sany-red/3 rounded-full blur-[120px] pointer-events-none" />
    </footer>
  );
}
