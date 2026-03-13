import { Search, X } from 'lucide-react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import DatePicker from '@/components/ui/DatePicker';
import Button from '@/components/ui/Button';
import { useAppContext } from '@/contexts/AppContext';

const typeOptions = [
  { value: '', label: 'Todos os tipos' },
  { value: 'income', label: 'Receitas' },
  { value: 'expense', label: 'Despesas' },
];

const defaultFilters = {
  type: '',
  category_id: '',
  startDate: '',
  endDate: '',
  search: '',
};

export default function TransactionFilters({ filters, onFilterChange }) {
  const { categories } = useAppContext();

  const categoryOptions = [
    { value: '', label: 'Todas as categorias' },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ];

  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const hasActiveFilters =
    filters.type ||
    filters.category_id ||
    filters.startDate ||
    filters.endDate ||
    filters.search;

  const handleClear = () => {
    onFilterChange(defaultFilters);
  };

  return (
    <div className="flex flex-wrap gap-3 items-end">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <Input
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          placeholder="Buscar transacoes..."
          className="pl-10"
        />
      </div>

      <Select
        value={filters.type}
        onChange={(e) => handleChange('type', e.target.value)}
        options={typeOptions}
      />

      <Select
        value={filters.category_id}
        onChange={(e) => handleChange('category_id', e.target.value)}
        options={categoryOptions}
      />

      <DatePicker
        label="De"
        value={filters.startDate}
        onChange={(e) => handleChange('startDate', e.target.value)}
      />

      <DatePicker
        label="Ate"
        value={filters.endDate}
        onChange={(e) => handleChange('endDate', e.target.value)}
      />

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={handleClear}>
          <X size={16} />
          Limpar filtros
        </Button>
      )}
    </div>
  );
}
