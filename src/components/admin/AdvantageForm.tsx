'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Save } from 'lucide-react';
import Link from 'next/link';

const iconOptions = [
  { value: 'ShieldCheck', label: '🛡️ Himoya / Kafolat' },
  { value: 'Wrench', label: '🔧 Asbob / Ehtiyot qismlar' },
  { value: 'Clock', label: '🕒 Soat / 24/7 xizmat' },
  { value: 'Settings', label: '⚙️ Sozlamalar / Texnik' },
  { value: 'Package', label: '📦 Quti / Yetkazib berish' },
  { value: 'Star', label: '⭐ Yulduz / Sifat' },
];

export default function AdvantageForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    icon: initialData?.icon || 'ShieldCheck',
    title_uz: initialData?.title_uz || '',
    title_ru: initialData?.title_ru || '',
    desc_uz: initialData?.desc_uz || '',
    desc_ru: initialData?.desc_ru || '',
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
      const { error } = await supabase.from('advantages').update(formData).eq('id', initialData.id);
      errorResult = error;
    } else {
      const { error } = await supabase.from('advantages').insert([formData]);
      errorResult = error;
    }

    setLoading(false);
    if (errorResult) {
      alert('Xatolik: ' + errorResult.message);
    } else {
      router.push('/admin/advantages');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Afzallik ma'lumotlari</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ikonka</label>
            <select name="icon" value={formData.icon} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none">
              {iconOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sarlavha (O'zbekcha) *</label>
            <input required type="text" name="title_uz" value={formData.title_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Rasmiy kafolat" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sarlavha (Ruscha) *</label>
            <input required type="text" name="title_ru" value={formData.title_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Официальная гарантия" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tavsif (O'zbekcha) *</label>
            <textarea required rows={3} name="desc_uz" value={formData.desc_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tavsif (Ruscha) *</label>
            <textarea required rows={3} name="desc_ru" value={formData.desc_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"></textarea>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link href="/admin/advantages" className="py-3 px-6 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 font-bold transition-colors">Bekor qilish</Link>
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50">
          <Save className="w-5 h-5" /> {loading ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
      </div>
    </form>
  );
}
