'use client';

import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/app/shared/components/ui/button';
import { Input } from '@/app/shared/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/shared/components/ui/table';

import CreateCompanyDialog from './CompanyDiaglog';

// Mock data for companies
const companies = [
  { id: 1, name: 'Acme Corp', employees: 150, status: 'Active' },
  { id: 2, name: 'Globex Corporation', employees: 75, status: 'Active' },
  { id: 3, name: 'Soylent Corp', employees: 200, status: 'Inactive' },
  { id: 4, name: 'Initech', employees: 50, status: 'Active' },
  { id: 5, name: 'Umbrella Corporation', employees: 300, status: 'Active' },
];

export function CompanyList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="relative w-64">
          <SearchIcon className="absolute left-2 top-2.5 size-4 text-gray-500" />
          <Input
            placeholder="Search companies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <CreateCompanyDialog />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Employees</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies.map((company) => (
            <TableRow key={company.id}>
              <TableCell className="font-medium">{company.name}</TableCell>
              <TableCell>{company.employees}</TableCell>
              <TableCell>{company.status}</TableCell>
              <TableCell>
                <Button variant="link" asChild>
                  <Link href={`/admin/companies/${company.id}`}>View Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
