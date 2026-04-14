import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ServiceClient from './ServiceClient';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Сервисное обслуживание и Запчасти SANY в Узбекистане',
  description: 'Комплексный сервис техники SANY: круглосуточная выездная поддержка 24/7, оригинальные запасные части со склада в Ташкенте, высококвалифицированные инженеры. Качество сервиса — наш приоритет.',
  keywords: ['сервис SANY', 'запчасти SANY Ташкент', 'поддержка 24/7', 'ремонт экскаваторов', 'выездной сервис спецтехники'],
};

export default async function ServicePage() {
  const supabase = await createClient();
  const { data: services } = await supabase.from('services').select('*').order('order_index', { ascending: true });

  return <ServiceClient servicesList={services || []} />;
}
