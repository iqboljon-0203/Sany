import { createClient } from '@/lib/supabase/server';
import AdvantageForm from '@/components/admin/AdvantageForm';
import { notFound } from 'next/navigation';

export default async function EditAdvantagePage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: advantage } = await supabase.from('advantages').select('*').eq('id', params.id).single();

  if (!advantage) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Afzallikni tahrirlash</h2>
        <p className="text-gray-500 mt-2">Ma'lumotlarni o'zgartirib saqlang.</p>
      </div>
      <AdvantageForm initialData={advantage} />
    </div>
  );
}
