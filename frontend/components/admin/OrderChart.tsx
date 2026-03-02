'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

interface StatusData {
  status: string;
  count: number;
  color: string;
}

interface OrderChartProps {
  data: StatusData[];
  loading?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  pending:   '#F59E0B',
  confirmed: '#3B82F6',
  shipped:   '#8B5CF6',
  delivered: '#10B981',
  cancelled: '#EF4444',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-border rounded-lg shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-cream capitalize">{label}</p>
      <p className="text-muted">{payload[0]?.value} orders</p>
    </div>
  );
};

export default function OrderChart({ data, loading = false }: OrderChartProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="font-semibold text-cream text-base">Orders by Status</h3>
        <p className="text-muted text-sm mt-0.5">Current order distribution</p>
      </div>

      {loading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      ) : data.length === 0 ? (
        <div className="h-48 flex items-center justify-center text-muted text-sm">
          No data available
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0D8CC" strokeOpacity={0.6} vertical={false} />
              <XAxis
                dataKey="status"
                tick={{ fontSize: 11, fill: '#6B6560' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#6B6560' }}
                axisLine={false}
                tickLine={false}
                width={30}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[entry.status.toLowerCase()] ?? '#B8963E'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border">
            {data.map((d) => (
              <div key={d.status} className="flex items-center gap-1.5 text-xs text-muted">
                <span
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ background: STATUS_COLORS[d.status.toLowerCase()] ?? '#B8963E' }}
                />
                <span className="capitalize">{d.status}</span>
                <span className="font-semibold text-cream">({d.count})</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
