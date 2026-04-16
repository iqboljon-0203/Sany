'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Pencil, Trash2, GripVertical, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { slugify } from '@/lib/slugify';
import AdminBreadcrumbs from '@/components/admin/AdminBreadcrumbs';
import { useToast } from '@/components/admin/ToastProvider';

export default function CategoriesPage() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name_uz: '',
    name_ru: '',
    name_en: '',
    slug: '',
    order_index: 0
  });
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const { data } = await supabase
      .from('product_categories')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setCategories(data);
    setLoading(false);
  }

  const handleEdit = (cat: any) => {
    setEditingId(cat.id);
    setFormData({
      name_uz: cat.name_uz,
      name_ru: cat.name_ru,
      name_en: cat.name_en,
      slug: cat.slug,
      order_index: cat.order_index
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name_uz: '', name_ru: '', name_en: '', slug: '', order_index: 0 });
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'name_ru') {
        updated.slug = slugify(value);
      }
      return updated;
    });
  };

  const handleSave = async (id?: string) => {
    if (!formData.name_ru || !formData.slug) {
      toast('Ruscha nom majburiy!', 'error');
      return;
    }

    setLoading(true);
    if (id) {
      const { error } = await supabase.from('product_categories').update(formData).eq('id', id);
      if (error) toast(error.message, 'error');
      else toast('Kategoriyadagi o\'zgarishlar saqlandi!');
    } else {
      const { error } = await supabase.from('product_categories').insert([formData]);
      if (error) toast(error.message, 'error');
      else toast('Yangi kategoriya qo\'shildi!');
    }
    
    handleCancel();
    fetchCategories();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Haqiqatan ham ushbu kategoriyani o\'chirmoqchimisiz? Bu ushbu kategoriyadagi mahsulotlarga ta\'sir qilishi mumkin.')) return;
    
    const { error } = await supabase.from('product_categories').delete().eq('id', id);
    if (error) toast(error.message, 'error');
    else toast('Kategoriya o\'chirildi');
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[
        { label: 'Mahsulotlar', href: '/admin/products' },
        { label: 'Kategoriyalar' }
      ]} />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-heading font-bold text-gray-900">Mahsulot kategoriyalari</h2>
          <p className="text-gray-500 mt-1">Mahsulotlarni guruhlash uchun kategoriyalar</p>
        </div>
        {!editingId && (
          <button 
            onClick={() => setEditingId('new')}
            className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-bold"
          >
            <Plus className="w-5 h-5" /> Yangi kategoriya
          </button>
        )}
      </div>

      {editingId && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-sany-red/20 mb-6 font-montserrat">
          <h3 className="text-lg font-bold mb-4">{editingId === 'new' ? 'Yangi kategoriya' : 'Kategoriyani tahrirlash'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nom (RU) *</label>
              <input 
                type="text" 
                value={formData.name_ru} 
                onChange={(e) => updateField('name_ru', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"
                placeholder="Экскаваторы"
              />
              <div className="text-[10px] text-gray-400 mt-1">Slug: {formData.slug}</div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nom (UZ)</label>
              <input 
                type="text" 
                value={formData.name_uz} 
                onChange={(e) => updateField('name_uz', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"
                placeholder="Ekskavatorlar"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nom (EN)</label>
              <input 
                type="text" 
                value={formData.name_en} 
                onChange={(e) => updateField('name_en', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"
                placeholder="Excavators"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={handleCancel} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Bekor qilish</button>
            <button 
              onClick={() => handleSave(editingId === 'new' ? undefined : editingId)} 
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors font-bold"
            >
              <Save className="w-5 h-5" /> Saqlash
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="py-4 px-6 text-sm font-bold text-gray-500">Tartib</th>
              <th className="py-4 px-6 text-sm font-bold text-gray-500">Nom (RU)</th>
              <th className="py-4 px-6 text-sm font-bold text-gray-500">Nom (UZ)</th>
              <th className="py-4 px-6 text-sm font-bold text-gray-500">Slag</th>
              <th className="py-4 px-6 text-sm font-bold text-gray-500 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-300" />
                    <span className="font-mono text-gray-400">#{cat.order_index}</span>
                  </div>
                </td>
                <td className="py-4 px-6 font-bold text-gray-900">{cat.name_ru}</td>
                <td className="py-4 px-6 text-gray-600">{cat.name_uz}</td>
                <td className="py-4 px-6">
                  <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded font-mono">{cat.slug}</span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(cat)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-400 italic">Kategoriyalar mavjud emas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
