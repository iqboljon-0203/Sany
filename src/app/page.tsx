import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhySanySection from "@/components/WhySanySection";
import ProjectsSection from "@/components/ProjectsSection";
import PartnersMarquee from "@/components/PartnersMarquee";
import LeasingCalculator from "@/components/LeasingCalculator";
import { createClient } from '@/lib/supabase/server';

export const revalidate = 3600; // Cache for 1 hour for performance

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch featured products
  const { data: featuredRaw } = await supabase.from('products').select('*').eq('featured', true).order('created_at', { ascending: false }).limit(6);
  
  // Fetch top projects
  const { data: projectsRaw } = await supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(6);

  // Fetch advantages
  const { data: advantagesRaw } = await supabase.from('advantages').select('*').order('created_at', { ascending: true });

  // Fetch partners
  const { data: partnersRaw } = await supabase.from('partners').select('*').order('created_at', { ascending: true });

  const mappedProjects = (projectsRaw || []).map(p => ({
    id: p.id,
    title: p.title,
    location: p.location,
    category: p.category,
    image: p.image,
    description: p.description,
    machines: p.machines || []
  }));

  const mappedProducts = (featuredRaw || []).map((p: any) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    categoryLabel: p.category_label,
    price: p.price,
    shortDescription: p.short_description,
    description: p.description,
    power: p.power,
    operatingWeight: p.operating_weight,
    bucketCapacity: p.bucket_capacity,
    maxLiftCapacity: p.max_lift_capacity,
    specs: p.specs || [],
    images: p.images || [],
    pdfBrochure: p.pdf_brochure,
    featured: p.featured,
    thumbnail: p.thumbnail,
  }));

  // Fetch leasing config
  const { data: leasingConfig } = await supabase.from('leasing_config').select('*').limit(1).single();

  // Fetch settings for Hero Section
  const { data: settings } = await supabase.from('settings').select('*').limit(1).single();

  return (
    <>
      <HeroSection settings={settings} />
      <FeaturedProducts productsList={mappedProducts} />
      <WhySanySection advantagesList={advantagesRaw || []} />
      <LeasingCalculator config={leasingConfig} />
      <ProjectsSection projectsList={mappedProjects} />
      <PartnersMarquee partnersList={partnersRaw || []} />
    </>
  );
}
