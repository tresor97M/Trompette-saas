'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PageHeader, EmptyState } from '@/components/shared';
import {
  FolderOpen,
  Upload,
  Music,
  Video,
  Image,
  FileText,
  Search,
  Grid,
  List,
  MoreVertical,
  Download,
  Trash2,
  Share,
  FolderPlus,
  HardDrive,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mediaFiles = [
  {
    id: '1',
    name: 'Great Is Thy Faithfulness.mp3',
    type: 'audio',
    size: 8.5 * 1024 * 1024,
    uploaded: '2024-12-10',
    thumbnail: 'https://images.pexels.com/photos/1342375/pexels-photo-1342375.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: '2',
    name: 'Sunday Service Worship - Dec 8.mp4',
    type: 'video',
    size: 450 * 1024 * 1024,
    uploaded: '2024-12-08',
    thumbnail: 'https://images.pexels.com/photos/210934/pexels-photo-210934.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: '3',
    name: 'Choir Rehearsal Notes.pdf',
    type: 'document',
    size: 2.1 * 1024 * 1024,
    uploaded: '2024-12-05',
    thumbnail: null,
  },
  {
    id: '4',
    name: 'Silent Night - Sheet Music.pdf',
    type: 'sheet_music',
    size: 1.5 * 1024 * 1024,
    uploaded: '2024-12-01',
    thumbnail: null,
  },
  {
    id: '5',
    name: 'Choir Group Photo.jpg',
    type: 'image',
    size: 5.2 * 1024 * 1024,
    uploaded: '2024-11-28',
    thumbnail: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: '6',
    name: 'How Great Is Our God.mp3',
    type: 'audio',
    size: 7.8 * 1024 * 1024,
    uploaded: '2024-11-25',
    thumbnail: 'https://images.pexels.com/photos/1342375/pexels-photo-1342375.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

const typeIcons: Record<string, React.ReactNode> = {
  audio: <Music className="h-6 w-6 text-brand-purple-500" />,
  video: <Video className="h-6 w-6 text-brand-gold-500" />,
  image: <Image className="h-6 w-6 text-brand-emerald-500" />,
  document: <FileText className="h-6 w-6 text-brand-blue-500" />,
  sheet_music: <Music className="h-6 w-6 text-orange-500" />,
};

const typeColors: Record<string, string> = {
  audio: 'bg-brand-purple-500/10',
  video: 'bg-brand-gold-500/10',
  image: 'bg-brand-emerald-500/10',
  document: 'bg-brand-blue-500/10',
  sheet_music: 'bg-orange-500/10',
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

export default function MediaPage() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('all');

  const filteredFiles = mediaFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || file.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalSize = mediaFiles.reduce((acc, file) => acc + file.size, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Media Center"
        description="Store and manage audio, videos, images, and sheet music"
      >
        <Button variant="outline">
          <FolderPlus className="h-4 w-4 mr-2" />
          New Folder
        </Button>
        <Button className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900">
          <Upload className="h-4 w-4 mr-2" />
          Upload Files
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Files</p>
                <p className="text-2xl font-bold">{mediaFiles.length}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Audio Files</p>
                <p className="text-2xl font-bold text-brand-purple-500">
                  {mediaFiles.filter(f => f.type === 'audio').length}
                </p>
              </div>
              <Music className="h-8 w-8 text-brand-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Videos</p>
                <p className="text-2xl font-bold text-brand-gold-500">
                  {mediaFiles.filter(f => f.type === 'video').length}
                </p>
              </div>
              <Video className="h-8 w-8 text-brand-gold-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">{formatSize(totalSize)}</p>
              </div>
              <HardDrive className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="File Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="sheet_music">Sheet Music</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                size="icon"
                className="rounded-l-none"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Files */}
      {filteredFiles.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No files found"
          description="Upload your first file or adjust your search filters."
          action={{ label: 'Upload File', onClick: () => {} }}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredFiles.map((file) => (
            <Card key={file.id} className="group hover:border-brand-gold-500/30 transition-colors">
              {/* Preview */}
              <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
                {file.thumbnail ? (
                  <img
                    src={file.thumbnail}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`p-4 rounded-lg ${typeColors[file.type]}`}>
                    {typeIcons[file.type]}
                  </div>
                )}
                <Badge className="absolute top-2 left-2" variant="secondary">
                  {file.type.replace('_', ' ')}
                </Badge>
              </div>

              {/* Info */}
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium truncate" title={file.name}>{file.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatSize(file.size)} • {file.uploaded}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Download className="h-4 w-4 mr-2" /> Download</DropdownMenuItem>
                      <DropdownMenuItem><Share className="h-4 w-4 mr-2" /> Share</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="divide-y">
            {filteredFiles.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-4 group">
                <div className={`p-3 rounded-lg ${typeColors[file.type]}`}>
                  {typeIcons[file.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Uploaded {file.uploaded}
                  </p>
                </div>
                <div className="hidden sm:block text-sm text-muted-foreground">
                  {formatSize(file.size)}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Share</DropdownMenuItem>
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
