
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CircleUser, Menu, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useSidebar } from './ui/sidebar';
import { useRouter } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const router = useRouter();
  
  const getBreadcrumb = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return 'Dashboard';
    const lastSegment = segments[segments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userRole');
    router.push('/');
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
        <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 md:hidden" onClick={toggleSidebar}>
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle navigation menu</span>
        </Button>

      <div className="w-full flex-1">
          <h1 className="font-semibold text-lg">{getBreadcrumb()}</h1>
      </div>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-background"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
                Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
