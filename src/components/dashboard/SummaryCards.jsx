import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import SummaryCard from './SummaryCard';

export default function SummaryCards({ summary, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-xl h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SummaryCard
        title="Receitas"
        value={formatCurrency(summary?.income ?? 0)}
        icon={ArrowUpRight}
        color="green"
      />
      <SummaryCard
        title="Despesas"
        value={formatCurrency(summary?.expense ?? 0)}
        icon={ArrowDownRight}
        color="red"
      />
      <SummaryCard
        title="Saldo"
        value={formatCurrency(summary?.balance ?? 0)}
        icon={DollarSign}
        color="purple"
      />
    </div>
  );
}
