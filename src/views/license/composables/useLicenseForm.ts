import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router';
import * as Yup from "yup";
import ApiService from "@/core/services/ApiService";
import { formatDateToYMD } from "@/utils/utils";
import type { LicenseData, IHealthCheck } from "@/views/license/Part/types";

export function useLicenseForm(initialData?: LicenseData) {
  const route = useRoute();
  const router = useRouter();
  const mode = route.query.mode as string || "add";
  const id = mode === 'add' ? 0 : parseInt(route.params.id.toString());
  
  const license = ref<LicenseData>(initialData || {
    id: undefined,
    pks: "",
    application: "",
    start_date_license: "",
    description: "",
    due_date_license: "",
    healthchecks: [{
      healthcheck_routine_date: "",
      healthcheck_actual_date: "",
    }],
    file_pks: "",
    file_bast: "",
  });

  const isView = computed(() => mode === "view");
  const modalTitle = computed(() => {
    if (mode === "edit") return "Edit License";
    if (mode === "view") return "Detail License";
    return "Tambah License";
  });

  const detailSchema = Yup.object().shape({
    healthcheck_routine_date: Yup.string().required().label("Health Check Routine"),
    healthcheck_actual_date: Yup.string().required().label("Health Check Actual"),
  });

  const validationSchema = Yup.object().shape({
    pks: Yup.string().required().label("No PKS"),
    application: Yup.string().required().label("Application"),
    due_date_license: Yup.string().required().label("Due Date License"),
    start_date_license: Yup.string().required().label("Start Date License"),
    // description: Yup.string().required().label("Description"),
    file_pks: Yup.string().required().label("File PKS"),
    file_bast: Yup.string().required().label("File BAST"),
    healthchecks: Yup.array().of(detailSchema).min(1, "At least one must be added")
  });

  // GET API by ID
  const fetchPKSDataById = async (id: string | number) => {
    try {
      ApiService.setHeader()
      const url = `/api/licenses/${id}`
      const response = await ApiService.get(url);
      const data = response.data.data;

      license.value.id = data.id;
      license.value.pks = data.pks;
      license.value.application = data.application;
      license.value.due_date_license = formatDateToYMD(data.dueDateLicense);
      license.value.start_date_license = formatDateToYMD(data.startDateLicense);
      license.value.description = data.description;
      license.value.file_pks = data.filePks;
      license.value.file_bast = data.fileBast;
      license.value.healthchecks = data.healthchecks.map((item) => {
          return {
              healthcheck_routine_date: formatDateToYMD(item.healthcheckRoutineDate),
              healthcheck_actual_date: formatDateToYMD(item.healthcheckActualDate),
          }
      });
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      throw error;
    }
  };

  const submitAPI = async (data: LicenseData) => {
    const formData = {
      pks: data.pks,
      application: data.application,
      due_date_license: data.due_date_license,
      start_date_license: data.start_date_license,
      description: data.description,
      healthchecks: data.healthchecks,
      file_pks: data.file_pks,
      file_bast: data.file_bast
    };

    try {
      let response;
      ApiService.setHeader()
      const baseUrl = `/api/licenses`;
      
      if (mode === "edit" && data.id) {
        response = await ApiService.put(`${baseUrl}/${data.id}`, formData);
      } else {
        response = await ApiService.post(baseUrl, formData);
      }

      return response;
    } catch (error) {
      console.error("Error submit:", error);
      throw error;
    }
  };

  const addHealthCheck = () => {
    license.value.healthchecks.push({
      healthcheck_routine_date: "",
      healthcheck_actual_date: "",
    });
  };

  const removeHealthCheck = (index: number) => {
    license.value.healthchecks.splice(index, 1);
  };

  const updateHealthCheck = (index: number, updatedHealthCheck: IHealthCheck) => {
    license.value.healthchecks[index] = updatedHealthCheck;
  };

  onMounted(() => {
    if (mode !== 'add') {
      fetchPKSDataById(id);
    }
  });

  return {
    license,
    isView,
    modalTitle,
    validationSchema,
    fetchPKSDataById,
    submitAPI,
    addHealthCheck,
    removeHealthCheck,
    updateHealthCheck
  };
}