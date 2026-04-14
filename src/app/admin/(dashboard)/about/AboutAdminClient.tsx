'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Save, RefreshCw } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AboutAdminClient() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    hero_title: 'Quality Changes the World',
    hero_desc_uz: '',
    hero_desc_ru: '',
    mission_text_uz: '',
    mission_text_ru: '',
    clients_text_uz: '',
    clients_text_ru: '',
    office_image: '',
    stat1_value: '1989', stat1_label_uz: '', stat1_label_ru: '',
    stat2_value: '150+', stat2_label_uz: '', stat2_label_ru: '',
    stat3_value: '100 000+', stat3_label_uz: '', stat3_label_ru: '',
    stat4_value: 'TOP-5', stat4_label_uz: '', stat4_label_ru: '',
  });

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
      await supabase.from('about_content').update(payload).eq('id', id);
    }
    setSaving(false);
    alert('Saqlandi! ✅');
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

      {/* Hero */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Hero qism</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sarlavha</label>
            <input type="text" name="hero_title" value={formData.hero_title} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tavsif (O'zbekcha)</label>
              <textarea rows={3} name="hero_desc_uz" value={formData.hero_desc_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tavsif (Ruscha)</label>
              <textarea rows={3} name="hero_desc_ru" value={formData.hero_desc_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
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
            <div key={n} className="border border-gray-100 rounded-lg p-4">
              <h4 className="font-bold text-gray-600 mb-3">Statistika #{n}</h4>
              <input type="text" name={`stat${n}_value`} value={(formData as any)[`stat${n}_value`]} onChange={handleChange} placeholder="Qiymat (1989, 150+...)" className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none mb-2 font-bold text-lg" />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" name={`stat${n}_label_uz`} value={(formData as any)[`stat${n}_label_uz`]} onChange={handleChange} placeholder="Label UZ" className="px-3 py-2 rounded-lg border border-gray-300 outline-none text-sm" />
                <input type="text" name={`stat${n}_label_ru`} value={(formData as any)[`stat${n}_label_ru`]} onChange={handleChange} placeholder="Label RU" className="px-3 py-2 rounded-lg border border-gray-300 outline-none text-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Texts */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Missiya matni (asosiy blok)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Missiya (O'zbekcha)</label>
            <textarea rows={6} name="mission_text_uz" value={formData.mission_text_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Missiya (Ruscha)</label>
            <textarea rows={6} name="mission_text_ru" value={formData.mission_text_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mijozlar matni (O'zbekcha)</label>
            <textarea rows={4} name="clients_text_uz" value={formData.clients_text_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mijozlar matni (Ruscha)</label>
            <textarea rows={4} name="clients_text_ru" value={formData.clients_text_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
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
