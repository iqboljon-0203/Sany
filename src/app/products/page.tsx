export const revalidate = 0; // Disable cache so frontend always has fresh admin data

import { createClient } from '@/lib/supabase/server';
import ProductsClient from './ProductsClient';

export const metadata = {
  title: 'Каталог | SANY Uzbekistan',
  description: 'Промышленный каталог строительной, горнодобывающей и дорожной техники SANY в Узбекистане.',
};

export default async function ProductsPage() {
  const supabase = await createClient();
  
  // Fetch ALL products from supabase
  const { data: initialProducts } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <ProductsClient initialProducts={initialProducts || []} />
  );
}
