import { CATEGORY_COLORS } from '../../utils/constants';

export default function ColorPicker({
  value,
  onChange,
  colors = CATEGORY_COLORS,
}) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-transform ${
            value === color
              ? 'border-gray-800 scale-110'
              : 'border-transparent hover:scale-105'
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  );
}
