import { supabase } from './supabase';

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  return { data, error };
}

export async function getCategoryById(id) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
}

export async function createCategory(category) {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single();

  return { data, error };
}

export async function updateCategory(id, updates) {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}

export async function deleteCategory(id) {
  const { data, error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  return { data, error };
}

export async function getCategoriesByType(type) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('type', type)
    .order('name', { ascending: true });

  return { data, error };
}
