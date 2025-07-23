
'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '@/components/header';
import { Sidebar, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const role = searchParams.get('role');
    const storedRole = sessionStorage.getItem('userRole');

    if (role) {
        sessionStorage.setItem('userRole', role);
        setIsAdmin(role === 'admin');
    } else if (storedRole) {
        setIsAdmin(storedRole === 'admin');
    } else {
        setIsAdmin(false);
    }
  }, [searchParams]);

  if (isAdmin === null) {
      return null;
  }

  return (
    <SidebarProvider>
        <Sidebar>
          <AppSidebar isAdmin={isAdmin} />
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
