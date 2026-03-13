import { Receipt } from 'lucide-react';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import TransactionItem from './TransactionItem';

export default function TransactionList({
  transactions,
  loading,
  error,
  onEdit,
  onDelete,
  onRetry,
}) {
  if (loading) {
    return <LoadingSkeleton lines={8} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState
        icon={Receipt}
        title="Nenhuma transacao"
        description="Adicione sua primeira transacao para comecar a controlar suas financas"
      />
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
