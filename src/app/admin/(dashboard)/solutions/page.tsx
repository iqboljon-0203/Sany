import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';

export const revalidate = 0;

export default async function AdminSolutionsPage() {
  const supabase = await createClient();
  const { data: solutions } = await supabase.from('solutions').select('*').order('order_index', { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-heading font-bold text-gray-900">Soha yechimlari</h2>
          <p className="text-gray-500 mt-1">Saytdagi "Yechimlar" sahifasidagi bo'limlar</p>
        </div>
        <Link href="/admin/solutions/new" className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          <Plus className="w-5 h-5" /> Qo'shish
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-bold text-gray-500">Tartib</th>
              <th className="text-left py-4 px-6 text-sm font-bold text-gray-500">Ikonka</th>
              <th className="text-left py-4 px-6 text-sm font-bold text-gray-500">Nomi (UZ)</th>
              <th className="text-left py-4 px-6 text-sm font-bold text-gray-500">Nomi (RU)</th>
              <th className="text-left py-4 px-6 text-sm font-bold text-gray-500">Texnikalar</th>
              <th className="text-right py-4 px-6 text-sm font-bold text-gray-500">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {solutions?.map((s) => (
              <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="py-4 px-6 text-gray-500 font-bold">{s.order_index}</td>
                <td className="py-4 px-6 text-2xl">{s.icon}</td>
                <td className="py-4 px-6 font-bold text-gray-900">{s.title_uz}</td>
                <td className="py-4 px-6 text-gray-600">{s.title_ru}</td>
                <td className="py-4 px-6">
                  <div className="flex flex-wrap gap-1">
                    {s.machines?.map((m: string) => (
                      <span key={m} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{m}</span>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/solutions/${s.id}/edit`} className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-5 h-5" />
                    </Link>
                    <DeleteButton table="solutions" id={s.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!solutions || solutions.length === 0) && (
          <div className="text-center py-12 text-gray-400">Hali yechimlar qo'shilmagan</div>
        )}
      </div>
    </div>
  );
}
