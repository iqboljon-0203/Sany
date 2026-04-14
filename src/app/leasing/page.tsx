import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import LeasingClient from './LeasingClient';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Лизинг спецтехники SANY в Узбекистане — Калькулятор',
  description: 'Выгодные условия лизинга спецтехники SANY. Рассчитайте платежи на онлайн-калькуляторе. Срок до 48 месяцев, первый взнос от 20%. Быстрое одобрение и страхование включено.',
  keywords: ['лизинг спецтехники', 'лизинг экскаваторов', 'SANY лизинг Узбекистан', 'лизинговый калькулятор', 'купить технику в кредит'],
};

export default async function LeasingPage() {
  const supabase = await createClient();
  
  const { data: config } = await supabase.from('leasing_config').select('*').limit(1).single();
  const { data: advantages } = await supabase.from('leasing_advantages').select('*').order('order_index', { ascending: true });
  const { data: steps } = await supabase.from('leasing_steps').select('*').order('order_index', { ascending: true });

  return (
    <LeasingClient 
      config={config} 
      advantages={advantages || []} 
      steps={steps || []} 
    />
  );
}
