import { createClient } from '@/lib/supabase/server';
import LeasingStepForm from '@/components/admin/LeasingStepForm';
import { notFound } from 'next/navigation';

export default async function EditLeasingStepPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  if (!id) {
    notFound();
  }

  const supabase = await createClient();
  const { data: step, error } = await supabase
    .from('leasing_steps')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !step) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Lizing bosqichini tahrirlash</h2>
        <p className="text-gray-500 mt-2">Ma'lumotlarni o'zgartiring va saqlang.</p>
      </div>
      <LeasingStepForm initialData={step} />
    </div>
  );
}
