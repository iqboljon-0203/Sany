const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://yxivrnuexfseapbxboub.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4aXZybnVleGZzZWFwYnhib3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNDEwNzMsImV4cCI6MjA5MTcxNzA3M30.oLnVdIKGmZ8J8f2bgpHrxDqfbbn52YehaefSQpPKffQ';
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateTranslations() {
  console.log('Updating solutions...');
  await supabase.from('solutions').update({
    title_en: 'Mining',
    desc_en: 'Full set of equipment for open and underground mining operations.',
    features_en: ['Mining excavators', 'Dump trucks up to 400t', 'Drilling rigs']
  }).eq('title_uz', 'Konchilik');

  await supabase.from('solutions').update({
    title_en: 'Construction',
    desc_en: 'Universal equipment for residential and industrial construction.',
    features_en: ['Excavators 1-80 t', 'Truck cranes up to 2000 t', 'Concrete equipment']
  }).eq('title_uz', 'Qurilish');

  await supabase.from('solutions').update({
    title_en: 'Roads',
    desc_en: 'Comprehensive solutions for road construction and repair.',
    features_en: ['Motor graders', 'Road rollers', 'Loaders']
  }).eq('title_uz', "Yo'llar");

  console.log('Updating leasing advantages...');
  await supabase.from('leasing_advantages').update({ title_en: 'Down payment from 20%', desc_en: 'Minimum down payment to start work' }).eq('title_uz', "Birinchi to'lov 20% dan");
  await supabase.from('leasing_advantages').update({ title_en: 'Up to 48 months', desc_en: 'Choose a convenient leasing term for you' }).eq('title_uz', "48 oygacha");
  await supabase.from('leasing_advantages').update({ title_en: 'Fast approval', desc_en: 'Decision on application within 2 working days' }).eq('title_uz', "Tezkor tasdiqlash");
  await supabase.from('leasing_advantages').update({ title_en: 'Insurance included', desc_en: 'Full CASCO for the entire leasing period' }).eq('title_uz', "Sug'urta kiritilgan");

  console.log('Updating leasing steps...');
  await supabase.from('leasing_steps').update({ title_en: 'Application', desc_en: 'Leave an application on the website or by phone' }).eq('title_uz', 'Ariza');
  await supabase.from('leasing_steps').update({ title_en: 'Calculation', desc_en: 'Our manager will select the most optimal conditions' }).eq('title_uz', 'Hisob-kitob');
  await supabase.from('leasing_steps').update({ title_en: 'Approval', desc_en: 'Get a decision within 2 days' }).eq('title_uz', 'Tasdiqlash');
  await supabase.from('leasing_steps').update({ title_en: 'Delivery', desc_en: 'Signing the contract and receiving the equipment' }).eq('title_uz', 'Qabul qilish');

  console.log('Updating products...');
  // For products, I will map basic ones if they exist
  await supabase.from('products').update({
    category_label_en: 'Crawler Excavator',
    short_description_en: 'A powerful and efficient excavator designed for various construction and mining tasks.',
    description_en: 'The SANY SY215C is a world-class crawler excavator that combines high performance with low fuel consumption. Equipped with a reliable engine and advanced hydraulic system, it ensures maximum productivity in the toughest conditions.'
  }).eq('name', 'SY215C');

  console.log('Updating settings...');
  await supabase.from('settings').update({
    address_en: 'Tashkent city, Sergeli district, Alisher Navoi street, 2-house',
    working_hours_en: 'Mon-Fri: 09:00 - 18:00, Sat: 09:00 - 15:00'
  }).not('id', 'is', null);

  console.log('Translations updated successfully!');
}

updateTranslations();
