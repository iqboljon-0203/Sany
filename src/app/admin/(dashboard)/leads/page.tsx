import { createClient } from '@/lib/supabase/server';
import { Phone, CheckCircle, Circle } from 'lucide-react';
import LeadStatusButton from '@/components/admin/LeadStatusButton';
import AdminSearchHeader from '@/components/admin/AdminSearchHeader';
import AdminBreadcrumbs from '@/components/admin/AdminBreadcrumbs';

export const revalidate = 0;

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q, status } = await searchParams;
  const supabase = await createClient();
  
  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (q) {
    query = query.or(`name.ilike.%${q}%,phone.ilike.%${q}%,message.ilike.%${q}%,product.ilike.%${q}%`);
  }

  if (status) {
    query = query.eq('status', status);
  }

  const { data: leads } = await query;

  return (
    <div>
      <AdminBreadcrumbs items={[{ label: 'Arizalar' }]} />
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Arizalar</h2>
        <p className="text-gray-500 mt-1">Mijozlardan kelgan barcha murojaatlar</p>
      </div>

      <AdminSearchHeader 
        placeholder="Mijoz ismi, telefoni yoki xabari..." 
        statuses={['Новый', 'В обработке', 'Завершено', 'Отменено']}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-bold text-gray-500">Mijoz</th>
              <th className="text-left py-4 px-6 text-sm font-bold text-gray-500">Texnika</th>
              <th className="text-left py-4 px-6 text-sm font-bold text-gray-500">Xabar</th>
              <th className="text-left py-4 px-6 text-sm font-bold text-gray-500">Sana</th>
              <th className="text-right py-4 px-6 text-sm font-bold text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leads?.map((lead) => (
              <tr key={lead.id} className={`hover:bg-gray-50/50 transition-colors ${lead.status === 'Новый' ? 'bg-blue-50/20' : ''}`}>
                <td className="py-5 px-6">
                  <div className="font-bold text-gray-900">{lead.name}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Phone className="w-3 h-3" /> {lead.phone}
                  </div>
                </td>
                <td className="py-5 px-6">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg border border-gray-200">
                    {lead.product || 'Konsultatsiya'}
                  </span>
                </td>
                <td className="py-5 px-6">
                  <p className="text-sm text-gray-600 max-w-sm line-clamp-2">{lead.message || '-'}</p>
                </td>
                <td className="py-5 px-6 text-sm text-gray-500">
                  {new Date(lead.created_at).toLocaleDateString('uz-UZ')}
                </td>
                <td className="py-5 px-6 text-right">
                  <LeadStatusButton lead={lead} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!leads || leads.length === 0) && (
          <div className="text-center py-20 text-gray-400">
            {q || status ? "Qidiruv bo'yicha ma'lumot topilmadi" : "Hali arizalar yo'q"}
          </div>
        )}
      </div>
    </div>
  );
}
