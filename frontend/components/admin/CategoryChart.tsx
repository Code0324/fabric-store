'use client';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

interface CategoryData {
  name: string;
  value: number;
  color?: string;
}

interface CategoryChartProps {
  data: CategoryData[];
  loading?: boolean;
  title?: string;
  subtitle?: string;
}

const PALETTE = [
  '#B8963E', '#3B82F6', '#10B981', '#F59E0B',
  '#8B5CF6', '#EF4444', '#EC4899', '#14B8A6',
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-surface border border-border rounded-lg shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-cream">{d.name}</p>
      <p className="text-muted">{d.value} products</p>
      <p className="text-muted">{d.payload.percent}% of total</p>
    </div>
  );
};

const CustomLegend = ({ payload }: any) => (
  <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center mt-3">
    {payload?.map((entry: any) => (
      <div key={entry.value} className="flex items-center gap-1.5 text-xs text-muted">
        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: entry.color }} />
        {entry.value}
      </div>
    ))}
  </div>
);

export default function CategoryChart({
  data,
  loading = false,
  title = 'Products by Category',
  subtitle = 'Category distribution',
}: CategoryChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const enriched = data.map((d, i) => ({
    ...d,
    color: d.color ?? PALETTE[i % PALETTE.length],
    percent: total > 0 ? Math.round((d.value / total) * 100) : 0,
  }));

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="font-semibold text-cream text-base">{title}</h3>
        <p className="text-muted text-sm mt-0.5">{subtitle}</p>
      </div>

      {loading ? (
        <div className="h-52 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      ) : enriched.length === 0 ? (
        <div className="h-52 flex items-center justify-center text-muted text-sm">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={enriched}
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {enriched.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
