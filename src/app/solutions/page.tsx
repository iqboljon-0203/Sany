import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import SolutionsClient from './SolutionsClient';

export const revalidate = 0; // Disable cache so frontend always has fresh admin data

export const metadata: Metadata = {
  title: 'Отраслевые решения | SANY Uzbekistan',
  description: 'Комплексные решения SANY для горнодобывающей промышленности, строительства и дорожных работ в Узбекистане.',
};

export default async function SolutionsPage() {
  const supabase = await createClient();
  const { data: solutions } = await supabase.from('solutions').select('*').order('order_index', { ascending: true });

  return <SolutionsClient solutionsList={solutions || []} />;
}
