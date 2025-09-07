<template>
  <div class="row gy-5 g-xl-8">
    <div class="mb-5 mb-xl-8 card">
      <MsaForm
        :msa="msa"
        :validation-schema="validationSchema"
        @submit="handleSubmit"
        @cancel="handleCancel"
        @update:field="updateField"
        @add-role="openRoleModal('create')"
        @edit-role="openRoleModal('edit', $event)"
        @remove-role="removeRole"
        @date-started-changed="handleDateStartedChange"
      />
    </div>
  </div>

  <RoleModal
    ref="roleModalRef"
    :mode="roleModalMode"
    :data="selectedRole"
    modalId="role-modal"
    @submit-role="handleRoleSubmit"
  />
</template>

<script lang="ts">
import { Modal } from 'bootstrap'
import { defineComponent, ref } from "vue";
import { useRouter } from 'vue-router';
import MsaForm from "@/views/msa//components/MsaForm/MsaForm.vue";
import RoleModal from "@/views/msa//components/modals/RoleModal.vue";
import { useMsaForm } from "@/views/msa/composables/useMsaForm";
import { useMsaApi } from "@/views/msa/composables/useMsaApi";
import Swal from "sweetalert2";
import type { IMsaRole } from "./types";

export default defineComponent({
  name: "MsaFormPage",
  components: { MsaForm, RoleModal },
  setup() {
    const router = useRouter();
    const { msa, validationSchema, addRole, removeRole, updateRole } = useMsaForm();
    const { createMsa, loading, error } = useMsaApi();
    
    const roleModalRef = ref();
    const roleModalMode = ref<'create' | 'edit' | 'view'>('create');
    const selectedRole = ref<IMsaRole>({ role: "", rate: 0 });

    const openRoleModal = (mode: 'create' | 'edit', role?: IMsaRole) => {
      roleModalMode.value = mode;
      if (mode === 'edit' && role) {
        selectedRole.value = { ...role };
      } else {
        selectedRole.value = { role: "", rate: 0 };
      }
      
      setTimeout(() => {
        const modalEl = document.getElementById('role-modal');
        if (modalEl) {
          const modal = new Modal(modalEl);
          modal.show();
        }
      }, 100);
    };

    const handleRoleSubmit = (mode: string, role: IMsaRole) => {
      if (mode === 'create') {
        addRole(role);
      } else if (mode === 'edit') {
        const index = msa.roles.findIndex(r => r.id === role.id);
        if (index !== -1) {
          updateRole(index, role);
        }
      }
    };

    const updateField = ({ field, value }: { field: string, value: any }) => {
      (msa as any)[field] = value;
    };

    const handleDateStartedChange = () => {
      msa.date_ended = '';
    };

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
        try {
          await createMsa(msa);
          
          Swal.fire({
            text: "Form has been successfully submitted!",
            icon: "success",
            confirmButtonText: "Ok, got it!",
            customClass: { confirmButton: "btn btn-success" },
          });

          router.push({ name: "msa" });
        } catch (error) {
          Swal.fire({
            text: "Gagal menyimpan data. Silakan coba lagi.",
            icon: "error",
            confirmButtonText: "Ok, got it!",
            customClass: { confirmButton: "btn btn-danger" },
          });
        }
      }
    };

    const handleCancel = async () => {
      const confirm = await Swal.fire({
        title: 'Apakah kamu yakin?',
        text: 'Data akan di reset',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, cancel!',
        cancelButtonText: 'Batal',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-light',
        },
        buttonsStyling: false,
      });

      if (confirm.isConfirmed) {
        // Reset form logic
        Object.assign(msa, {
          pks: "",
          date_started: "",
          date_ended: "",
          people_quota: 0,
          budget_quota: 0,
          file_pks: "",
          file_bast: "",
          roles: []
        });
      }
    };

    return {
      msa,
      validationSchema,
      roleModalRef,
      roleModalMode,
      selectedRole,
      loading,
      error,
      openRoleModal,
      handleRoleSubmit,
      updateField,
      handleDateStartedChange,
      handleSubmit,
      handleCancel,
      removeRole
    };
  }
});
</script>