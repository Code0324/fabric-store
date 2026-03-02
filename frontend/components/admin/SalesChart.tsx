'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface DataPoint {
  label: string;
  revenue: number;
  orders: number;
}

interface SalesChartProps {
  data: DataPoint[];
  loading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-border rounded-lg shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-cream mb-1">{label}</p>
      <p className="text-gold">
        Revenue: PKR {payload[0]?.value?.toLocaleString()}
      </p>
      <p className="text-muted">
        Orders: {payload[1]?.value}
      </p>
    </div>
  );
};

export default function SalesChart({ data, loading = false }: SalesChartProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-cream text-base">Revenue Overview</h3>
          <p className="text-muted text-sm mt-0.5">Daily revenue & order trends</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-gold inline-block rounded" />
            Revenue
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-blue-400 inline-block rounded" />
            Orders
          </span>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      ) : data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-muted text-sm">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B8963E" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#B8963E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0D8CC" strokeOpacity={0.6} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: '#6B6560' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="revenue"
              tick={{ fontSize: 11, fill: '#6B6560' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              width={40}
            />
            <YAxis
              yAxisId="orders"
              orientation="right"
              tick={{ fontSize: 11, fill: '#6B6560' }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              yAxisId="revenue"
              type="monotone"
              dataKey="revenue"
              stroke="#B8963E"
              strokeWidth={2}
              fill="url(#goldGradient)"
              dot={false}
              activeDot={{ r: 4, fill: '#B8963E' }}
            />
            <Area
              yAxisId="orders"
              type="monotone"
              dataKey="orders"
              stroke="#60A5FA"
              strokeWidth={2}
              fill="url(#blueGradient)"
              dot={false}
              activeDot={{ r: 4, fill: '#60A5FA' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
