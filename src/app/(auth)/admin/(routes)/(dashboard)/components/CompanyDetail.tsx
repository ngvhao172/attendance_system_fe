'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/app/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/shared/components/ui/card';
import { Input } from '@/app/shared/components/ui/input';
import { Label } from '@/app/shared/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/shared/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/shared/components/ui/tabs';
import { Textarea } from '@/app/shared/components/ui/textarea';

// Mock data for company details
const companyData = {
  id: '1',
  name: 'Acme Corp',
  address: '123 Main St, Anytown, USA',
  phone: '+1 234 567 890',
  email: 'info@acmecorp.com',
  employees: [
    { id: 1, name: 'John Doe', position: 'Software Developer', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', position: 'HR Manager', department: 'Human Resources' },
    { id: 3, name: 'Bob Johnson', position: 'Sales Representative', department: 'Sales' },
  ],
};

export function CompanyDetail() {
  const { id } = useParams();
  const [company, setCompany] = useState(companyData);

  console.log(id);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated company data to your backend
    console.log('Updated company data:', company);
  };

  return (
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTrigger value="details">Company Details</TabsTrigger>
        <TabsTrigger value="employees">Employees</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <Card>
          <CardHeader>
            <CardTitle>Edit Company Information</CardTitle>
            <CardDescription>Make changes to the company profile here.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input id="name" name="name" value={company.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={company.phone} onChange={handleInputChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={company.email} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" name="address" value={company.address} onChange={handleInputChange} />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="employees">
        <Card>
          <CardHeader>
            <CardTitle>Employee List</CardTitle>
            <CardDescription>View and manage company employees.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {company.employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
