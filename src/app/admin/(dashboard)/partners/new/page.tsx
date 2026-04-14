import PartnerForm from '@/components/admin/PartnerForm';

export default function NewPartnerPage() {
  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Yangi hamkor qo'shish</h2>
        <p className="text-gray-500 mt-2">Hamkorning nomi va logotipini qo'shing.</p>
      </div>
      <PartnerForm />
    </div>
  );
}
