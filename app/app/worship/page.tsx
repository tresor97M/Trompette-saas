'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PageHeader, EmptyState } from '@/components/shared';
import { AvatarGroup } from '@/components/shared/loading-states';
import {
  Calendar,
  Plus,
  Users,
  Clock,
  Music,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const worshipPlans = [
  {
    id: '1',
    title: 'Sunday Service - Dec 15',
    date: '2024-12-15',
    serviceType: 'sunday',
    theme: 'Hope and Restoration',
    verse: 'Jeremiah 29:11',
    setlist: [
      { title: 'Great Is Thy Faithfulness', key: 'G' },
      { title: 'How Great Is Our God', key: 'C' },
      { title: 'What A Beautiful Name', key: 'D' },
    ],
    team: [{ name: 'Sarah Williams' }, { name: 'John Adewole' }, { name: 'Grace Mensah' }],
    status: 'planned',
  },
  {
    id: '2',
    title: 'Wednesday Bible Study',
    date: '2024-12-18',
    serviceType: 'wednesday',
    theme: 'Walking in Faith',
    setlist: [
      { title: '10,000 Reasons', key: 'E' },
      { title: 'Blessed Assurance', key: 'F' },
    ],
    team: [{ name: 'Grace Mensah' }, { name: 'Amara Okonkwo' }],
    status: 'draft',
  },
  {
    id: '3',
    title: 'Christmas Eve Service',
    date: '2024-12-24',
    serviceType: 'special',
    theme: 'The Gift of Christ',
    setlist: [
      { title: 'O Come All Ye Faithful', key: 'A' },
      { title: 'Silent Night', key: 'G' },
      { title: 'Joy to the World', key: 'D' },
    ],
    team: [{ name: 'Sarah Williams' }, { name: 'John Adewole' }, { name: 'Grace Mensah' }, { name: 'David Ochieng' }],
    status: 'planned',
  },
];

const upcomingRehearsals = [
  { id: '1', title: 'Main Rehearsal', date: 'Sat, Dec 14', time: '3:00 PM', attendees: 45 },
  { id: '2', title: 'Christmas Prep', date: 'Wed, Dec 18', time: '5:00 PM', attendees: 35 },
  { id: '3', title: 'Final Christmas Run-through', date: 'Mon, Dec 23', time: '6:00 PM', attendees: 50 },
];

const serviceTypeColors: Record<string, string> = {
  sunday: 'bg-brand-gold-500/10 text-brand-gold-600',
  wednesday: 'bg-brand-purple-500/10 text-brand-purple-600',
  special: 'bg-brand-emerald-500/10 text-brand-emerald-600',
  concert: 'bg-brand-blue-500/10 text-brand-blue-600',
};

export default function WorshipPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Worship Planning"
        description="Plan services, manage setlists, and schedule rehearsals"
      >
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Calendar View
        </Button>
        <Button className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900" asChild>
          <Link href="/app/worship/new">
            <Plus className="h-4 w-4 mr-2" />
            New Plan
          </Link>
        </Button>
      </PageHeader>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">services planned</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Songs Used</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">unique songs</p>
              </div>
              <Music className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Team Members</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">this week</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rehearsals</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">scheduled</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Worship Plans */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">Worship Plans</h2>
          {worshipPlans.map((plan) => (
            <Card key={plan.id} className="group hover:border-brand-gold-500/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium">{plan.title}</h3>
                      <Badge className={serviceTypeColors[plan.serviceType]} variant="secondary">
                        {plan.serviceType}
                      </Badge>
                      {plan.status === 'draft' && (
                        <Badge variant="outline">Draft</Badge>
                      )}
                    </div>
                    {plan.theme && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Theme: {plan.theme}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {plan.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Music className="h-4 w-4" />
                        {plan.setlist.length} songs
                      </span>
                    </div>

                    {/* Setlist Preview */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {plan.setlist.map((song, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {index + 1}. {song.title} ({song.key})
                        </Badge>
                      ))}
                    </div>

                    {/* Team */}
                    <div className="flex items-center justify-between mt-4">
                      <AvatarGroup avatars={plan.team} max={4} size="sm" />
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Plan</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Print Setlist</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Rehearsals */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Upcoming Rehearsals</h2>
          <Card>
            <CardContent className="p-4 space-y-4">
              {upcomingRehearsals.map((rehearsal) => (
                <div key={rehearsal.id} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{rehearsal.title}</p>
                    <p className="text-sm text-muted-foreground">{rehearsal.date}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{rehearsal.time}</span>
                      <Users className="h-3 w-3 text-muted-foreground ml-2" />
                      <span className="text-xs text-muted-foreground">{rehearsal.attendees}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/app/worship/rehearsals">
                  View All Rehearsals
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
