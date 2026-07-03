import { reactive, ref } from "vue";
import ApiService from "@/core/services/ApiService";

export interface LicenseSummary {
  total: number;
  under3Months: number;
  under1Month: number;
  statusDistribution: {
    green: number;
    yellow: number;
    red: number;
  };
}

const emptySummary = (): LicenseSummary => ({
  total: 0,
  under3Months: 0,
  under1Month: 0,
  statusDistribution: { green: 0, yellow: 0, red: 0 },
});

export function useDashboard() {
  const summary = reactive<LicenseSummary>(emptySummary());
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchSummary = async () => {
    loading.value = true;
    error.value = null;
    try {
      ApiService.setHeader();
      const response = await ApiService.query("/api/licenses/summary", {});
      Object.assign(summary, response.data.data as LicenseSummary);
    } catch (err) {
      console.error("Error ambil summary dashboard:", err);
      error.value = "Gagal memuat data dashboard";
    } finally {
      loading.value = false;
    }
  };

  return { summary, loading, error, fetchSummary };
}
