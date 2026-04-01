import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, getProductBySlug, formatPrice, categoryLabels } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Продукт не найден' };
  }

  return {
    title: `${product.name} — ${product.categoryLabel}`,
    description: `${product.name} SANY в Узбекистане. ${product.shortDescription}. Мощность: ${product.power}, Масса: ${product.operatingWeight}. Купить или взять в лизинг.`,
    keywords: [`SANY ${product.name}`, `${product.name} Uzbekistan`, product.categoryLabel, 'SANY Узбекистан'],
    openGraph: {
      title: `SANY ${product.name} — ${product.categoryLabel} | SANY Uzbekistan`,
      description: product.shortDescription,
    },
  };
}

export default async function ProductDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products from same category
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return <ProductDetailClient product={product} related={related} />;
}
