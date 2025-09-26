'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Bell, Github, User } from 'lucide-react';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '../theme-toggle';

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      <div className="flex-1">{/* Can add breadcrumbs here if needed */}</div>
      <div className="flex items-center gap-3 mt-1">
        <Button
          variant="outline"
          size="icon"
          className="p-2 mx-1"
          title="Toggle theme"
        >
          <ThemeToggle />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="p-2 mx-1"
          asChild
          title="GitHub"
        >
          <a
            href="https://github.com/Salty-Bear/SyntheticAPI-Backend"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
          </a>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="p-2 mx-1"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
        </Button>
        {user && (
          <Button
            variant="outline"
            size="icon"
            className="p-2 mx-1"
            onClick={() => router.push('/profile')}
            title="Profile"
          >
            <User className="h-4 w-4" />
          </Button>
        )}
      </div>
    </header>
  );
}
