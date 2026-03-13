import { Tags } from 'lucide-react';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import EmptyState from '@/components/ui/EmptyState';
import CategoryItem from '@/components/settings/CategoryItem';

export default function CategoryList({ categories, loading, onEdit, onDelete }) {
  if (loading) {
    return <LoadingSkeleton lines={5} />;
  }

  if (!categories || categories.length === 0) {
    return (
      <EmptyState
        icon={Tags}
        title="Nenhuma categoria"
        description="Crie sua primeira categoria para organizar suas finanças"
      />
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
