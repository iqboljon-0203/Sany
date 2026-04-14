'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Save, X } from 'lucide-react';
import Link from 'next/link';

export default function LeasingAdvantageForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    icon: initialData?.icon || '✅',
    title_uz: initialData?.title_uz || '',
    title_ru: initialData?.title_ru || '',
    title_en: initialData?.title_en || '',
    order_index: initialData?.order_index || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let errorResult;
    if (initialData?.id) {
      const { error } = await supabase.from('leasing_advantages').update(formData).eq('id', initialData.id);
      errorResult = error;
    } else {
      const { error } = await supabase.from('leasing_advantages').insert([formData]);
      errorResult = error;
    }

    setLoading(false);
    if (errorResult) {
      alert('Xatolik: ' + errorResult.message);
    } else {
      router.push('/admin/leasing');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Lizing afzalligi ma'lumotlari</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ikonka (Emoji yoki URL)</label>
            <input required type="text" name="icon" value={formData.icon} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Masalan: 🛡️" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tartib raqami</label>
            <input type="number" name="order_index" value={formData.order_index} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nomi (UZ) *</label>
            <input required type="text" name="title_uz" value={formData.title_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Tezkor tasdiqlash" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nomi (RU) *</label>
            <input required type="text" name="title_ru" value={formData.title_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Быстрое одобрение" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nomi (EN) *</label>
            <input required type="text" name="title_en" value={formData.title_en} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Fast approval" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link href="/admin/leasing" className="py-3 px-6 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 font-bold transition-colors">Bekor qilish</Link>
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50">
          <Save className="w-5 h-5" /> {loading ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
      </div>
    </form>
  );
}
