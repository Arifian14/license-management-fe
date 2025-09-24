<template>
  <div class="text-end pt-15 mb-5">
    <button
      type="button"
      @click="handleBack"
      id="btn-submit-msa"
      class="btn btn-danger me-3"
      >
          <span class="indicator-label"> Back </span>
    </button>
    <button type="submit" class="btn btn-primary me-3">
      <span class="indicator-label">Submit</span>
      <span class="indicator-progress">
        Please wait...
        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useRouter } from 'vue-router';
export default defineComponent({
  name: "FormActions",
  emits: ["submit"],
  setup(props, { emit }) {
    const router = useRouter();
    const handleBack = async () => {
    const confirm = await Swal.fire({
        title: 'Apakah kamu yakin untuk kembali ke halaman License?',
        text: 'Data akan di reset',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, back!',
        cancelButtonText: 'Batal',
        customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-light',
        },
        buttonsStyling: false,
    });

      if (confirm.isConfirmed) {
        router.push({ path: `/license`});
      }
    }
    return {
      handleBack
    };
  }
});
</script>