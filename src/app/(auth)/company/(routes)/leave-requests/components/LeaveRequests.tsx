'use client';

import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/shared/components/ui/avatar';
import { Badge } from '@/app/shared/components/ui/badge';
import { Button } from '@/app/shared/components/ui/button';
import { Calendar } from '@/app/shared/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/shared/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/shared/components/ui/table';

// Mock data for leave requests
const leaveRequests = [
  {
    id: 1,
    employee: 'John Doe',
    avatar: '/placeholder.svg?height=40&width=40',
    startDate: '2025-01-01',
    endDate: '2025-01-05',
    reason: 'Vacation',
    status: 'Pending',
  },
  {
    id: 2,
    employee: 'Jane Smith',
    avatar: '/placeholder.svg?height=40&width=40',
    startDate: '2025-01-10',
    endDate: '2025-01-12',
    reason: 'Personal',
    status: 'Approved',
  },
  {
    id: 3,
    employee: 'Bob Johnson',
    avatar: '/placeholder.svg?height=40&width=40',
    startDate: '2025-01-15',
    endDate: '2025-01-16',
    reason: 'Sick Leave',
    status: 'Pending',
  },
];

export function LeaveRequests() {
  const [requests, setRequests] = useState(leaveRequests);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleApprove = (id: number) => {
    setRequests(requests.map((request) => (request.id === id ? { ...request, status: 'Approved' } : request)));
  };

  const handleReject = (id: number) => {
    setRequests(requests.map((request) => (request.id === id ? { ...request, status: 'Rejected' } : request)));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Leave Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests
                .filter((r) => r.status === 'Pending')
                .map((request) => (
                  <div key={request.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={request.avatar} />
                        <AvatarFallback>{request.employee[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{request.employee}</p>
                        <p className="text-sm text-gray-500">
                          {request.startDate} - {request.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" onClick={() => handleApprove(request.id)}>
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleReject(request.id)}>
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Avatar className="size-8">
                        <AvatarImage src={request.avatar} alt={request.employee} />
                        <AvatarFallback>{request.employee[0]}</AvatarFallback>
                      </Avatar>
                      <span>{request.employee}</span>
                    </div>
                  </TableCell>
                  <TableCell>{request.startDate}</TableCell>
                  <TableCell>{request.endDate}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === 'Approved'
                          ? 'success'
                          : request.status === 'Rejected'
                            ? 'destructive'
                            : 'default'
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {request.status === 'Pending' && (
                      <>
                        <Button variant="outline" size="sm" className="mr-2" onClick={() => handleApprove(request.id)}>
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleReject(request.id)}>
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
