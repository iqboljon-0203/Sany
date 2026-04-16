
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Basic env parser
const env = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const [key, val] = line.split('=');
    if (key && val) acc[key.trim()] = val.trim();
    return acc;
  }, {});

async function thoroughCheck() {
  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  console.log('🚀 Supabase bazasini tekshirish boshlandi (JS version)...\n');

  const tables = [
    { name: 'products', cols: ['title_en', 'category_label_en', 'short_description_en', 'description_en'] },
    { name: 'product_categories', cols: ['name_en', 'name_uz', 'name_ru'] },
    { name: 'projects', cols: ['title_en', 'location_en', 'category_en', 'description_en'] },
    { name: 'advantages', cols: ['title_en', 'desc_en'] },
    { name: 'leasing_advantages', cols: ['title_en'] },
    { name: 'solutions', cols: ['title_en', 'desc_en', 'features_en'] },
    { name: 'services', cols: ['title_en', 'desc_en'] },
    { name: 'partners', cols: ['name'] }
  ];

  for (const table of tables) {
    process.stdout.write(`Checking ${table.name}... `);
    const { data, error } = await supabase.from(table.name).select('*').limit(1);
    
    if (error) {
      console.log(`❌ Xatolik: ${error.message}`);
      continue;
    }

    const existingCols = Object.keys(data[0] || {});
    const missing = table.cols.filter(c => !existingCols.includes(c));
    
    if (missing.length > 0) {
      console.log(`⚠️  Yetishmayapti: ${missing.join(', ')}`);
    } else {
      console.log(`✅ OK (En/Uz/Ru ustunlari bor)`);
    }
  }

  console.log('\n✅ Tekshirish yakunlandi.');
}

thoroughCheck();
