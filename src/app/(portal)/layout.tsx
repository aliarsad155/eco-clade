
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
  const role = searchParams.get('role');
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
        const storedRole = sessionStorage.getItem('userRole');
        if (role) {
            sessionStorage.setItem('userRole', role);
            setIsAdmin(role === 'admin');
        } else if (storedRole) {
            setIsAdmin(storedRole === 'admin');
        }
    }
  }, [role]);

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
