import '../globals.css';

import type { Metadata } from 'next';

import { MainNav } from '@/app/shared/components/MainNav';
import { Toaster } from '@/app/shared/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Attendance System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MainNav />
      <main className="container mx-auto py-6">{children}</main>
      <Toaster />
    </div>
  );
}
