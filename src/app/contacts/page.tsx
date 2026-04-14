import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ContactsClient from './ContactsClient';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Контакты SANY Uzbekistan — Ташкент, Сергили',
  description: 'Свяжитесь с официальным представителем SANY. Адрес офиса, номера телефонов отдела продаж и сервиса, карта проезда. Мы готовы ответить на ваши вопросы 6 дней в неделю.',
  keywords: ['контакты SANY', 'телефон SANY Ташкент', 'адрес SANY Узбекистан', 'отдел продаж SANY', 'сервис SANY телефон'],
};

export default async function ContactsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('settings').select('*').limit(1).single();

  return <ContactsClient settings={settings} />;
}
