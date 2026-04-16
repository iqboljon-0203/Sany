
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function checkColumns() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  console.log('Checking "advantages" table columns...');
  const { data: advData, error: advErr } = await supabase.from('advantages').select('title_en, desc_en').limit(1);
  if (advErr) {
    console.error('Error on advantages:', advErr.message);
  } else {
    console.log('Columns title_en, desc_en EXIST in advantages table.');
  }

  console.log('Checking "leasing_advantages" table columns...');
  const { data: lAdvData, error: lAdvErr } = await supabase.from('leasing_advantages').select('title_en').limit(1);
  if (lAdvErr) {
    console.error('Error on leasing_advantages:', lAdvErr.message);
  } else {
    console.log('Column title_en EXISTS in leasing_advantages table.');
  }
}

checkColumns();
