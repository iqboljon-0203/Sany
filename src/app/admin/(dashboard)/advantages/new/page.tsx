import AdvantageForm from '@/components/admin/AdvantageForm';

export default function NewAdvantagePage() {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Yangi afzallik qo'shish</h2>
        <p className="text-gray-500 mt-2">"Nima uchun SANY" blokiga yangi afzallik qo'shing.</p>
      </div>
      <AdvantageForm />
    </div>
  );
}
