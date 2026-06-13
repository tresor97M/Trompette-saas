'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/shared';
import { useTranslation } from '@/hooks/useTranslation';
import {
  AttendanceChart,
  MemberGrowthChart,
  VoiceDistributionChart,
} from '@/components/shared/charts';
import {
  Users,
  CalendarCheck,
  Calendar,
  Music,
  Plus,
  ArrowRight,
  Clock,
  Bell,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data
const attendanceData = [
  { date: 'Jan', present: 45, absent: 5, excused: 2 },
  { date: 'Feb', present: 48, absent: 4, excused: 1 },
  { date: 'Mar', present: 42, absent: 6, excused: 3 },
  { date: 'Apr', present: 50, absent: 3, excused: 2 },
  { date: 'May', present: 46, absent: 5, excused: 1 },
  { date: 'Jun', present: 52, absent: 2, excused: 2 },
];

const memberGrowthData = [
  { month: 'Jan', newMembers: 5, totalMembers: 45 },
  { month: 'Feb', newMembers: 3, totalMembers: 48 },
  { month: 'Mar', newMembers: 7, totalMembers: 55 },
  { month: 'Apr', newMembers: 4, totalMembers: 59 },
  { month: 'May', newMembers: 2, totalMembers: 61 },
  { month: 'Jun', newMembers: 6, totalMembers: 67 },
];

const voiceDistributionData = [
  { name: 'Soprano', value: 22, color: '#D4AF37' },
  { name: 'Alto', value: 18, color: '#10B981' },
  { name: 'Tenor', value: 15, color: '#A855F7' },
  { name: 'Bass', value: 12, color: '#0F172A' },
];

const upcomingEvents = [
  {
    id: '1',
    title: 'Weekly Rehearsal',
    titleFR: 'Répétition hebdomadaire',
    date: 'Saturday, Dec 14',
    dateFR: 'Samedi 14 Déc',
    time: '3:00 PM - 6:00 PM',
    timeFR: '15h00 - 18h00',
    location: 'Main Church Hall',
    type: 'rehearsal' as const,
    attendees: 45,
  },
  {
    id: '2',
    title: 'Sunday Service',
    titleFR: 'Culte de Dimanche',
    date: 'Sunday, Dec 15',
    dateFR: 'Dimanche 15 Déc',
    time: '9:00 AM - 12:00 PM',
    timeFR: '09h00 - 12h00',
    location: 'Sanctuary',
    type: 'service' as const,
    attendees: 67,
  },
  {
    id: '3',
    title: 'Christmas Concert Practice',
    titleFR: 'Répétition Concert de Noël',
    date: 'Wednesday, Dec 18',
    dateFR: 'Mercredi 18 Déc',
    time: '5:00 PM - 8:00 PM',
    timeFR: '17h00 - 20h00',
    location: 'Main Church Hall',
    type: 'rehearsal' as const,
    attendees: 50,
  },
];

const recentSongs = [
  { id: '1', title: 'Great Is Thy Faithfulness', author: 'Thomas Chisholm', key: 'G' },
  { id: '2', title: 'How Great Is Our God', author: 'Chris Tomlin', key: 'C' },
  { id: '3', title: 'What A Beautiful Name', author: 'Hillsong Worship', key: 'D' },
  { id: '4', title: '10,000 Reasons', author: 'Matt Redman', key: 'E' },
];

const activityFeed = [
  { id: '1', user: 'Sarah Williams', time: '2h', timeFR: '2h', type: 'member' },
  { id: '2', user: 'John Doe', time: '5h', timeFR: '5h', type: 'song' },
  { id: '3', user: 'Grace Mensah', time: '1d', timeFR: '1j', type: 'attendance' },
  { id: '4', user: 'Pastor Adewole', time: '2d', timeFR: '2j', type: 'event' },
];

const prayerRequests = [
  { id: '1', title: 'Healing for member', titleFR: 'Guérison pour un membre', count: 12, urgent: true },
  { id: '2', title: 'Travel mercies', titleFR: 'Sécurité de voyage', count: 8, urgent: false },
  { id: '3', title: 'Church growth', titleFR: 'Croissance de l\'église', count: 15, urgent: false },
];

export default function DashboardPage() {
  const { t, language } = useTranslation();

  const getActivityAction = (type: string) => {
    switch (type) {
      case 'member':
        return t('dashboard.activity.newMember');
      case 'song':
        return t('dashboard.activity.newSong');
      case 'attendance':
        return t('dashboard.activity.attendanceRecorded');
      case 'event':
        return t('dashboard.activity.eventScheduled');
      default:
        return '';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{t('dashboard.welcome')} John</h1>
          <p className="text-muted-foreground mt-1">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            {t('dashboard.schedule')}
          </Button>
          <Button className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900">
            <Plus className="h-4 w-4 mr-2" />
            {t('dashboard.quickAdd')}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title={t('dashboard.kpi.members')}
          value={67}
          subtitle={t('dashboard.kpi.membersSubtitle')}
          icon={Users}
          iconColor="text-brand-gold-500"
          trend={{ value: 12, direction: 'up', label: t('dashboard.kpi.trend') }}
          variant="gold"
        />
        <StatCard
          title={t('dashboard.kpi.attendance')}
          value="89%"
          icon={CalendarCheck}
          iconColor="text-brand-emerald-500"
          trend={{ value: 5, direction: 'up', label: t('dashboard.kpi.trend') }}
          variant="green"
        />
        <StatCard
          title={t('dashboard.kpi.events')}
          value={8}
          subtitle={t('dashboard.kpi.eventsSubtitle')}
          icon={Calendar}
          iconColor="text-brand-purple-500"
          variant="purple"
        />
        <StatCard
          title={t('dashboard.kpi.songs')}
          value={156}
          subtitle={t('dashboard.kpi.songsSubtitle')}
          icon={Music}
          iconColor="text-brand-blue-500"
          trend={{ value: 8, direction: 'up', label: t('dashboard.kpi.newSongs') }}
          variant="blue"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Attendance Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">{t('dashboard.charts.attendance')}</CardTitle>
                <CardDescription>{t('dashboard.charts.attendanceDesc')}</CardDescription>
              </div>
              <Button variant="outline" size="sm">{t('dashboard.charts.viewReport')}</Button>
            </CardHeader>
            <CardContent>
              <AttendanceChart data={attendanceData} height={280} />
            </CardContent>
          </Card>

          {/* Member Growth & Voice Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('dashboard.charts.growth')}</CardTitle>
                <CardDescription>{t('dashboard.charts.growthDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <MemberGrowthChart data={memberGrowthData} height={200} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('dashboard.charts.voices')}</CardTitle>
                <CardDescription>{t('dashboard.charts.voicesDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <VoiceDistributionChart data={voiceDistributionData} height={200} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Quick Info */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">{t('dashboard.events.title')}</CardTitle>
              <Link href="/app/worship" className="text-sm text-brand-gold-500 hover:text-brand-gold-400">
                {t('common.viewAll')}
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className={`p-2 rounded-lg ${event.type === 'service' ? 'bg-brand-gold-500/10' : 'bg-brand-purple-500/10'}`}>
                    <Calendar className={`h-4 w-4 ${event.type === 'service' ? 'text-brand-gold-500' : 'text-brand-purple-500'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{language === 'fr' ? event.titleFR : event.title}</p>
                    <p className="text-xs text-muted-foreground">{language === 'fr' ? event.dateFR : event.date}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {language === 'fr' ? event.timeFR : event.time}
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {event.attendees}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/app/worship/new">
                  <Plus className="h-4 w-4 mr-2" />
                  {t('dashboard.events.scheduleEvent')}
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Prayer Requests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                {t('dashboard.prayers.title')}
                <Badge className="ml-1">{prayerRequests.length}</Badge>
              </CardTitle>
              <Link href="/app/communication/prayer" className="text-sm text-brand-gold-500 hover:text-brand-gold-400">
                {t('common.viewAll')}
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {prayerRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    {request.urgent && (
                      <Bell className="h-4 w-4 text-destructive" />
                    )}
                    <p className="text-sm font-medium">{language === 'fr' ? request.titleFR : request.title}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {t('dashboard.prayers.prayersCount', { count: request.count })}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Songs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">{t('dashboard.recentSongs.title')}</CardTitle>
            <Link href="/app/songs" className="text-sm text-brand-gold-500 hover:text-brand-gold-400 flex items-center">
              {t('dashboard.recentSongs.viewLibrary')} <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSongs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand-gold-400 to-brand-gold-600 flex items-center justify-center">
                      <Music className="h-5 w-5 text-brand-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">{song.title}</p>
                      <p className="text-xs text-muted-foreground">{song.author}</p>
                    </div>
                  </div>
                  <Badge variant="outline">Key: {song.key}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">{t('dashboard.activity.title')}</CardTitle>
            <Badge variant="secondary">{t('dashboard.activity.live')}</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityFeed.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-muted text-xs">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{' '}
                      <span className="text-muted-foreground">{getActivityAction(activity.type)}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'fr' ? activity.timeFR : activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
