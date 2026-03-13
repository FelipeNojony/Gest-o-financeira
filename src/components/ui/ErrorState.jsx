import { AlertCircle } from 'lucide-react';
import Button from './Button';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-red-50 p-4 mb-4">
        <AlertCircle size={32} className="text-red-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        Algo deu errado
      </h3>
      {message && <p className="text-sm text-gray-500 mb-4">{message}</p>}
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
