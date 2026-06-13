'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { PageHeader, EmptyState } from '@/components/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MessageCircle,
  Plus,
  Bell,
  Send,
  Heart,
  Clock,
  User,
  MoreVertical,
  MessageSquare,
  AtSign,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const announcements = [
  {
    id: '1',
    title: 'Rehearsal Schedule Change',
    content: 'Due to the upcoming Christmas concert, we will move the Saturday rehearsal to Friday this week. Please check the worship planning page for updates.',
    author: 'Pastor Adewole',
    authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    priority: 'high',
    date: '2 hours ago',
    isRead: false,
  },
  {
    id: '2',
    title: 'New Songs Added to Library',
    content: 'We have added 5 new songs to our Christmas repertoire. Please review them before our next rehearsal.',
    author: 'Grace Mensah',
    authorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    priority: 'normal',
    date: '1 day ago',
    isRead: true,
  },
  {
    id: '3',
    title: 'Choir Uniform Reminder',
    content: 'Please ensure you have collected your new choir uniform from the church office before the Christmas service. Opening hours are 9 AM - 5 PM.',
    author: 'Sarah Williams',
    authorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    priority: 'normal',
    date: '3 days ago',
    isRead: true,
  },
];

const prayerRequests = [
  {
    id: '1',
    title: 'Healing for Brother Michael',
    content: 'Brother Michael is recovering from surgery. Let us lift him up in prayer.',
    author: 'Anonymous',
    isAnonymous: true,
    prayedForCount: 24,
    status: 'pending',
    date: '5 hours ago',
    isPrivate: false,
  },
  {
    id: '2',
    title: 'Travel Mercies',
    content: 'Several members are traveling for Christmas. Praying for safe journeys.',
    author: 'Grace Mensah',
    isAnonymous: false,
    prayedForCount: 18,
    status: 'pending',
    date: '1 day ago',
    isPrivate: false,
  },
  {
    id: '3',
    title: 'Church Growth',
    content: 'Praying for God to bring more souls to our ministry this coming year.',
    author: 'Pastor Adewole',
    isAnonymous: false,
    prayedForCount: 45,
    status: 'acknowledged',
    date: '1 week ago',
    isPrivate: false,
  },
];

const messages = [
  {
    id: '1',
    sender: 'Sarah Williams',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    preview: 'Hi John, just wanted to confirm the song selection for Sunday...',
    time: '10:30 AM',
    unread: true,
  },
  {
    id: '2',
    sender: 'Grace Mensah',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    preview: 'The rehearsal notes have been uploaded to the media center.',
    time: 'Yesterday',
    unread: false,
  },
];

const priorityColors: Record<string, string> = {
  low: 'bg-muted text-muted-foreground',
  normal: 'bg-brand-blue-500/10 text-brand-blue-600',
  high: 'bg-brand-gold-500/10 text-brand-gold-600',
  urgent: 'bg-destructive/10 text-destructive',
};

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = React.useState('announcements');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Communication"
        description="Stay connected with announcements, prayer requests, and messages"
      >
        <Button className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900">
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </PageHeader>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="announcements" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Announcements
          </TabsTrigger>
          <TabsTrigger value="prayers" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Prayer Requests
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Messages
          </TabsTrigger>
        </TabsList>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className={`group ${!announcement.isRead ? 'border-l-4 border-l-brand-gold-500' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={announcement.authorAvatar} alt={announcement.author} />
                    <AvatarFallback>{announcement.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium">{announcement.title}</h3>
                      <Badge className={priorityColors[announcement.priority]} variant="secondary">
                        {announcement.priority}
                      </Badge>
                      {!announcement.isRead && (
                        <Badge variant="default" className="bg-brand-gold-500">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {announcement.content}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span>{announcement.author}</span>
                      <span>{announcement.date}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                      <DropdownMenuItem>Pin</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Prayer Requests Tab */}
        <TabsContent value="prayers" className="space-y-4">
          {/* Submit Prayer */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <Input placeholder="Prayer request title..." />
                <Textarea placeholder="Share your prayer request..." rows={3} />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Submit anonymously
                  </label>
                  <Button size="sm" className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900">
                    <Send className="h-4 w-4 mr-2" />
                    Submit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prayer List */}
          {prayerRequests.map((prayer) => (
            <Card key={prayer.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{prayer.title}</h3>
                      {prayer.status === 'acknowledged' && (
                        <Badge className="bg-brand-emerald-500/10 text-brand-emerald-600" variant="secondary">
                          Acknowledged
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{prayer.content}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span>{prayer.isAnonymous ? 'Anonymous' : prayer.author}</span>
                      <span>{prayer.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Heart className={`h-4 w-4 ${prayer.prayedForCount > 0 ? 'fill-brand-gold-500 text-brand-gold-500' : ''}`} />
                      Prayed ({prayer.prayedForCount})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Message List */}
            <div className="lg:col-span-1 space-y-2">
              {messages.map((message) => (
                <Card key={message.id} className={`cursor-pointer ${message.unread ? 'bg-muted/50' : ''}`}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.avatar} alt={message.sender} />
                        <AvatarFallback>{message.sender.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{message.sender}</p>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{message.preview}</p>
                      </div>
                      {message.unread && (
                        <div className="h-2 w-2 rounded-full bg-brand-gold-500" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              <Card className="h-full flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={messages[0]?.avatar} />
                      <AvatarFallback>JM</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{messages[0]?.sender || 'Select a conversation'}</CardTitle>
                      <CardDescription>Last active 2 hours ago</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-4">
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Select a conversation to view messages
                  </div>
                </CardContent>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input placeholder="Type a message..." className="flex-1" />
                    <Button className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
