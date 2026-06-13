'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useSidebarStore } from '@/stores';

const breadcrumbMap: Record<string, { label: string; href?: string }> = {
  '/app': { label: 'Home' },
  '/app/dashboard': { label: 'Dashboard' },
  '/app/members': { label: 'Members' },
  '/app/members/new': { label: 'Add Member' },
  '/app/songs': { label: 'Song Library' },
  '/app/songs/new': { label: 'Add Song' },
  '/app/attendance': { label: 'Attendance' },
  '/app/worship': { label: 'Worship Planning' },
  '/app/worship/new': { label: 'New Plan' },
  '/app/training': { label: 'Training Center' },
  '/app/media': { label: 'Media Center' },
  '/app/communication': { label: 'Communication' },
  '/app/settings': { label: 'Settings' },
  '/app/settings/profile': { label: 'Profile' },
  '/app/settings/church': { label: 'Church Settings' },
  '/app/settings/notifications': { label: 'Notifications' },
  '/app/settings/security': { label: 'Security' },
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebarStore();

  // Generate breadcrumbs
  const breadcrumbs = React.useMemo(() => {
    const parts = pathname.split('/').filter(Boolean);
    const crumbs = [];
    let currentPath = '';

    for (let i = 0; i < parts.length; i++) {
      currentPath += '/' + parts[i];
      const crumbData = breadcrumbMap[currentPath];
      if (crumbData) {
        crumbs.push({
          label: crumbData.label,
          href: i < parts.length - 1 ? currentPath : undefined,
        });
      }
    }

    return crumbs;
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden lg:pl-0">
        {/* Header */}
        <Header
          breadcrumbs={breadcrumbs}
          user={{
            name: 'John Doe',
            email: 'john@church.com',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
          }}
          onMobileMenuToggle={toggle}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
