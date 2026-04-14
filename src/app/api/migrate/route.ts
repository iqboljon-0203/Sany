import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { products } from '@/data/products';
import { projects } from '@/data/projects';

// To avoid exposing service key in pure frontend, we usually run this once locally
export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    // We create a client with Auth override if we are migrating via RLS, or we simply rely on the user being logged in?
    // Wait, the API anon key might not have INSERT access unless a user is logged in.
    // Instead of forcing the user to log in to run migration, we can just temporarily disable RLS for INSERT or insert directly locally.
    // Let's rely on standard supabase client. The RLS policies must allow INSERT or we will get a permission denied.
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    let logs: string[] = [];

    // Map products to match DB schema (snake_case)
    const dbProducts = products.map((p) => ({
      // We exclude `id` from the object to let Supabase generate a uuid,
      // or we can map existing string id (1, 2, 3) if we changed the DB schema to text id.
      // Let's use string ids in DB to match existing links if any!
      id: undefined, // Let supabase generate UUID
      slug: p.slug,
      name: p.name,
      category: p.category,
      category_label: p.categoryLabel,
      short_description: p.shortDescription || '',
      description: p.description || '',
      power: p.power || '',
      operating_weight: p.operatingWeight || '',
      bucket_capacity: p.bucketCapacity || null,
      max_lift_capacity: p.maxLiftCapacity || null,
      specs: p.specs || [],
      images: p.images || [],
      thumbnail: p.thumbnail || '',
      pdf_brochure: p.pdfBrochure || null,
      featured: p.featured || false,
      price: p.price || null,
    }));

    // Migrating Products
    for (const prod of dbProducts) {
      const { error } = await supabase.from('products').upsert(prod, { onConflict: 'slug' });
      if (error) {
        logs.push(`Error inserting product ${prod.slug}: ${error.message}`);
      } else {
        logs.push(`Inserted product: ${prod.slug}`);
      }
    }

    // Map projects
    const dbProjects = projects.map((p) => ({
      id: undefined,
      title: p.title,
      location: p.location || '',
      description: p.description || '',
      image: p.image || '',
      category: p.category || '',
      machines: p.machines || []
    }));

    for (const proj of dbProjects) {
        // Here we just insert, no unique constraint defined on titles so we just insert
        const { error } = await supabase.from('projects').insert(proj);
        if (error) {
          logs.push(`Error inserting project ${proj.title}: ${error.message}`);
        } else {
          logs.push(`Inserted project: ${proj.title}`);
        }
    }

    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
