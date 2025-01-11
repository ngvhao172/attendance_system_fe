import { LeaveRequests } from './components/LeaveRequests';

export default function LeaveRequestsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Leave Requests</h1>
      <LeaveRequests />
    </div>
  );
}
