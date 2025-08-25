<template>
  <div>
    <BaseModal :title="modalTitle" :modalId="modalId">
      <VForm id="role-form" class="form" @submit="handleSubmit" :validation-schema="validationSchema">
        <!-- Form Fields -->
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

        <!-- Form Fields -->
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, type PropType, type Ref, reactive } from "vue";
import { Field, ErrorMessage, Form as VForm, useForm } from "vee-validate";
import * as Yup from "yup";
import BaseModal from "@/components/widget/BaseModal.vue";
import { Modal } from "bootstrap";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {rupiahFormatter,reverseRupiahFormatter} from "@/utils/utils"

interface IRole {
  id?: number;
  role: string;
  rate: number;
}



export default defineComponent({
  components: { BaseModal, Field, ErrorMessage, VForm },
  props: {
    mode: {
      type: String,
      default: "create", // 'create' | 'edit' | 'view'
    },
    data: {
      type: Object as () => IRole,
      default: () => ({}),
    },
    modalId: {
      type: String,
      required: true,
    },
  },
  emits: ['submit-role','close'],
  setup(props,{ emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const modalRef = ref<null | HTMLElement>(null);
    const amountFormatted = ref<string>('') 

    const validationSchema = Yup.object().shape({
      role: Yup.string().required().label("Role Name"),
      rate: Yup.string().required().label("Rate"),
    });

    const form = reactive<IRole>({
      id: 0,
      rate: 0,
      role: ""
    });

    watch(
      () => props.data,
      (val) => {
        if (val.rate != undefined) {
          console.log('tidak bank')
          Object.assign(form, val)
          amountFormatted.value = rupiahFormatter(form.rate);
        } else {
          console.log('clear bank')
          resetForm()
        }
      },
      { immediate: true }
    )

    const isView = computed(() => props.mode === "view");
    const modalTitle = computed(() => {
      if (props.mode === "edit") return "Edit Role MSA";
      if (props.mode === "view") return "Detail Role MSA";
      return "Tambah Role MSA";
    });

    function resetForm() {
      form.id = 0
      form.role = ''
      form.rate = 0
      amountFormatted.value = "0";
    }

    function closeModal() {
      const modalEl = document.getElementById("modal-role")
      if (modalEl) {
        const modal = Modal.getOrCreateInstance(modalEl);
        modal.hide();
        resetForm()
      }
    }


    const handleSubmit = () => {
      emit('submit-role', props.mode,{...form})
      closeModal();
    }

    function formatRupiah() {
      if (amountFormatted.value) {
        form.rate = reverseRupiahFormatter(amountFormatted.value)
        amountFormatted.value = rupiahFormatter(form.rate)
      }
    }

    function unformatRupiah() {
      amountFormatted.value = form.rate?.toString() ?? ''
    }


    return {
      validationSchema,
      form,
      submitButtonRef,
      modalRef,
      isView,
      modalTitle,
      props,
      handleSubmit,
      unformatRupiah,
      formatRupiah,
      amountFormatted
    };
  },
});
</script>