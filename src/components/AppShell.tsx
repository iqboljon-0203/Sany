'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyContactWidget from "@/components/StickyContactWidget";

export default function AppShell({ 
  children, 
  settings, 
  isAdminSubdomain 
}: { 
  children: React.ReactNode, 
  settings: any,
  isAdminSubdomain?: boolean
}) {
  const pathname = usePathname();
  const isAdmin = isAdminSubdomain || pathname?.startsWith('/admin') || pathname === '/login';

  if (isAdmin) {
    return <main className="flex-1 bg-gray-50">{children}</main>;
  }

  return (
    <>
      <Navbar settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <StickyContactWidget settings={settings} />
    </>
  );
}
