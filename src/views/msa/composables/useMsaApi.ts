import { ref } from "vue";
import ApiService from "@/core/services/ApiService";
import type { IMsa, IMsaDetail } from "@/views/msa/types";
import { formatDateToYMD, formatTanggal, rupiahFormatter } from "@/utils/utils";

export function useMsaApi() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchMsaList = async (params?: any) => {
    try {
      loading.value = true;
      ApiService.setHeader();
      const response = await ApiService.query("/api/v2/msa", { params });
      return response.data;
    } catch (err: any) {
      error.value = err.message || "Failed to fetch MSA list";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchMsaById = async (id: string | number) => {
    try {
      loading.value = true;
      ApiService.setHeader();
      const response = await ApiService.get(`/api/v2/msa/${id}`);
      return response.data.data;
    } catch (err: any) {
      error.value = err.message || "Failed to fetch MSA";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createMsa = async (data: IMsa) => {
    try {
      loading.value = true;
      ApiService.setHeader();
      const response = await ApiService.post("/api/v2/msa", data);
      return response.data;
    } catch (err: any) {
      error.value = err.message || "Failed to create MSA";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateMsa = async (id: number, data: IMsa) => {
    try {
      loading.value = true;
      ApiService.setHeader();
      const response = await ApiService.put(`/api/v2/msa/${id}`, data);
      return response.data;
    } catch (err: any) {
      error.value = err.message || "Failed to update MSA";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createMsaDetails = async (id: number, data: { msa: Partial<IMsaDetail>[] }) => {
    try {
      loading.value = true;
      ApiService.setHeader();
      const response = await ApiService.post(`/api/v2/msa/${id}/details`, data);
      return response.data;
    } catch (err: any) {
      error.value = err.message || "Failed to create MSA details";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteMsa = async (id: number) => {
    try {
      loading.value = true;
      ApiService.setHeader();
      const response = await ApiService.delete(`/api/v2/msa/${id}`);
      return response.data;
    } catch (err: any) {
      error.value = err.message || "Failed to delete MSA";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    fetchMsaList,
    fetchMsaById,
    createMsa,
    updateMsa,
    createMsaDetails,
    deleteMsa
  };

}
