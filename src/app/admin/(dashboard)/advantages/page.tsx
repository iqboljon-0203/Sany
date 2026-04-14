import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';

export const revalidate = 0;

const iconNames: Record<string, string> = {
  ShieldCheck: '🛡️ ShieldCheck',
  Wrench: '🔧 Wrench',
  Clock: '🕒 Clock',
  Settings: '⚙️ Settings',
  Package: '📦 Package',
  Star: '⭐ Star',
};

export default async function AdminAdvantagesPage() {
  const supabase = await createClient();
  const { data: advantages } = await supabase.from('advantages').select('*').order('created_at', { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-heading font-bold text-gray-900">Afzalliklar</h2>
          <p className="text-gray-500 mt-1">Bosh sahifadagi "Nima uchun SANY" bloki</p>
        </div>
        <Link href="/admin/advantages/new" className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          <Plus className="w-5 h-5" /> Qo'shish
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {advantages?.map((a) => (
          <div key={a.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <span className="text-lg">{iconNames[a.icon] || a.icon}</span>
              <div className="flex items-center gap-1">
                <Link href={`/admin/advantages/${a.id}/edit`} className="text-blue-500 hover:text-blue-700 p-1.5 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </Link>
                <DeleteButton table="advantages" id={a.id} />
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{a.title_uz}</h3>
            <p className="text-sm text-gray-500 mb-2">{a.title_ru}</p>
            <p className="text-xs text-gray-400 line-clamp-2">{a.desc_uz}</p>
          </div>
        ))}
      </div>

      {(!advantages || advantages.length === 0) && (
        <div className="text-center py-12 text-gray-400 bg-white rounded-xl">Hali afzalliklar qo'shilmagan</div>
      )}
    </div>
  );
}
