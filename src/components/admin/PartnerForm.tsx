'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Save } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from './ImageUpload';

export default function PartnerForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(initialData?.name || '');
  const [logo, setLogo] = useState(initialData?.logo || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = { name, logo };

    let errorResult;
    if (initialData?.id) {
      const { error } = await supabase.from('partners').update(payload).eq('id', initialData.id);
      errorResult = error;
    } else {
      const { error } = await supabase.from('partners').insert([payload]);
      errorResult = error;
    }

    setLoading(false);
    if (errorResult) {
      alert('Xatolik: ' + errorResult.message);
    } else {
      router.push('/admin/partners');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Hamkor ma'lumotlari</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hamkor nomi *</label>
            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Enter Engineering" />
          </div>
          <ImageUpload
            value={logo}
            onChange={setLogo}
            folder="partners"
            label="Logotip (rasm yuklang yoki URL kiriting)"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link href="/admin/partners" className="py-3 px-6 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 font-bold transition-colors">Bekor qilish</Link>
        <button type="submit" disabled={loading || !logo} className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50">
          <Save className="w-5 h-5" /> {loading ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
      </div>
    </form>
  );
}
