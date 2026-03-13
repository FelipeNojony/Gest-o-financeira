import { supabase } from './supabase';

export async function getSettings() {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .limit(1)
    .single();

  if (error && !data) {
    const result = await createDefaultSettings();
    return result;
  }

  return { data, error };
}

export async function updateSettings(id, updates) {
  const { data, error } = await supabase
    .from('user_settings')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}

export async function createDefaultSettings() {
  const { data, error } = await supabase
    .from('user_settings')
    .insert({
      currency: 'BRL',
      language: 'pt-BR',
    })
    .select()
    .single();

  return { data, error };
}
