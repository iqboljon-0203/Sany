import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import PartnerList from '@/components/admin/PartnerList';

export const revalidate = 0;

export default async function AdminPartnersPage() {
  const supabase = await createClient();
  const { data: partners } = await supabase.from('partners').select('*').order('created_at', { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-heading font-bold text-gray-900">Hamkorlar va mijozlar</h2>
          <p className="text-gray-500 mt-1">Saytdagi harakatlanuvchi hamkorlar karuseli</p>
        </div>
        <Link href="/admin/partners/new" className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          <Plus className="w-5 h-5" /> Qo'shish
        </Link>
      </div>

      <PartnerList initialPartners={partners || []} />

      {(!partners || partners.length === 0) && (
        <div className="text-center py-12 text-gray-400 bg-white rounded-xl">Hali hamkorlar qo'shilmagan</div>
      )}
    </div>
  );
}
