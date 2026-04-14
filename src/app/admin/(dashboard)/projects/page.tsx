import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';

export const revalidate = 0; 

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="text-red-500 p-8">Ma'lumot yuklashda xatolik: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">Loyihalar va Mijozlar</h2>
        <Link 
          href="/admin/projects/new" 
          className="flex items-center gap-2 bg-sany-red hover:bg-red-700 text-white font-bold py-2.5 px-5 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Loyiha qo'shish
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="h-48 bg-gray-100 relative group">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">Rasm yo'q</div>
              )}
              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <Link 
                  href={`/admin/projects/${project.id}/edit`} 
                  className="bg-white text-blue-600 p-3 rounded-full hover:bg-blue-50 transition-colors"
                  title="В разработке"
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <div className="bg-white rounded-full p-1 overflow-hidden">
                  <DeleteButton table="projects" id={project.id} />
                </div>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <span className="text-xs font-bold text-sany-red uppercase tracking-wide mb-2">
                {project.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{project.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{project.location}</p>
              
              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Ishlatilgan texnikalar:</p>
                <div className="flex flex-wrap gap-1">
                  {project.machines?.map((m: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      {m}
                    </span>
                  ))}
                  {(!project.machines || project.machines.length === 0) && (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {projects?.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-100">
            Ma'lumotlar bazasi bo'sh. Birinchi loyihani qo'shing.
          </div>
        )}
      </div>
    </div>
  );
}
