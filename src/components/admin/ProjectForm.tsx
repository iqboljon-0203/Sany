'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Save, X, Plus, Copy } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from './ImageUpload';
import { useToast } from './ToastProvider';

export default function ProjectForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title_uz: initialData?.title_uz || '',
    title_ru: initialData?.title_ru || initialData?.title || '',
    title_en: initialData?.title_en || '',
    location_uz: initialData?.location_uz || '',
    location_ru: initialData?.location_ru || initialData?.location || '',
    location_en: initialData?.location_en || '',
    category_uz: initialData?.category_uz || '',
    category_ru: initialData?.category_ru || initialData?.category || '',
    category_en: initialData?.category_en || '',
    image: initialData?.image || '',
    description_uz: initialData?.description_uz || '',
    description_ru: initialData?.description_ru || initialData?.description || '',
    description_en: initialData?.description_en || '',
  });

  const [machines, setMachines] = useState<string[]>(initialData?.machines || ['']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMachineChange = (index: number, value: string) => {
    const newMachines = [...machines];
    newMachines[index] = value;
    setMachines(newMachines);
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

    const projectPayload = {
      title: formData.title_ru || '',
      title_uz: formData.title_uz || '',
      title_ru: formData.title_ru || '',
      title_en: formData.title_en || '',
      location: formData.location_ru || '',
      location_uz: formData.location_uz || '',
      location_ru: formData.location_ru || '',
      location_en: formData.location_en || '',
      category: formData.category_ru || '',
      category_uz: formData.category_uz || '',
      category_ru: formData.category_ru || '',
      category_en: formData.category_en || '',
      description: formData.description_ru || '',
      description_uz: formData.description_uz || '',
      description_ru: formData.description_ru || '',
      description_en: formData.description_en || '',
      image: formData.image || '',
      machines: machines.filter(m => m.trim() !== ''),
    };

    if (!projectPayload.title) {
      toast('Ошибка: Русское название проекта обязательно к заполнению', 'error');
      setLoading(false);
      return;
    }

    let errorResult;

    if (initialData?.id) {
      // Update
      const { error } = await supabase.from('projects').update(projectPayload).eq('id', initialData.id);
      errorResult = error;
    } else {
      // Insert
      const { error } = await supabase.from('projects').insert([projectPayload]);
      errorResult = error;
    }

    setLoading(false);

    if (errorResult) {
      toast('Ошибка: ' + errorResult.message, 'error');
    } else {
      toast(initialData?.id ? 'Проект обновлен' : 'Проект создан', 'success');
      router.push('/admin/projects');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Информация о проекте</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 col-span-2">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Название проекта (UZ) *</label>
                <button type="button" onClick={() => copyFromRu('title', 'uz')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                  <Copy className="w-2.5 h-2.5"/> nusxa (RU)
                </button>
              </div>
              <input required type="text" name="title_uz" value={formData.title_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Узбекистон темир йулlari" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Название проекта (RU) *</label>
              <input required type="text" name="title_ru" value={formData.title_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Узбекистон темир йуллари" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Project Title (EN) *</label>
                <button type="button" onClick={() => copyFromRu('title', 'en')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                  <Copy className="w-2.5 h-2.5"/> copy (RU)
                </button>
              </div>
              <input required type="text" name="title_en" value={formData.title_en} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Uzbekistan Railways" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 col-span-2">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Локация (UZ) *</label>
                <button type="button" onClick={() => copyFromRu('location', 'uz')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                  <Copy className="w-2.5 h-2.5"/> nusxa (RU)
                </button>
              </div>
              <input required type="text" name="location_uz" value={formData.location_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Toshkent viloyati" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Локация (RU) *</label>
              <input required type="text" name="location_ru" value={formData.location_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Ташкентская область" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Location (EN) *</label>
                <button type="button" onClick={() => copyFromRu('location', 'en')} className="text-[10px] text-sany-red flex items-center gap-1 hover:underline">
                  <Copy className="w-2.5 h-2.5"/> copy (RU)
                </button>
              </div>
              <input required type="text" name="location_en" value={formData.location_en} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Tashkent region" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Категория проекта *</label>
              <select 
                required 
                name="category_ru" 
                value={formData.category_ru} 
                onChange={(e) => {
                  const val = e.target.value;
                  const selected = [
                    { ru: 'Строительство', uz: 'Qurilish', en: 'Construction' },
                    { ru: 'Горнодобывающая промышленность', uz: 'Tog\'-kon sanoati', en: 'Mining Industry' },
                    { ru: 'Дорожное строительство', uz: 'Yo\'l qurilishi', en: 'Road Construction' },
                    { ru: 'Промышленность', uz: 'Sanoat', en: 'Industry' },
                    { ru: 'Другое', uz: 'Boshqa', en: 'Other' }
                  ].find(c => c.ru === val);

                  if (selected) {
                    setFormData(prev => ({
                      ...prev,
                      category_ru: selected.ru,
                      category_uz: selected.uz,
                      category_en: selected.en
                    }));
                  }
                }} 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none bg-white"
              >
                <option value="">Выберите категорию</option>
                <option value="Строительство">Строительство</option>
                <option value="Горнодобывающая промышленность">Горнодобывающая промышленность</option>
                <option value="Дорожное строительство">Дорожное строительство</option>
                <option value="Промышленность">Промышленность</option>
                <option value="Другое">Другое</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Uzbekcha</label>
                  <input disabled value={formData.category_uz} className="w-full px-4 py-3 rounded-lg border border-gray-100 bg-gray-50 text-gray-400" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">English</label>
                  <input disabled value={formData.category_en} className="w-full px-4 py-3 rounded-lg border border-gray-100 bg-gray-50 text-gray-400" />
               </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
              folder="projects"
              label="Обложка проекта (расм юкланг ёки URL киритинг)"
            />
          </div>
          <div className="md:col-span-2 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Описание (UZ)</label>
                <button type="button" onClick={() => copyFromRu('description', 'uz')} className="text-xs text-sany-red flex items-center gap-1 hover:underline">
                  <Copy className="w-3 h-3"/> nusxa olish (RU dan)
                </button>
              </div>
              <textarea required rows={3} name="description_uz" value={formData.description_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Описание (RU)</label>
              <textarea required rows={3} name="description_ru" value={formData.description_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"></textarea>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Description (EN)</label>
                <button type="button" onClick={() => copyFromRu('description', 'en')} className="text-xs text-sany-red flex items-center gap-1 hover:underline">
                  <Copy className="w-3 h-3"/> copy from RU
                </button>
              </div>
              <textarea required rows={3} name="description_en" value={formData.description_en} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Used Machines Tags */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Используемая техника SANY</h3>
        <p className="text-sm text-gray-500 mb-4">Перечислите технику которая была задействована (эти тэги выводятся на карточке)</p>
        <div className="space-y-3">
          {machines.map((machine, i) => (
            <div key={i} className="flex gap-4">
              <input type="text" value={machine} onChange={(e) => handleMachineChange(i, e.target.value)} placeholder="Например: Экскаваторы SY215C (10 шт.)" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 outline-none" />
              <button type="button" onClick={() => setMachines(machines.filter((_, idx) => idx !== i))} className="p-3 bg-red-50 text-red-500 rounded-lg"><X className="w-5 h-5"/></button>
            </div>
          ))}
          <button type="button" onClick={() => setMachines([...machines, ''])} className="flex items-center gap-2 text-sany-red font-bold p-2 hover:bg-red-50 rounded-lg transition-colors mt-2">
            <Plus className="w-5 h-5" /> Добавить технику
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link href="/admin/projects" className="py-3 px-6 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 font-bold transition-colors">
          Отмена
        </Link>
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50">
          <Save className="w-5 h-5" /> {loading ? 'Сохранение...' : 'Сохранить проект'}
        </button>
      </div>
    </form>
  );
}
