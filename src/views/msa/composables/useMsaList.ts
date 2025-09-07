import { ref, onBeforeMount } from "vue";
import { useMsaApi } from "./useMsaApi";
import { formatDateToYMD, formatTanggal, rupiahFormatter } from "@/utils/utils";
import type { MsaTableColumn } from "../types";

export function useMsaList() {
  const { fetchMsaList, loading, error } = useMsaApi();
  
  const items = ref<any[]>([]);
  const selectedFilter = ref('date');
  const textfilter = ref('');
  const datefilter = ref({
    start: null,
    end: null,
  });

  const columns: MsaTableColumn[] = [
    { key: 'pks', label: 'PKS' },
    { key: 'dateStarted', label: 'Date Start' },
    { key: 'dateEnded', label: 'Date End' },
    { key: 'peopleQuota', label: 'People Quota' },
    { key: 'budgetQuota', label: 'Budget Quota' },
    { key: 'status', label: 'Status', slot: 'status' },
    { key: 'action', label: '', slot: 'action', headerClass: 'text-end rounded-end' },
  ];

  const checkBudgetAlert = (budgetQuota: number, spent: number): boolean => {
    const remaining = budgetQuota - spent;
    const threshold = budgetQuota * 0.2;
    return remaining <= threshold;
  };

  const getData = async () => {
    try {
      const response = await fetchMsaList({
        params: {
          pks: '',
          date_started_from: '',
          date_started_to: '',
          date_ended_from: '',
          date_ended_to: '',
          people_quota: '',
          budget_quota: '',
          budget_quota_from: '',
          budget_quota_to: '',
          sort_by: 'id',
          sort_order: 'asc',
          limit: '',
          offset: '',
        }
      });

      const data = response.data;
      items.value = data.map((item: any) => {
        let statusParts: string[] = [];

        if (item.isPksExpiringSoon) {
          statusParts.push('PKS is Expiring Soon');
        }
        if (item.isBudgetBelowThreshold) {
          statusParts.push('Budget Quota ≤ 20%');
        }

        let status = statusParts.join(' & ');

        return {
          id: item.id,
          pks: item.pks,
          dateStarted: formatTanggal(formatDateToYMD(item.dateStarted)),
          dateEnded: formatTanggal(formatDateToYMD(item.dateEnded)),
          peopleQuota: item.peopleQuota,
          budgetQuota: rupiahFormatter(item.budgetQuota),
          status: status,
          isPksExpiringSoon: item.isPksExpiringSoon,
          alert: item.isBudgetBelowThreshold,
        }
      });
    } catch (err) {
      console.error("Error ambil data:", err);
    }
  };

  onBeforeMount(async () => {
    await getData();
  });

  const mencariData = () => {
    console.log(selectedFilter.value);
    console.log(textfilter.value);
    console.log(datefilter.value.end);
    console.log(datefilter.value.start);
  };

  return {
    items,
    columns,
    loading,
    error,
    selectedFilter,
    textfilter,
    datefilter,
    getData,
    mencariData
  };
}