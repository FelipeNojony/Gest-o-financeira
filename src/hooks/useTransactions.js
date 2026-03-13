import { useState, useEffect, useCallback } from 'react';
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../services/transactionService';
import { useDebounce } from './useDebounce';

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    category_id: '',
    startDate: '',
    endDate: '',
    search: '',
  });
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const debouncedSearch = useDebounce(filters.search, 300);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const activeFilters = {
        ...filters,
        search: debouncedSearch,
      };

      const { data, error: fetchError } = await getTransactions(activeFilters);
      if (fetchError) {
        const message = fetchError.message || 'Erro ao carregar transacoes';
        setError(message);
        return { success: false, error: message };
      }

      const transactionList = data || [];
      setTransactions(transactionList);

      const income = transactionList
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);
      const expense = transactionList
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      setSummary({
        income,
        expense,
        balance: income - expense,
      });

      return { success: true, error: null };
    } catch (err) {
      const message = err.message || 'Erro inesperado ao carregar transacoes';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [filters, debouncedSearch]);

  const addTransaction = useCallback(async (transaction) => {
    setLoading(true);
    setError(null);
    try {
      const { error: createError } = await createTransaction(transaction);
      if (createError) {
        const message = createError.message || 'Erro ao criar transacao';
        setError(message);
        return { success: false, error: message };
      }
      await fetchTransactions();
      return { success: true, error: null };
    } catch (err) {
      const message = err.message || 'Erro inesperado ao criar transacao';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [fetchTransactions]);

  const editTransaction = useCallback(async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const { error: updateError } = await updateTransaction(id, updates);
      if (updateError) {
        const message = updateError.message || 'Erro ao atualizar transacao';
        setError(message);
        return { success: false, error: message };
      }
      await fetchTransactions();
      return { success: true, error: null };
    } catch (err) {
      const message = err.message || 'Erro inesperado ao atualizar transacao';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [fetchTransactions]);

  const removeTransaction = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { error: deleteError } = await deleteTransaction(id);
      if (deleteError) {
        const message = deleteError.message || 'Erro ao remover transacao';
        setError(message);
        return { success: false, error: message };
      }
      await fetchTransactions();
      return { success: true, error: null };
    } catch (err) {
      const message = err.message || 'Erro inesperado ao remover transacao';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [fetchTransactions]);

  useEffect(() => {
    fetchTransactions();
  }, [filters.type, filters.category_id, filters.startDate, filters.endDate, debouncedSearch]);

  return {
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
  };
}

export default useTransactions;
