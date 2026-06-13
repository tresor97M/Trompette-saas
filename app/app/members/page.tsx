'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  Mail,
  Phone,
  Eye,
  Edit,
  Trash,
  Download,
  Grid,
  List,
} from 'lucide-react';
import { PageHeader, EmptyState } from '@/components/shared';

// Sample data
const membersData = [
  {
    id: '1',
    name: 'Sarah Williams',
    email: 'sarah@church.com',
    phone: '+234 801 234 5678',
    voiceType: 'soprano',
    status: 'active',
    dateJoined: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '2',
    name: 'John Adewole',
    email: 'john@church.com',
    phone: '+234 802 345 6789',
    voiceType: 'tenor',
    status: 'active',
    dateJoined: '2024-02-20',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '3',
    name: 'Grace Mensah',
    email: 'grace@church.com',
    phone: '+233 241 234 567',
    voiceType: 'alto',
    status: 'active',
    dateJoined: '2024-03-10',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '4',
    name: 'David Ochieng',
    email: 'david@church.com',
    phone: '+254 712 345 678',
    voiceType: 'bass',
    status: 'on_leave',
    dateJoined: '2023-09-05',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '5',
    name: 'Amara Okonkwo',
    email: 'amara@church.com',
    phone: '+234 803 456 7890',
    voiceType: 'soprano',
    status: 'active',
    dateJoined: '2024-05-01',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

const voiceTypeColors: Record<string, string> = {
  soprano: 'bg-brand-gold-500/10 text-brand-gold-600',
  alto: 'bg-brand-emerald-500/10 text-brand-emerald-600',
  tenor: 'bg-brand-purple-500/10 text-brand-purple-600',
  bass: 'bg-brand-blue-500/10 text-brand-blue-600',
};

const statusColors: Record<string, string> = {
  active: 'bg-brand-emerald-500/10 text-brand-emerald-600',
  inactive: 'bg-muted text-muted-foreground',
  on_leave: 'bg-brand-gold-500/10 text-brand-gold-600',
  probation: 'bg-destructive/10 text-destructive',
};

export default function MembersPage() {
  const { t, language } = useTranslation();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [voiceFilter, setVoiceFilter] = React.useState<string>('all');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');

  const [members, setMembers] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;
    async function loadMembers() {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (searchQuery) queryParams.set('search', searchQuery);
        if (voiceFilter !== 'all') queryParams.set('voice', voiceFilter);
        if (statusFilter !== 'all') queryParams.set('status', statusFilter);

        const res = await fetch(`/api/members?${queryParams.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch members');
        const data = await res.json();
        if (active) {
          setMembers(data);
          setError(null);
        }
      } catch (err: any) {
        if (active) {
          setError(err.message || 'Error');
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    const timer = setTimeout(() => {
      loadMembers();
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchQuery, voiceFilter, statusFilter]);

  const handleDeleteMember = async (id: string) => {
    const confirmMessage = language === 'fr' 
      ? 'Êtes-vous sûr de vouloir supprimer ce choriste ?' 
      : 'Are you sure you want to delete this member?';
      
    if (!confirm(confirmMessage)) return;

    try {
      const res = await fetch(`/api/members/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete member');
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error deleting member');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={t('members.title')}
        description={t('members.desc')}
      >
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          {t('common.export')}
        </Button>
        <Button className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900" asChild>
          <Link href="/app/members/new">
            <Plus className="h-4 w-4 mr-2" />
            {t('members.addMember')}
          </Link>
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('members.total')}</p>
                <p className="text-2xl font-bold">{members.length}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('members.active')}</p>
                <p className="text-2xl font-bold text-brand-emerald-500">
                  {members.filter((m) => m.status === 'active').length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-brand-emerald-500/10 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-brand-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('members.onLeave')}</p>
                <p className="text-2xl font-bold text-brand-gold-500">
                  {members.filter((m) => m.status === 'on_leave').length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-brand-gold-500/10 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-brand-gold-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('members.newThisMonth')}</p>
                <p className="text-2xl font-bold text-brand-purple-500">3</p>
              </div>
              <Badge className="bg-brand-purple-500/10 text-brand-purple-600">+12%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('members.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Voice Filter */}
              <Select value={voiceFilter} onValueChange={setVoiceFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder={t('members.colVoice')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('members.allVoices')}</SelectItem>
                  <SelectItem value="soprano">{t('members.voiceNames.soprano')}</SelectItem>
                  <SelectItem value="alto">{t('members.voiceNames.alto')}</SelectItem>
                  <SelectItem value="tenor">{t('members.voiceNames.tenor')}</SelectItem>
                  <SelectItem value="bass">{t('members.voiceNames.bass')}</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder={t('members.colStatus')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('members.allStatus')}</SelectItem>
                  <SelectItem value="active">{t('members.statusNames.active')}</SelectItem>
                  <SelectItem value="inactive">{t('members.statusNames.inactive')}</SelectItem>
                  <SelectItem value="on_leave">{t('members.statusNames.on_leave')}</SelectItem>
                  <SelectItem value="probation">{t('members.statusNames.probation')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Toggle */}
            <div className="flex rounded-lg border">
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="rounded-r-none"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="rounded-l-none"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members List/Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 bg-card rounded-2xl border border-border/50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold-500"></div>
          <span className="ml-3 mt-4 text-sm text-muted-foreground">{t('common.loading') || 'Chargement...'}</span>
        </div>
      ) : error ? (
        <div className="p-6 text-center bg-destructive/10 text-destructive rounded-2xl border border-destructive/20">
          <p className="font-semibold">{t('common.error') || 'Erreur'}</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : members.length === 0 ? (
        <EmptyState
          icon={Users}
          title={t('members.noMembers')}
          description={t('members.noMembersDesc')}
          action={{ label: t('members.addMember'), onClick: () => {} }}
        />
      ) : viewMode === 'list' ? (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('members.colMember')}</TableHead>
                <TableHead>{t('members.colVoice')}</TableHead>
                <TableHead>{t('members.colStatus')}</TableHead>
                <TableHead>{t('members.colJoined')}</TableHead>
                <TableHead>{t('common.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={voiceTypeColors[member.voiceType]}>
                      {t(`members.voiceNames.${member.voiceType}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[member.status]}>
                      {t(`members.statusNames.${member.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(member.dateJoined).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDeleteMember(member.id)}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <Card key={member.id} className="group hover:border-brand-gold-500/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{member.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge className={voiceTypeColors[member.voiceType]} variant="secondary">
                        {t(`members.voiceNames.${member.voiceType}`)}
                      </Badge>
                      <Badge className={statusColors[member.status]} variant="secondary">
                        {t(`members.statusNames.${member.status}`)}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
