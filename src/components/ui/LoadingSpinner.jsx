import { Loader2 } from 'lucide-react';

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export default function LoadingSpinner({ size = 'md' }) {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className={`animate-spin text-purple-600 ${sizeStyles[size]}`} />
    </div>
  );
}
