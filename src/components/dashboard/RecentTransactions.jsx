import { useNavigate } from 'react-router-dom';
import {
  Wallet,
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Heart,
  Briefcase,
  GraduationCap,
  Plane,
  Gift,
  Music,
  Dumbbell,
  Coffee,
  Smartphone,
  Zap,
  DollarSign,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { formatCurrency, formatDateRelative } from '@/utils/formatters';

const iconMap = {
  Wallet,
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Heart,
  Briefcase,
  GraduationCap,
  Plane,
  Gift,
  Music,
  Dumbbell,
  Coffee,
  Smartphone,
  Zap,
  DollarSign,
};

export default function RecentTransactions({ transactions, loading }) {
  const navigate = useNavigate();

  return (
    <Card>
      <Card.Header>
        <Card.Title>Transações Recentes</Card.Title>
        <button
          onClick={() => navigate('/transacoes')}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          Ver todas
        </button>
      </Card.Header>

      {loading ? (
        <LoadingSkeleton lines={5} />
      ) : !transactions || transactions.length === 0 ? (
        <p className="text-gray-500 text-center py-8 text-sm">
          Nenhuma transação recente
        </p>
      ) : (
        <div className="divide-y">
          {transactions.map((transaction) => {
            const IconComponent = iconMap[transaction.category?.icon] || DollarSign;
            const categoryColor = transaction.category?.color || '#6B7280';
            const isIncome = transaction.type === 'income';

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${categoryColor}20` }}
                  >
                    <IconComponent size={16} style={{ color: categoryColor }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDateRelative(transaction.date)}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-sm font-medium ${
                    isIncome ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isIncome ? '+' : '-'}
                  {formatCurrency(Math.abs(transaction.amount))}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
