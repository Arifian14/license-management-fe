import { DateTime } from 'luxon';

export function formatDateToYMD(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // bulan dimulai dari 0
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const getDiffMonths = (dateStarted: string, dateEnded: string): number => {
  return Math.ceil(DateTime.fromISO(dateEnded).diff(DateTime.fromISO(dateStarted), 'months').months);
};

export function rupiahFormatter(value: number): string {
  if (value === null || value === undefined) {
    return '';
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
}

export function reverseRupiahFormatter(value: string): number {
  const str = String(value ?? '')
  const numericString = str.replace(/[^0-9,-]/g, '').replace(',', '.')
  const parsed = parseFloat(numericString)
  return isNaN(parsed) ? 0 : parsed
}