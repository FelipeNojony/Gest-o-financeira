import { forwardRef } from 'react';

const DatePicker = forwardRef(({ label, error, className = '', ...rest }, ref) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type="date"
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...rest}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
