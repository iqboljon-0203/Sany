import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import AboutClient from './AboutClient';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'О компании SANY Uzbekistan — Официальный дилер',
  description: 'Узнайте больше о SANY AUTOMOBILE MANUFACTURING CENTRAL ASIA. Мы поставляем надежную спецтехнику SANY в Узбекистан: от экскаваторов до мощных карьерных самосвалов. Наша миссия — качественные перемены в строительной сфере.',
  keywords: ['о компании SANY', 'SANY Uzbekistan дилер', 'история SANY', 'спецтехника Узбекистан', 'SANY Group'],
};

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: aboutContent } = await supabase.from('about_content').select('*').limit(1).single();
  const { data: values } = await supabase.from('about_values').select('*').order('order_index', { ascending: true });

  return <AboutClient aboutContent={aboutContent} valuesList={values || []} />;
}
