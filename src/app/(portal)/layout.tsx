
'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '@/components/header';
import { Sidebar, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import * as React from 'react';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const storedRole = sessionStorage.getItem('userRole');
    setIsAdmin(storedRole === 'admin');
  }, []);

  if (isAdmin === null) {
    // Render a loading state or nothing on the server and during initial client render
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
