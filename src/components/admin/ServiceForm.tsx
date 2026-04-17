'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Save, Copy } from 'lucide-react';
import Link from 'next/link';
import { useToast } from './ToastProvider';

const iconOptions = [
  { value: 'Clock', label: '🕒 Clock — Vaqt / 24/7' },
  { value: 'Package', label: '📦 Package — Ehtiyot qismlar' },
  { value: 'Users', label: '👥 Users — Mutaxassislar' },
  { value: 'BarChart', label: '📊 BarChart — Diagnostika' },
  { value: 'Truck', label: '🚛 Truck — Chiqish brigadasi' },
  { value: 'ShieldCheck', label: '🛡️ ShieldCheck — Kafolat' },
  { value: 'Wrench', label: '🔧 Wrench — Ta\'mirlash' },
  { value: 'Settings', label: '⚙️ Settings — Sozlamalar' },
  { value: 'Star', label: '⭐ Star — Sifat' },
];

export default function ServiceForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    icon: initialData?.icon || 'Clock',
    title_uz: initialData?.title_uz || '',
    title_ru: initialData?.title_ru || '',
    title_en: initialData?.title_en || '',
    desc_uz: initialData?.desc_uz || '',
    desc_ru: initialData?.desc_ru || '',
    desc_en: initialData?.desc_en || '',
    order_index: initialData?.order_index ?? 0,
  });

  const copyFromRu = (fieldBase: string, targetLang: 'uz' | 'en') => {
    const sourceValue = formData[`${fieldBase}_ru` as keyof typeof formData] as string;
    setFormData(prev => ({
      ...prev,
      [`${fieldBase}_${targetLang}`]: sourceValue
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'order_index' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      title: formData.title_ru,
      desc: formData.desc_ru,
    };

    let errorResult;
    if (initialData?.id) {
      const { error } = await supabase.from('services').update(payload).eq('id', initialData.id);
      errorResult = error;
    } else {
      const { error } = await supabase.from('services').insert([payload]);
      errorResult = error;
    }

    setLoading(false);
    if (errorResult) {
      toast('Xatolik: ' + errorResult.message, 'error');
    } else {
      toast(initialData?.id ? 'Saqlandi' : 'Yaratildi', 'success');
      router.push('/admin/services');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Servis xizmati ma'lumotlari</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ikonka</label>
            <select name="icon" value={formData.icon} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none">
              {iconOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tartib raqami</label>
            <input type="number" name="order_index" value={formData.order_index} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Sarlavha (O'zbekcha) *</label>
              <button type="button" onClick={() => copyFromRu('title', 'uz')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                <Copy className="w-2.5 h-2.5"/> nusxa (RU)
              </button>
            </div>
            <input required type="text" name="title_uz" value={formData.title_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Qo'llab-quvvatlash 24/7" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sarlavha (Ruscha) *</label>
            <input required type="text" name="title_ru" value={formData.title_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Поддержка 24/7" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Title (EN) *</label>
              <button type="button" onClick={() => copyFromRu('title', 'en')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                <Copy className="w-2.5 h-2.5"/> copy (RU)
              </button>
            </div>
            <input required type="text" name="title_en" value={formData.title_en} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="24/7 Support" />
          </div>
          <div className="md:col-span-1"></div> {/* Spacer */}

          <div className="md:col-span-2 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Tavsif (UZ) *</label>
                <button type="button" onClick={() => copyFromRu('desc', 'uz')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                  <Copy className="w-2.5 h-2.5"/> nusxa (RU)
                </button>
              </div>
              <textarea required rows={3} name="desc_uz" value={formData.desc_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tavsif (RU) *</label>
              <textarea required rows={3} name="desc_ru" value={formData.desc_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"></textarea>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Tavsif (EN) *</label>
                <button type="button" onClick={() => copyFromRu('desc', 'en')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                  <Copy className="w-2.5 h-2.5"/> copy (RU)
                </button>
              </div>
              <textarea required rows={3} name="desc_en" value={formData.desc_en} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link href="/admin/services" className="py-3 px-6 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 font-bold transition-colors">Bekor qilish</Link>
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50">
          <Save className="w-5 h-5" /> {loading ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
      </div>
    </form>
  );
}
