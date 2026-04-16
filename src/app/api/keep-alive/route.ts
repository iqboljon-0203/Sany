import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Vercel Cron protection check
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const supabase = await createClient();
  
  // Perform a small query to keep the DB active
  const { error } = await supabase.from('settings').select('id').limit(1).single();

  if (error) {
    console.error('Keep-alive error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('Keep-alive ping successful at:', new Date().toISOString());
  return NextResponse.json({ 
    success: true, 
    message: 'Supabase is awake!',
    timestamp: new Date().toISOString() 
  });
}
