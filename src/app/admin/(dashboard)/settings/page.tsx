'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Save } from 'lucide-react';
import { useToast } from '@/components/admin/ToastProvider';

export default function SettingsAdminPage() {
  const supabase = createClient();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    address_uz: '', address_ru: '', address_en: '',
    working_hours_uz: '', working_hours_ru: '', working_hours_en: '',
    phone_sales: '', phone_service: '', phone_leasing: '',
    email: '',
    telegram_url: '', whatsapp_url: '', instagram_url: '', facebook_url: '',
    map_iframe: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase.from('settings').select('*').limit(1).single();
    if (data) setFormData(data);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { id, ...payload } = formData;
    if (id) {
      const { error } = await supabase.from('settings').update(payload).eq('id', id);
      if (error) {
        toast('Xatolik: ' + error.message, 'error');
      } else {
        toast('Sozlamalar saqlandi! ✅', 'success');
      }
    }
    setSaving(false);
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Yuklanmoqda...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Umumiy sozlamalar</h2>
        <p className="text-gray-500 mt-1">Kontaktlar, ijtimoiy tarmoqlar va xarita ma'lumotlari</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Phones */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Telefon raqamlar</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sotuv bo'limi</label>
              <input type="text" name="phone_sales" value={formData.phone_sales} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Servis bo'limi</label>
              <input type="text" name="phone_service" value={formData.phone_service} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lizing bo'limi</label>
              <input type="text" name="phone_leasing" value={formData.phone_leasing} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
            </div>
          </div>
        </div>

        {/* Address & Hours */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Manzil va Ish tartibi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Manzil (UZ)</label>
                <textarea rows={2} name="address_uz" value={formData.address_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ish tartibi (UZ)</label>
                <input type="text" name="working_hours_uz" value={formData.working_hours_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Manzil (RU)</label>
                <textarea rows={2} name="address_ru" value={formData.address_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ish tartibi (RU)</label>
                <input type="text" name="working_hours_ru" value={formData.working_hours_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Manzil (EN)</label>
                <textarea rows={2} name="address_en" value={formData.address_en} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ish tartibi (EN)</label>
                <input type="text" name="working_hours_en" value={formData.working_hours_en} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Ijtimoiy tarmoqlar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telegram URL</label>
              <input type="text" name="telegram_url" value={formData.telegram_url} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" placeholder="https://t.me/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp URL</label>
              <input type="text" name="whatsapp_url" value={formData.whatsapp_url} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" placeholder="https://wa.me/..." />
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Xarita (Google Maps Iframe src)</h3>
          <textarea rows={3} name="map_iframe" value={formData.map_iframe} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" placeholder="https://www.google.com/maps/embed?..."></textarea>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-3 px-10 rounded-lg transition-colors disabled:opacity-50">
            <Save className="w-5 h-5" /> {saving ? 'Saqlanmoqda...' : 'Saqlash'}
          </button>
        </div>
      </form>
    </div>
  );
}
