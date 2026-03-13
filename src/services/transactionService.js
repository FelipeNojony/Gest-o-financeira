import { supabase } from './supabase';

export async function getTransactions(filters = {}) {
  let query = supabase
    .from('transactions')
    .select('*, categories(*)');

  if (filters.type) {
    query = query.eq('type', filters.type);
  }

  if (filters.category_id) {
    query = query.eq('category_id', filters.category_id);
  }

  if (filters.startDate) {
    query = query.gte('date', filters.startDate);
  }

  if (filters.endDate) {
    query = query.lte('date', filters.endDate);
  }

  if (filters.search) {
    query = query.ilike('description', `%${filters.search}%`);
  }

  query = query
    .order('date', { ascending: false })
    .order('created_at', { ascending: false });

  const { data, error } = await query;

  return { data, error };
}

export async function getTransactionById(id) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*, categories(*)')
    .eq('id', id)
    .single();

  return { data, error };
}

export async function createTransaction(transaction) {
  const { data, error } = await supabase
    .from('transactions')
    .insert(transaction)
    .select()
    .single();

  return { data, error };
}

export async function updateTransaction(id, updates) {
  const { data, error } = await supabase
    .from('transactions')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}

export async function deleteTransaction(id) {
  const { data, error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  return { data, error };
}

export async function getTransactionsSummary(startDate, endDate) {
  let query = supabase
    .from('transactions')
    .select('*');

  if (startDate) {
    query = query.gte('date', startDate);
  }

  if (endDate) {
    query = query.lte('date', endDate);
  }

  const { data, error } = await query;

  if (error) {
    return { income: 0, expense: 0, balance: 0, error };
  }

  const income = (data || [])
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = (data || [])
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expense;

  return { income, expense, balance, error: null };
}
