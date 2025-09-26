"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth';
import { useHookstate } from '@hookstate/core';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Logo } from '@/components/icons';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import Header from '@/components/layout/header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div
            className="flex items-center gap-3"
            onClick={() => router.push('/')}
          >
            <Logo className="size-8 text-primary" />
            <span className="text-lg font-semibold">Syntra</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-4">
          <UserMenu />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function UserMenu() {
  const { user, signOut, stateUser } = useAuth();
  const router = useRouter();
  
  // Properly subscribe to state changes using useHookstate
  const currentUserState = useHookstate(user);
  const dbUserState = useHookstate(stateUser.currentUser);
  
  const currentUser = currentUserState.get();
  const dbUser = dbUserState.get();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto w-full justify-start gap-3 px-2"
        >
          <Avatar className="size-8">
            <AvatarImage
              src={dbUser?.profile_pic || currentUser?.photoURL || "https://picsum.photos/seed/user/40/40"}
              alt="User"
              data-ai-hint="person portrait"
            />
            <AvatarFallback>
              {(dbUser?.name || currentUser?.displayName)?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-sm font-medium">
              {dbUser?.name || currentUser?.displayName || 'User'}
            </p>
            <p className="text-xs text-muted-foreground">
              {dbUser?.email || currentUser?.email || 'user@example.com'}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
