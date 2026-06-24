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
                name="date_started"
                type="date"
                label="Start Date License"
                :required="true"
                :model-value="license.date_started"
                :disabled="isView"
                @update:modelValue="license.date_started = $event"
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
              <!-- Form Fields -->
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="applicationFormControlInput1" class="required form-label">Vendor</label>
                <Field name="vendor_id" as="select" class="form-control form-control-solid" :disabled="isView" v-model="license.vendor_id">
                  <option v-for="opt in vendorData" :key="opt.id" :value="opt.id">{{ opt.name }}</option>
                </Field>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="vendor_id" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <label for="exampleFormControlInput1" class="form-label">Description *</label>
              <textarea name="description" id="description" v-model="license.descriptions" class="form-control form-control-solid"></textarea>
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
          <div class="text-end pt-15 mb-5">
            <button
              type="button"
              @click="handleBack"
              class="btn btn-danger me-3"
              >
                  <span class="indicator-label"> Back </span>
            </button>
          </div>
          
        </div>
      </div>
    </VForm>
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,ref } from "vue";
import { Form as VForm,ErrorMessage,Field } from "vee-validate";
import { useLicenseForm } from "@/views/license/composables/useLicenseForm";
import FormField from "@/components/Form/FormField.vue";
import HealthCheckList from "@/views/license/Part/HealthCheckList.vue";
import FileLinksSection from "@/views/license/Part/FileLinksSection.vue";
import FormActions from "@/views/license/Part/FormActions.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useRouter } from 'vue-router';
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "LicenseForm",
  components: { 
    VForm, 
    FormField, 
    HealthCheckList, 
    FileLinksSection, 
    FormActions,
    Field,
    ErrorMessage
  },
  setup() {
    const router = useRouter();
    const vendorData:any = ref([]);
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
        title: "Are you sure?",
        text: "Data will be saved to the system",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Save!",
        cancelButtonText: "Cancel",
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

          router.push({
            name:"license",
            state:{
              flashMessage:{
                type:'success',
                text:'Data successfully saved',
                pks: license.value.pks
              }
            }
          });
        } catch (error) {
          Swal.fire({
            text: "Failed to saved. Please try again.",
            icon: "error",
            confirmButtonText: "Ok, got it!",
            customClass: { confirmButton: "btn btn-danger" },
          });
        }
      }
    };

    const fetchVendor = async () => {
      try {
        ApiService.setHeader()
        const url = `/api/master`
        const params = {
          type:'vendor_application'
        }
        const response = await ApiService.query(url,{params});
        const data = response.data.data;
        vendorData.value = data;
      } catch (error) {
        console.error("Failed to get data:", error);
        Swal.fire("Error", "Failed to get data.", "error");
      }
    }

    onMounted(() => {
      fetchVendor()
    })

    const handleBack = ()=>{
      router.push({ path: `/license`});
    }

    return {
      license,
      isView,
      validationSchema,
      handleSubmit,
      handleBack,
      vendorData,
      addHealthCheck,
      removeHealthCheck,
      updateHealthCheck
    };
  },
});
</script>