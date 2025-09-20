'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRightLeft,
  FileCode,
  FlaskConical,
  LayoutDashboard,
  PlayCircle,
  Terminal,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/generate', icon: FlaskConical, label: 'Generate Tests' },
  { href: '/execute', icon: PlayCircle, label: 'Execute Tests' },
  { href: '/tunnels', icon: ArrowRightLeft, label: 'Tunnels' },
  { href: '/cli', icon: Terminal, label: 'CLI Access' },
  { href: '/documentation', icon: FileCode, label: 'Documentation' },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
