'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LogOut, 
  LayoutDashboard, 
  Package, 
  FolderGit2, 
  Settings, 
  Lightbulb, 
  Handshake, 
  ShieldCheck, 
  Wrench, 
  Building2, 
  Banknote, 
  MessageSquare,
  GripVertical,
  Menu,
  X 
} from 'lucide-react';

export default function AdminSidebar({ userEmail, newLeadsCount = 0 }: { userEmail?: string, newLeadsCount?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/admin', icon: LayoutDashboard, label: 'Boshqaruv paneli' },
    { href: '/admin/leads', icon: MessageSquare, label: 'Arizalar', badge: newLeadsCount },
    { href: '/admin/products', icon: Package, label: 'Mahsulotlar' },
    { href: '/admin/products/categories', icon: GripVertical, label: 'Kategoriyalar' },
    { href: '/admin/projects', icon: FolderGit2, label: 'Loyihalar' },
    { href: '/admin/solutions', icon: Lightbulb, label: 'Yechimlar' },
    { href: '/admin/partners', icon: Handshake, label: 'Hamkorlar' },
    { href: '/admin/leasing', icon: Banknote, label: 'Lizing' },
    { href: '/admin/advantages', icon: ShieldCheck, label: 'Afzalliklar' },
    { href: '/admin/services', icon: Wrench, label: 'Servis' },
    { href: '/admin/about', icon: Building2, label: 'Biz haqimizda' },
    { href: '/admin/settings', icon: Settings, label: 'Sozlamalar' },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 flex items-center justify-center">
              <img src="/logo.svg" alt="SANY" className="w-10 h-10 object-contain" />
           </div>
           <div className="flex flex-col">
              <span className="text-base font-black tracking-wider leading-none text-gray-900 font-heading">SANY ADMIN</span>
              <span className="text-[7px] font-bold tracking-[0.1em] text-gray-500 uppercase font-sans">Central Asia</span>
           </div>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 hidden lg:block">
          <Link href="/" className="flex items-center gap-3 group mb-4">
            <img src="/logo.svg" alt="SANY Logo" className="h-12 w-auto" />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider leading-none text-gray-900 font-heading">SANY</span>
              <span className="text-[8px] font-bold tracking-[0.2em] text-gray-500 uppercase font-sans">Central Asia</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Boshqaruv paneli</span>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-4 mb-4 hidden lg:block" />
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-16 lg:mt-0">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive 
                    ? 'bg-sany-red/5 text-sany-red' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-sany-red'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  {link.label}
                </div>
                {'badge' in link && Number(link.badge) > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <form action="/api/auth/signout" method="post">
            <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium">
              <LogOut className="w-5 h-5" />
              Chiqish
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
