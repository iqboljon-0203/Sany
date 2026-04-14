'use client';

import Link from 'next/link';
import { Edit } from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';

export default function PartnerList({ initialPartners }: { initialPartners: any[] }) {
  const getSafeSrc = (src: any, name: string) => {
    if (!src || typeof src !== 'string' || (!src.startsWith('/') && !src.startsWith('http'))) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1A1A1A&color=fff&bold=true`;
    }
    return src;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {initialPartners?.map((p) => (
        <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100 overflow-hidden">
            <img 
              src={getSafeSrc(p.logo, p.name)} 
              alt={p.name}
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=1A1A1A&color=fff&bold=true`;
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 truncate">{p.name}</h3>
            <p className="text-xs text-gray-400 truncate mt-1">{p.logo}</p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Link href={`/admin/partners/${p.id}/edit`} className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors">
              <Edit className="w-4 h-4" />
            </Link>
            <DeleteButton table="partners" id={p.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
