
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function thoroughCheck() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  console.log('🚀 Supabase bazasini tekshirish boshlandi...\n');

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
    console.log(`\n--- [Table: ${table.name}] ---`);
    const { data, error } = await supabase.from(table.name).select('*').limit(1);
    
    if (error) {
      if (error.message.includes('not found') || error.message.includes('does not exist')) {
        console.error(`❌ JADVAL TOPILMADI: "${table.name}"`);
      } else {
        console.error(`❌ Xatolik (${table.name}): ${error.message}`);
      }
      continue;
    }

    if (data) {
      const existingCols = Object.keys(data[0] || {});
      console.log(`✅ Jadval mavjud. Jami ustunlar: ${existingCols.length}`);
      
      const missing = table.cols.filter(c => !existingCols.includes(c));
      if (missing.length > 0) {
        console.error(`⚠️  YETISHMAYOTGAN USTUNLAR: ${missing.join(', ')}`);
      } else {
        console.log(`💪 Tillarga oid barcha ustunlar (EN/UZ/RU) mavjud.`);
      }
    }
  }

  console.log('\n✅ Tekshirish yakunlandi.');
}

thoroughCheck();
