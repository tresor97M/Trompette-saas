'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

// ==========================================
// Page Header
// ==========================================

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between', className)}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

// ==========================================
// Empty State
// ==========================================

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      {Icon && (
        <div className="rounded-full bg-muted p-6 mb-6">
          <Icon className="h-12 w-12 text-muted-foreground" />
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-2 max-w-md">{description}</p>
      )}
      {(action || secondaryAction) && (
        <div className="flex gap-3 mt-6">
          {action && (
            <Button onClick={action.onClick}>{action.label}</Button>
          )}
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// Loading State
// ==========================================

interface LoadingStateProps {
  type?: 'spinner' | 'skeleton';
  message?: string;
  className?: string;
}

export function LoadingState({ type = 'spinner', message, className }: LoadingStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12', className)}>
      {type === 'spinner' && (
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 h-full w-full animate-spin rounded-full border-4 border-muted border-t-brand-gold-500" />
        </div>
      )}
      {type === 'skeleton' && (
        <div className="w-full max-w-2xl space-y-4">
          <div className="h-8 w-1/3 rounded-lg bg-muted animate-pulse" />
          <div className="h-4 w-2/3 rounded-lg bg-muted animate-pulse" />
          <div className="h-4 w-1/2 rounded-lg bg-muted animate-pulse" />
        </div>
      )}
      {message && (
        <p className="text-sm text-muted-foreground mt-4">{message}</p>
      )}
    </div>
  );
}

// ==========================================
// Error State
// ==========================================

interface ErrorStateProps {
  title?: string;
  message?: string;
  retry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred while loading this content.',
  retry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="rounded-full bg-destructive/10 p-4 mb-4">
        <svg
          className="h-8 w-8 text-destructive"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-1.964-1.333-2.732 0L4.082 16.5c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">{message}</p>
      {retry && (
        <Button variant="outline" onClick={retry} className="mt-4">
          Try again
        </Button>
      )}
    </div>
  );
}

// ==========================================
// Skeleton Cards
// ==========================================

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn('rounded-xl border border-border/50 p-6 space-y-4', className)}>
      <div className="h-12 w-12 rounded-lg bg-muted animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-24 rounded bg-muted animate-pulse" />
        <div className="h-8 w-32 rounded bg-muted animate-pulse" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
            <div className="h-3 w-1/4 rounded bg-muted animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="rounded-lg border">
      <div className="grid gap-4 p-4 border-b bg-muted/50" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 w-20 rounded bg-muted animate-pulse" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-4 p-4 border-b last:border-0"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="h-4 w-full rounded bg-muted animate-pulse" />
          ))}
        </div>
      ))}
    </div>
  );
}

// ==========================================
// Coming Soon Badge
// ==========================================

interface ComingSoonBadgeProps {
  className?: string;
}

export function ComingSoonBadge({ className }: ComingSoonBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        'bg-brand-gold-500/10 text-brand-gold-600 dark:text-brand-gold-400',
        className
      )}
    >
      Coming Soon
    </span>
  );
}

// ==========================================
// Beta Badge
// ==========================================

interface BetaBadgeProps {
  className?: string;
}

export function BetaBadge({ className }: BetaBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        'bg-brand-purple-500/10 text-brand-purple-600 dark:text-brand-purple-400',
        className
      )}
    >
      Beta
    </span>
  );
}

// ==========================================
// Status Badge
// ==========================================

type BadgeVariant = 'default' | 'success' | 'warning' | 'destructive' | 'info' | 'gold';

interface StatusBadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ variant = 'default', children, className }: StatusBadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-muted text-muted-foreground',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    destructive: 'bg-destructive/10 text-destructive',
    info: 'bg-brand-blue-500/10 text-brand-blue-500',
    gold: 'bg-brand-gold-500/10 text-brand-gold-600 dark:text-brand-gold-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// ==========================================
// Truncated Text
// ==========================================

interface TruncatedTextProps {
  children: string;
  maxLength?: number;
  className?: string;
}

export function TruncatedText({ children, maxLength = 100, className }: TruncatedTextProps) {
  if (children.length <= maxLength) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={cn('cursor-default', className)} title={children}>
      {children.slice(0, maxLength)}...
    </span>
  );
}

// ==========================================
// Animated Counter
// ==========================================

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 2000,
  prefix = '',
  suffix = '',
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = React.useState(0);
  const startRef = React.useRef(0);
  const startTimeRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    startRef.current = count;
    startTimeRef.current = null;

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) startTimeRef.current = currentTime;
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(startRef.current + (value - startRef.current) * easeOutQuart);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
