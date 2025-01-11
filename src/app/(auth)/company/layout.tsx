import '../../globals.css';

import CompanyNav from '@/app/shared/components/CompanyNav';

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <CompanyNav />
      <main className="flex-1 overflow-y-auto bg-gray-50 p-8">{children}</main>
    </div>
  );
}
