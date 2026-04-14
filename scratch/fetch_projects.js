const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://yxivrnuexfseapbxboub.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4aXZybnVleGZzZWFwYnhib3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNDEwNzMsImV4cCI6MjA5MTcxNzA3M30.oLnVdIKGmZ8J8f2bgpHrxDqfbbn52YehaefSQpPKffQ';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchProjects() {
  const { data: projects } = await supabase.from('projects').select('*');
  console.log('Projects:', JSON.stringify(projects, null, 2));
}

fetchProjects();
