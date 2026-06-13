'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// ==========================================
// Button Loading State
// ==========================================

interface ButtonLoadingProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function ButtonLoading({
  loading,
  loadingText,
  children,
  disabled,
  className,
  ...props
}: ButtonLoadingProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'bg-primary text-primary-foreground hover:bg-primary/90',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {loading && loadingText ? loadingText : children}
    </button>
  );
}

// ==========================================
// Form Field
// ==========================================

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  error,
  required,
  description,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium leading-none">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {children}
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}

// ==========================================
// Search Input
// ==========================================

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  containerClassName?: string;
}

export function SearchInput({
  onSearch,
  containerClassName,
  className,
  ...props
}: SearchInputProps) {
  const [value, setValue] = React.useState(props.value as string || '');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={cn('relative', containerClassName)}>
      <svg
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="search"
        className={cn(
          'flex h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm',
          'placeholder:text-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange?.(e);
        }}
        onKeyDown={handleKeyDown}
        {...props}
      />
      {value && (
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={() => {
            setValue('');
            props.onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
          }}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ==========================================
// Avatar Group
// ==========================================

interface Avatar {
  src?: string;
  name: string;
}

interface AvatarGroupProps {
  avatars: Avatar[];
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarGroup({ avatars, max = 4, size = 'md', className }: AvatarGroupProps) {
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base',
  };

  const displayed = avatars.slice(0, max);
  const remaining = avatars.length - max;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn('flex -space-x-2', className)}>
      {displayed.map((avatar, index) => (
        <div
          key={index}
          className={cn(
            'relative rounded-full border-2 border-background bg-muted flex items-center justify-center font-medium',
            sizeClasses[size]
          )}
          style={{ zIndex: displayed.length - index }}
        >
          {avatar.src ? (
            <img
              src={avatar.src}
              alt={avatar.name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <span>{getInitials(avatar.name)}</span>
          )}
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'relative rounded-full border-2 border-background bg-muted flex items-center justify-center font-medium text-muted-foreground',
            sizeClasses[size]
          )}
        >
          <span>+{remaining}</span>
        </div>
      )}
    </div>
  );
}

// ==========================================
// Progress Ring
// ==========================================

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  showValue?: boolean;
  className?: string;
}

export function ProgressRing({
  progress,
  size = 60,
  strokeWidth = 4,
  color = 'hsl(var(--brand-gold))',
  trackColor = 'hsl(var(--muted))',
  showValue = true,
  className,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {showValue && (
        <span className="absolute text-sm font-medium">{Math.round(progress)}%</span>
      )}
    </div>
  );
}

// ==========================================
// Keyboard Shortcut Badge
// ==========================================

interface KeyboardShortcutProps {
  keys: string[];
  className?: string;
}

export function KeyboardShortcut({ keys, className }: KeyboardShortcutProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {keys.map((key, index) => (
        <React.Fragment key={key}>
          <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border bg-muted px-1.5 text-xs font-medium text-muted-foreground">
            {key}
          </kbd>
          {index < keys.length - 1 && (
            <span className="text-muted-foreground">+</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ==========================================
// Tooltip Label
// ==========================================

interface TooltipLabelProps {
  label: string;
  tooltip: string;
  children: React.ReactNode;
}

export function TooltipLabel({ label, tooltip, children }: TooltipLabelProps) {
  return (
    <div className="group relative inline-flex cursor-help items-center gap-1">
      {children}
      <span className="text-sm">{label}</span>
      <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 group-hover:block">
        <div className="relative rounded-md bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md">
          {tooltip}
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-popover" />
        </div>
      </div>
    </div>
  );
}

export { cn };
