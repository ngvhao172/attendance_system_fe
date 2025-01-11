import '../../globals.css';

export const metadata = {
  title: 'Attendance System',
  description: 'Login and register for the attendance system',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
