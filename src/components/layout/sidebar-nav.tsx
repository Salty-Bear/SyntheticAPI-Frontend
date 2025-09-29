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
  DollarSign,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
// Update the import path below if the actual file name or location differs.
// For example, if the file is named 'ThemeToggle.tsx' use:
import { ThemeToggle } from '@/components/theme-toggle';
// Or adjust the path to the correct location as needed.

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
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
