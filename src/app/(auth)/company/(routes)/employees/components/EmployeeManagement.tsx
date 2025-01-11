'use client';

import { MoreHorizontalIcon, SearchIcon, UserPlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/shared/components/ui/avatar';
import { Badge } from '@/app/shared/components/ui/badge';
import { Button } from '@/app/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/shared/components/ui/card';
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

import { EditUserDialog } from './EditEmployeeDialog';

// Mock data for users
const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Employee',
    status: 'Active',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Manager',
    status: 'Active',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Employee',
    status: 'Inactive',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice@example.com',
    role: 'Employee',
    status: 'Active',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'Manager',
    status: 'Active',
    avatar: '/placeholder.svg?height=40&width=40',
  },
];

export default function EmployeeManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<(typeof users)[0] | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Directory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex justify-between">
          <div className="relative w-64">
            <SearchIcon className="absolute left-2 top-2.5 size-4 text-gray-500" />
            <Input
              placeholder="Search users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button>
            <UserPlusIcon className="mr-2 size-4" />
            Add User
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Avatar className="mr-2 size-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {user.name}
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge variant={user.status === 'Active' ? 'success' : 'secondary'}>{user.status}</Badge>
                </TableCell>
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
                      <DropdownMenuItem onSelect={() => setEditingUser(user)}>Edit user</DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/company/employees/${user.id}`}>View attendance</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Deactivate user</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {editingUser && (
        <EditUserDialog
          employee={editingUser}
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
        />
      )}
    </Card>
  );
}
