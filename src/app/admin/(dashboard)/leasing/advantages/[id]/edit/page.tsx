import { createClient } from '@/lib/supabase/server';
import LeasingAdvantageForm from '@/components/admin/LeasingAdvantageForm';
import { notFound } from 'next/navigation';

export default async function EditLeasingAdvantagePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  if (!id) {
    notFound();
  }

  const supabase = await createClient();
  const { data: advantage, error } = await supabase
    .from('leasing_advantages')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !advantage) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Lizing afzalligini tahrirlash</h2>
        <p className="text-gray-500 mt-2">Ma'lumotlarni o'zgartiring va saqlang.</p>
      </div>
      <LeasingAdvantageForm initialData={advantage} />
    </div>
  );
}
