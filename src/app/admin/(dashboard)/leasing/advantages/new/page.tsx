import LeasingAdvantageForm from '@/components/admin/LeasingAdvantageForm';

export default function NewLeasingAdvantagePage() {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Yangi lizing afzalligini qo'shish</h2>
        <p className="text-gray-500 mt-2">Ma'lumotlarni to'ldiring.</p>
      </div>
      <LeasingAdvantageForm />
    </div>
  );
}
