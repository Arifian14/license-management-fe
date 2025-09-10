<template>
  <div>
    <VForm id="license-form" class="form" @submit="handleSubmit" :validation-schema="validationSchema">
      <div class="card mb-5">
        <div class="card-body pb-0">
          <!-- Form Fields -->
          <FormField
            name="pks"
            type="text"
            label="No PKS"
            :required="true"
            :model-value="license.pks"
            :disabled="isView"
            @update:modelValue="license.pks = $event"
          />

          <div class="row">
            <div class="col-md-6">
              <FormField
                name="application"
                type="text"
                label="Application"
                :required="true"
                :model-value="license.application"
                :disabled="isView"
                @update:modelValue="license.application = $event"
              />
            </div>
            <div class="col-md-3">
              <FormField
                name="start_date_license"
                type="date"
                label="Start Date License"
                :required="true"
                :model-value="license.due_date_license"
                :disabled="isView"
                @update:modelValue="license.due_date_license = $event"
              />
            </div>
            <div class="col-md-3">
              <FormField
                name="due_date_license"
                type="date"
                label="Due Date License"
                :required="true"
                :model-value="license.due_date_license"
                :disabled="isView"
                @update:modelValue="license.due_date_license = $event"
              />
            </div>
          </div>

          <FileLinksSection 
            v-if="isView" 
            :file-pks="license.file_pks" 
            :file-bast="license.file_bast" 
          />

          <div class="row" v-if="!isView">
            <div class="col-md-6">
              <FormField
                name="file_pks"
                type="text"
                label="File PKS"
                :required="true"
                :model-value="license.file_pks"
                @update:modelValue="license.file_pks = $event"
              />
            </div>
            <div class="col-md-6">
              <FormField
                name="file_bast"
                type="text"
                label="File BAST"
                :required="true"
                :model-value="license.file_bast"
                @update:modelValue="license.file_bast = $event"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <label for="exampleFormControlInput1" class="form-label">Description *</label>
              <textarea name="description" id="description" class="form-control form-control-solid"></textarea>

              <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                      <ErrorMessage name="description" />
                  </div>
              </div>
            </div>
          </div>

          <HealthCheckList
            :healthchecks="license.healthchecks"
            :disabled="isView"
            @add="addHealthCheck"
            @remove="removeHealthCheck"
            @update:healthcheck="updateHealthCheck($event.index, $event.healthcheck)"
          />

          <FormActions v-if="!isView" @submit="handleSubmit" />
        </div>
      </div>
    </VForm>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Form as VForm } from "vee-validate";
import { useLicenseForm } from "@/views/license/composables/useLicenseForm";
import FormField from "@/components/Form/FormField.vue";
import HealthCheckList from "@/views/license/Part/HealthCheckList.vue";
import FileLinksSection from "@/views/license/Part/FileLinksSection.vue";
import FormActions from "@/views/license/Part/FormActions.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "LicenseForm",
  components: { 
    VForm, 
    FormField, 
    HealthCheckList, 
    FileLinksSection, 
    FormActions 
  },
  setup() {
    const router = useRouter();
    const {
      license,
      isView,
      validationSchema,
      addHealthCheck,
      removeHealthCheck,
      updateHealthCheck,
      submitAPI
    } = useLicenseForm();

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
          await submitAPI(license.value);
          
          Swal.fire({
            text: "Form has been successfully submitted!",
            icon: "success",
            confirmButtonText: "Ok, got it!",
            customClass: { confirmButton: "btn btn-success" },
          });

          router.push({ name: "license" });
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

    return {
      license,
      isView,
      validationSchema,
      handleSubmit,
      addHealthCheck,
      removeHealthCheck,
      updateHealthCheck
    };
  },
});
</script>