<template>
  <BaseModal :title="modalTitle" :modalId="modalId">
    <VForm id="role-form" class="form" @submit="handleSubmit" :validation-schema="validationSchema">
      <div class="mb-3">
        <label for="applicationFormControlInput1" class="required form-label">Role Name</label>
        <Field
          name="role"
          type="text"
          class="form-control form-control-solid"
          placeholder="Role"
          v-model="form.role"
          :disabled="isView"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="role" />
          </div>
        </div>
      </div>

      <div class="mb-3">
        <label for="applicationFormControlInput1" class="required form-label">Rate</label>
        <Field
          name="rate"
          type="text"
          class="form-control form-control-solid"
          placeholder="Rate"
          :disabled="isView"
          v-model="amountFormatted"
          @blur="formatRupiah"
          @focus="unformatRupiah"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="rate" />
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
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, reactive } from "vue";
import { Field, ErrorMessage, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import BaseModal from "@/components/widget/BaseModal.vue";
import { Modal } from "bootstrap";
import { rupiahFormatter, reverseRupiahFormatter } from "@/utils/utils";
import type { IMsaRole } from "../../types";

export default defineComponent({
  components: { BaseModal, Field, ErrorMessage, VForm },
  props: {
    mode: {
      type: String,
      default: "create",
    },
    data: {
      type: Object as () => IMsaRole,
      default: () => ({}),
    },
    modalId: {
      type: String,
      required: true,
    },
  },
  emits: ['submit-role', 'close'],
  setup(props, { emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const amountFormatted = ref<string>('');

    const validationSchema = Yup.object().shape({
      role: Yup.string().required().label("Role Name"),
      rate: Yup.string().required().label("Rate"),
    });

    const form = reactive<IMsaRole>({
      id: undefined,
      role: "",
      rate: 0
    });

    watch(
      () => props.data,
      (val) => {
        if (val.role) {
          Object.assign(form, val);
          amountFormatted.value = rupiahFormatter(form.rate);
        } else {
          resetForm();
        }
      },
      { immediate: true }
    );

    const isView = computed(() => props.mode === "view");
    const modalTitle = computed(() => {
      if (props.mode === "edit") return "Edit Role MSA";
      if (props.mode === "view") return "Detail Role MSA";
      return "Tambah Role MSA";
    });

    const resetForm = () => {
      form.id = undefined;
      form.role = '';
      form.rate = 0;
      amountFormatted.value = "0";
    };

    const closeModal = () => {
      const modalEl = document.getElementById(props.modalId);
      if (modalEl) {
        const modal = Modal.getOrCreateInstance(modalEl);
        modal.hide();
        resetForm();
      }
    };

    const handleSubmit = () => {
      emit('submit-role', props.mode, { ...form });
      closeModal();
    };

    const formatRupiah = () => {
      if (amountFormatted.value) {
        form.rate = reverseRupiahFormatter(amountFormatted.value);
        amountFormatted.value = rupiahFormatter(form.rate);
      }
    };

    const unformatRupiah = () => {
      amountFormatted.value = form.rate?.toString() ?? '';
    };

    return {
      validationSchema,
      form,
      submitButtonRef,
      isView,
      modalTitle,
      handleSubmit,
      unformatRupiah,
      formatRupiah,
      amountFormatted
    };
  },
});
</script>