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
  const [stats, setStats] = React.useState({
    present: 45,
    absent: 8,
    late: 3,
    excused: 4,
    total: 60,
  });
  const [recentAttendance, setRecentAttendance] = React.useState<any[]>([]);
  const [activeEvent, setActiveEvent] = React.useState<any>(null);
  const [events, setEvents] = React.useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = React.useState<string>('active');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadAttendanceData() {
      try {
        const statsRes = await fetch('/api/attendance/stats');
        if (statsRes.ok) {
          const data = await statsRes.json();
          if (data.stats) {
            setStats(data.stats);
          }
          if (data.recentCheckIns && data.recentCheckIns.length > 0) {
            setRecentAttendance(data.recentCheckIns);
          } else {
            setRecentAttendance([
              { id: '1', member: 'Sarah Williams', event: 'Weekly Rehearsal', date: '2026-06-13', status: 'present', time: '14:58' },
              { id: '2', member: 'John Adewole', event: 'Weekly Rehearsal', date: '2026-06-13', status: 'present', time: '15:02' },
              { id: '3', member: 'Grace Mensah', event: 'Weekly Rehearsal', date: '2026-06-13', status: 'late', time: '15:15' },
              { id: '4', member: 'David Ochieng', event: 'Weekly Rehearsal', date: '2026-06-13', status: 'absent', time: '-' },
              { id: '5', member: 'Amara Okonkwo', event: 'Weekly Rehearsal', date: '2026-06-13', status: 'excused', time: '-' },
            ]);
          }
          if (data.activeEvent) {
            setActiveEvent(data.activeEvent);
          }
        }
        
        const eventsRes = await fetch('/api/events');
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          setEvents(eventsData);
        }
      } catch (error) {
        console.error('Failed to load attendance data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadAttendanceData();
  }, []);

  const handleEventChange = async (eventId: string) => {
    setSelectedEventId(eventId);
    if (eventId === 'active') {
      const statsRes = await fetch('/api/attendance/stats');
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats);
        if (data.activeEvent) setActiveEvent(data.activeEvent);
      }
      return;
    }

    try {
      const res = await fetch(`/api/events/${eventId}`);
      if (res.ok) {
        const eventData = await res.json();
        setActiveEvent(eventData);
        
        let presentCount = 0;
        let absentCount = 0;
        let lateCount = 0;
        let excusedCount = 0;

        if (eventData.attendances) {
          eventData.attendances.forEach((a: any) => {
            const statusUpper = a.status.toUpperCase();
            if (statusUpper === 'PRESENT') presentCount++;
            else if (statusUpper === 'ABSENT') absentCount++;
            else if (statusUpper === 'LATE') lateCount++;
            else if (statusUpper === 'EXCUSED') excusedCount++;
          });
        }
        setStats({
          present: presentCount,
          absent: absentCount,
          late: lateCount,
          excused: excusedCount,
          total: presentCount + absentCount + lateCount + excusedCount,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const dynamicStats = [
    { name: 'Present', value: stats.present, color: '#10B981' },
    { name: 'Absent', value: stats.absent, color: '#EF4444' },
    { name: 'Excused', value: stats.excused, color: '#D4AF37' },
    { name: 'Late', value: stats.late, color: '#F97316' },
  ];

  const attendanceRate = stats.total > 0 ? Math.round(((stats.present + stats.late) / stats.total) * 100) : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Suivi des Présences"
        description="Suivi en temps réel des cultes, répétitions et évènements de la chorale"
      >
        <Button variant="outline" asChild>
          <Link href="/app/attendance">
            <CalendarRange className="h-4 w-4 mr-2" />
            Historique
          </Link>
        </Button>
        <Button className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900" asChild>
          <Link href="/app/attendance/check-in">
            <Camera className="h-4 w-4 mr-2" />
            Check-In QR
          </Link>
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Présents" value={stats.present} icon={Check} variant="green" />
        <StatCard title="Absents" value={stats.absent} icon={X} variant="default" />
        <StatCard title="En retard" value={stats.late} icon={Clock} iconColor="text-orange-500" />
        <StatCard title="Excusés" value={stats.excused} icon={CalendarCheck} variant="gold" />
      </div>

      {/* Charts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Présence de l'évènement</CardTitle>
            <CardDescription>
              {activeEvent ? `${activeEvent.title} - ${new Date(activeEvent.startTime).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}` : 'Chargement...'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <DonutChart
                data={dynamicStats}
                centerText={`${attendanceRate}%`}
                centerSubtext="Taux global"
                height={180}
              />
              <div className="space-y-3">
                {dynamicStats.map((stat) => (
                  <div key={stat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: stat.color }} />
                      <span className="text-sm">{stat.name === 'Present' ? 'Présents' : stat.name === 'Absent' ? 'Absents' : stat.name === 'Late' ? 'En retard' : 'Excusés'}</span>
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
            <CardTitle>Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/app/attendance/check-in">
                <Camera className="h-4 w-4 mr-2" />
                Démarrer le Check-In QR
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/app/attendance/check-in?tab=manual">
                <Plus className="h-4 w-4 mr-2" />
                Pointer Manuellement
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => window.print()}>
              <Download className="h-4 w-4 mr-2" />
              Exporter le Rapport
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Attendance */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Derniers Check-Ins</CardTitle>
            <CardDescription>Historique des enregistrements récents</CardDescription>
          </div>
          <Select value={selectedEventId} onValueChange={handleEventChange}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Choisir un évènement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Évènement Actif</SelectItem>
              {events.map((e) => (
                <SelectItem key={e.id} value={e.id}>
                  {e.title} ({new Date(e.startTime).toLocaleDateString()})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Membre</TableHead>
                <TableHead>Évènement</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Heure</TableHead>
                <TableHead>Statut</TableHead>
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
                        {record.status === 'present' ? 'Présent' : record.status === 'absent' ? 'Absent' : record.status === 'late' ? 'Retard' : 'Excusé'}
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
