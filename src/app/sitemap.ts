import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sanyasia.uz';
  const supabase = await createClient();

  // Fetch all dynamic routes
  const { data: products } = await supabase.from('products').select('slug, updated_at');
  const { data: solutions } = await supabase.from('solutions').select('id, created_at');

  const productEntries = (products || []).map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updated_at || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticPages = [
    '',
    '/products',
    '/solutions',
    '/projects',
    '/service',
    '/about',
    '/leasing',
    '/contacts',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.7,
  }));

  return [...staticPages, ...productEntries];
}
