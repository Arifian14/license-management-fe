import { DateTime } from 'luxon';

export function formatDateToYMD(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // bulan dimulai dari 0
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function dateNow(){
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // bulan dimulai dari 0
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function formatTanggal(tanggal: string): string {
  const bulanIndo = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const [year, month, day] = tanggal.split("-").map(Number);

  const namaBulan = bulanIndo[month - 1]; // index bulan dimulai dari 0
  return `${day} ${namaBulan} ${year}`;
}

export function reverseTanggal(tanggal: string): string {
  const bulanIndo = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const [dayStr, bulanStr, yearStr] = tanggal.split(" ");
  const day = dayStr.padStart(2, "0");
  const month = String(bulanIndo.indexOf(bulanStr) + 1).padStart(2, "0");
  const year = yearStr;

  return `${year}-${month}-${day}`;
}

export function usedBudgetMSA(rate:number,bulan:number){
  const totalUsedBudget = rate * bulan;
  return totalUsedBudget == 0 ? rate : totalUsedBudget;
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

export function checkExpiredDate(dateEnded: string | any, isOnchange:any = ''): boolean {
  if(isOnchange != ''){
    dateEnded = dateEnded.target.value;
  }
  // Get today's date without time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Parse the input date
  const endDate = new Date(dateEnded);
  endDate.setHours(0, 0, 0, 0);

  // Return true if expired (before today), false otherwise
  return endDate <= today;
}