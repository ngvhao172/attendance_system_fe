import { CompanyDetail } from '../../(dashboard)/components/CompanyDetail';

export async function generateStaticParams() {
  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return ids.map((id) => ({
    id: id.toString(),
  }));
}

export default function AdminCompanyDetailPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Company Details</h1>
      <CompanyDetail />
    </div>
  );
}
