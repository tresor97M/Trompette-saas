'use client';

import * as React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  trend?: {
    value: number;
    label?: string;
    direction: 'up' | 'down' | 'neutral';
  };
  variant?: 'default' | 'gold' | 'blue' | 'green' | 'purple';
  className?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  trend,
  variant = 'default',
  className,
  onClick,
}: StatCardProps) {
  const variantClasses = {
    default: 'bg-card border-border/50',
    gold: 'bg-gradient-to-br from-brand-gold-500/10 to-brand-gold-500/5 border-brand-gold-500/20',
    blue: 'bg-gradient-to-br from-brand-blue-500/10 to-brand-blue-500/5 border-brand-blue-500/20',
    green: 'bg-gradient-to-br from-brand-emerald-500/10 to-brand-emerald-500/5 border-brand-emerald-500/20',
    purple: 'bg-gradient-to-br from-brand-purple-500/10 to-brand-purple-500/5 border-brand-purple-500/20',
  };

  const iconBgClasses = {
    default: 'bg-muted',
    gold: 'bg-brand-gold-500/20',
    blue: 'bg-brand-blue-500/20',
    green: 'bg-brand-emerald-500/20',
    purple: 'bg-brand-purple-500/20',
  };

  return (
    <div
      className={cn(
        'rounded-xl border p-6 transition-all duration-300',
        variantClasses[variant],
        onClick && 'cursor-pointer hover:shadow-card-hover hover:border-brand-gold-500/30',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            {subtitle && (
              <span className="text-sm text-muted-foreground">{subtitle}</span>
            )}
          </div>
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              {trend.direction === 'up' && (
                <TrendingUp className="h-4 w-4 text-success" />
              )}
              {trend.direction === 'down' && (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              {trend.direction === 'neutral' && (
                <Minus className="h-4 w-4 text-muted-foreground" />
              )}
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.direction === 'up' && 'text-success',
                  trend.direction === 'down' && 'text-destructive',
                  trend.direction === 'neutral' && 'text-muted-foreground'
                )}
              >
                {trend.direction === 'up' && '+'}
                {trend.value}%
              </span>
              {trend.label && (
                <span className="text-sm text-muted-foreground">{trend.label}</span>
              )}
            </div>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-lg',
              iconBgClasses[variant]
            )}
          >
            <Icon
              className={cn(
                'h-6 w-6',
                iconColor || (variant === 'gold' ? 'text-brand-gold-500' : 'text-foreground')
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
