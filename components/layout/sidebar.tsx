'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Users,
  Music,
  CalendarCheck,
  Calendar,
  GraduationCap,
  FolderOpen,
  MessageCircle,
  Settings,
  Home,
  ChevronLeft,
  ChevronRight,
  Mic2,
  Cross,
} from 'lucide-react';
import { useSidebarStore } from '@/stores';

const mainNavItems = [
  {
    label: 'Dashboard',
    translationKey: 'sidebar.dashboard',
    href: '/app/dashboard',
    icon: Home,
  },
  {
    label: 'Members',
    translationKey: 'sidebar.members',
    href: '/app/members',
    icon: Users,
  },
  {
    label: 'Song Library',
    translationKey: 'sidebar.songs',
    href: '/app/songs',
    icon: Music,
  },
  {
    label: 'Attendance',
    translationKey: 'sidebar.attendance',
    href: '/app/attendance',
    icon: CalendarCheck,
  },
  {
    label: 'Worship Planning',
    translationKey: 'sidebar.worship',
    href: '/app/worship',
    icon: Calendar,
  },
  {
    label: 'Training Center',
    translationKey: 'sidebar.training',
    href: '/app/training',
    icon: GraduationCap,
  },
];

const secondaryNavItems = [
  {
    label: 'Media Center',
    translationKey: 'sidebar.media',
    href: '/app/media',
    icon: FolderOpen,
  },
  {
    label: 'Communication',
    translationKey: 'sidebar.communication',
    href: '/app/communication',
    icon: MessageCircle,
    badge: 3,
  },
];

const settingsItem = {
  label: 'Settings',
  translationKey: 'sidebar.settings',
  href: '/app/settings',
  icon: Settings,
};

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { isOpen, isCollapsed, toggle, setCollapsed, close } = useSidebarStore();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 flex h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 lg:relative lg:z-0',
          isCollapsed ? 'w-16' : 'w-64',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
            {!isCollapsed && (
              <Link href="/app/dashboard" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-gold-400 to-brand-gold-600">
                  <Mic2 className="h-5 w-5 text-brand-blue-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold leading-none">Trompette</span>
                  <span className="text-xs text-muted-foreground leading-none mt-0.5">SaaS</span>
                </div>
              </Link>
            )}
            {isCollapsed && (
              <Link href="/app/dashboard" className="flex items-center justify-center w-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-gold-400 to-brand-gold-600">
                  <Mic2 className="h-5 w-5 text-brand-blue-500" />
                </div>
              </Link>
            )}
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-6">
              {/* Main Navigation */}
              <div>
                {!isCollapsed && (
                  <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t('sidebar.main')}
                  </span>
                )}
                <div className="mt-2 space-y-1">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'sidebar-item',
                        isActive(item.href) && 'sidebar-item-active bg-brand-gold-500/10 text-brand-gold-600 dark:text-brand-gold-400',
                        isCollapsed && 'justify-center px-2'
                      )}
                      title={isCollapsed ? t(item.translationKey) : undefined}
                    >
                      <item.icon className={cn('h-5 w-5', isActive(item.href) && 'text-brand-gold-500')} />
                      {!isCollapsed && <span>{t(item.translationKey)}</span>}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Secondary Navigation */}
              <div>
                {!isCollapsed && (
                  <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t('sidebar.tools')}
                  </span>
                )}
                <div className="mt-2 space-y-1">
                  {secondaryNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'sidebar-item',
                        isActive(item.href) && 'sidebar-item-active bg-brand-gold-500/10 text-brand-gold-600 dark:text-brand-gold-400',
                        isCollapsed && 'justify-center px-2'
                      )}
                      title={isCollapsed ? t(item.translationKey) : undefined}
                    >
                      <item.icon className={cn('h-5 w-5', isActive(item.href) && 'text-brand-gold-500')} />
                      {!isCollapsed && (
                        <>
                          <span>{t(item.translationKey)}</span>
                          {item.badge && (
                            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </ScrollArea>

          {/* Settings & Collapse */}
          <div className="border-t border-sidebar-border p-3 space-y-2">
            <Link
              href={settingsItem.href}
              className={cn(
                'sidebar-item',
                isActive(settingsItem.href) && 'sidebar-item-active bg-brand-gold-500/10 text-brand-gold-600 dark:text-brand-gold-400',
                isCollapsed && 'justify-center px-2'
              )}
              title={isCollapsed ? t(settingsItem.translationKey) : undefined}
            >
              <settingsItem.icon className={cn('h-5 w-5', isActive(settingsItem.href) && 'text-brand-gold-500')} />
              {!isCollapsed && <span>{t(settingsItem.translationKey)}</span>}
            </Link>

            {/* Collapse Toggle - Desktop Only */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'w-full justify-start hidden lg:flex',
                isCollapsed && 'justify-center'
              )}
              onClick={() => setCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <>
                  <ChevronLeft className="h-5 w-5" />
                  <span className="ml-3">{t('sidebar.collapse')}</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-50 lg:hidden"
        onClick={toggle}
      >
        {isOpen ? (
          <Cross className="h-6 w-6" />
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </Button>
    </>
  );
}
