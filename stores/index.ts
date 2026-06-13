import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  User,
  Church,
  Member,
  Song,
  WorshipPlan,
  Course,
  Announcement,
  PrayerRequest,
  MediaFile,
  DashboardStats,
  NotificationPreferences,
} from '@/types';

// ==========================================
// Auth Store
// ==========================================

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      login: (user) => set({ user, isAuthenticated: true, isLoading: false }),
      logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'trompette-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

// ==========================================
// Theme Store
// ==========================================

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'trompette-theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ==========================================
// Sidebar Store
// ==========================================

interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
  toggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
  open: () => void;
  close: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  isCollapsed: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

// ==========================================
// Members Store
// ==========================================

interface MembersState {
  members: Member[];
  selectedMember: Member | null;
  filters: {
    search: string;
    voiceType: string | null;
    status: string | null;
    ministry: string | null;
  };
  isLoading: boolean;
  setMembers: (members: Member[]) => void;
  addMember: (member: Member) => void;
  updateMember: (id: string, updates: Partial<Member>) => void;
  removeMember: (id: string) => void;
  selectMember: (member: Member | null) => void;
  setFilters: (filters: Partial<MembersState['filters']>) => void;
  setLoading: (loading: boolean) => void;
}

export const useMembersStore = create<MembersState>((set) => ({
  members: [],
  selectedMember: null,
  filters: {
    search: '',
    voiceType: null,
    status: null,
    ministry: null,
  },
  isLoading: false,
  setMembers: (members) => set({ members }),
  addMember: (member) => set((state) => ({ members: [...state.members, member] })),
  updateMember: (id, updates) =>
    set((state) => ({
      members: state.members.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    })),
  removeMember: (id) => set((state) => ({ members: state.members.filter((m) => m.id !== id) })),
  selectMember: (member) => set({ selectedMember: member }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  setLoading: (loading) => set({ isLoading: loading }),
}));

// ==========================================
// Songs Store
// ==========================================

interface SongsState {
  songs: Song[];
  selectedSong: Song | null;
  viewMode: 'grid' | 'list';
  filters: {
    search: string;
    theme: string | null;
    key: string | null;
    status: string | null;
    favorites: boolean;
  };
  isLoading: boolean;
  setSongs: (songs: Song[]) => void;
  addSong: (song: Song) => void;
  updateSong: (id: string, updates: Partial<Song>) => void;
  removeSong: (id: string) => void;
  selectSong: (song: Song | null) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setFilters: (filters: Partial<SongsState['filters']>) => void;
  toggleFavorite: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useSongsStore = create<SongsState>()(
  persist(
    (set) => ({
      songs: [],
      selectedSong: null,
      viewMode: 'grid',
      filters: {
        search: '',
        theme: null,
        key: null,
        status: null,
        favorites: false,
      },
      isLoading: false,
      setSongs: (songs) => set({ songs }),
      addSong: (song) => set((state) => ({ songs: [...state.songs, song] })),
      updateSong: (id, updates) =>
        set((state) => ({
          songs: state.songs.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        })),
      removeSong: (id) => set((state) => ({ songs: state.songs.filter((s) => s.id !== id) })),
      selectSong: (song) => set({ selectedSong: song }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } })),
      toggleFavorite: (id) =>
        set((state) => ({
          songs: state.songs.map((s) =>
            s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
          ),
        })),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'trompette-songs',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ viewMode: state.viewMode }),
    }
  )
);

// ==========================================
// Worship Plans Store
// ==========================================

