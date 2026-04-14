'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LeadStatusButton({ lead }: { lead: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const toggleStatus = async () => {
    setLoading(true);
    const newStatus = lead.status === 'Новый' ? 'Обработан' : 'Новый';
    await supabase.from('leads').update({ status: newStatus }).eq('id', lead.id);
    setLoading(false);
    router.refresh();
  };

  return (
    <button
      onClick={toggleStatus}
      disabled={loading}
      className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full tracking-wider transition-colors disabled:opacity-50 ${
        lead.status === 'Новый'
          ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      }`}
    >
      {loading ? '...' : lead.status}
    </button>
  );
}
