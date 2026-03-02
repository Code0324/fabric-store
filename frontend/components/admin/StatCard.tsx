'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;       // percentage, positive = up, negative = down
  trendLabel?: string;  // e.g. "vs last month"
  iconColor?: string;   // tailwind bg class e.g. "bg-blue-100"
  iconTextColor?: string; // tailwind text class e.g. "text-blue-600"
  loading?: boolean;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel = 'vs last period',
  iconColor = 'bg-gold/10',
  iconTextColor = 'text-gold',
  loading = false,
}: StatCardProps) {
  const hasTrend = trend !== undefined && trend !== null;
  const trendUp = hasTrend && trend > 0;
  const trendDown = hasTrend && trend < 0;
  const trendFlat = hasTrend && trend === 0;

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${iconColor}`}>
          <Icon className={`w-5 h-5 ${iconTextColor}`} />
        </div>
        {hasTrend && (
          <div
            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              trendUp
                ? 'bg-green-50 text-green-600'
                : trendDown
                ? 'bg-red-50 text-red-600'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {trendUp && <TrendingUp className="w-3 h-3" />}
            {trendDown && <TrendingDown className="w-3 h-3" />}
            {trendFlat && <Minus className="w-3 h-3" />}
            {trendUp ? '+' : ''}{trend}%
          </div>
        )}
      </div>

      {loading ? (
        <div className="space-y-2">
          <div className="h-7 bg-border/50 rounded animate-pulse w-24" />
          <div className="h-4 bg-border/30 rounded animate-pulse w-16" />
        </div>
      ) : (
        <>
          <p className="text-2xl font-bold text-cream font-sans">{value}</p>
          <p className="text-sm text-muted mt-1">{label}</p>
          {hasTrend && trendLabel && (
            <p className="text-xs text-muted/70 mt-0.5">{trendLabel}</p>
          )}
        </>
      )}
    </div>
  );
}
