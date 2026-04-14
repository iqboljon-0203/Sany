import { createClient } from '@/lib/supabase/server';
import ProductForm from '@/components/admin/ProductForm';
import { notFound } from 'next/navigation';

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  
  if (!id) {
    notFound();
  }

  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !product) {
    console.error('Error fetching product for edit:', error);
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Редактирование техники</h2>
        <p className="text-gray-500 mt-2">Измените необходимые данные и сохраните.</p>
      </div>
      <ProductForm initialData={product} />
    </div>
  );
}
