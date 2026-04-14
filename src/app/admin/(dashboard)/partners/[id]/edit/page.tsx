import { createClient } from '@/lib/supabase/server';
import PartnerForm from '@/components/admin/PartnerForm';
import { notFound } from 'next/navigation';

export default async function EditPartnerPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: partner } = await supabase.from('partners').select('*').eq('id', params.id).single();

  if (!partner) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Hamkorni tahrirlash</h2>
        <p className="text-gray-500 mt-2">Ma'lumotlarni o'zgartirib saqlang.</p>
      </div>
      <PartnerForm initialData={partner} />
    </div>
  );
}
