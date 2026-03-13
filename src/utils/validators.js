import { TRANSACTION_TYPES } from './constants';

export function validateTransaction({ description, amount, type, category_id, date }) {
  const errors = {};

  if (!description || description.trim().length < 2) {
    errors.description = 'A descrição deve ter pelo menos 2 caracteres';
  }

  if (amount === undefined || amount === null || amount === '') {
    errors.amount = 'O valor é obrigatório';
  } else if (Number(amount) <= 0) {
    errors.amount = 'O valor deve ser maior que zero';
  }

  if (!type) {
    errors.type = 'O tipo é obrigatório';
  } else if (type !== TRANSACTION_TYPES.INCOME && type !== TRANSACTION_TYPES.EXPENSE) {
    errors.type = 'O tipo deve ser receita ou despesa';
  }

  if (!category_id) {
    errors.category_id = 'A categoria é obrigatória';
  }

  if (!date) {
    errors.date = 'A data é obrigatória';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateCategory({ name, type, color, icon }) {
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = 'O nome deve ter pelo menos 2 caracteres';
  }

  if (!type) {
    errors.type = 'O tipo é obrigatório';
  }

  if (!color) {
    errors.color = 'A cor é obrigatória';
  }

  if (!icon) {
    errors.icon = 'O ícone é obrigatório';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
