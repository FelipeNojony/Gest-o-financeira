import { format, isToday, isYesterday } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { CURRENCIES } from './constants';

export function formatCurrency(value, currency = 'BRL') {
  const currencyConfig = CURRENCIES.find((c) => c.value === currency);
  const locale = currency === 'BRL' ? 'pt-BR' : currency === 'EUR' ? 'de-DE' : 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyConfig ? currencyConfig.value : 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(date, formatStr = 'dd/MM/yyyy') {
  const parsedDate = date instanceof Date ? date : new Date(date);
  return format(parsedDate, formatStr, { locale: ptBR });
}

export function formatDateRelative(date) {
  const parsedDate = date instanceof Date ? date : new Date(date);

  if (isToday(parsedDate)) {
    return 'Hoje';
  }

  if (isYesterday(parsedDate)) {
    return 'Ontem';
  }

  return formatDate(parsedDate);
}

export function formatMonth(date) {
  const parsedDate = date instanceof Date ? date : new Date(date);
  return format(parsedDate, "MMMM yyyy", { locale: ptBR });
}

export function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
