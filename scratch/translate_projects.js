const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://yxivrnuexfseapbxboub.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4aXZybnVleGZzZWFwYnhib3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNDEwNzMsImV4cCI6MjA5MTcxNzA3M30.oLnVdIKGmZ8J8f2bgpHrxDqfbbn52YehaefSQpPKffQ';
const supabase = createClient(supabaseUrl, supabaseKey);

async function translateProjects() {
  console.log('Updating project translations...');
  
  await supabase.from('projects').update({
    title_uz: 'Olmaliq KMK (MOF-3)',
    title_en: 'AGMK (MOF-3) Expansion',
    location_uz: 'Olmaliq sh., Toshkent viloyati',
    location_en: 'Almalyk city, Tashkent region',
    category_uz: 'Konchilik',
    category_en: 'Mining',
    description_uz: 'Ochiq kon ishlari uchun SRT95C samosvallari va og\'ir ekskavatorlar yetkazib berish.',
    description_en: 'Supply of SRT95C dump trucks and heavy excavators for open-pit mining operations.'
  }).eq('title_ru', 'АГМК (МОФ-3)');

  await supabase.from('projects').update({
    title_uz: 'Tashkent City turar-joy majmuasi',
    title_en: 'Tashkent City Residential Complex',
    location_uz: 'Toshkent sh.',
    location_en: 'Tashkent city',
    category_uz: 'Qurilish',
    category_en: 'Construction',
    description_uz: 'Toshkent markazida turar-joy va biznes markazlarini qurish uchun texnika yetkazib berish.',
    description_en: 'Supply of equipment for the construction of residential and business centers in the heart of Tashkent.'
  }).eq('title_ru', 'Жилой комплекс «Tashkent City»');

  console.log('Projects translated!');
}

translateProjects();
