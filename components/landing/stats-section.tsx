'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { AnimatedCounter } from '@/components/shared';
import { useTranslation } from '@/hooks/useTranslation';

export function StatsSection() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: 10000,
      suffix: '+',
      label: t('stats.members.title'),
      description: t('stats.members.desc'),
    },
    {
      value: 500,
      suffix: '+',
      label: t('stats.churches.title'),
      description: t('stats.churches.desc'),
    },
    {
      value: 5000,
      suffix: '+',
      label: t('stats.songs.title'),
      description: t('stats.songs.desc'),
    },
    {
      value: 15,
      suffix: '+',
      label: t('stats.countries.title'),
      description: t('stats.countries.desc'),
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-brand-blue-500 via-brand-blue-600 to-brand-blue-700 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-hero-pattern" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                'text-center transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                {isVisible && (
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2000} />
                )}
              </div>
              <p className="text-lg font-semibold text-brand-gold-400">{stat.label}</p>
              <p className="text-sm text-brand-blue-200 mt-1">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
