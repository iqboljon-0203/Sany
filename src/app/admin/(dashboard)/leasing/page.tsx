'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Save, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import DeleteButton from '@/components/admin/DeleteButton';

export default function LeasingAdminPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [savingConfig, setSavingConfig] = useState(false);
  
  const [config, setConfig] = useState({
    id: '',
    annual_rate: 22,
    min_prepayment: 20,
    max_period: 48,
  });

  const [advantages, setAdvantages] = useState<any[]>([]);
  const [steps, setSteps] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: conf } = await supabase.from('leasing_config').select('*').limit(1).single();
    if (conf) setConfig(conf);

    const { data: ads } = await supabase.from('leasing_advantages').select('*').order('order_index', { ascending: true });
    setAdvantages(ads || []);

    const { data: sts } = await supabase.from('leasing_steps').select('*').order('order_index', { ascending: true });
    setSteps(sts || []);

    setLoading(false);
  };

  const handleConfigSave = async () => {
    setSavingConfig(true);
    const { id, ...payload } = config;
    if (id) {
      await supabase.from('leasing_config').update(payload).eq('id', id);
    } else {
      await supabase.from('leasing_config').insert([payload]);
    }
    setSavingConfig(false);
    alert('Sozlamalar saqlandi! ✅');
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Yuklanmoqda...</div>;

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Lizing boshqaruvi</h2>
      </div>

      {/* Calculator Config */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Kalkulyator sozlamalari</h3>
          <button onClick={handleConfigSave} disabled={savingConfig} className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50">
            <Save className="w-4 h-4" /> {savingConfig ? '...' : 'Saqlash'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Yillik foiz stavkasi (%)</label>
            <input type="number" value={config.annual_rate} onChange={(e) => setConfig({...config, annual_rate: Number(e.target.value)})} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Minimal boshlang'ich to'lov (%)</label>
            <input type="number" value={config.min_prepayment} onChange={(e) => setConfig({...config, min_prepayment: Number(e.target.value)})} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Maksimal muddat (oy)</label>
            <input type="number" value={config.max_period} onChange={(e) => setConfig({...config, max_period: Number(e.target.value)})} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
          </div>
        </div>
      </div>

      {/* Advantages */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Lizing afzalliklari</h3>
          <Link href="/admin/leasing/advantages/new" className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Qo'shish
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-bold text-gray-500">Ikonka</th>
                <th className="text-left py-4 px-6 text-sm font-bold text-gray-500">Nomi (UZ)</th>
                <th className="text-left py-4 px-6 text-sm font-bold text-gray-500">Nomi (RU)</th>
                <th className="text-right py-4 px-6 text-sm font-bold text-gray-500">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {advantages.map((ad) => (
                <tr key={ad.id} className="border-b border-gray-50">
                  <td className="py-4 px-6 text-2xl">{ad.icon}</td>
                  <td className="py-4 px-6 font-bold">{ad.title_uz}</td>
                  <td className="py-4 px-6 text-gray-500">{ad.title_ru}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/leasing/advantages/${ad.id}/edit`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></Link>
                      <DeleteButton table="leasing_advantages" id={ad.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Steps */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Lizing bosqichlari</h3>
          <Link href="/admin/leasing/steps/new" className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Qo'shish
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-bold text-gray-500">Raqam</th>
                <th className="text-left py-4 px-6 text-sm font-bold text-gray-500">Sarlavha (UZ)</th>
                <th className="text-left py-4 px-6 text-sm font-bold text-gray-500">Sarlavha (RU)</th>
                <th className="text-right py-4 px-6 text-sm font-bold text-gray-500">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((st) => (
                <tr key={st.id} className="border-b border-gray-50">
                  <td className="py-4 px-6 font-bold text-sany-red/40">{st.step_num}</td>
                  <td className="py-4 px-6 font-bold">{st.title_uz}</td>
                  <td className="py-4 px-6 text-gray-500">{st.title_ru}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/leasing/steps/${st.id}/edit`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></Link>
                      <DeleteButton table="leasing_steps" id={st.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