interface WorshipPlansState {
  plans: WorshipPlan[];
  selectedPlan: WorshipPlan | null;
  isLoading: boolean;
  setPlans: (plans: WorshipPlan[]) => void;
  addPlan: (plan: WorshipPlan) => void;
  updatePlan: (id: string, updates: Partial<WorshipPlan>) => void;
  removePlan: (id: string) => void;
  selectPlan: (plan: WorshipPlan | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useWorshipPlansStore = create<WorshipPlansState>((set) => ({
  plans: [],
  selectedPlan: null,
  isLoading: false,
  setPlans: (plans) => set({ plans }),
  addPlan: (plan) => set((state) => ({ plans: [...state.plans, plan] })),
  updatePlan: (id, updates) =>
    set((state) => ({
      plans: state.plans.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  removePlan: (id) => set((state) => ({ plans: state.plans.filter((p) => p.id !== id) })),
  selectPlan: (plan) => set({ selectedPlan: plan }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

// ==========================================
// Training Store
// ==========================================

interface TrainingState {
  courses: Course[];
  enrolledCourses: string[];
  currentCourse: Course | null;
  currentLesson: string | null;
  isLoading: boolean;
  setCourses: (courses: Course[]) => void;
  enrollCourse: (courseId: string) => void;
  unenrollCourse: (courseId: string) => void;
  setCurrentCourse: (course: Course | null) => void;
  setCurrentLesson: (lessonId: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useTrainingStore = create<TrainingState>()(
  persist(
    (set) => ({
      courses: [],
      enrolledCourses: [],
      currentCourse: null,
      currentLesson: null,
      isLoading: false,
      setCourses: (courses) => set({ courses }),
      enrollCourse: (courseId) =>
        set((state) => ({
          enrolledCourses: [...state.enrolledCourses, courseId],
        })),
      unenrollCourse: (courseId) =>
        set((state) => ({
          enrolledCourses: state.enrolledCourses.filter((id) => id !== courseId),
        })),
      setCurrentCourse: (course) => set({ currentCourse: course }),
      setCurrentLesson: (lessonId) => set({ currentLesson: lessonId }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'trompette-training',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ enrolledCourses: state.enrolledCourses }),
    }
  )
);

// ==========================================
// Media Store
// ==========================================

interface MediaState {
  files: MediaFile[];
  selectedFile: MediaFile | null;
  viewMode: 'grid' | 'table';
  filters: {
    search: string;
    type: string | null;
    folder: string | null;
  };
  isLoading: boolean;
  setFiles: (files: MediaFile[]) => void;
  addFile: (file: MediaFile) => void;
  updateFile: (id: string, updates: Partial<MediaFile>) => void;
  removeFile: (id: string) => void;
  selectFile: (file: MediaFile | null) => void;
  setViewMode: (mode: 'grid' | 'table') => void;
  setFilters: (filters: Partial<MediaState['filters']>) => void;
  setLoading: (loading: boolean) => void;
}

export const useMediaStore = create<MediaState>()(
  persist(
    (set) => ({
      files: [],
      selectedFile: null,
      viewMode: 'grid',
      filters: {
        search: '',
        type: null,
        folder: null,
      },
      isLoading: false,
      setFiles: (files) => set({ files }),
      addFile: (file) => set((state) => ({ files: [...state.files, file] })),
      updateFile: (id, updates) =>
        set((state) => ({
          files: state.files.map((f) => (f.id === id ? { ...f, ...updates } : f)),
        })),
      removeFile: (id) => set((state) => ({ files: state.files.filter((f) => f.id !== id) })),
      selectFile: (file) => set({ selectedFile: file }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } })),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'trompette-media',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ viewMode: state.viewMode }),
    }
  )
);

// ==========================================
// Announcements Store
// ==========================================

interface AnnouncementsState {
  announcements: Announcement[];
  isLoading: boolean;
  setAnnouncements: (announcements: Announcement[]) => void;
  addAnnouncement: (announcement: Announcement) => void;
  updateAnnouncement: (id: string, updates: Partial<Announcement>) => void;
  removeAnnouncement: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useAnnouncementsStore = create<AnnouncementsState>((set) => ({
  announcements: [],
  isLoading: false,
  setAnnouncements: (announcements) => set({ announcements }),
  addAnnouncement: (announcement) =>
    set((state) => ({ announcements: [announcement, ...state.announcements] })),
  updateAnnouncement: (id, updates) =>
    set((state) => ({
      announcements: state.announcements.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    })),
  removeAnnouncement: (id) =>
    set((state) => ({ announcements: state.announcements.filter((a) => a.id !== id) })),
  setLoading: (loading) => set({ isLoading: loading }),
}));

// ==========================================
// Prayer Requests Store
// ==========================================

interface PrayerRequestsState {
  requests: PrayerRequest[];
  isLoading: boolean;
  setRequests: (requests: PrayerRequest[]) => void;
  addRequest: (request: PrayerRequest) => void;
  updateRequest: (id: string, updates: Partial<PrayerRequest>) => void;
  removeRequest: (id: string) => void;
  incrementPrayCount: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const usePrayerRequestsStore = create<PrayerRequestsState>((set) => ({
  requests: [],
  isLoading: false,
  setRequests: (requests) => set({ requests }),
  addRequest: (request) =>
    set((state) => ({ requests: [request, ...state.requests] })),
  updateRequest: (id, updates) =>
    set((state) => ({
      requests: state.requests.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    })),
  removeRequest: (id) =>
    set((state) => ({ requests: state.requests.filter((r) => r.id !== id) })),
  incrementPrayCount: (id) =>
    set((state) => ({
      requests: state.requests.map((r) =>
        r.id === id ? { ...r, prayedForCount: r.prayedForCount + 1 } : r
      ),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
}));

// ==========================================
// Dashboard Store
// ==========================================

interface DashboardState {
  stats: DashboardStats | null;
  isLoading: boolean;
  setStats: (stats: DashboardStats) => void;
  setLoading: (loading: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  isLoading: false,
  setStats: (stats) => set({ stats }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

// ==========================================
// Notifications Store
// ==========================================

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  read: boolean;
  createdAt: string;
}

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) =>
    set((state) => {
      const newNotification: Notification = {
        ...notification,
        id: Math.random().toString(36).substring(7),
        read: false,
        createdAt: new Date().toISOString(),
      };
      return {
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    }),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  removeNotification: (id) =>
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id);
      return {
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: notification && !notification.read
          ? state.unreadCount - 1
          : state.unreadCount,
      };
    }),
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));

// ==========================================
// Language Store
// ==========================================

export type Language = 'fr' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'fr',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'trompette-language',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

