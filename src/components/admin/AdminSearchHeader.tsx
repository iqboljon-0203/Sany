'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/use-debounce';

export default function AdminSearchHeader({ 
  placeholder = "Qidirish...", 
  statuses = [] 
}: { 
  placeholder?: string, 
  statuses?: string[] 
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const debouncedQuery = useDebounce(query, 500);
  const statusFilter = searchParams.get('status') || '';

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) {
      params.set('q', debouncedQuery);
    } else {
      params.delete('q');
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedQuery]);

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setQuery('');
    router.push(pathname);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sany-red outline-none shadow-sm"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {statuses.length > 0 && (
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select 
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sany-red outline-none bg-white shadow-sm appearance-none min-w-[160px]"
            >
              <option value="">Barchasi</option>
              {statuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          
          {(query || statusFilter) && (
            <button 
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-sany-red transition-colors"
            >
              Tozalash
            </button>
          )}
        </div>
      )}
    </div>
  );
}
