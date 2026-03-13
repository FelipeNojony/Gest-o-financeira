import { useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppContext } from '@/contexts/AppContext';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import CategoryForm from '@/components/settings/CategoryForm';
import CategoryList from '@/components/settings/CategoryList';
import PreferencesForm from '@/components/settings/PreferencesForm';

export default function SettingsPage() {
  const {
    categories,
    categoriesLoading,
    addCategory,
    editCategory,
    removeCategory,
    settings,
    settingsLoading,
    updateUserSettings,
  } = useAppContext();

  const [editingCategory, setEditingCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const handleOpenDelete = (category) => {
    setDeletingCategory(category);
    setIsConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
    setDeletingCategory(null);
  };

  const handleFormSubmit = async (formData) => {
    if (editingCategory) {
      await editCategory(editingCategory.id, formData);
    } else {
      await addCategory(formData);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingCategory) return;

    try {
      await removeCategory(deletingCategory.id);
      toast.success('Categoria excluida com sucesso!');
      handleCloseConfirm();
    } catch (error) {
      toast.error(error.message || 'Erro ao excluir categoria');
    }
  };

  return (
    <div>
      <Header title="Configurações" />

      <div className="grid gap-6">
        <Card>
          <Card.Header>
            <Card.Title>Categorias</Card.Title>
            <Button onClick={handleOpenCreate} size="sm">
              <Plus size={16} />
              Nova Categoria
            </Button>
          </Card.Header>
          <Card.Content>
            <CategoryList
              categories={categories}
              loading={categoriesLoading}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          </Card.Content>
        </Card>

        <PreferencesForm
          settings={settings}
          loading={settingsLoading}
          onUpdate={updateUserSettings}
        />
      </div>

      <CategoryForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        category={editingCategory}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleDeleteConfirm}
        title="Excluir Categoria"
        message={
          deletingCategory
            ? `Tem certeza que deseja excluir a categoria '${deletingCategory.name}'? Esta ação não pode ser desfeita.`
            : ''
        }
        variant="danger"
        confirmText="Excluir"
      />
    </div>
  );
}
