import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Добавить новую технику</h2>
        <p className="text-gray-500 mt-2">Заполните данные для отображения в каталоге SANY.</p>
      </div>
      <ProductForm />
    </div>
  );
}
