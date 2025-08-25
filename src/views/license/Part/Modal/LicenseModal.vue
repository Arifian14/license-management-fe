<template>
  <div>
    <BaseModal :title="modalTitle" :modalId="modalId">
      <VForm id="license-form" class="form" @submit="handleSubmit" :validation-schema="validationSchema">
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

        <div class="row mb-3">
          <div class="col-md-6">
            <label class="required form-label">Health Check Routine</label>
            <Field
              name="health_check_routine"
              type="date"
              class="form-control form-control-solid"
              placeholder="Health Check Routine"
              v-model="license.health_check_routine"
              :disabled="isView"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="health_check_routine" />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <label class="required form-label">Health Check Actual</label>
            <Field
              name="health_check_actual"
              type="date"
              class="form-control form-control-solid"
              placeholder="Health Check Actual"
              v-model="license.health_check_actual"
              :disabled="isView"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="health_check_actual" />
              </div>
            </div>
          </div>
        </div>

        <div v-if="isView">
          <div class="mb-3 d-flex">
            <a :href="`${license.file_pks}`" target="_blank" class="btn btn-sm btn-warning" style="width: 100%;">Link File PKS</a>
          </div>
          <div class="mb-3 d-flex">
            <a :href="`${license.file_bast}`" target="_blank" class="btn btn-sm btn-primary" style="width: 100%;">Link File BAST</a>
          </div>
        </div>

        <div class="mb-3" v-if="!isView">
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
        <div class="mb-3" v-if="!isView">
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

        <div class="text-center pt-15" v-if="!isView">
          <button type="submit" ref="submitButtonRef" class="btn btn-primary me-3">
            <span class="indicator-label">Submit</span>
            <span class="indicator-progress">
              Please wait...
              <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
        </div>
      </VForm>
    </BaseModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { Field, ErrorMessage, Form as VForm, useForm } from "vee-validate";
import * as Yup from "yup";
import BaseModal from "@/components/widget/BaseModal.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { hideModal } from "@/core/helpers/modal";
import ApiService from "@/core/services/ApiService";
import {formatDateToYMD} from "@/utils/utils"
import { useRouter } from 'vue-router';

interface LicenseData {
  id?: number;
  pks: string;
  application: string;
  due_date_license: string;
  health_check_routine: string;
  health_check_actual: string;
  file_pks: string;
  file_bast: string;
}



export default defineComponent({
  components: { BaseModal, Field, ErrorMessage, VForm },
  props: {
    mode: {
      type: String,
      default: "create", // 'create' | 'edit' | 'view'
    },
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
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const modalRef = ref<null | HTMLElement>(null);
    const router = useRouter();

    const validationSchema = Yup.object().shape({
      pks: Yup.string().required().label("No PKS"),
      application: Yup.string().required().label("Application"),
      due_date_license: Yup.string().required().label("Due Date License"),
      health_check_routine: Yup.string().required().label("Health Check Routine"),
      health_check_actual: Yup.string().required().label("Health Check Actual"),
      file_pks: Yup.string().required().label("File PKS"),
      file_bast: Yup.string().required().label("File BAST"),
    });

    const license = ref<LicenseData>({
      id: undefined,
      pks: "",
      application: "",
      due_date_license: "",
      health_check_routine: "",
      health_check_actual: "",
      file_pks: "",
      file_bast: "",
    });

    const isView = computed(() => props.mode === "view");
    const modalTitle = computed(() => {
      if (props.mode === "edit") return "Edit License";
      if (props.mode === "view") return "Detail License";
      return "Tambah License";
    });

    watch(
      () => props.data,
      (val:any) => {
        if (props.mode !== "create" && val) {
            license.value = {
                id: val.id,
                pks: val.pks,
                application: val.application,
                due_date_license: formatDateToYMD(val.dueDateLicense),
                health_check_routine: formatDateToYMD(val.healthCheckRoutine),
                health_check_actual: formatDateToYMD(val.healthCheckActual),
                file_pks: val.filePks,
                file_bast: val.fileBast,
              }
        }
      },
      { immediate: true }
    );

    const submitAPI = async (data: typeof license.value) => {
      const formData = {};
      formData["pks"] = data.pks;
      formData["application"] = data.application;
      formData["due_date_license"] = data.due_date_license;
      formData["health_check_routine"] = data.health_check_routine;
      formData["health_check_actual"] = data.health_check_actual;
      formData["file_pks"] = data.file_pks;
      formData["file_bast"] = data.file_bast;

      try {
        let response;
        ApiService.setHeader()
        const baseUrl = `/api/licenses`;
        if (props.mode === "edit" && data.id) {
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

          resetForm();
          hideModal(modalRef.value);
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

    return {
      handleSubmit,
      validationSchema,
      license,
      submitButtonRef,
      modalRef,
      isView,
      modalTitle,
      props
    };
  },
});
</script>