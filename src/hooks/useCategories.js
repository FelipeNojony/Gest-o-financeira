import { useState, useEffect, useCallback } from 'react';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categoryService';

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await getCategories();
      if (fetchError) {
        setError(fetchError.message || 'Erro ao carregar categorias');
        return { success: false, error: fetchError.message || 'Erro ao carregar categorias' };
      }
      setCategories(data || []);
      return { success: true, error: null };
    } catch (err) {
      const message = err.message || 'Erro inesperado ao carregar categorias';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const addCategory = useCallback(async (category) => {
    setLoading(true);
    setError(null);
    try {
      const { error: createError } = await createCategory(category);
      if (createError) {
        const message = createError.message || 'Erro ao criar categoria';
        setError(message);
        return { success: false, error: message };
      }
      await fetchCategories();
      return { success: true, error: null };
    } catch (err) {
      const message = err.message || 'Erro inesperado ao criar categoria';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [fetchCategories]);

  const editCategory = useCallback(async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const { error: updateError } = await updateCategory(id, updates);
      if (updateError) {
        const message = updateError.message || 'Erro ao atualizar categoria';
        setError(message);
        return { success: false, error: message };
      }
      await fetchCategories();
      return { success: true, error: null };
    } catch (err) {
      const message = err.message || 'Erro inesperado ao atualizar categoria';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [fetchCategories]);

  const removeCategory = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { error: deleteError } = await deleteCategory(id);
      if (deleteError) {
        const message = deleteError.message || 'Erro ao remover categoria';
        setError(message);
        return { success: false, error: message };
      }
      await fetchCategories();
      return { success: true, error: null };
    } catch (err) {
      const message = err.message || 'Erro inesperado ao remover categoria';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [fetchCategories]);

  const getCategoriesByType = useCallback((type) => {
    return categories.filter((category) => category.type === type);
  }, [categories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
    getCategoriesByType,
  };
}

export default useCategories;
