'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import { Badge } from '@/app/shared/components/ui/badge';
import { Calendar } from '@/app/shared/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/shared/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/shared/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/shared/components/ui/table';

// Mock data for employee attendance
const attendanceData = [
  { date: '2024-12-01', status: 'Present', checkIn: '09:00 AM', checkOut: '05:30 PM' },
  { date: '2024-12-02', status: 'Present', checkIn: '08:55 AM', checkOut: '05:15 PM' },
  { date: '2024-12-03', status: 'Absent', checkIn: '-', checkOut: '-' },
  { date: '2024-12-04', status: 'Present', checkIn: '09:10 AM', checkOut: '05:45 PM' },
  { date: '2024-12-05', status: 'Present', checkIn: '08:50 AM', checkOut: '05:20 PM' },
];

export function EmployeeAttendance() {
  const { id } = useParams();
  console.log(id);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<string>('july');

  // In a real application, you would fetch the employee data based on the employeeId
  const employeeName = 'John Doe'; // This would be fetched from an API

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{employeeName}&apos;s Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p>Employee ID: {id}</p>
              <p>Department: Engineering</p>
              <p>Position: Software Developer</p>
            </div>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="july">Dec 2024</SelectItem>
                <SelectItem value="june">Nov 2024</SelectItem>
                <SelectItem value="may">Oct 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                present: attendanceData.filter((d) => d.status === 'Present').map((d) => new Date(d.date)),
                absent: attendanceData.filter((d) => d.status === 'Absent').map((d) => new Date(d.date)),
              }}
              modifiersStyles={{
                present: { color: 'white', backgroundColor: 'green' },
                absent: { color: 'white', backgroundColor: 'red' },
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Log</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((record) => (
                  <TableRow key={record.date}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      <Badge variant={record.status === 'Present' ? 'success' : 'destructive'}>{record.status}</Badge>
                    </TableCell>
                    <TableCell>{record.checkIn}</TableCell>
                    <TableCell>{record.checkOut}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
