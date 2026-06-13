'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  QrCode,
  Users,
  Search,
  Check,
  X,
  Clock,
  ChevronLeft,
  RefreshCw,
  Sparkles,
  Camera,
} from 'lucide-react';
import { PageHeader } from '@/components/shared';

export default function CheckInPage() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'qr';

  const [events, setEvents] = React.useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = React.useState<string>('');
  const [selectedEvent, setSelectedEvent] = React.useState<any>(null);
  
  const [attendanceList, setAttendanceList] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sectionFilter, setSectionFilter] = React.useState<string>('all');
  
  const [isLoading, setIsLoading] = React.useState(true);
  const [isUpdating, setIsUpdating] = React.useState<string | null>(null);
  const [qrCodeToken, setQrCodeToken] = React.useState('trompette-qr-token-xyz');

  // Load initial list of events
  React.useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch('/api/events');
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
          if (data.length > 0) {
            setSelectedEventId(data[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to load events', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadEvents();
  }, []);

  // Fetch event specific attendances
  const loadAttendance = React.useCallback(async (eventId: string) => {
    if (!eventId) return;
    try {
      const res = await fetch(`/api/events/${eventId}/attendance`);
      if (res.ok) {
        const data = await res.json();
        setAttendanceList(data);
      } else {
        // Fallback mock data if API is not fully running
        setAttendanceList([
          { memberId: '1', firstName: 'Sarah', lastName: 'Williams', choirSection: 'SOPRANO', avatarUrl: '', status: 'PRESENT', method: 'QR_CODE' },
          { memberId: '2', firstName: 'John', lastName: 'Adewole', choirSection: 'TENOR', avatarUrl: '', status: 'PRESENT', method: 'MANUAL' },
          { memberId: '3', firstName: 'Grace', lastName: 'Mensah', choirSection: 'ALTO', avatarUrl: '', status: 'LATE', method: 'QR_CODE' },
          { memberId: '4', firstName: 'David', lastName: 'Ochieng', choirSection: 'BASS', avatarUrl: '', status: 'ABSENT', method: 'MANUAL' },
          { memberId: '5', firstName: 'Amara', lastName: 'Okonkwo', choirSection: 'SOPRANO', avatarUrl: '', status: 'EXCUSED', method: 'MANUAL', note: 'Voyage' },
          { memberId: '6', firstName: 'Marc', lastName: 'Kouamé', choirSection: 'TENOR', avatarUrl: '', status: null },
          { memberId: '7', firstName: 'Marie-Joëlle', lastName: 'Douala', choirSection: 'SOPRANO', avatarUrl: '', status: null },
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch attendance list:', error);
    }
  }, []);

  React.useEffect(() => {
    if (selectedEventId) {
      const ev = events.find(e => e.id === selectedEventId);
      if (ev) {
        setSelectedEvent(ev);
        loadAttendance(selectedEventId);
      }
    }
  }, [selectedEventId, events, loadAttendance]);

  // Update a single member status
  const handleUpdateStatus = async (memberId: string, status: string) => {
    if (!selectedEventId) return;
    setIsUpdating(memberId);

    // Optimistic UI update
    setAttendanceList(prev =>
      prev.map(item =>
        item.memberId === memberId
          ? { ...item, status: status.toUpperCase(), checkedInAt: new Date().toISOString() }
          : item
      )
    );

    try {
      const res = await fetch(`/api/events/${selectedEventId}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId,
          status: status.toUpperCase(),
          method: 'MANUAL',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }
    } catch (err) {
      console.error(err);
      // Revert on error
      loadAttendance(selectedEventId);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleSimulateQRScan = async (memberId: string) => {
    if (!selectedEventId) return;
    setIsUpdating(memberId);
    try {
      const res = await fetch(`/api/events/${selectedEventId}/check-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId,
        }),
      });
      if (res.ok) {
        await res.json();
        loadAttendance(selectedEventId);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleRegenerateQR = () => {
    const randomToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setQrCodeToken(randomToken);
  };

  // Filtered members list
  const filteredList = attendanceList.filter(item => {
    const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase());
    const matchesSection = sectionFilter === 'all' || item.choirSection === sectionFilter;
    return matchesSearch && matchesSection;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/app/attendance" className="text-muted-foreground flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Retour au suivi
          </Link>
        </Button>
      </div>

      <PageHeader
        title="Session de Check-In"
        description="Gérer les présences en temps réel par QR Code ou marquage manuel"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground font-medium">Évènement :</span>
          <Select value={selectedEventId} onValueChange={setSelectedEventId}>
            <SelectTrigger className="w-[260px] bg-background">
              <SelectValue placeholder="Sélectionner un évènement" />
            </SelectTrigger>
            <SelectContent>
              {events.map((e) => (
                <SelectItem key={e.id} value={e.id}>
                  {e.title} ({new Date(e.startTime).toLocaleDateString()})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PageHeader>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] bg-muted/60 p-1 rounded-xl">
          <TabsTrigger value="qr" className="rounded-lg flex items-center gap-2">
            <QrCode className="h-4 w-4" />
            QR Code
          </TabsTrigger>
          <TabsTrigger value="manual" className="rounded-lg flex items-center gap-2">
            <Users className="h-4 w-4" />
            Pointeur Manuel
          </TabsTrigger>
        </TabsList>

        {/* QR CODE GENERATOR & SIMULATOR TAB */}
        <TabsContent value="qr" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 flex flex-col justify-between overflow-hidden relative border-brand-gold-500/10">
              <div className="absolute top-0 right-0 p-4">
                <Badge variant="outline" className="bg-brand-gold-500/5 text-brand-gold-600 border-brand-gold-500/20 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  Actif
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2 text-foreground">
                  Portail QR d'Émargement
                </CardTitle>
                <CardDescription>
                  Affichez ce code sur l'écran principal de la répétition. Les choristes peuvent scanner ce code avec l'application mobile ChoirHub pour s'enregistrer.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-8 space-y-6">
                {/* Visual Premium Mock QR Code */}
                <div className="relative p-6 rounded-3xl bg-gradient-to-tr from-brand-blue-950 to-brand-blue-900 border border-brand-gold-500/20 shadow-2xl flex flex-col items-center justify-center">
                  <div className="w-64 h-64 bg-white p-4 rounded-2xl flex flex-col items-center justify-center shadow-lg relative">
                    <div className="grid grid-cols-4 gap-2 w-full h-full opacity-90">
                      <div className="border-[6px] border-brand-blue-900 rounded-lg w-16 h-16" />
                      <div className="flex flex-wrap gap-1 content-start justify-start p-1">
                        <div className="w-3 h-3 bg-brand-blue-900 rounded-sm" />
                        <div className="w-3 h-3 bg-brand-blue-900 rounded-sm" />
                        <div className="w-3 h-3 bg-brand-blue-900 rounded-sm" />
                      </div>
                      <div className="flex flex-wrap gap-1 content-start justify-end p-1">
                        <div className="w-3 h-3 bg-brand-blue-900 rounded-sm" />
                        <div className="w-3 h-3 bg-brand-blue-900 rounded-sm" />
                        <div className="w-3 h-3 bg-brand-blue-900 rounded-sm" />
                      </div>
                      <div className="border-[6px] border-brand-blue-900 rounded-lg w-16 h-16 ml-auto" />
                      
                      <div className="col-span-2 flex flex-wrap gap-2 p-2">
                        <div className="w-5 h-5 bg-brand-blue-900 rounded-full" />
                        <div className="w-3 h-3 bg-brand-gold-500 rounded-sm animate-pulse" />
                        <div className="w-4 h-4 bg-brand-blue-900 rounded-sm" />
                        <div className="w-6 h-3 bg-brand-blue-900 rounded-sm" />
                      </div>
                      <div className="col-span-2 flex flex-wrap gap-2 p-2 justify-end">
                        <div className="w-4 h-4 bg-brand-blue-900 rounded-sm" />
                        <div className="w-6 h-6 bg-brand-blue-900 rounded-lg" />
                        <div className="w-3 h-3 bg-brand-blue-900 rounded-sm" />
                      </div>

                      <div className="border-[6px] border-brand-blue-900 rounded-lg w-16 h-16 mt-auto" />
                      <div className="flex flex-wrap gap-1 content-end justify-start p-1">
                        <div className="w-3 h-3 bg-brand-blue-900 rounded-sm" />
                        <div className="w-3 h-3 bg-brand-blue-900 rounded-sm" />
                        <div className="w-3 h-3 bg-brand-blue-900 rounded-sm" />
                      </div>
                      <div className="flex flex-wrap gap-1 content-end justify-end p-1">
                        <div className="w-3 h-3 bg-brand-blue-900 rounded-sm" />
                        <div className="w-3 h-3 bg-brand-blue-900 rounded-sm" />
                        <div className="w-3 h-3 bg-brand-blue-900 rounded-sm" />
                      </div>
                      <div className="border-[6px] border-brand-blue-900 rounded-lg w-16 h-16 mt-auto ml-auto" />
                    </div>
                    <div className="absolute inset-0 m-auto w-12 h-12 rounded-xl bg-brand-gold-500 flex items-center justify-center shadow-lg border-2 border-white">
                      <Sparkles className="h-6 w-6 text-brand-blue-900" />
                    </div>
                  </div>
                  <span className="text-xs text-brand-gold-400 font-mono tracking-widest mt-4">TOKEN: {qrCodeToken.substring(0, 10).toUpperCase()}...</span>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" onClick={handleRegenerateQR} className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Régénérer le Token
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.print()} className="flex items-center gap-2">
                    Imprimer le QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Simulateur de Scan</CardTitle>
                <CardDescription>
                  Simuler le badgeage rapide d'un membre avec sa carte QR virtuelle.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground">Sélectionnez un membre pour simuler la capture de son QR Code par la caméra du pupitre :</p>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {attendanceList.map((m) => (
                    <div key={m.memberId} className="flex items-center justify-between p-2 rounded-lg bg-muted/40 hover:bg-muted transition-colors border border-transparent hover:border-brand-gold-500/10">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{m.firstName} {m.lastName}</p>
                        <p className="text-xs text-muted-foreground font-mono">{m.choirSection}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-brand-gold-600 hover:text-brand-gold-500 hover:bg-brand-gold-500/10 h-8 gap-1"
                        onClick={() => handleSimulateQRScan(m.memberId)}
                        disabled={isUpdating === m.memberId || m.status === 'PRESENT' || m.status === 'LATE'}
                      >
                        {m.status === 'PRESENT' || m.status === 'LATE' ? (
                          <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <>
                            <Camera className="h-4 w-4" />
                            Scanner
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* MANUAL CHECKLIST TAB */}
        <TabsContent value="manual" className="mt-6">
          <Card className="border-brand-blue-900/10">
            <CardHeader className="pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Marquage Manuel des Présences</CardTitle>
                <CardDescription>
                  Cliquez sur le statut de présence correspondant pour émarger chaque membre à la volée.
                </CardDescription>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un membre..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-background"
                  />
                </div>

                <Select value={sectionFilter} onValueChange={setSectionFilter}>
                  <SelectTrigger className="w-[160px] bg-background">
                    <SelectValue placeholder="Pupitre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les pupitres</SelectItem>
                    <SelectItem value="SOPRANO">Soprano</SelectItem>
                    <SelectItem value="ALTO">Alto</SelectItem>
                    <SelectItem value="TENOR">Ténor</SelectItem>
                    <SelectItem value="BASS">Basse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-muted-foreground/10 overflow-hidden bg-background">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead>Membre</TableHead>
                      <TableHead>Pupitre</TableHead>
                      <TableHead className="w-[420px] text-center">Statut d'Émargement</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredList.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                          Aucun membre trouvé.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredList.map((m) => (
                        <TableRow key={m.memberId} className="group">
                          <TableCell className="font-semibold flex items-center gap-3 py-3">
                            <div className="h-8 w-8 rounded-full bg-brand-gold-500/10 text-brand-gold-600 flex items-center justify-center font-bold text-xs uppercase">
                              {m.firstName.charAt(0)}{m.lastName.charAt(0)}
                            </div>
                            <span className="text-sm font-medium">{m.firstName} {m.lastName}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-muted/30 capitalize">
                              {m.choirSection.toLowerCase()}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-2">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                size="sm"
                                variant={m.status === 'PRESENT' ? 'default' : 'outline'}
                                className={
                                  m.status === 'PRESENT'
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm h-8 px-3'
                                    : 'text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-600 h-8 px-3'
                                }
                                onClick={() => handleUpdateStatus(m.memberId, 'PRESENT')}
                                disabled={isUpdating === m.memberId}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Présent
                              </Button>

                              <Button
                                size="sm"
                                variant={m.status === 'LATE' ? 'default' : 'outline'}
                                className={
                                  m.status === 'LATE'
                                    ? 'bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-sm h-8 px-3'
                                    : 'text-muted-foreground hover:bg-orange-500/10 hover:text-orange-500 h-8 px-3'
                                }
                                onClick={() => handleUpdateStatus(m.memberId, 'LATE')}
                                disabled={isUpdating === m.memberId}
                              >
                                <Clock className="h-4 w-4 mr-1" />
                                Retard
                              </Button>

                              <Button
                                size="sm"
                                variant={m.status === 'EXCUSED' ? 'default' : 'outline'}
                                className={
                                  m.status === 'EXCUSED'
                                    ? 'bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-900 font-semibold shadow-sm h-8 px-3'
                                    : 'text-muted-foreground hover:bg-brand-gold-500/10 hover:text-brand-gold-600 h-8 px-3'
                                }
                                onClick={() => handleUpdateStatus(m.memberId, 'EXCUSED')}
                                disabled={isUpdating === m.memberId}
                              >
                                <Clock className="h-4 w-4 mr-1" />
                                Excusé
                              </Button>

                              <Button
                                size="sm"
                                variant={m.status === 'ABSENT' ? 'default' : 'outline'}
                                className={
                                  m.status === 'ABSENT'
                                    ? 'bg-destructive hover:bg-destructive/90 text-white font-medium shadow-sm h-8 px-3'
                                    : 'text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-8 px-3'
                                }
                                onClick={() => handleUpdateStatus(m.memberId, 'ABSENT')}
                                disabled={isUpdating === m.memberId}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Absent
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
