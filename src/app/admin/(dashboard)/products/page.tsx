import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';
import AdminSearchHeader from '@/components/admin/AdminSearchHeader';
import AdminBreadcrumbs from '@/components/admin/AdminBreadcrumbs';

export const revalidate = 0;

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const supabase = await createClient();
  
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (q) {
    query = query.or(`name.ilike.%${q}%,slug.ilike.%${q}%,category_label_ru.ilike.%${q}%`);
  }

  const { data: products, error } = await query;

  if (error) {
    return <div className="text-red-500 p-8">Ma'lumot yuklashda xatolik: {error.message}</div>;
  }

  return (
    <div>
      <AdminBreadcrumbs items={[{ label: 'Mahsulotlar' }]} />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-heading font-bold text-gray-900">Mahsulotlarni boshqarish</h2>
          <p className="text-gray-500 mt-1">Barcha texnikalar va ularning holati</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-2.5 px-5 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Texnika qo'shish
        </Link>
      </div>

      <AdminSearchHeader placeholder="Model nomi yoki kategoriya bo'yicha qidirish..." />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Model</th>
                <th className="py-4 px-6">Kategoriya</th>
                <th className="py-4 px-6">Narxi (so'm)</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products?.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.slug}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {product.category_label_ru || product.category_label}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {product.price ? product.price.toLocaleString('uz-UZ') : 'Kiritilmagan'}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {product.featured ? (
                      <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full">
                        Топ
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">
                        Oddiy
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link 
                        href={`/admin/products/${product.id}/edit`} 
                        className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <DeleteButton table="products" id={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
              
              {products?.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400 italic">
                    {q ? "Qidiruv bo'yicha mahsulot topilmadi" : "Ma'lumotlar bazasi bo'sh. Birinchi mahsulotni qo'shing."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
