import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '@/components/ui/Card';

const colorStyles = {
  green: 'bg-green-50 text-green-600',
  red: 'bg-red-50 text-red-600',
  purple: 'bg-purple-50 text-purple-600',
};

export default function SummaryCard({ title, value, icon: Icon, trend, color = 'purple' }) {
  const isTrendPositive = trend && trend.startsWith('+');

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className={`rounded-lg p-2 ${colorStyles[color]}`}>
          <Icon size={20} />
        </div>
      </div>

      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>

      {trend && (
        <div
          className={`flex items-center gap-1 mt-1 text-sm ${
            isTrendPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isTrendPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{trend}</span>
        </div>
      )}
    </Card>
  );
}
