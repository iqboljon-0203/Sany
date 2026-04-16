'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function AdminBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 font-montserrat">
      <Link href="/admin" className="hover:text-sany-red transition-colors flex items-center gap-1">
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Panel</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-gray-300" />
          {item.href ? (
            <Link href={item.href} className="hover:text-sany-red transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-bold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
