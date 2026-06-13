'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Play,
  Mic2,
  Users,
  Music,
} from 'lucide-react';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-500 via-brand-blue-600 to-brand-blue-700">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-hero-pattern" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-500/80 via-transparent to-transparent" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-gold-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-brand-emerald-500/10 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold-500/30 bg-brand-gold-500/10 px-4 py-2 mb-8 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-brand-gold-500 animate-pulse" />
          <span className="text-sm font-medium text-brand-gold-300">
            {t('hero.badge')}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          {t('hero.title')}
          <br />
          <span className="text-gradient-gold">{t('hero.titleAccent')}</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-xl text-brand-blue-200 max-w-2xl mx-auto leading-relaxed">
          {t('hero.description')}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900 font-semibold px-8 py-6 text-lg shadow-glow-gold rounded-xl"
            asChild
          >
            <Link href="/app/dashboard">{t('hero.getStarted')}</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-6 text-lg backdrop-blur-sm rounded-xl"
            asChild
          >
            <Link href="#demo">
              <Play className="mr-2 h-5 w-5" />
              {t('hero.watchDemo')}
            </Link>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-brand-blue-200">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span className="text-sm font-medium">{t('hero.statMembers')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mic2 className="h-5 w-5" />
            <span className="text-sm font-medium">{t('hero.statChoirs')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            <span className="text-sm font-medium">{t('hero.statSongs')}</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-brand-gold-500/50 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-brand-gold-500 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const { t } = useTranslation();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-brand-blue-500/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-gold-400 to-brand-gold-600">
              <Mic2 className="h-5 w-5 text-brand-blue-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-none text-white">Trompette</span>
              <span className="text-xs text-brand-gold-400 leading-none mt-0.5">SaaS</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              {t('navbar.features')}
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              {t('navbar.pricing')}
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              {t('navbar.testimonials')}
            </Link>
            <Link href="#faq" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              {t('navbar.faq')}
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors hidden sm:block"
            >
              {t('navbar.signIn')}
            </Link>
            <Button
              className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900 font-medium"
              asChild
            >
              <Link href="/auth/register">{t('navbar.getStarted')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
