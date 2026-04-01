import { Metadata } from 'next';
import ProjectsSection from '@/components/ProjectsSection';
import PartnersMarquee from '@/components/PartnersMarquee';

export const metadata: Metadata = {
  title: 'Проекты в Узбекистане',
  description: 'Проекты SANY в Узбекистане: АГМК, Мурунтау, Uzbekistan GTL, Ташкентское метро и другие крупные объекты.',
};

export default function ProjectsPage() {
  return (
    <div className="pt-[82px]">
      <ProjectsSection />
      <PartnersMarquee />
    </div>
  );
}
