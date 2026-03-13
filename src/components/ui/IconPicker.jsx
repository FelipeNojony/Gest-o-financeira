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
import { CATEGORY_ICONS } from '../../utils/constants';

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

export default function IconPicker({
  value,
  onChange,
  icons = CATEGORY_ICONS,
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {icons.map((iconName) => {
        const IconComponent = iconMap[iconName];
        if (!IconComponent) return null;

        return (
          <button
            key={iconName}
            type="button"
            className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
              value === iconName
                ? 'bg-purple-100 text-purple-600 border-2 border-purple-600'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => onChange(iconName)}
          >
            <IconComponent size={20} />
          </button>
        );
      })}
    </div>
  );
}
