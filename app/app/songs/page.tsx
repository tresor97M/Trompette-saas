'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Music,
  Plus,
  Search,
  Heart,
  Play,
  MoreVertical,
  Grid,
  List,
  Download,
  Filter,
  Headphones,
} from 'lucide-react';
import { PageHeader, EmptyState } from '@/components/shared';
import { MiniPlayer } from '@/components/shared/audio-player';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Sample data
const songsData = [
  {
    id: '1',
    title: 'Great Is Thy Faithfulness',
    author: 'Thomas Chisholm',
    themes: ['worship', 'hymn'],
    key: 'G',
    bpm: 72,
    duration: 245,
    isFavorite: true,
    status: 'active',
    lastPerformed: '2024-12-08',
    cover: 'https://images.pexels.com/photos/1342375/pexels-photo-1342375.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '2',
    title: 'How Great Is Our God',
    author: 'Chris Tomlin',
    themes: ['praise', 'contemporary'],
    key: 'C',
    bpm: 78,
    duration: 287,
    isFavorite: false,
    status: 'active',
    lastPerformed: '2024-12-01',
    cover: 'https://images.pexels.com/photos/210934/pexels-photo-210934.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '3',
    title: 'What A Beautiful Name',
    author: 'Hillsong Worship',
    themes: ['worship', 'contemporary'],
    key: 'D',
    bpm: 68,
    duration: 320,
    isFavorite: true,
    status: 'active',
    lastPerformed: '2024-11-24',
    cover: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '4',
    title: '10,000 Reasons (Bless The Lord)',
    author: 'Matt Redman',
    themes: ['worship', 'contemporary'],
    key: 'E',
    bpm: 72,
    duration: 265,
    isFavorite: false,
    status: 'active',
    lastPerformed: '2024-12-10',
    cover: 'https://images.pexels.com/photos/1342375/pexels-photo-1342375.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '5',
    title: 'African Hymn Medley',
    author: 'Traditional',
    themes: ['african_traditional', 'worship'],
    key: 'F',
    bpm: 96,
    duration: 420,
    isFavorite: true,
    status: 'active',
    lastPerformed: '2024-12-15',
    cover: 'https://images.pexels.com/photos/210934/pexels-photo-210934.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '6',
    title: 'O Come All Ye Faithful',
    author: 'John Francis Wade',
    themes: ['christmas', 'hymn'],
    key: 'A',
    bpm: 90,
    duration: 180,
    isFavorite: false,
    status: 'active',
    lastPerformed: '2023-12-24',
    cover: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

const themeColors: Record<string, string> = {
  worship: 'bg-brand-gold-500/10 text-brand-gold-600',
  praise: 'bg-brand-purple-500/10 text-brand-purple-600',
  contemporary: 'bg-brand-blue-500/10 text-brand-blue-600',
  hymn: 'bg-brand-emerald-500/10 text-brand-emerald-600',
  african_traditional: 'bg-orange-500/10 text-orange-600',
  christmas: 'bg-red-500/10 text-red-600',
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function SongsPage() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [themeFilter, setThemeFilter] = React.useState<string>('all');
  const [showFavorites, setShowFavorites] = React.useState(false);

  const filteredSongs = songsData.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTheme = themeFilter === 'all' || song.themes.includes(themeFilter);
    const matchesFavorite = !showFavorites || song.isFavorite;
    return matchesSearch && matchesTheme && matchesFavorite;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Song Library"
        description="Manage your worship songs, lyrics, and sheet music"
      >
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export All
        </Button>
        <Button className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900" asChild>
          <Link href="/app/songs/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Song
          </Link>
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Songs</p>
                <p className="text-2xl font-bold">{songsData.length}</p>
              </div>
              <Music className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Favorites</p>
                <p className="text-2xl font-bold text-brand-gold-500">
                  {songsData.filter((s) => s.isFavorite).length}
                </p>
              </div>
              <Heart className="h-8 w-8 text-brand-gold-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Performances</p>
                <p className="text-2xl font-bold">248</p>
              </div>
              <Headphones className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Duration</p>
                <p className="text-2xl font-bold">4:32</p>
              </div>
              <div className="text-muted-foreground">min</div>
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
                  placeholder="Search songs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Theme Filter */}
              <Select value={themeFilter} onValueChange={setThemeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Themes</SelectItem>
                  <SelectItem value="worship">Worship</SelectItem>
                  <SelectItem value="praise">Praise</SelectItem>
                  <SelectItem value="contemporary">Contemporary</SelectItem>
                  <SelectItem value="hymn">Hymn</SelectItem>
                  <SelectItem value="african_traditional">African Traditional</SelectItem>
                  <SelectItem value="christmas">Christmas</SelectItem>
                </SelectContent>
              </Select>

              {/* Favorites Toggle */}
              <Button
                variant={showFavorites ? 'secondary' : 'outline'}
                onClick={() => setShowFavorites(!showFavorites)}
              >
                <Heart className={`h-4 w-4 mr-2 ${showFavorites ? 'fill-brand-gold-500 text-brand-gold-500' : ''}`} />
                Favorites
              </Button>
            </div>

            {/* View Toggle */}
            <div className="flex rounded-lg border">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="rounded-r-none"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="rounded-l-none"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Songs Grid/List */}
      {filteredSongs.length === 0 ? (
        <EmptyState
          icon={Music}
          title="No songs found"
          description="Try adjusting your search or add a new song to the library."
          action={{ label: 'Add Song', onClick: () => {} }}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSongs.map((song) => (
            <Card key={song.id} className="group overflow-hidden hover:border-brand-gold-500/30 transition-colors">
              {/* Cover */}
              <div className="relative aspect-video bg-muted">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="icon" className="rounded-full w-12 h-12 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900">
                    <Play className="h-6 w-6 ml-1" />
                  </Button>
                </div>
                {song.isFavorite && (
                  <Heart className="absolute top-3 right-3 h-5 w-5 fill-brand-gold-500 text-brand-gold-500" />
                )}
                <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded px-2 py-1 text-xs">
                  {formatDuration(song.duration)}
                </div>
              </div>

              {/* Info */}
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-medium truncate">{song.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{song.author}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Add to Setlist</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {song.themes.slice(0, 2).map((theme) => (
                    <Badge key={theme} className={themeColors[theme]} variant="secondary">
                      {theme.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-3 text-sm text-muted-foreground">
                  <span>Key: {song.key}</span>
                  <span>BPM: {song.bpm}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="divide-y">
            {filteredSongs.map((song) => (
              <div
                key={song.id}
                className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors group"
              >
                {/* Cover */}
                <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted shrink-0">
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="h-6 w-6 text-brand-gold-500" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium truncate">{song.title}</h3>
                    {song.isFavorite && (
                      <Heart className="h-4 w-4 fill-brand-gold-500 text-brand-gold-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{song.author}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {song.themes.map((theme) => (
                      <Badge key={theme} className={themeColors[theme]} variant="secondary">
                        {theme.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Meta */}
                <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="text-center">
                    <p className="font-medium text-foreground">{song.key}</p>
                    <p className="text-xs">Key</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-foreground">{song.bpm}</p>
                    <p className="text-xs">BPM</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-foreground">{formatDuration(song.duration)}</p>
                    <p className="text-xs">Duration</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Play className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Add to Setlist</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
