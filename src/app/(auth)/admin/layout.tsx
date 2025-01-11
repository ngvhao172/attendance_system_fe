import '../../globals.css';

import { AdminNav } from '@/app/shared/components/AdminNav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
