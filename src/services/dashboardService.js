import { subMonths, startOfMonth, endOfMonth, format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { supabase } from './supabase';
import { getDateRangeForPeriod } from '../utils/dateUtils';

export async function getDashboardData(period = 'month') {
  const dateRange = getDateRangeForPeriod(period);

  let query = supabase
    .from('transactions')
    .select('*, categories(*)');

  if (dateRange) {
    query = query
      .gte('date', dateRange.start.toISOString().split('T')[0])
      .lte('date', dateRange.end.toISOString().split('T')[0]);
  }

  const { data: transactions, error } = await query.order('date', { ascending: false });

  if (error) {
    return { error };
  }

  const safeTransactions = transactions || [];

  const totalIncome = safeTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = safeTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  const expenseByCategory = groupByCategory(
    safeTransactions.filter((t) => t.type === 'expense')
  );

  const incomeByCategory = groupByCategory(
    safeTransactions.filter((t) => t.type === 'income')
  );

  const monthlyData = await getMonthlyChartData(6);

  const recentTransactions = safeTransactions.slice(0, 5);

  return {
    summary: {
      income: totalIncome,
      expense: totalExpense,
      balance,
    },
    expenseByCategory,
    incomeByCategory,
    monthlyData: monthlyData.error ? [] : monthlyData.data,
    recentTransactions,
    error: null,
  };
}

function groupByCategory(transactions) {
  const grouped = {};

  transactions.forEach((t) => {
    const categoryName = t.categories?.name || 'Sem Categoria';
    const categoryColor = t.categories?.color || '#9CA3AF';

    if (!grouped[categoryName]) {
      grouped[categoryName] = {
        name: categoryName,
        value: 0,
        color: categoryColor,
      };
    }

    grouped[categoryName].value += Number(t.amount);
  });

  return Object.values(grouped).sort((a, b) => b.value - a.value);
}

export async function getMonthlyChartData(months = 6) {
  const now = new Date();
  const startDate = startOfMonth(subMonths(now, months - 1));
  const endDate = endOfMonth(now);

  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .gte('date', startDate.toISOString().split('T')[0])
    .lte('date', endDate.toISOString().split('T')[0]);

  if (error) {
    return { data: [], error };
  }

  const safeTransactions = transactions || [];
  const monthlyMap = {};

  for (let i = 0; i < months; i++) {
    const monthDate = subMonths(now, months - 1 - i);
    const key = format(monthDate, 'yyyy-MM');
    const label = format(monthDate, 'MMM', { locale: ptBR });

    monthlyMap[key] = {
      month: label.charAt(0).toUpperCase() + label.slice(1),
      income: 0,
      expense: 0,
    };
  }

  safeTransactions.forEach((t) => {
    const key = t.date.substring(0, 7);
    if (monthlyMap[key]) {
      if (t.type === 'income') {
        monthlyMap[key].income += Number(t.amount);
      } else if (t.type === 'expense') {
        monthlyMap[key].expense += Number(t.amount);
      }
    }
  });

  return { data: Object.values(monthlyMap), error: null };
}
