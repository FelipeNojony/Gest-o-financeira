import { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import toast from 'react-hot-toast';
import useTransactions from '@/hooks/useTransactions';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import TransactionFilters from '@/components/transactions/TransactionFilters';
import TransactionList from '@/components/transactions/TransactionList';
import TransactionForm from '@/components/transactions/TransactionForm';
import { formatCurrency } from '@/utils/formatters';

export default function TransactionsPage() {
  const {
    transactions,
    loading,
    error,
    filters,
    setFilters,
    fetchTransactions,
    addTransaction,
    editTransaction,
    removeTransaction,
    summary,
  } = useTransactions();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deletingTransaction, setDeletingTransaction] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleOpenCreate = () => {
    setEditingTransaction(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  const handleOpenDelete = (transaction) => {
    setDeletingTransaction(transaction);
    setIsConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
    setDeletingTransaction(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingTransaction) {
        await editTransaction(editingTransaction.id, formData);
        toast.success('Transacao atualizada com sucesso!');
      } else {
        await addTransaction(formData);
        toast.success('Transacao criada com sucesso!');
      }
      handleCloseForm();
    } catch (err) {
      toast.error(err.message || 'Erro ao salvar transacao');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTransaction) return;

    try {
      await removeTransaction(deletingTransaction.id);
      toast.success('Transacao excluida com sucesso!');
      handleCloseConfirm();
    } catch (err) {
      toast.error(err.message || 'Erro ao excluir transacao');
    }
  };

  const isBalanceNegative = summary.balance < 0;

  return (
    <div>
      <Header
        title="Transacoes"
        action={
          <Button onClick={handleOpenCreate}>
            <Plus size={16} />
            Nova Transacao
          </Button>
        }
      />

      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={14} className="text-green-600" />
            <span className="text-xs text-gray-500">Receitas</span>
          </div>
          <p className="text-sm font-semibold text-green-600">
            {formatCurrency(summary.income)}
          </p>
        </div>

        <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown size={14} className="text-red-600" />
            <span className="text-xs text-gray-500">Despesas</span>
          </div>
          <p className="text-sm font-semibold text-red-600">
            {formatCurrency(summary.expense)}
          </p>
        </div>

        <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border">
          <div className="flex items-center gap-2 mb-1">
            <Wallet size={14} className={isBalanceNegative ? 'text-red-600' : 'text-purple-600'} />
            <span className="text-xs text-gray-500">Saldo</span>
          </div>
          <p className={`text-sm font-semibold ${isBalanceNegative ? 'text-red-600' : 'text-purple-600'}`}>
            {formatCurrency(summary.balance)}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <TransactionFilters filters={filters} onFilterChange={setFilters} />
      </div>

      <Card>
        <TransactionList
          transactions={transactions}
          loading={loading}
          error={error}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onRetry={fetchTransactions}
        />
      </Card>

      <TransactionForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        transaction={editingTransaction}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleDeleteConfirm}
        title="Excluir Transacao"
        message="Tem certeza que deseja excluir esta transacao? Esta acao nao pode ser desfeita."
        variant="danger"
        confirmText="Excluir"
      />
    </div>
  );
}
