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
  Pencil,
  Trash2,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

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

export default function CategoryItem({ category, onEdit, onDelete }) {
  const IconComponent = iconMap[category.icon];

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: category.color + '20' }}
        >
          {IconComponent && (
            <IconComponent size={20} style={{ color: category.color }} />
          )}
        </div>
        <span className="font-medium text-gray-900">{category.name}</span>
        <Badge variant={category.type === 'income' ? 'success' : 'danger'}>
          {category.type === 'income' ? 'Receita' : 'Despesa'}
        </Badge>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={() => onEdit(category)}>
          <Pencil size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => onDelete(category)}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
}
