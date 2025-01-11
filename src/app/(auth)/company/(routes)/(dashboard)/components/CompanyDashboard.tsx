'use client';

import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/shared/components/ui/tabs';

import { AttendanceStatistics } from '../../attendance/components/Attendance';
import EmployeeManagement from '../../employees/components/EmployeeManagement';
import { LeaveRequests } from '../../leave-requests/components/LeaveRequests';

export function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="users">User Management</TabsTrigger>
        <TabsTrigger value="attendance">Attendance Statistics</TabsTrigger>
        <TabsTrigger value="leave">Leave Requests</TabsTrigger>
      </TabsList>
      <TabsContent value="users">
        <EmployeeManagement />
      </TabsContent>
      <TabsContent value="attendance">
        <AttendanceStatistics />
      </TabsContent>
      <TabsContent value="leave">
        <LeaveRequests />
      </TabsContent>
    </Tabs>
  );
}
