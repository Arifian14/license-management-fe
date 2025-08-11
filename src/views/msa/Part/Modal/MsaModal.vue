<template>
  <div>
    <BaseModal :title="modalTitle" :modalId="modalId">
      <VForm id="msa-form" class="form" @submit="handleSubmit" :validation-schema="validationSchema">
        <!-- Form Fields -->
        <div class="mb-3">
          <label for="applicationFormControlInput1" class="required form-label">Name</label>
          <Field
            name="name"
            type="text"
            class="form-control form-control-solid"
            placeholder="Name"
            v-model="form.name"
            :disabled="isView"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="name" />
            </div>
          </div>
        </div>

        <!-- Form Fields -->
        <div class="mb-3">
          <label for="applicationFormControlInput1" class="required form-label">Role</label>
          <Field name="role_id" as="select" class="form-control form-control-solid" :disabled="isView" v-model="form.role_id" @change="handleSelectionChange($event)">
            <option v-for="opt in props.roleData" :key="opt.id" :value="opt.id">{{ opt.role }}</option>
          </Field>
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="role_id" />
            </div>
          </div>
        </div>

        <!-- Form Fields -->
        <div class="mb-3">
          <label for="applicationFormControlInput1" class="required form-label">Rate</label>
          <!-- <Field
            name="rate"
            type="text"
            class="form-control form-control-solid"
            placeholder="Rate"
            v-model="form.rate"
            :disabled="true"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="rate" />
            </div>
          </div> -->
          <input type="text" id="budget_quota" :value="rupiahFormatter(amountFormattedBudget)" class="form-control form-control-solid" placeholder="Application input" readonly />
        </div>

        <!-- Form Fields -->
        <div class="mb-3">
          <label for="applicationFormControlInput1" class="required form-label">Project</label>
          <Field
            name="project"
            type="text"
            class="form-control form-control-solid"
            placeholder="Project"
            v-model="form.project"
            :disabled="isView"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="project" />
            </div>
          </div>
        </div>

        <!-- Form Fields -->
        <div class="mb-3">
          <label for="applicationFormControlInput1" class="required form-label">Group Position</label>
          <Field
            name="group_position"
            type="text"
            class="form-control form-control-solid"
            placeholder="Group Position"
            v-model="form.group_position"
            :disabled="isView"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="group_position" />
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
import {rupiahFormatter,reverseRupiahFormatter} from "../../../../../utils/utils";

interface IMsa {
  id?: number;
  role_id: number;
  name: string;
  rate: number;
  project: string;
  group_position: string;
}



export default defineComponent({
  components: { BaseModal, Field, ErrorMessage, VForm },
  props: {
    mode: {
      type: String,
      default: "create", // 'create' | 'edit' | 'view'
    },
    data: {
      type: Object as () => IMsa,
      default: () => ({}),
    },
    roleData: {
      type: Array as () => any,
      default: () => ([]),
    },
    modalId: {
      type: String,
      required: true,
    },
  },
  emits: ['submit-msa','close'],
  setup(props,{ emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const modalRef = ref<null | HTMLElement>(null);
    const amountFormattedBudget = ref<number>(0)

    const validationSchema = Yup.object().shape({
      name: Yup.string().required(),
      role_id: Yup.number().required(),
      project: Yup.string().required(),
      group_position: Yup.string().required(),
    });

    const form = reactive<IMsa>({
      id: 0,
      role_id: 0,
      name: "",
      rate: 0,
      project: "",
      group_position: ""
    });

    watch(
      [() => props.data, () => props.roleData],
      ([val,roleVal]) => {
        if (val.name != undefined) {
            console.log("masuk 1 child")
            Object.assign(form, val)
        } else {
            resetForm()
        }
      },
      { immediate: true }
    )

    const isView = computed(() => props.mode === "view");
    const modalTitle = computed(() => {
      if (props.mode === "edit") return "Edit MSA";
      if (props.mode === "view") return "Detail MSA";
      return "Tambah MSA";
    });

    function resetForm() {
        form.id = 0;
        form.role_id = 0;
        form.name = '';
        form.rate = 0;
        form.project = "";
        form.group_position = ""
    }

    function closeModal() {
      const modalEl = document.getElementById("modal-msa")
      if (modalEl) {
        const modal = Modal.getOrCreateInstance(modalEl);
        modal.hide();
        resetForm()
      }
    }


    const handleSubmit = () => {
      emit('submit-msa', props.mode,{...form})
      closeModal();
    }

    const handleSelectionChange = (e) => {
        const selected = props.roleData.find(item => item.id == e.target.value);
        form.rate = selected.rate;
        amountFormattedBudget.value = selected.rate;
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
      handleSelectionChange,
      rupiahFormatter,
      amountFormattedBudget
    };
  },
});
</script>