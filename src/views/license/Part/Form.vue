<template>
  <div>
    <VForm id="license-form" class="form" @submit="handleSubmit" :validation-schema="validationSchema">
        <div class="card mb-5">
            <div class="card-body pb-0">
                <!-- Form Fields -->
                <div class="mb-3">
                    <label for="applicationFormControlInput1" class="required form-label">No PKS</label>
                    <Field
                        name="pks"
                        type="text"
                        class="form-control form-control-solid"
                        placeholder="No PKS"
                        v-model="license.pks"
                        :disabled="isView"
                    />
                    <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                        <ErrorMessage name="pks" />
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="required form-label">Application</label>
                        <Field
                        name="application"
                        type="text"
                        class="form-control form-control-solid"
                        placeholder="Application"
                        v-model="license.application"
                        :disabled="isView"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="application" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label class="required form-label">Due Date License</label>
                        <Field
                        name="due_date_license"
                        type="date"
                        class="form-control form-control-solid"
                        placeholder="Due Date License"
                        v-model="license.due_date_license"
                        :disabled="isView"
                        />
                        <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                            <ErrorMessage name="due_date_license" />
                        </div>
                        </div>
                    </div>
                </div>                

                <div v-if="isView">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3 d-flex">
                                <a :href="`${license.file_pks}`" target="_blank" class="btn btn-sm btn-warning" style="width: 100%;">Link File PKS</a>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3 d-flex">
                                <a :href="`${license.file_bast}`" target="_blank" class="btn btn-sm btn-primary" style="width: 100%;">Link File BAST</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" v-if="!isView">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="required form-label">File PKS</label>
                            <Field
                                name="file_pks"
                                type="text"
                                class="form-control form-control-solid"
                                placeholder="File PKS"
                                v-model="license.file_pks"
                                :disabled="isView"
                            />
                            <div class="fv-plugins-message-container">
                                <div class="fv-help-block">
                                <ErrorMessage name="file_pks" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="required form-label">File BAST</label>
                            <Field
                                name="file_bast"
                                type="text"
                                class="form-control form-control-solid"
                                placeholder="File BAST"
                                v-model="license.file_bast"
                                :disabled="isView"
                            />
                            <div class="fv-plugins-message-container">
                                <div class="fv-help-block">
                                <ErrorMessage name="file_bast" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-3 mt-5" v-for="(healthcheck, index) in license.healthchecks" :key="index">
                    <div class="col-md-5">
                        <label class="required form-label">Health Check Routine</label>
                        <Field
                        :name="`healthchecks[${index}].healthcheck_routine_date`"
                        type="date"
                        class="form-control form-control-solid"
                        placeholder="Health Check Routine"
                        v-model="healthcheck.healthcheck_routine_date"
                        :disabled="isView"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage :name="`healthchecks[${index}].healthcheck_routine_date`" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <label class="required form-label">Health Check Actual</label>
                        <Field
                        :name="`healthchecks[${index}].healthcheck_actual_date`"
                        type="date"
                        class="form-control form-control-solid"
                        placeholder="Health Check Actual"
                        v-model="healthcheck.healthcheck_actual_date"
                        :disabled="isView"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage :name="`healthchecks[${index}].healthcheck_actual_date`" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 d-flex align-items-end" v-if="!isView">
                        <button class="btn btn-primary mb-1" v-if="index === 0" @click="addHealthCheck">+</button>
                        <button class="btn btn-danger mb-1" v-else="index === 0" @click="removeHealthCheck(index)">-</button>
                    </div>
                </div>

                <div class="text-end pt-15 mb-5" v-if="!isView">
                    <button type="submit" ref="submitButtonRef" class="btn btn-primary me-3">
                        <span class="indicator-label">Submit</span>
                        <span class="indicator-progress">
                        Please wait...
                        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
      </VForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed,onMounted } from "vue";
import { Field, ErrorMessage, Form as VForm, useForm } from "vee-validate";
import * as Yup from "yup";
import BaseModal from "@/components/widget/BaseModal.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { hideModal } from "@/core/helpers/modal";
import ApiService from "@/core/services/ApiService";
import {formatDateToYMD} from "../../../../utils/utils";
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

