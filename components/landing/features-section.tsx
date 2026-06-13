'use client';

import * as React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Users,
  Music,
  CalendarCheck,
  Calendar,
  BookOpen,
  GraduationCap,
  FolderOpen,
  MessageCircle,
} from 'lucide-react';

export function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Users,
      title: t('features.management.title'),
      description: t('features.management.desc'),
      color: 'bg-emerald-500/10 text-emerald-500',
    },
    {
      icon: Music,
      title: t('features.songs.title'),
      description: t('features.songs.desc'),
      color: 'bg-brand-gold-500/10 text-brand-gold-500',
    },
    {
      icon: CalendarCheck,
      title: t('features.attendance.title'),
      description: t('features.attendance.desc'),
      color: 'bg-purple-500/10 text-purple-500',
    },
    {
      icon: Calendar,
      title: t('features.planning.title'),
      description: t('features.planning.desc'),
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      icon: BookOpen,
      title: t('features.songwriting.title'),
      description: t('features.songwriting.desc'),
      color: 'bg-orange-500/10 text-orange-500',
    },
    {
      icon: GraduationCap,
      title: t('features.training.title'),
      description: t('features.training.desc'),
      color: 'bg-pink-500/10 text-pink-500',
    },
    {
      icon: FolderOpen,
      title: t('features.media.title'),
      description: t('features.media.desc'),
      color: 'bg-cyan-500/10 text-cyan-500',
    },
    {
      icon: MessageCircle,
      title: t('features.communication.title'),
      description: t('features.communication.desc'),
      color: 'bg-rose-500/10 text-rose-500',
    },
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-brand-gold-500 tracking-wide uppercase">
            {t('features.badge')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">
            {t('features.title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('features.description')}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl border border-border/50 p-6 transition-all duration-300 hover:border-brand-gold-500/30 hover:shadow-card-hover hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
