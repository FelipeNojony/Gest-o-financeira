import { Pencil, Trash2 } from 'lucide-react';
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
import Button from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/utils/formatters';

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

export default function TransactionItem({ transaction, onEdit, onDelete }) {
  const category = transaction.categories || {};
  const IconComponent = iconMap[category.icon] || DollarSign;
  const isIncome = transaction.type === 'income';

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: category.color ? category.color + '20' : '#E5E7EB',
          }}
        >
          <IconComponent
            size={18}
            style={{ color: category.color || '#6B7280' }}
          />
        </div>

        <div>
          <p className="font-medium text-gray-900 text-sm">
            {transaction.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{category.name}</span>
            <span>&middot;</span>
            <span>{formatDate(transaction.date)}</span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <p
          className={`font-semibold text-sm ${
            isIncome ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isIncome ? '+ ' : '- '}
          {formatCurrency(transaction.amount)}
        </p>
        <div className="flex items-center gap-1 mt-1 justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(transaction)}
          >
            <Pencil size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-400 hover:text-red-600"
            onClick={() => onDelete(transaction)}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