interface IHealthCheck {
    healthcheck_routine_date: string;
    healthcheck_actual_date: string;
}

interface LicenseData {
  id?: number;
  pks: string;
  application: string;
  due_date_license: string;
  healthchecks : IHealthCheck[]
  file_pks: string;
  file_bast: string;
}



export default defineComponent({
  components: { BaseModal, Field, ErrorMessage, VForm },
  props: {
    data: {
      type: Object as () => LicenseData,
      default: () => ({}),
    },
    modalId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const modalRef = ref<null | HTMLElement>(null);
    const id = parseInt(route.params.id.toString());
    const mode = route.query.mode;

    console.log(mode)

    const detailSchema = Yup.object().shape({
      healthcheck_routine_date: Yup.string().required().label("Health Check Routine"),
      healthcheck_actual_date: Yup.string().required().label("Health Check Actual"),
    });

    const validationSchema = Yup.object().shape({
      pks: Yup.string().required().label("No PKS"),
      application: Yup.string().required().label("Application"),
      due_date_license: Yup.string().required().label("Due Date License"),
      file_pks: Yup.string().required().label("File PKS"),
      file_bast: Yup.string().required().label("File BAST"),
      healthchecks: Yup.array().of(detailSchema).min(1, "At least one must be added")
    });

    const license = ref<LicenseData>({
      id: undefined,
      pks: "",
      application: "",
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

    onMounted(() => {
        fetchPKSDataById(id)
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
        license.value.application = data.application;
        license.value.due_date_license = formatDateToYMD(data.dueDateLicense);
        license.value.file_pks = data.filePks;
        license.value.file_bast = data.fileBast;
        license.value.healthchecks = data.healthchecks.map((item) => {
            return {
                healthcheck_routine_date: formatDateToYMD(item.healthcheckRoutineDate),
                healthcheck_actual_date: formatDateToYMD(item.healthcheckActualDate),
            }
        });

        console.log(license.value)

      } catch (error) {
        console.error("Gagal mengambil data:", error);
        Swal.fire("Error", "Gagal mengambil data.", "error");
      }
    };

    const submitAPI = async (data: typeof license.value) => {
      const formData = {};
      formData["pks"] = data.pks;
      formData["application"] = data.application;
      formData["due_date_license"] = data.due_date_license;
      formData["healthchecks"] = data.healthchecks;
      formData["file_pks"] = data.file_pks;
      formData["file_bast"] = data.file_bast;

      try {
        let response;
        ApiService.setHeader()
        const baseUrl = `/api/licenses`;
        if (mode === "edit" && data.id) {
          response = await ApiService.put(`${baseUrl}/${data.id}`, formData);
        } else {
          response = await ApiService.post(baseUrl, formData);
        }

        if (response?.data) {
          Swal.fire({
            text: "Form has been successfully submitted!",
            icon: "success",
            confirmButtonText: "Ok, got it!",
            customClass: { confirmButton: "btn btn-success" },
          });

          router.push({name:"license"});
        }
      } catch (error) {
        console.error("Error submit:", error);
        Swal.fire({
          text: "Gagal menyimpan data. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "Ok, got it!",
          customClass: { confirmButton: "btn btn-danger" },
        });
      }
    };

    const { validate, resetForm } = useForm({ validationSchema });

    const handleSubmit = async () => {
      const confirm = await Swal.fire({
        title: "Apakah kamu yakin?",
        text: "Data akan disimpan ke sistem.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, simpan!",
        cancelButtonText: "Batal",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-light",
        },
        buttonsStyling: false,
      });

      if (confirm.isConfirmed) {
        await submitAPI(license.value);
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

    return {
      handleSubmit,
      validationSchema,
      license,
      submitButtonRef,
      modalRef,
      isView,
      modalTitle,
      props,
      addHealthCheck,
      removeHealthCheck,
    };
  },
});
</script>