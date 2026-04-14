import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProductDetailClient from './ProductDetailClient';

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const supabase = await createClient();
  const { data: product } = await supabase.from('products').select('*').eq('slug', slug).single();

  if (!product) {
    return { title: 'Продукт не найден' };
  }

  return {
    title: `${product.name} — ${product.category_label || product.category}`,
    description: `${product.name} SANY в Узбекистане. ${product.short_description}. Мощность: ${product.power}, Масса: ${product.operating_weight}. Купить или взять в лизинг.`,
    keywords: [`SANY ${product.name}`, `${product.name} Uzbekistan`, product.category_label || product.category, 'SANY Узбекистан'],
    openGraph: {
      title: `SANY ${product.name} — ${product.category_label || product.category} | SANY Uzbekistan`,
      description: product.short_description,
    },
  };
}

export default async function ProductDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const supabase = await createClient();

  const { data: rawProduct } = await supabase.from('products').select('*').eq('slug', slug).single();

  if (!rawProduct) {
    notFound();
  }

  // Get related products from same category
  const { data: rawRelated } = await supabase
    .from('products')
    .select('*')
    .eq('category', rawProduct.category)
    .neq('id', rawProduct.id)
    .limit(3);

  // Map to match the existing component's expected camelCase structure
  const mapProduct = (p: any) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    categoryLabel: p.category_label_ru || p.category_label,
    categoryLabelUz: p.category_label_uz,
    categoryLabelRu: p.category_label_ru,
    categoryLabelEn: p.category_label_en,
    price: p.price,
    shortDescription: p.short_description_ru || p.short_description,
    shortDescriptionUz: p.short_description_uz,
    shortDescriptionRu: p.short_description_ru,
    shortDescriptionEn: p.short_description_en,
    description: p.description_ru || p.description,
    descriptionUz: p.description_uz,
    descriptionRu: p.description_ru,
    descriptionEn: p.description_en,
    power: p.power,
    operatingWeight: p.operating_weight,
    bucketCapacity: p.bucket_capacity,
    maxLiftCapacity: p.max_lift_capacity,
    specs: p.specs || [],
    images: p.images || [],
    pdfBrochure: p.pdf_brochure,
    featured: p.featured,
    thumbnail: p.thumbnail,
  });

  const product = mapProduct(rawProduct);
  const related = (rawRelated || []).map(mapProduct);

  return <ProductDetailClient product={product as any} related={related as any} />;
}
