import { createClient } from '@/lib/supabase/server';
import { Package, FolderGit2, Handshake } from 'lucide-react';
import VisitorChart from '@/components/admin/VisitorChart';

export const revalidate = 0; // Disable cache so numbers are always fresh

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch exactly how many rows exist
  const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
  const { count: partnersCount } = await supabase.from('partners').select('*', { count: 'exact', head: true });
  
  // Fetch recently added leads
  const { data: recentLeads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
  
  return (
    <div>
      <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">Boshqaruv paneli</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Texnika soni</p>
            <p className="text-2xl font-bold text-gray-900">{productsCount || 0}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Proyektlar</p>
            <p className="text-2xl font-bold text-gray-900">{projectsCount || 0}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
            <Handshake className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Hamkorlar</p>
            <p className="text-2xl font-bold text-gray-900">{partnersCount || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* График посетителей */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">Tashriflar tahlili</h3>
            <p className="text-sm text-gray-500">Oxirgi 7 kunlik statistika</p>
          </div>
          <div className="flex-1">
            <VisitorChart />
          </div>
        </div>

        {/* Последние заявки */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Yangi arizalar</h3>
              <p className="text-sm text-gray-500">Saytdan yuborilgan so'rovlar</p>
            </div>
            <a href="/admin/leads" className="text-sm font-bold text-sany-red hover:underline">
              Barchasini ko'rish
            </a>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-gray-50">
                {recentLeads?.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">{lead.name}</div>
                      <div className="text-xs text-gray-500">{lead.phone}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 max-w-[200px] truncate">
                      {lead.product || 'Консультация'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {lead.status === 'Новый' ? (
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-full tracking-wider">
                          Новый
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase rounded-full tracking-wider">
                          Обработан
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {(!recentLeads || recentLeads.length === 0) && (
                  <tr>
                    <td colSpan={3} className="py-12 text-center text-gray-500">
                      Пока нет новых заявок
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
