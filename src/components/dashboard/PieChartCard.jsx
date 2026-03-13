import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import { formatCurrency } from '@/utils/formatters';

export default function PieChartCard({ data, title, loading }) {
  const hasData = data && data.length > 0 && data.some((entry) => entry.value > 0);

  return (
    <Card>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>

      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="bg-gray-200 rounded-full h-[200px] w-[200px] mx-auto" />
          <div className="bg-gray-200 rounded h-4 w-3/4 mx-auto" />
        </div>
      ) : !hasData ? (
        <EmptyState icon={PieChartIcon} title="Sem dados para o período" />
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend
              verticalAlign="bottom"
              formatter={(value) => (
                <span className="text-sm text-gray-600">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
