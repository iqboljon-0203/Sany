import SolutionForm from '@/components/admin/SolutionForm';

export default function NewSolutionPage() {
  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Yangi yechim qo'shish</h2>
        <p className="text-gray-500 mt-2">Saytdagi "Yechimlar" sahifasiga yangi soha qo'shing.</p>
      </div>
      <SolutionForm />
    </div>
  );
}
