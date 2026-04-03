import { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sany-asia.uz';

  // Base routes
  const routes = [
    '',
    '/products',
    '/solutions',
    '/projects',
    '/service',
    '/leasing',
    '/contacts',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Product routes
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Note: projects are currently displayed in a section, not separate pages.
  // If projects have pages in future, add them here.

  return [...routes, ...productRoutes];
}
