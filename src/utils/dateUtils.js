import {
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subMonths,
  format,
} from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { MONTHS_PT } from './constants';

export function getMonthRange(date = new Date()) {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  };
}

export function getYearRange(date = new Date()) {
  return {
    start: startOfYear(date),
    end: endOfYear(date),
  };
}

export function getDateRangeForPeriod(period) {
  const now = new Date();

  switch (period) {
    case 'month':
      return getMonthRange(now);
    case 'year':
      return getYearRange(now);
    case 'all':
      return null;
    default:
      return getMonthRange(now);
  }
}

export function getAllMonthsInYear(year = new Date().getFullYear()) {
  return MONTHS_PT.map((label, index) => ({
    month: index + 1,
    year,
    label: `${label} ${year}`,
  }));
}
