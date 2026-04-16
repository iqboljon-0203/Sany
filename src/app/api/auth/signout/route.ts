import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return signOut(req);
}

export async function POST(req: NextRequest) {
  return signOut(req);
}

async function signOut(req: NextRequest) {
  const supabase = await createClient();

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    await supabase.auth.signOut();
  }

  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host');

  if (hostname === 'admin.sanyasia.uz') {
    url.pathname = '/login';
  } else {
    url.pathname = '/admin/login';
  }

  return NextResponse.redirect(url, {
    status: 302,
  });
}
