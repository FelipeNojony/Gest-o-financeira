import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { BarChart3 } from 'lucide-react';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import { formatCurrency } from '@/utils/formatters';

export default function BarChartCard({ data, loading }) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Receitas vs Despesas</Card.Title>
      </Card.Header>

      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="bg-gray-200 rounded h-[300px] w-full" />
        </div>
      ) : !data || data.length === 0 ? (
        <EmptyState icon={BarChart3} title="Sem dados para o período" />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={(v) => formatCurrency(v).replace('R$\u00a0', '')}
            />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              labelStyle={{ fontWeight: 600 }}
            />
            <Bar
              dataKey="income"
              fill="#10B981"
              name="Receitas"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="expense"
              fill="#EF4444"
              name="Despesas"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
