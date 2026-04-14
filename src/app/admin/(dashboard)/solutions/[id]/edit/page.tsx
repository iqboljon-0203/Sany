import { createClient } from '@/lib/supabase/server';
import SolutionForm from '@/components/admin/SolutionForm';
import { notFound } from 'next/navigation';

export default async function EditSolutionPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  if (!id) {
    notFound();
  }

  const supabase = await createClient();
  const { data: solution, error } = await supabase
    .from('solutions')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !solution) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Yechimni tahrirlash</h2>
        <p className="text-gray-500 mt-2">Ma'lumotlarni o'zgartiring va saqlang.</p>
      </div>
      <SolutionForm initialData={solution} />
    </div>
  );
}
