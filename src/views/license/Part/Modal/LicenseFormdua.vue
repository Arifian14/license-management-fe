<template>
  <div>
    <BaseModal :title="modalTitle" modalId="tambah-license">
      <VForm id="license-form" class="form" @submit="handleSubmit" :validation-schema="validationSchema">
        <div class="mb-3">
          <label class="required form-label">No PKS</label>
          <Field
            name="pks"
            type="text"
            class="form-control form-control-solid"
            placeholder="No PKS"
            v-model="license.pks"
            :disabled="mode === 'view'"
          />
          <div class="fv-help-block"><ErrorMessage name="pks" /></div>
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
              :disabled="mode === 'view'"
            />
            <div class="fv-help-block"><ErrorMessage name="application" /></div>
          </div>
          <div class="col-md-6">
            <label class="required form-label">Due Date License</label>
            <Field
              name="due_date_license"
              type="date"
              class="form-control form-control-solid"
              v-model="license.due_date_license"
              :disabled="mode === 'view'"
            />
            <div class="fv-help-block"><ErrorMessage name="due_date_license" /></div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label class="required form-label">Health Check Routine</label>
            <Field
              name="health_check_routine"
              type="date"
              class="form-control form-control-solid"
              v-model="license.health_check_routine"
              :disabled="mode === 'view'"
            />
            <div class="fv-help-block"><ErrorMessage name="health_check_routine" /></div>
          </div>
          <div class="col-md-6">
            <label class="required form-label">Health Check Actual</label>
            <Field
              name="health_check_actual"
              type="date"
              class="form-control form-control-solid"
              v-model="license.health_check_actual"
              :disabled="mode === 'view'"
            />
            <div class="fv-help-block"><ErrorMessage name="health_check_actual" /></div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label class="required form-label">File PKS</label>
            <Field
              name="file_pks"
              type="file"
              class="form-control form-control-solid"
              :value="undefined"
              @change="e => license.file_pks = e.target.files[0]"
              :disabled="mode === 'view'"
            />
            <div class="fv-help-block"><ErrorMessage name="file_pks" /></div>
          </div>
          <div class="col-md-6">
            <label class="required form-label">File BAST</label>
            <Field
              name="file_bast"
              type="file"
              class="form-control form-control-solid"
              :value="undefined"
              @change="e => license.file_bast = e.target.files[0]"
              :disabled="mode === 'view'"
            />
            <div class="fv-help-block"><ErrorMessage name="file_bast" /></div>
          </div>
        </div>

        <div class="text-center pt-15" v-if="mode !== 'view'">
          <button type="submit" ref="submitButtonRef" class="btn btn-primary me-3">
            <span class="indicator-label"> Submit </span>
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
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2";
import { hideModal } from "@/core/helpers/modal";
import type { PropType } from 'vue';

interface LicenseData {
  id?: number;
  pks: string;
  application: string;
  due_date_license: string;
  health_check_routine: string;
  health_check_actual: string;
  file_pks: File | null;
  file_bast: File | null;
}

export default defineComponent({
  props: {
    mode: {
      type: String as PropType<'add' | 'edit' | 'view'>,
      required: true
    },
    modelValue: {
      type: Object as PropType<Partial<LicenseData>>,
      default: () => ({})
    }
  },
  emits: ['update:modelValue', 'submitted'],
  setup(props, { emit }) {
    const license = ref<LicenseData>({
      pks: '',
      application: '',
      due_date_license: '',
      health_check_routine: '',
      health_check_actual: '',
      file_pks: null,
      file_bast: null
    });

    const modalTitle = computed(() => {
      if (props.mode === 'edit') return 'Edit License';
      if (props.mode === 'view') return 'Detail License';
      return 'Tambah License';
    });

    watch(() => props.modelValue, (val) => {
      if (val) {
        license.value = {
          pks: val.pks || '',
          application: val.application || '',
          due_date_license: val.due_date_license || '',
          health_check_routine: val.health_check_routine || '',
          health_check_actual: val.health_check_actual || '',
          file_pks: null,
          file_bast: null,
        };
      }
    }, { immediate: true });

    const validationSchema = Yup.object().shape({
      pks: Yup.string().required(),
      application: Yup.string().required(),
      due_date_license: Yup.string().required(),
      health_check_routine: Yup.string().required(),
      health_check_actual: Yup.string().required(),
      file_pks: Yup.mixed().required(),
      file_bast: Yup.mixed().required(),
    });

    const { resetForm } = useForm({ validationSchema });
    const submitButtonRef = ref();
    const modalRef = ref();

    const submitAPI = async (data: typeof license.value) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]:any) => {
        if (value) formData.append(key, value);
      });

      const baseURL = import.meta.env.VITE_APP_API_URL;
      const url = props.mode === 'edit'
        ? `${baseURL}/licenses/${props.modelValue?.id}`
        : `${baseURL}/licenses`;

      const method = props.mode === 'edit' ? 'put' : 'post';

      try {
        const response = await ApiService[method](url, formData);
        if (response?.data) {
          Swal.fire('Berhasil!', 'Data berhasil disimpan.', 'success');
          emit('submitted');
          hideModal(modalRef.value);
        }
      } catch (err) {
        Swal.fire('Gagal!', 'Terjadi kesalahan saat menyimpan.', 'error');
      }
    };

    const handleSubmit = async () => {
      const confirm = await Swal.fire({
        title: 'Apakah kamu yakin?',
        text: 'Data akan disimpan ke sistem.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, simpan!',
        cancelButtonText: 'Batal',
      });

      if (confirm.isConfirmed) await submitAPI(license.value);
    };

    return {
      license,
      validationSchema,
      handleSubmit,
      submitButtonRef,
      modalRef,
      mode: props.mode,
      modalTitle
    };
  }
});
</script>
