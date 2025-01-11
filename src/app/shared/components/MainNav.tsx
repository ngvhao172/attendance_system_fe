'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/app/shared/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/profile', label: 'Profile' },
];

export function MainNav() {
  const pathname = usePathname();
  return (
    <nav className="bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Attendance System
          </Link>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium',
                  pathname === item.href && 'bg-primary-foreground text-black',
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
