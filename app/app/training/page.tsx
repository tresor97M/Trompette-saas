'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PageHeader, EmptyState } from '@/components/shared';
import {
  GraduationCap,
  Play,
  Clock,
  Users,
  Star,
  ChevronRight,
  BookOpen,
  Music,
  Mic2,
  Video,
} from 'lucide-react';

const courses = [
  {
    id: '1',
    title: 'Vocal Techniques for Worship',
    description: 'Learn proper breathing, posture, and vocal exercises for powerful worship singing.',
    instructor: 'Pastor Grace Mensah',
    category: 'vocal',
    level: 'beginner',
    duration: 180,
    enrolled: 45,
    rating: 4.8,
    progress: 65,
    thumbnail: 'https://images.pexels.com/photos/1342375/pexels-photo-1342375.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    title: 'Music Theory Fundamentals',
    description: 'Understand scales, chords, and music notation basics for worship musicians.',
    instructor: 'John Adewole',
    category: 'music_theory',
    level: 'beginner',
    duration: 240,
    enrolled: 32,
    rating: 4.9,
    progress: 30,
    thumbnail: 'https://images.pexels.com/photos/210934/pexels-photo-210934.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    title: 'Worship Leading Masterclass',
    description: 'Develop skills to lead worship confidently and create meaningful worship experiences.',
    instructor: 'Pastor David Ochieng',
    category: 'worship_leading',
    level: 'advanced',
    duration: 360,
    enrolled: 28,
    rating: 4.7,
    progress: 0,
    thumbnail: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '4',
    title: 'Keyboard Basics for Worship',
    description: 'Learn keyboard fundamentals and chord progressions for worship songs.',
    instructor: 'Sarah Williams',
    category: 'instrumental',
    level: 'beginner',
    duration: 200,
    enrolled: 38,
    rating: 4.6,
    progress: 100,
    thumbnail: 'https://images.pexels.com/photos/1342375/pexels-photo-1342375.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  vocal: <Mic2 className="h-4 w-4" />,
  music_theory: <BookOpen className="h-4 w-4" />,
  worship_leading: <Music className="h-4 w-4" />,
  instrumental: <Music className="h-4 w-4" />,
};

const levelColors: Record<string, string> = {
  beginner: 'bg-brand-emerald-500/10 text-brand-emerald-600',
  intermediate: 'bg-brand-gold-500/10 text-brand-gold-600',
  advanced: 'bg-brand-purple-500/10 text-brand-purple-600',
};

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

// Simple progress bar component
function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-full bg-secondary ${className}`}>
      <div
        className="h-full bg-primary transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function TrainingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Training Center"
        description="Develop your worship skills with courses and lessons"
      >
        <Button variant="outline">
          View Certificates
        </Button>
        <Button className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900">
          Browse All Courses
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <GraduationCap className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-brand-emerald-500">3</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-brand-emerald-500/10 flex items-center justify-center">
                <Star className="h-4 w-4 text-brand-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Certificates</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-brand-gold-500/10 flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-brand-gold-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Hours</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Continue Learning</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {courses.filter(c => c.progress > 0 && c.progress < 100).map((course) => (
            <Card key={course.id} className="overflow-hidden group hover:border-brand-gold-500/30 transition-colors">
              <div className="flex">
                <div className="w-32 h-24 shrink-0 relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="h-8 w-8 text-brand-gold-500" />
                  </div>
                </div>
                <CardContent className="p-4 flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-medium truncate">{course.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{course.instructor}</p>
                    </div>
                    <Badge className={levelColors[course.level]} variant="secondary">
                      {course.level}
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <ProgressBar value={course.progress} className="h-2" />
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* All Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">All Courses</h2>
          <Button variant="ghost" size="sm">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden group hover:border-brand-gold-500/30 transition-colors">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-muted">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="icon" className="rounded-full w-12 h-12 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900">
                    <Play className="h-6 w-6 ml-1" />
                  </Button>
                </div>
                {course.progress === 100 && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-brand-emerald-500">Completed</Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Badge className={levelColors[course.level]} variant="secondary">
                    {course.level}
                  </Badge>
                </div>
                <h3 className="font-medium line-clamp-2">{course.title}</h3>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                  {course.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDuration(course.duration)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {course.enrolled}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-brand-gold-500 text-brand-gold-500" />
                    {course.rating}
                  </span>
                </div>

                {/* Progress */}
                {course.progress > 0 && (
                  <div className="mt-3">
                    <ProgressBar value={course.progress} className="h-1" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
