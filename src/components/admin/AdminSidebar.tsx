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
           <div className="w-8 h-8 rounded-lg bg-sany-red flex items-center justify-center p-1">
              <svg viewBox="0 0 100 100" className="text-white fill-current">
                <path d="M 50,15 L 65,15 L 65,45 L 85,45 L 85,55 L 50,55 Z" transform="rotate(0, 50, 50)" />
                <path d="M 50,15 L 65,15 L 65,45 L 85,45 L 85,55 L 50,55 Z" transform="rotate(120, 50, 50)" />
                <path d="M 50,15 L 65,15 L 65,45 L 85,45 L 85,55 L 50,55 Z" transform="rotate(240, 50, 50)" />
              </svg>
           </div>
           <span className="font-heading font-black text-gray-900 tracking-wider">SANY ADMIN</span>
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
          <Link href="/" className="flex items-center group mb-2">
            <svg viewBox="0 0 200 50" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="admin-sidebar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e3000f" />
                  <stop offset="100%" stopColor="#8d000a" />
                </linearGradient>
              </defs>
              <g>
                <circle cx="25" cy="25" r="24" fill="url(#admin-sidebar-grad)" />
                <circle cx="25" cy="25" r="21.5" stroke="white" strokeWidth="0.8" fill="none" opacity="0.6" />
                <g fill="white" transform="translate(25, 25)">
                   <path d="M -2,-13 L 2,-13 L 2,2 L 14,2 L 14,6 L -2,6 Z" transform="rotate(0) translate(0, 2)" />
                   <path d="M -2,-13 L 2,-13 L 2,2 L 14,2 L 14,6 L -2,6 Z" transform="rotate(120) translate(0, 2)" />
                   <path d="M -2,-13 L 2,-13 L 2,2 L 14,2 L 14,6 L -2,6 Z" transform="rotate(240) translate(0, 2)" />
                   <path d="M 0,-3 L 3,2 L -3,2 Z" fill="url(#admin-sidebar-grad)" />
                </g>
              </g>
              <text x="60" y="28" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="24" fill="#000000" letterSpacing="1.5">SANY</text>
              <text x="62" y="42" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="9.5" fill="#666666" letterSpacing="3">CENTRAL ASIA</text>
            </svg>
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
