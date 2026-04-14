const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://yxivrnuexfseapbxboub.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4aXZybnVleGZzZWFwYnhib3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNDEwNzMsImV4cCI6MjA5MTcxNzA3M30.oLnVdIKGmZ8J8f2bgpHrxDqfbbn52YehaefSQpPKffQ';
const supabase = createClient(supabaseUrl, supabaseKey);

async function translate() {
  console.log('Fetching products...');
  const { data: products } = await supabase.from('products').select('*');
  console.log('Products:', JSON.stringify(products, null, 2));

  console.log('Fetching projects...');
  const { data: projects } = await supabase.from('projects').select('*');
  console.log('Projects:', JSON.stringify(projects, null, 2));

  console.log('Fetching leasing_advantages...');
  const { data: ads } = await supabase.from('leasing_advantages').select('*');
  console.log('Leasing Advantages:', JSON.stringify(ads, null, 2));

  console.log('Fetching leasing_steps...');
  const { data: steps } = await supabase.from('leasing_steps').select('*');
  console.log('Leasing Steps:', JSON.stringify(steps, null, 2));

  console.log('Fetching solutions...');
  const { data: solutions } = await supabase.from('solutions').select('*');
  console.log('Solutions:', JSON.stringify(solutions, null, 2));
}

translate();
