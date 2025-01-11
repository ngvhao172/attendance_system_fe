import { CompanyList } from './components/CompanyList';

export default function AdminCompaniesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Companies</h1>
      <CompanyList />
    </div>
  );
}
