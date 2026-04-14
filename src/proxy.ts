import { updateSession } from '@/lib/supabase/middleware'
import { NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host');

  // Logic for admin.sanyasia.uz subdomain
  if (hostname === 'admin.sanyasia.uz') {
    // If path does not start with /admin, rewrite it to /admin/path
    if (!url.pathname.startsWith('/admin')) {
      url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
