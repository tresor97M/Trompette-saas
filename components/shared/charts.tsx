'use client';

import * as React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const COLORS = {
  gold: '#D4AF37',
  blue: '#0F172A',
  emerald: '#10B981',
  purple: '#A855F7',
  red: '#EF4444',
  orange: '#F97316',
  pink: '#EC4899',
  cyan: '#06B6D4',
};

const chartColors = [
  COLORS.gold,
  COLORS.emerald,
  COLORS.blue,
  COLORS.purple,
  COLORS.orange,
];

// ==========================================
// Attendance Chart
// ==========================================

interface AttendanceData {
  date: string;
  present: number;
  absent: number;
  excused: number;
}

interface AttendanceChartProps {
  data: AttendanceData[];
  height?: number;
}

export function AttendanceChart({ data, height = 300 }: AttendanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="gradientPresent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.emerald} stopOpacity={0.3} />
            <stop offset="95%" stopColor={COLORS.emerald} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="date" className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="present"
          stroke={COLORS.emerald}
          fillOpacity={1}
          fill="url(#gradientPresent)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ==========================================
// Member Growth Chart
// ==========================================

interface MemberGrowthData {
  month: string;
  newMembers: number;
  totalMembers: number;
}

interface MemberGrowthChartProps {
  data: MemberGrowthData[];
  height?: number;
}

export function MemberGrowthChart({ data, height = 300 }: MemberGrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="month" className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="newMembers"
          stroke={COLORS.gold}
          strokeWidth={2}
          dot={{ fill: COLORS.gold, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="totalMembers"
          stroke={COLORS.blue}
          strokeWidth={2}
          dot={{ fill: COLORS.blue, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ==========================================
// Voice Distribution Chart
// ==========================================

interface VoiceDistributionData {
  name: string;
  value: number;
  color: string;
}

interface VoiceDistributionChartProps {
  data: VoiceDistributionData[];
  height?: number;
}

export function VoiceDistributionChart({
  data,
  height = 300,
}: VoiceDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

// ==========================================
// Performance Bar Chart
// ==========================================

interface PerformanceData {
  name: string;
  rehearsals: number;
  services: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
  height?: number;
}

export function PerformanceChart({ data, height = 300 }: PerformanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
        />
        <Legend />
        <Bar dataKey="rehearsals" fill={COLORS.emerald} radius={[4, 4, 0, 0]} />
        <Bar dataKey="services" fill={COLORS.gold} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ==========================================
// Usage Trend Chart
// ==========================================

interface UsageData {
  name: string;
  value: number;
}

interface UsageTrendChartProps {
  data: UsageData[];
  color?: string;
  height?: number;
}

export function UsageTrendChart({
  data,
  color = COLORS.gold,
  height = 100,
}: UsageTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="gradientUsage" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          fillOpacity={1}
          fill="url(#gradientUsage)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ==========================================
// Small Sparkline
// ==========================================

interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function Sparkline({ data, color = COLORS.gold, width = 60, height = 30 }: SparklineProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);

  const points = data
    .map((value, index) => {
      const x = index * step;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={2}
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ==========================================
// Donut Chart
// ==========================================

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  centerText?: string;
  centerSubtext?: string;
  height?: number;
}

export function DonutChart({ data, centerText, centerSubtext, height = 200 }: DonutChartProps) {
  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      {(centerText || centerSubtext) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerText && <span className="text-2xl font-bold">{centerText}</span>}
          {centerSubtext && <span className="text-xs text-muted-foreground">{centerSubtext}</span>}
        </div>
      )}
    </div>
  );
}

export { COLORS };
