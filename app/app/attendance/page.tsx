'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PageHeader, StatCard } from '@/components/shared';
import { DonutChart } from '@/components/shared/charts';
import {
  CalendarCheck,
  Plus,
  Download,
  Camera,
  Check,
  X,
  Clock,
  CalendarRange,
} from 'lucide-react';

const attendanceStats = [
  { name: 'Present', value: 45, color: '#10B981' },
  { name: 'Absent', value: 8, color: '#EF4444' },
  { name: 'Excused', value: 4, color: '#D4AF37' },
  { name: 'Late', value: 3, color: '#F97316' },
];

const recentAttendance = [
  { id: '1', member: 'Sarah Williams', event: 'Weekly Rehearsal', date: '2024-12-14', status: 'present', time: '14:58' },
  { id: '2', member: 'John Adewole', event: 'Weekly Rehearsal', date: '2024-12-14', status: 'present', time: '15:02' },
  { id: '3', member: 'Grace Mensah', event: 'Weekly Rehearsal', date: '2024-12-14', status: 'late', time: '15:15' },
  { id: '4', member: 'David Ochieng', event: 'Weekly Rehearsal', date: '2024-12-14', status: 'absent', time: '-' },
  { id: '5', member: 'Amara Okonkwo', event: 'Weekly Rehearsal', date: '2024-12-14', status: 'excused', time: '-' },
];

const statusColors: Record<string, string> = {
  present: 'bg-brand-emerald-500/10 text-brand-emerald-600',
  absent: 'bg-destructive/10 text-destructive',
  excused: 'bg-brand-gold-500/10 text-brand-gold-600',
  late: 'bg-orange-500/10 text-orange-600',
};

const statusIcons: Record<string, React.ReactNode> = {
  present: <Check className="h-4 w-4" />,
  absent: <X className="h-4 w-4" />,
  excused: <Clock className="h-4 w-4" />,
  late: <Clock className="h-4 w-4" />,
};

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        description="Track attendance for rehearsals, services, and events"
      >
        <Button variant="outline">
          <CalendarRange className="h-4 w-4 mr-2" />
          View History
        </Button>
        <Button className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900" asChild>
          <Link href="/app/attendance/check-in">
            <Camera className="h-4 w-4 mr-2" />
            QR Check-In
          </Link>
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Present Today" value={45} icon={Check} variant="green" />
        <StatCard title="Absent" value={8} icon={X} variant="default" />
        <StatCard title="Late" value={3} icon={Clock} iconColor="text-orange-500" />
        <StatCard title="Excused" value={4} icon={CalendarCheck} variant="gold" />
      </div>

      {/* Charts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
            <CardDescription>Weekly Rehearsal - Dec 14, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <DonutChart
                data={attendanceStats}
                centerText={`${Math.round((45/60)*100)}%`}
                centerSubtext="Attendance"
                height={180}
              />
              <div className="space-y-3">
                {attendanceStats.map((stat) => (
                  <div key={stat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: stat.color }} />
                      <span className="text-sm">{stat.name}</span>
                    </div>
                    <span className="font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/app/attendance/check-in">
                <Camera className="h-4 w-4 mr-2" />
                Start QR Check-In
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Mark Attendance Manually
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Attendance */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Check-Ins</CardTitle>
            <CardDescription>Latest attendance records</CardDescription>
          </div>
          <Select defaultValue="today">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAttendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.member}</TableCell>
                  <TableCell className="text-muted-foreground">{record.event}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.time}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[record.status]}>
                      <span className="flex items-center gap-1">
                        {statusIcons[record.status]}
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </Badge>
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
