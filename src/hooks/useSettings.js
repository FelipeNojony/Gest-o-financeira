import { useState, useEffect, useCallback } from 'react';
import { getSettings, updateSettings } from '../services/settingsService';

export function useSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await getSettings();
      if (fetchError) {
        const message = fetchError.message || 'Erro ao carregar configuracoes';
        setError(message);
        return { success: false, error: message };
      }
      setSettings(data || {});
      return { success: true, error: null };
    } catch (err) {
      const message = err.message || 'Erro inesperado ao carregar configuracoes';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserSettings = useCallback(async (updates) => {
    setLoading(true);
    setError(null);
    try {
      const { error: updateError } = await updateSettings(updates);
      if (updateError) {
        const message = updateError.message || 'Erro ao atualizar configuracoes';
        setError(message);
        return { success: false, error: message };
      }
      await fetchSettings();
      return { success: true, error: null };
    } catch (err) {
      const message = err.message || 'Erro inesperado ao atualizar configuracoes';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [fetchSettings]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    loading,
    error,
    fetchSettings,
    updateUserSettings,
  };
}

export default useSettings;
