import ServiceForm from '@/components/admin/ServiceForm';

export default function NewServicePage() {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Yangi servis xizmati</h2>
        <p className="text-gray-500 mt-2">Servis sahifasiga yangi xizmat kartochkasi qo'shing.</p>
      </div>
      <ServiceForm />
    </div>
  );
}
