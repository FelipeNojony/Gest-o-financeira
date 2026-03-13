import { useState, useEffect, useCallback } from 'react';
import { getDashboardData } from '../services/dashboardService';

export function useDashboard() {
  const [dashboardData, setDashboardData] = useState({
    summary: null,
    expenseByCategory: [],
    incomeByCategory: [],
    monthlyData: [],
    recentTransactions: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('month');

  const refreshDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { error: fetchError, ...data } = await getDashboardData(period);
      if (fetchError) {
        const message = fetchError.message || 'Erro ao carregar dados do dashboard';
        setError(message);
        return { success: false, error: message };
      }
      setDashboardData({
        summary: data?.summary || null,
        expenseByCategory: data?.expenseByCategory || [],
        incomeByCategory: data?.incomeByCategory || [],
        monthlyData: data?.monthlyData || [],
        recentTransactions: data?.recentTransactions || [],
      });
      return { success: true, error: null };
    } catch (err) {
      const message = err.message || 'Erro inesperado ao carregar dados do dashboard';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    refreshDashboard();
  }, [refreshDashboard]);

  return {
    dashboardData,
    loading,
    error,
    period,
    setPeriod,
    refreshDashboard,
  };
}

export default useDashboard;
