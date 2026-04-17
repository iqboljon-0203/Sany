'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Save, X, Plus, Copy } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from './ImageUpload';
import { useToast } from './ToastProvider';

export default function SolutionForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    icon: initialData?.icon || '⛏️',
    title_uz: initialData?.title_uz || '',
    title_ru: initialData?.title_ru || '',
    title_en: initialData?.title_en || '',
    desc_uz: initialData?.desc_uz || '',
    desc_ru: initialData?.desc_ru || '',
    desc_en: initialData?.desc_en || '',
    image: initialData?.image || '',
    order_index: initialData?.order_index ?? 0,
  });

  const [featuresUz, setFeaturesUz] = useState<string[]>(initialData?.features_uz || ['']);
  const [featuresRu, setFeaturesRu] = useState<string[]>(initialData?.features_ru || ['']);
  const [featuresEn, setFeaturesEn] = useState<string[]>(initialData?.features_en || ['']);
  const [machines, setMachines] = useState<string[]>(initialData?.machines || ['']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'order_index' ? Number(value) : value }));
  };

  const copyFromRu = (fieldBase: string, targetLang: 'uz' | 'en') => {
    const sourceValue = formData[`${fieldBase}_ru` as keyof typeof formData] as string;
    setFormData(prev => ({
      ...prev,
      [`${fieldBase}_${targetLang}`]: sourceValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      title: formData.title_ru,
      desc: formData.desc_ru,
      features_uz: featuresUz.filter(f => f.trim() !== ''),
      features_ru: featuresRu.filter(f => f.trim() !== ''),
      features_en: featuresEn.filter(f => f.trim() !== ''),
      machines: machines.filter(m => m.trim() !== ''),
    };

    let errorResult;
    if (initialData?.id) {
      const { error } = await supabase.from('solutions').update(payload).eq('id', initialData.id);
      errorResult = error;
    } else {
      const { error } = await supabase.from('solutions').insert([payload]);
      errorResult = error;
    }

    setLoading(false);
    if (errorResult) {
      toast('Xatolik: ' + errorResult.message, 'error');
    } else {
      toast(initialData?.id ? 'Saqlandi' : 'Yaratildi', 'success');
      router.push('/admin/solutions');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Asosiy ma'lumotlar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ikonka (emoji)</label>
            <input type="text" name="icon" value={formData.icon} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none text-2xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tartib raqami</label>
            <input type="number" name="order_index" value={formData.order_index} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Nomi (O'zbekcha) *</label>
              <button type="button" onClick={() => copyFromRu('title', 'uz')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                <Copy className="w-2.5 h-2.5"/> nusxa (RU)
              </button>
            </div>
            <input required type="text" name="title_uz" value={formData.title_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Konchilik" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nomi (Ruscha) *</label>
            <input required type="text" name="title_ru" value={formData.title_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Горнодобыча" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Name (English) *</label>
              <button type="button" onClick={() => copyFromRu('title', 'en')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                <Copy className="w-2.5 h-2.5"/> copy (RU)
              </button>
            </div>
            <input required type="text" name="title_en" value={formData.title_en} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Mining" />
          </div>
          <div className="md:col-span-1"></div> {/* Spacer */}

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
              <label className="block text-sm font-medium text-gray-700">Description (EN) *</label>
              <button type="button" onClick={() => copyFromRu('desc', 'en')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                <Copy className="w-2.5 h-2.5"/> copy (RU)
              </button>
            </div>
            <textarea required rows={3} name="desc_en" value={formData.desc_en} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"></textarea>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Rasm (o'ng tomonda chiqadi)</h3>
        <ImageUpload
          value={formData.image}
          onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
          folder="solutions"
          label="Yechim rasmi (yuklang yoki URL kiriting)"
        />
      </div>

      {/* Features UZ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Xususiyatlar (O'zbekcha)</h3>
        {featuresUz.map((f, i) => (
          <div key={i} className="flex gap-3 mb-2">
            <input type="text" value={f} onChange={(e) => { const n = [...featuresUz]; n[i] = e.target.value; setFeaturesUz(n); }} placeholder="Karyer ekskavatorlari" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 outline-none" />
            <button type="button" onClick={() => setFeaturesUz(featuresUz.filter((_, idx) => idx !== i))} className="p-3 bg-red-50 text-red-500 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        ))}
        <button type="button" onClick={() => setFeaturesUz([...featuresUz, ''])} className="text-sany-red font-bold text-sm mt-2">+ Qo'shish</button>
      </div>

      {/* Features RU */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Xususiyatlar (RU)</h3>
        {featuresRu.map((f, i) => (
          <div key={i} className="flex gap-3 mb-2">
            <input type="text" value={f} onChange={(e) => { const n = [...featuresRu]; n[i] = e.target.value; setFeaturesRu(n); }} placeholder="Карьерные экскаваторы" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 outline-none" />
            <button type="button" onClick={() => setFeaturesRu(featuresRu.filter((_, idx) => idx !== i))} className="p-3 bg-red-50 text-red-500 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        ))}
        <button type="button" onClick={() => setFeaturesRu([...featuresRu, ''])} className="text-sany-red font-bold text-sm mt-2">+ Qo'shish</button>
      </div>

      {/* Features EN */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Xususiyatlar (EN)</h3>
        {featuresEn.map((f, i) => (
          <div key={i} className="flex gap-3 mb-2">
            <input type="text" value={f} onChange={(e) => { const n = [...featuresEn]; n[i] = e.target.value; setFeaturesEn(n); }} placeholder="Mining excavators" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 outline-none" />
            <button type="button" onClick={() => setFeaturesEn(featuresEn.filter((_, idx) => idx !== i))} className="p-3 bg-red-50 text-red-500 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        ))}
        <button type="button" onClick={() => setFeaturesEn([...featuresEn, ''])} className="text-sany-red font-bold text-sm mt-2">+ Qo'shish</button>
      </div>

      {/* Machines */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Texnikalar (model nomlari)</h3>
        {machines.map((m, i) => (
          <div key={i} className="flex gap-3 mb-2">
            <input type="text" value={m} onChange={(e) => { const n = [...machines]; n[i] = e.target.value; setMachines(n); }} placeholder="SY215C" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 outline-none" />
            <button type="button" onClick={() => setMachines(machines.filter((_, idx) => idx !== i))} className="p-3 bg-red-50 text-red-500 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        ))}
        <button type="button" onClick={() => setMachines([...machines, ''])} className="text-sany-red font-bold text-sm mt-2">+ Qo'shish</button>
      </div>

      <div className="flex justify-end gap-4">
        <Link href="/admin/solutions" className="py-3 px-6 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 font-bold transition-colors">Bekor qilish</Link>
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50">
          <Save className="w-5 h-5" /> {loading ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
      </div>
    </form>
  );
}
