import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import ColorPicker from '@/components/ui/ColorPicker';
import IconPicker from '@/components/ui/IconPicker';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/utils/constants';
import { validateCategory } from '@/utils/validators';

const typeOptions = [
  { value: 'income', label: 'Receita' },
  { value: 'expense', label: 'Despesa' },
];

const defaultFormData = {
  name: '',
  type: 'expense',
  color: CATEGORY_COLORS[0],
  icon: CATEGORY_ICONS[0],
};

export default function CategoryForm({ isOpen, onClose, category, onSubmit }) {
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (category) {
        setFormData({
          name: category.name || '',
          type: category.type || 'expense',
          color: category.color || CATEGORY_COLORS[0],
          icon: category.icon || CATEGORY_ICONS[0],
        });
      } else {
        setFormData(defaultFormData);
      }
      setErrors({});
    }
  }, [isOpen, category]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async () => {
    const { valid, errors: validationErrors } = validateCategory(formData);

    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      toast.success(
        category ? 'Categoria atualizada com sucesso!' : 'Categoria criada com sucesso!'
      );
      onClose();
    } catch (error) {
      toast.error(error.message || 'Erro ao salvar categoria');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? 'Editar Categoria' : 'Nova Categoria'}
    >
      <div className="space-y-4">
        <Input
          label="Nome"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Nome da categoria"
          error={errors.name}
        />

        <Select
          label="Tipo"
          value={formData.type}
          onChange={(e) => handleChange('type', e.target.value)}
          options={typeOptions}
          error={errors.type}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cor
          </label>
          <ColorPicker
            value={formData.color}
            onChange={(color) => handleChange('color', color)}
          />
          {errors.color && (
            <p className="text-red-500 text-xs mt-1">{errors.color}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Icone
          </label>
          <IconPicker
            value={formData.icon}
            onChange={(icon) => handleChange('icon', icon)}
          />
          {errors.icon && (
            <p className="text-red-500 text-xs mt-1">{errors.icon}</p>
          )}
        </div>

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
