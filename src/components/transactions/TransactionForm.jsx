import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import DatePicker from '@/components/ui/DatePicker';
import Button from '@/components/ui/Button';
import { useAppContext } from '@/contexts/AppContext';
import { validateTransaction } from '@/utils/validators';

const typeOptions = [
  { value: 'income', label: 'Receita' },
  { value: 'expense', label: 'Despesa' },
];

const defaultFormData = {
  description: '',
  amount: '',
  type: 'expense',
  category_id: '',
  date: new Date().toISOString().split('T')[0],
};

export default function TransactionForm({ isOpen, onClose, transaction, onSubmit }) {
  const { getCategoriesByType } = useAppContext();
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (transaction) {
        setFormData({
          description: transaction.description || '',
          amount: transaction.amount || '',
          type: transaction.type || 'expense',
          category_id: transaction.category_id || '',
          date: transaction.date
            ? new Date(transaction.date).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
        });
      } else {
        setFormData(defaultFormData);
      }
      setErrors({});
    }
  }, [isOpen, transaction]);

  const categoryOptions = getCategoriesByType(formData.type).map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };

      if (field === 'type') {
        next.category_id = '';
      }

      return next;
    });

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async () => {
    const { valid, errors: validationErrors } = validateTransaction(formData);

    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      onClose();
    } catch (error) {
      toast.error(error.message || 'Erro ao salvar transacao');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={transaction ? 'Editar Transacao' : 'Nova Transacao'}
    >
      <div className="space-y-4">
        <Input
          label="Descricao"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Descricao da transacao"
          error={errors.description}
        />

        <Input
          label="Valor"
          type="number"
          step="0.01"
          min="0"
          value={formData.amount}
          onChange={(e) => handleChange('amount', e.target.value)}
          placeholder="0.00"
          error={errors.amount}
        />

        <Select
          label="Tipo"
          value={formData.type}
          onChange={(e) => handleChange('type', e.target.value)}
          options={typeOptions}
          error={errors.type}
        />

        <Select
          label="Categoria"
          value={formData.category_id}
          onChange={(e) => handleChange('category_id', e.target.value)}
          options={categoryOptions}
          placeholder="Selecione uma categoria"
          error={errors.category_id}
        />

        <DatePicker
          label="Data"
          value={formData.date}
          onChange={(e) => handleChange('date', e.target.value)}
          error={errors.date}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} loading={loading}>
            Salvar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
