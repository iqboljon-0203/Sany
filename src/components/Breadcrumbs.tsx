'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const { t } = useTranslation();

  return (
    <nav className="flex items-center gap-2 text-xs md:text-sm text-text-muted mb-6 container-custom py-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
      <Link href="/" className="hover:text-sany-red transition-colors flex items-center gap-1 shrink-0">
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">{t.nav.home || 'Bosh sahifa'}</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 shrink-0">
          <ChevronRight className="w-3 h-3 opacity-30" />
          {item.href ? (
            <Link href={item.href} className="hover:text-sany-red transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-bold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
