import { PERIOD_OPTIONS } from '@/utils/constants';

export default function PeriodFilter({ period, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {PERIOD_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            period === option.value
              ? 'bg-purple-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
