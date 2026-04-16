'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Save, RefreshCw, Copy } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { useToast } from '@/components/admin/ToastProvider';

export default function AboutAdminClient() {
  const supabase = createClient();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    hero_title_uz: '',
    hero_title_ru: 'Quality Changes the World',
    hero_title_en: '',
    hero_desc_uz: '',
    hero_desc_ru: '',
    hero_desc_en: '',
    mission_text_uz: '',
    mission_text_ru: '',
    mission_text_en: '',
    clients_text_uz: '',
    clients_text_ru: '',
    clients_text_en: '',
    office_image: '',
    stat1_value: '1989', stat1_label_uz: '', stat1_label_ru: '', stat1_label_en: '',
    stat2_value: '150+', stat2_label_uz: '', stat2_label_ru: '', stat2_label_en: '',
    stat3_value: '100 000+', stat3_label_uz: '', stat3_label_ru: '', stat3_label_en: '',
    stat4_value: 'TOP-5', stat4_label_uz: '', stat4_label_ru: '', stat4_label_en: '',
  });

  const copyFromRu = (fieldBase: string, targetLang: 'uz' | 'en') => {
    const sourceValue = formData[`${fieldBase}_ru` as keyof typeof formData] as string;
    setFormData(prev => ({
      ...prev,
      [`${fieldBase}_${targetLang}`]: sourceValue
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase.from('about_content').select('*').limit(1).single();
    if (data) {
      setFormData(data);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const { id, ...payload } = formData;
    if (id) {
      const { error } = await supabase.from('about_content').update(payload).eq('id', id);
      if (error) {
        toast('Xatolik: ' + error.message, 'error');
      } else {
        toast('Muvaffaqiyatli saqlandi! ✅', 'success');
      }
    }
    setSaving(false);
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Yuklanmoqda...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold text-gray-900">Biz haqimizda</h2>
          <p className="text-gray-500 mt-1">"About" sahifasi kontentini boshqaring</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50">
          <Save className="w-5 h-5" /> {saving ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Hero qism</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Sarlavha (UZ)</label>
                <button type="button" onClick={() => copyFromRu('hero_title', 'uz')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                  <Copy className="w-2.5 h-2.5"/> nusxa (RU)
                </button>
              </div>
              <input type="text" name="hero_title_uz" value={formData.hero_title_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sarlavha (RU)</label>
              <input type="text" name="hero_title_ru" value={formData.hero_title_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Title (EN)</label>
                <button type="button" onClick={() => copyFromRu('hero_title', 'en')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                  <Copy className="w-2.5 h-2.5"/> copy (RU)
                </button>
              </div>
              <input type="text" name="hero_title_en" value={formData.hero_title_en} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Tavsif (UZ)</label>
                <button type="button" onClick={() => copyFromRu('hero_desc', 'uz')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                  <Copy className="w-2.5 h-2.5"/> nusxa (RU)
                </button>
              </div>
              <textarea rows={3} name="hero_desc_uz" value={formData.hero_desc_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tavsif (RU)</label>
              <textarea rows={3} name="hero_desc_ru" value={formData.hero_desc_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Description (EN)</label>
                <button type="button" onClick={() => copyFromRu('hero_desc', 'en')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                  <Copy className="w-2.5 h-2.5"/> copy (RU)
                </button>
              </div>
              <textarea rows={3} name="hero_desc_en" value={formData.hero_desc_en} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Office Image */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Ofis rasmi</h3>
        <ImageUpload
          value={formData.office_image}
          onChange={(url) => setFormData(prev => ({ ...prev, office_image: url }))}
          folder="about"
          label="Kompaniya ofisi yoki binosi rasmi"
        />
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Statistika (qizil panel)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
              <h4 className="font-bold text-gray-600 mb-3 text-sm">Statistika #{n}</h4>
              <input type="text" name={`stat${n}_value`} value={(formData as any)[`stat${n}_value`]} onChange={handleChange} placeholder="Qiymat (1989, 150+...)" className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none mb-3 font-bold text-lg bg-white" />
              <div className="space-y-3">
                <div className="relative">
                  <input type="text" name={`stat${n}_label_uz`} value={(formData as any)[`stat${n}_label_uz`]} onChange={handleChange} placeholder="Label UZ" className="w-full px-3 py-2 pr-20 rounded-lg border border-gray-300 outline-none text-sm bg-white" />
                  <button type="button" onClick={() => copyFromRu(`stat${n}_label`, 'uz')} className="absolute right-2 top-1.5 text-[9px] text-sany-red hover:underline uppercase font-bold">kopiya</button>
                </div>
                <input type="text" name={`stat${n}_label_ru`} value={(formData as any)[`stat${n}_label_ru`]} onChange={handleChange} placeholder="Label RU" className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none text-sm bg-white" />
                <div className="relative">
                  <input type="text" name={`stat${n}_label_en`} value={(formData as any)[`stat${n}_label_en`]} onChange={handleChange} placeholder="Label EN" className="w-full px-3 py-2 pr-20 rounded-lg border border-gray-300 outline-none text-sm bg-white" />
                  <button type="button" onClick={() => copyFromRu(`stat${n}_label`, 'en')} className="absolute right-2 top-1.5 text-[9px] text-sany-red hover:underline uppercase font-bold">copy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Asosiy matnlar (bloklar)</h3>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Missiya (UZ)</label>
                <button type="button" onClick={() => copyFromRu('mission_text', 'uz')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                  <Copy className="w-2.5 h-2.5"/> nusxa (RU)
                </button>
              </div>
              <textarea rows={6} name="mission_text_uz" value={formData.mission_text_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Missiya (RU)</label>
              <textarea rows={6} name="mission_text_ru" value={formData.mission_text_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Mission (EN)</label>
                <button type="button" onClick={() => copyFromRu('mission_text', 'en')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                  <Copy className="w-2.5 h-2.5"/> copy (RU)
                </button>
              </div>
              <textarea rows={6} name="mission_text_en" value={formData.mission_text_en} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Mijozlar (UZ)</label>
                <button type="button" onClick={() => copyFromRu('clients_text', 'uz')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                  <Copy className="w-2.5 h-2.5"/> nusxa (RU)
                </button>
              </div>
              <textarea rows={4} name="clients_text_uz" value={formData.clients_text_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mijozlar (RU)</label>
              <textarea rows={4} name="clients_text_ru" value={formData.clients_text_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Clients (EN)</label>
                <button type="button" onClick={() => copyFromRu('clients_text', 'en')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                  <Copy className="w-2.5 h-2.5"/> copy (RU)
                </button>
              </div>
              <textarea rows={4} name="clients_text_en" value={formData.clients_text_en} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Save */}
      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50">
          <Save className="w-5 h-5" /> {saving ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
      </div>
    </div>
  );
}
