'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Save, X, Plus, GripVertical, Settings } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from './ImageUpload';
import { slugify } from '@/lib/slugify';
import { useToast } from './ToastProvider';

type Spec = { label: string; value: string; unit: string };

export default function ProductForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCats() {
      const { data } = await supabase.from('product_categories').select('*').order('order_index', { ascending: true });
      if (data) {
        setCategories(data);
        // If adding new product, set initial labels from default "excavator" category
        if (!initialData) {
          const defaultCat = data.find(c => c.slug === 'excavator') || data[0];
          if (defaultCat) {
            setFormData(prev => ({
              ...prev,
              category: defaultCat.slug,
              category_label_uz: defaultCat.name_uz,
              category_label_ru: defaultCat.name_ru,
              category_label_en: defaultCat.name_en,
            }));
          }
        }
      }
    }
    fetchCats();
  }, [initialData]);
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'excavator',
    category_label_uz: initialData?.category_label_uz || '',
    category_label_ru: initialData?.category_label_ru || initialData?.category_label || '',
    category_label_en: initialData?.category_label_en || '',
    price: initialData?.price || '',
    short_description_uz: initialData?.short_description_uz || '',
    short_description_ru: initialData?.short_description_ru || initialData?.short_description || '',
    short_description_en: initialData?.short_description_en || '',
    description_uz: initialData?.description_uz || '',
    description_ru: initialData?.description_ru || initialData?.description || '',
    description_en: initialData?.description_en || '',
    power: initialData?.power || '',
    operating_weight: initialData?.operating_weight || '',
    bucket_capacity: initialData?.bucket_capacity || '',
    max_lift_capacity: initialData?.max_lift_capacity || '',
    thumbnail: initialData?.thumbnail || '',
    pdf_brochure: initialData?.pdf_brochure || '',
    featured: initialData?.featured || false,
  });

  const [specs, setSpecs] = useState<Spec[]>(initialData?.specs || []);
  const [images, setImages] = useState<string[]>(initialData?.images || ['']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      };

      // Auto-generate slug from name
      if (name === 'name') {
        updated.slug = slugify(value);
      }

      // Auto-set labels when category changes
      if (name === 'category') {
        const selected = categories.find(c => c.slug === value);
        if (selected) {
          updated.category_label_uz = selected.name_uz;
          updated.category_label_ru = selected.name_ru;
          updated.category_label_en = selected.name_en;
        }
      }

      return updated;
    });
  };

  const copyFromRu = (fieldBase: string, targetLang: 'uz' | 'en') => {
    const sourceValue = formData[`${fieldBase}_ru` as keyof typeof formData] as string;
    setFormData(prev => ({
      ...prev,
      [`${fieldBase}_${targetLang}`]: sourceValue
    }));
  };

  const handleTranslate = async (fieldBase: string) => {
    const sourceText = formData[`${fieldBase}_ru` as keyof typeof formData] as string;
    if (!sourceText) return;
    
    setLoading(true);
    try {
      // Simulate/Proxy translation
      alert('Avto-tarjima tayyorlanmoqda... (Haqiqiy loyihada Google/DeepL API ulanadi)');
    } finally {
      setLoading(false);
    }
  };

  const handleSpecChange = (index: number, field: keyof Spec, value: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const productPayload = {
      ...formData,
      category_label: formData.category_label_ru, 
      short_description: formData.short_description_ru,
      description: formData.description_ru,
      price: formData.price ? Number(formData.price) : null,
      specs: specs.filter(s => s.label && s.value), // Remove empty specs
      images: images.filter(i => i.trim() !== ''), // Remove empty image lines
    };

    let errorResult;

    if (initialData?.id) {
      // Update
      const { error } = await supabase.from('products').update(productPayload).eq('id', initialData.id);
      errorResult = error;
    } else {
      // Insert
      const { error } = await supabase.from('products').insert([productPayload]);
      errorResult = error;
    }

    setLoading(false);

    if (errorResult) {
      toast('Ошибка: ' + errorResult.message, 'error');
    } else {
      toast(initialData?.id ? 'Mahsulot yangilandi!' : 'Yangi mahsulot qo\'shildi!');
      router.push('/admin/products');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Основная информация</h3>
          <Link href="/admin/products/categories" className="text-sm text-sany-red hover:underline flex items-center gap-1">
            <Settings className="w-4 h-4" /> Управление категориями
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Название модели *</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none shadow-sm" placeholder="Например: SY215C" />
            <div className="text-[11px] text-gray-400 mt-1">Slug: {formData.slug}</div>
          </div>

          <div className="col-span-1 md:col-span-2 p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-sany-red" />
                Системная категория
              </label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none bg-white shadow-sm"
              >
                <option value="">Выберите системную категорию...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.slug}>{c.name_ru}</option>
                ))}
              </select>
              <p className="text-[11px] text-gray-500 mt-2 italic">Выбор категории автоматически заполнит поля ниже, но вы можете их изменить индивидуально для этого товара.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase">Kategoriya nomi (UZ) *</label>
                  <button type="button" onClick={() => copyFromRu('category_label', 'uz')} className="text-[10px] text-blue-500 hover:underline">RU dan nusxa</button>
                </div>
                <input required type="text" name="category_label_uz" value={formData.category_label_uz} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none bg-white font-montserrat" placeholder="Gusenitsali ekskavator" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Название категории (RU) *</label>
                <input required type="text" name="category_label_ru" value={formData.category_label_ru} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none bg-white font-montserrat" placeholder="Гусеничный экскаватор" />
              </div>
              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase">Category Name (EN) *</label>
                  <button type="button" onClick={() => copyFromRu('category_label', 'en')} className="text-[10px] text-blue-500 hover:underline">RU dan nusxa</button>
                </div>
                <input required type="text" name="category_label_en" value={formData.category_label_en} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none bg-white font-montserrat" placeholder="Crawler Excavator" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Цена (в сумах)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none shadow-sm" placeholder="Например: 1250000000" />
          </div>
          <div className="flex items-center mt-8 p-3 bg-red-50 rounded-lg border border-red-100">
            <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 text-sany-red focus:ring-sany-red border-gray-300 rounded cursor-pointer" />
            <label htmlFor="featured" className="ml-3 text-sm font-bold text-gray-700 cursor-pointer">Топ товар (Вывесить на главную)</label>
          </div>
        </div>
      </div>

      {/* Descriptions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Описания</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-montserrat">
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-sm font-medium text-gray-700">Kratkoe opisanie (UZ)</label>
                <button type="button" onClick={() => copyFromRu('short_description', 'uz')} className="text-[10px] text-blue-500 hover:underline">RU dan nusxa</button>
              </div>
              <textarea required rows={2} name="short_description_uz" value={formData.short_description_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Краткое описание (RU)</label>
              <textarea required rows={2} name="short_description_ru" value={formData.short_description_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"></textarea>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-sm font-medium text-gray-700">Short Description (EN)</label>
                <button type="button" onClick={() => copyFromRu('short_description', 'en')} className="text-[10px] text-blue-500 hover:underline">RU dan nusxa</button>
              </div>
              <textarea required rows={2} name="short_description_en" value={formData.short_description_en} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"></textarea>
            </div>
          </div>
          <div className="space-y-4 font-montserrat">
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-sm font-medium text-gray-700">To'liq tavsif (UZ)</label>
                <button type="button" onClick={() => copyFromRu('description', 'uz')} className="text-[10px] text-blue-500 hover:underline">RU dan nusxa</button>
              </div>
              <textarea required rows={4} name="description_uz" value={formData.description_uz} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Полное описание (RU)</label>
              <textarea required rows={4} name="description_ru" value={formData.description_ru} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"></textarea>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-sm font-medium text-gray-700">Full Description (EN)</label>
                <button type="button" onClick={() => copyFromRu('description', 'en')} className="text-[10px] text-blue-500 hover:underline">RU dan nusxa</button>
              </div>
              <textarea required rows={4} name="description_en" value={formData.description_en} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none"></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Медиафайлы</h3>
        <div className="space-y-6">
          <ImageUpload
            value={formData.thumbnail}
            onChange={(url) => setFormData(prev => ({ ...prev, thumbnail: url }))}
            folder="products"
            label="Миниатюра (главное фото карточки)"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Галерея фотографий</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img, i) => (
                <div key={i} className="relative bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
                  <ImageUpload
                    value={img}
                    onChange={(url) => handleImageChange(i, url)}
                    folder="products"
                    label={`Фото #${i + 1}`}
                  />
                  <button 
                    type="button" 
                    onClick={() => setImages(images.filter((_, idx) => idx !== i))} 
                    className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                  >
                    <X className="w-4 h-4"/>
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setImages([...images, ''])} className="flex items-center gap-2 text-blue-500 text-sm font-bold mt-4 hover:underline">
              <Plus className="w-4 h-4" /> Добавить еще одно фото
            </button>
          </div>
          <ImageUpload
            value={formData.pdf_brochure}
            onChange={(url) => setFormData(prev => ({ ...prev, pdf_brochure: url }))}
            folder="brochures"
            label="PDF Брошюра (Yuklash yoki havola)"
          />
        </div>
      </div>

      {/* Main Stats Summary for Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Ключевые показатели (Для иконок)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Мощность</label>
            <input type="text" name="power" value={formData.power} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Например: 162 л.с." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Рабочая масса</label>
            <input type="text" name="operating_weight" value={formData.operating_weight} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="Например: 21 500 кг" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Объем ковша</label>
            <input type="text" name="bucket_capacity" value={formData.bucket_capacity} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="1.2 м³" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Грузоподъемность</label>
            <input type="text" name="max_lift_capacity" value={formData.max_lift_capacity} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sany-red outline-none" placeholder="25 тонн" />
          </div>
        </div>
      </div>

      {/* Specs Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Технические характеристики</h3>
        <div className="space-y-4">
          {specs.map((spec, i) => (
            <div key={i} className="flex gap-4">
              <input type="text" value={spec.label} onChange={(e) => handleSpecChange(i, 'label', e.target.value)} placeholder="Название (Двигатель)" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 outline-none" />
              <input type="text" value={spec.value} onChange={(e) => handleSpecChange(i, 'value', e.target.value)} placeholder="Значение (Cummins)" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 outline-none" />
              <input type="text" value={spec.unit} onChange={(e) => handleSpecChange(i, 'unit', e.target.value)} placeholder="Ед.изм (л.с.)" className="w-32 px-4 py-3 rounded-lg border border-gray-300 outline-none" />
              <button type="button" onClick={() => setSpecs(specs.filter((_, idx) => idx !== i))} className="p-3 bg-red-50 text-red-500 rounded-lg"><X className="w-5 h-5"/></button>
            </div>
          ))}
          <button type="button" onClick={() => setSpecs([...specs, { label: '', value: '', unit: '' }])} className="flex items-center gap-2 text-sany-red font-bold p-2 hover:bg-red-50 rounded-lg transition-colors">
            <Plus className="w-5 h-5" /> Добавить характеристику
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link href="/admin/products" className="py-3 px-6 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 font-bold transition-colors">
          Отмена
        </Link>
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50">
          <Save className="w-5 h-5" /> {loading ? 'Сохранение...' : 'Сохранить продукт'}
        </button>
      </div>
    </form>
  );
}
