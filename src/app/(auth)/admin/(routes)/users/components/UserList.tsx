'use client';

import { MoreHorizontalIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/app/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/shared/components/ui/dropdown-menu';
import { Input } from '@/app/shared/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/shared/components/ui/table';

import CreateUserDialog from './UserDiaglog';

// Mock data for users
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', company: 'Acme Corp', role: 'Employee' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: 'Globex Corporation', role: 'Manager' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', company: 'Soylent Corp', role: 'Admin' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', company: 'Initech', role: 'Employee' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', company: 'Umbrella Corporation', role: 'Manager' },
];

export function UsersList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof (typeof users)[0]>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column: keyof (typeof users)[0]) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="relative w-64">
          <SearchIcon className="absolute left-2 top-2.5 size-4 text-gray-500" />
          <Input
            placeholder="Search users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <CreateUserDialog />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                <Button variant="ghost" onClick={() => handleSort('name')}>
                  Name
                  {sortColumn === 'name' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('email')}>
                  Email
                  {sortColumn === 'email' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('company')}>
                  Company
                  {sortColumn === 'company' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('role')}>
                  Role
                  {sortColumn === 'role' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.company}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="size-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontalIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit user</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete user</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
