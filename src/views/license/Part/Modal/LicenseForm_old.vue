<template>
    <div>
        <Button label="Tambah Data" btnClass="btn btn-sm btn-light-primary" iconClass="fs-2" icon="plus"
            data-bs-toggle="modal" data-bs-target="#tambah-license" />

        <BaseModal title="Tambah License" modalId="tambah-license">
            <VForm id="license-form" class="form" @submit="handleSubmit" :validation-schema="validationSchema">
                <div class="mb-3">
                    <label for="applicationFormControlInput1" class="required form-label">No PKS</label>
                    <Field 
                        name="pks" 
                        type="text" 
                        class="form-control form-control-solid" 
                        placeholder="No PKS"
                        v-model="license.pks"
                    />
                    <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                            <ErrorMessage name="pks" />
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="required form-label">Application</label>
                        <Field 
                            name="application" 
                            type="text" 
                            class="form-control form-control-solid" 
                            placeholder="Application"
                            v-model="license.application"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="application" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="required form-label">Due Date License</label>
                        <Field 
                            name="due_date_license" 
                            type="date" 
                            class="form-control form-control-solid" 
                            placeholder="Due Date License"
                            v-model="license.due_date_license"
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
                        <label for="exampleFormControlInput1" class="required form-label">Health Check Routine</label>
                        <Field 
                            name="health_check_routine" 
                            type="date" 
                            class="form-control form-control-solid" 
                            placeholder="Health Check Routine"
                            v-model="license.health_check_routine"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="health_check_routine" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="required form-label">Health Check Actual</label>
                        <Field 
                            name="health_check_actual" 
                            type="date" 
                            class="form-control form-control-solid" 
                            placeholder="Health Check Actual"
                            v-model="license.health_check_actual"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="health_check_actual" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="required form-label">File PKS</label>
                        <Field 
                            name="file_pks" 
                            type="file" 
                            class="form-control form-control-solid" 
                            placeholder="File PKS"
                            :value="undefined"
                            @change="e => license.file_pks = e.target.files[0]"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="file_pks" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="required form-label">File BAST</label>
                        <Field 
                            name="file_bast" 
                            type="file" 
                            class="form-control form-control-solid" 
                            placeholder="File BAST"
                            :value="undefined"
                            @change="e => license.file_bast = e.target.files[0]"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="file_bast" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center pt-15">
                    <button
                    type="submit"
                    ref="submitButtonRef"
                    id="kt_modal_license"
                    class="btn btn-primary me-3"
                    >
                        <span class="indicator-label"> Submit </span>
                        <span class="indicator-progress">
                            Please wait...
                            <span
                                class="spinner-border spinner-border-sm align-middle ms-2"
                            ></span>
                        </span>
                    </button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                </div>
            </VForm>
        </BaseModal>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";
import { Field, ErrorMessage, Form as VForm, useForm } from "vee-validate";
import * as Yup from "yup";
import BaseModal from "@/components/widget/BaseModal.vue";
import Button from "@/components/widget/Button.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { hideModal } from "@/core/helpers/modal";
import ApiService from "@/core/services/ApiService";

interface LicenseData {
  pks: string;
  application: string;
  due_date_license: string;
  health_check_routine: string;
  health_check_actual: string;
  file_pks: any;
  file_bast: any;
}

export default defineComponent({
    components: {
        BaseModal,
        Field,
        ErrorMessage,
        VForm,
        Button
    },
    setup() {
        const submitButtonRef = ref<null | HTMLButtonElement>(null);
        const modalRef = ref<null | HTMLElement>(null);
        // const isView = computed(() => props.mode === "view");

        const validationSchema = Yup.object().shape({
            pks: Yup.string().required().label("No PKS"),
            application: Yup.string().required().label("Application"),
            due_date_license: Yup.string().required().label("Due Date License"),
            health_check_routine: Yup.string().required().label("Health Check Routine"),
            health_check_actual: Yup.string().required().label("Health Check Actual"),
            file_pks: Yup.mixed().required().label("File PKS"),
            file_bast: Yup.mixed().required().label("File BAST"),
        });

        const license = ref<LicenseData>({
            pks: "",
            application: "",
            due_date_license: "",
            health_check_routine: "",
            health_check_actual: "",
            file_pks: null as File | null,
            file_bast: null as File | null,
        });

        const submitAPI = async (data: typeof license.value) => {
            const formData = new FormData()
            formData.append('pks', data.pks)
            formData.append('application', data.application)
            formData.append('due_date_license', data.due_date_license)
            formData.append('health_check_routine', data.health_check_routine)
            formData.append('health_check_actual', data.health_check_actual)
            if (data.file_pks) formData.append('file_pks', data.file_pks);
            if (data.file_bast) formData.append('file_bast', data.file_bast);

            try {
                const url = `${import.meta.env.VITE_APP_API_URL}/licenses`;
                const response:any = await ApiService.post(url, formData);
                if (response?.data) {
                    Swal.fire({
                        text: "Form has been successfully submitted!",
                        icon: 'success',
                        confirmButtonText: 'Ok, got it!',
                        customClass: {
                            confirmButton: 'btn btn-success',
                        },
                    });

                    resetForm()
                    // Reset manual
                    Object.assign(license.value, {
                        pks: '',
                        application: '',
                        due_date_license: '',
                        health_check_routine: '',
                        health_check_actual: '',
                        file_pks: null,
                        file_bast: null,
                    });
                    hideModal(modalRef.value);
                }
            } catch (error) {
                Swal.fire({
                    text: 'Failed to save. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Ok, got it!',
                    customClass: {
                        confirmButton: 'btn btn-danger',
                    },
                });
            }
        };

        const { validate,resetForm } = useForm({
            validationSchema,
        })

        const handleSubmit = async () => {
            const confirm = await Swal.fire({
                title: 'Are you sure?',
                text: 'Data will be saved to the system.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'yes, save!',
                cancelButtonText: 'Cancel',
                customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-light',
                },
                buttonsStyling: false,
            });

            if (confirm.isConfirmed) {
                await submitAPI(license.value)
            }
        };

        return {
            handleSubmit,
            validationSchema,
            license,
            submitButtonRef,
            modalRef
        };
    },
});
</script>
