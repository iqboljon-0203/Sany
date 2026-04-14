import { Metadata } from 'next';
import ProjectsSection from '@/components/ProjectsSection';
import PartnersMarquee from '@/components/PartnersMarquee';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 0; // Disable cache so frontend always has fresh admin data

export const metadata: Metadata = {
  title: 'Крупнейшие проекты SANY в Узбекистане',
  description: 'Примеры использования техники SANY на крупнейших стройплощадках и карьерах Узбекистана: АГМК, Мурунтау, Uzbekistan GTL. Нам доверяют лидеры отрасли.',
  keywords: ['проекты SANY', 'строительство Узбекистан', 'карьер Мурунтау', 'АГМК современная техника', 'SANY референс лист'],
};

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  const { data: partners } = await supabase.from('partners').select('*').order('created_at', { ascending: true });

  // Map database format to expected component format
  const mappedProjects = (projects || []).map(p => ({
    id: p.id,
    title: p.title_ru || p.title,
    titleUz: p.title_uz,
    titleRu: p.title_ru,
    titleEn: p.title_en,
    location: p.location_ru || p.location,
    locationUz: p.location_uz,
    locationRu: p.location_ru,
    locationEn: p.location_en,
    category: p.category_ru || p.category,
    categoryUz: p.category_uz,
    categoryRu: p.category_ru,
    categoryEn: p.category_en,
    image: p.image,
    description: p.description_ru || p.description,
    descriptionUz: p.description_uz,
    descriptionRu: p.description_ru,
    descriptionEn: p.description_en,
    machines: p.machines || []
  }));

  return (
    <div className="pt-[82px]">
      <ProjectsSection projectsList={mappedProjects} />
      <PartnersMarquee partnersList={partners || []} />
    </div>
  );
}
