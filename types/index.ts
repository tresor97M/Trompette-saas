// ==========================================
// Trompette SaaS - Type Definitions
// ==========================================

// ==========================================
// User & Auth Types
// ==========================================

export type UserRole = 'admin' | 'director' | 'section_leader' | 'member' | 'guest';

export type VoiceType = 'soprano' | 'alto' | 'tenor' | 'bass';

export type MemberStatus = 'active' | 'inactive' | 'on_leave' | 'probation';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  voiceType?: VoiceType;
  status: MemberStatus;
  phone?: string;
  dateJoined: string;
  lastActive: string;
  churchId: string;
  ministryIds: string[];
  notificationPreferences: NotificationPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  rehearsalReminders: boolean;
  serviceReminders: boolean;
  prayerRequestUpdates: boolean;
  announcements: boolean;
}

// ==========================================
// Church & Ministry Types
// ==========================================

export interface Church {
  id: string;
  name: string;
  logo?: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  email?: string;
  website?: string;
  timezone: string;
  subscription: Subscription;
  createdAt: string;
  updatedAt: string;
}

export interface Ministry {
  id: string;
  name: string;
  description?: string;
  churchId: string;
  leaderId: string;
  memberCount: number;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  plan: 'free' | 'standard' | 'premium' | 'enterprise';
  status: 'active' | 'past_due' | 'canceled' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

// ==========================================
// Member Management Types
// ==========================================

export interface Member extends User {
  bio?: string;
  dateOfBirth?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  skills: string[];
  trainingProgress: TrainingProgress[];
  attendanceSummary: AttendanceSummary;
  performances: Performance[];
}

export interface TrainingProgress {
  courseId: string;
  courseName: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
  startedAt: string;
  completedAt?: string;
  certificateId?: string;
}

export interface AttendanceSummary {
  totalRehearsals: number;
  attended: number;
  excused: number;
  unexcused: number;
  attendanceRate: number;
}

export interface Performance {
  id: string;
  songId: string;
  songTitle: string;
  date: string;
  role: 'lead' | 'backup' | 'choir';
  notes?: string;
}

// ==========================================
// Song Library Types
// ==========================================

export type SongTheme =
  | 'worship'
  | 'praise'
  | 'contemporary'
  | 'hymn'
  | 'gospel'
  | 'african_traditional'
  | 'christmas'
  | 'easter'
  | 'youth'
  | 'children';

export type SongStatus = 'active' | 'archived' | 'draft';

export interface Song {
  id: string;
  title: string;
  alternateTitle?: string;
  author?: string;
  composer?: string;
  themes: SongTheme[];
  bibleReferences?: BibleReference[];
  key: string;
  bpm?: number;
  timeSignature?: string;
  duration?: number; // in seconds
  lyrics?: string;
  chords?: string;
  leadSheet?: string;
  audioUrl?: string;
  videoUrl?: string;
  sheetMusicUrl?: string;
  leadSinger?: string;
  status: SongStatus;
  isFavorite: boolean;
  playCount: number;
  lastPerformed?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BibleReference {
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd?: number;
}

// ==========================================
// Attendance Types
// ==========================================

export type AttendanceStatus = 'present' | 'absent' | 'excused' | 'late';

export type EventType = 'rehearsal' | 'service' | 'performance' | 'workshop' | 'meeting';

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  eventId: string;
  eventTitle: string;
  eventType: EventType;
  date: string;
  status: AttendanceStatus;
  checkInTime?: string;
  checkInMethod?: 'manual' | 'qr' | 'app';
  notes?: string;
  recordedBy: string;
  createdAt: string;
}

export interface AttendanceEvent {
  id: string;
  title: string;
  type: EventType;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  ministryId: string;
  ministryName: string;
  expectedAttendance: number;
  actualAttendance: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// Worship Planning Types
// ==========================================

export interface WorshipPlan {
  id: string;
  title: string;
  date: string;
  serviceType: 'sunday' | 'wednesday' | 'special' | 'concert' | 'conference';
  theme?: string;
  bibleVerse?: string;
  ministryId: string;
  setlist: SetlistItem[];
  team: WorshipTeamMember[];
  notes?: string;
  status: 'draft' | 'planned' | 'completed';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface SetlistItem {
  id: string;
  songId: string;
  songTitle: string;
  key: string;
  bpm?: number;
  order: number;
  notes?: string;
  leadSinger?: string;
}

export interface WorshipTeamMember {
  memberId: string;
  memberName: string;
  role: WorshipTeamRole;
  instrument?: string;
}

export type WorshipTeamRole =
  | 'lead_singer'
  | 'backup_singer'
  | 'choir'
  | 'keyboardist'
  | 'drummer'
  | 'guitarist'
  | 'bassist'
  | 'sound_engineer'
  | 'media_technician';

export interface Rehearsal {
  id: string;
  worshipPlanId: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  agenda: RehearsalAgendaItem[];
  attendees: string[];
  notes?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface RehearsalAgendaItem {
  id: string;
  songId?: string;
  songTitle?: string;
  title: string;
  duration: number; // minutes
  order: number;
  notes?: string;
}

// ==========================================
// Training Types
// ==========================================

export type CourseCategory =
  | 'vocal'
  | 'instrumental'
  | 'music_theory'
  | 'worship_leading'
  | 'stage_presence'
  | 'sound_engineering'
  | 'media_production';

export type LessonType = 'video' | 'reading' | 'audio' | 'quiz' | 'assignment';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructorId: string;
  instructorName: string;
  category: CourseCategory;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // total minutes
  lessons: Lesson[];
  enrolledCount: number;
  completionRate: number;
  rating: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  type: LessonType;
  duration: number; // minutes
  videoUrl?: string;
  audioUrl?: string;
  content?: string;
  quiz?: Quiz;
  order: number;
  isPreview: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number; // minutes
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseName: string;
  userId: string;
  userName: string;
  issuedAt: string;
  certificateUrl: string;
}

// ==========================================
// Media Types
// ==========================================

export type MediaType = 'audio' | 'video' | 'image' | 'document' | 'sheet_music';

export type MediaStatus = 'processing' | 'ready' | 'failed';

export interface MediaFile {
  id: string;
  name: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  size: number; // bytes
  duration?: number; // seconds for audio/video
  dimensions?: {
    width: number;
    height: number;
  };
  mimeType: string;
  status: MediaStatus;
  tags: string[];
  folderId?: string;
  uploadedBy: string;
  uploadedAt: string;
  updatedAt: string;
}

export interface MediaFolder {
  id: string;
  name: string;
  parentId?: string;
  path: string;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// Communication Types
// ==========================================

export type AnnouncementPriority = 'low' | 'normal' | 'high' | 'urgent';

export type PrayerStatus = 'pending' | 'acknowledged' | 'answered' | 'closed';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: AnnouncementPriority;
  authorId: string;
  authorName: string;
  targetAudience: ('all' | 'directors' | 'section_leaders' | 'members')[];
  isPinned: boolean;
  readCount: number;
  publishedAt: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PrayerRequest {
  id: string;
  title: string;
  content: string;
  isAnonymous: boolean;
  authorId?: string;
  authorName?: string;
  status: PrayerStatus;
  response?: string;
  prayedForCount: number;
  isPrivate: boolean;
  ministryId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  recipientId: string;
  recipientName: string;
  subject: string;
  content: string;
  isRead: boolean;
  readAt?: string;
  parentId?: string;
  createdAt: string;
}

export interface MessageThread {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  messages: Message[];
  lastMessageAt: string;
  unreadCount: number;
}

// ==========================================
// Dashboard & Analytics Types
// ==========================================

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  newMembersThisMonth: number;
  memberGrowthRate: number;
  totalSongs: number;
  newSongsThisMonth: number;
  attendanceRate: number;
  attendanceTrend: number;
  upcomingEvents: number;
  pendingPrayerRequests: number;
}

export interface AttendanceTrend {
  date: string;
  present: number;
  absent: number;
  excused: number;
}

export interface MemberGrowthData {
  month: string;
  newMembers: number;
  totalMembers: number;
}

export interface VoiceDistribution {
  soprano: number;
  alto: number;
  tenor: number;
  bass: number;
}

// ==========================================
// Settings Types
// ==========================================

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  dateFormat: string;
  startOfWeek: 'sunday' | 'monday';
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
}

export interface ChurchSettings {
  name: string;
  logo?: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  timezone: string;
  defaultRehearsalDuration: number;
  defaultServiceDuration: number;
  enableQRCheckIn: boolean;
  enableMemberSelfRegistration: boolean;
}

// ==========================================
// UI Types
// ==========================================

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
  children?: NavItem[];
}

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  key: string;
  value: string | string[];
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'in';
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
}
