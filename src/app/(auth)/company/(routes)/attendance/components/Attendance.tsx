'use client';

import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Button } from '@/app/shared/components/ui/button';
import { Calendar } from '@/app/shared/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/shared/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/shared/components/ui/select';

// Mock data for attendance statistics
const attendanceData = {
  totalEmployees: 50,
  presentToday: 45,
  onLeave: 3,
  absent: 2,
  averageAttendance: 92,
};

// Mock data for attendance chart
const chartData = [
  { date: '2024-12-01', present: 48, absent: 2 },
  { date: '2024-12-02', present: 47, absent: 3 },
  { date: '2024-12-03', present: 49, absent: 1 },
  { date: '2024-12-04', present: 46, absent: 4 },
  { date: '2024-12-05', present: 50, absent: 0 },
  { date: '2024-12-06', present: 48, absent: 2 },
  { date: '2024-12-07', present: 47, absent: 3 },
];

export function AttendanceStatistics() {
  const [selectedMonth, setSelectedMonth] = useState('current');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleExport = () => {
    // Implement CSV export logic here
    console.log('Exporting attendance data for', selectedMonth);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Month</SelectItem>
            <SelectItem value="previous">Previous Month</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleExport}>Export CSV</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceData.totalEmployees}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceData.presentToday}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceData.onLeave}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceData.absent}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#8884d8" />
                <Bar dataKey="absent" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
