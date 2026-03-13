import { createContext, useContext } from 'react';
import { useCategories } from '../hooks/useCategories';
import { useSettings } from '../hooks/useSettings';

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
    getCategoriesByType,
  } = useCategories();

  const {
    settings,
    loading: settingsLoading,
    updateUserSettings,
  } = useSettings();

  const value = {
    categories,
    categoriesLoading,
    categoriesError,
    fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
    getCategoriesByType,
    settings,
    settingsLoading,
    updateUserSettings,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
