import toast from 'react-hot-toast';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import { CURRENCIES } from '@/utils/constants';

export default function PreferencesForm({ settings, loading, onUpdate }) {
  const handleCurrencyChange = async (e) => {
    try {
      await onUpdate({ currency: e.target.value });
      toast.success('Preferências atualizadas com sucesso!');
    } catch (error) {
      toast.error(error.message || 'Erro ao atualizar preferências');
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Preferências</Card.Title>
      </Card.Header>
      <Card.Content>
        <Select
          label="Moeda"
          value={settings?.currency || 'BRL'}
          onChange={handleCurrencyChange}
          options={CURRENCIES}
          disabled={loading}
        />
      </Card.Content>
    </Card>
  );
}
