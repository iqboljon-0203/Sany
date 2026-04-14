import { createClient } from '@/lib/supabase/server';
import ProjectForm from '@/components/admin/ProjectForm';
import { notFound } from 'next/navigation';

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  if (!id) {
    notFound();
  }

  const supabase = await createClient();
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !project) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Редактирование проекта</h2>
        <p className="text-gray-500 mt-2">Izoh: Loyiha ma'lumotlarini o'zgartiring.</p>
      </div>
      <ProjectForm initialData={project} />
    </div>
  );
}
