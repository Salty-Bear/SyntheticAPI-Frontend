'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Bell, Github, User } from 'lucide-react';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';

import { ThemeToggle } from '../theme-toggle';
import './header-abs.css';

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-2 sm:gap-4 border-b bg-background px-2 sm:px-6 sm:static sm:h-auto sm:border-0 sm:bg-transparent">
      <SidebarTrigger className="sm:hidden" />
      <div className="flex-1">{/* Can add breadcrumbs here if needed */}</div>
      {/* Absolute icon group for improved UI and isolation */}
      <div className="absolute-icon-group">
        <ThemeToggle />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 sm:h-10 sm:w-10 p-1 sm:p-2"
          asChild
          title="GitHub"
        >
          <a
            href="https://github.com/Salty-Bear/SyntheticAPI-Backend"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-3 w-3 sm:h-4 sm:w-4" />
          </a>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 sm:h-10 sm:w-10 p-1 sm:p-2"
          title="Notifications"
        >
          <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        {user && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10 p-1 sm:p-2"
            onClick={() => router.push('/profile')}
            title="Profile"
          >
            <User className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        )}
      </div>
    </header>
  );
}
