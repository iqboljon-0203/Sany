import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Добавить новый проект</h2>
        <p className="text-gray-500 mt-2">Добавьте информацию о крупном проекте.</p>
      </div>
      <ProjectForm />
    </div>
  );
}
