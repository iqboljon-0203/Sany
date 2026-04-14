import { createClient } from '@/lib/supabase/server';
import ServiceForm from '@/components/admin/ServiceForm';
import { notFound } from 'next/navigation';

export default async function EditServicePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  if (!id) {
    notFound();
  }

  const supabase = await createClient();
  const { data: service, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !service) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Servis xizmatini tahrirlash</h2>
        <p className="text-gray-500 mt-2">Ma'lumotlarni o'zgartirib saqlang.</p>
      </div>
      <ServiceForm initialData={service} />
    </div>
  );
}
