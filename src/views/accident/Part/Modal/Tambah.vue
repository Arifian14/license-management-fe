<template>
    <div>
        <!-- <button class="btn btn-primary" >
            Tambah Alamat
        </button> -->
        <Button label="Tambah Data" btnClass="btn btn-sm btn-light-primary" iconClass="fs-2" icon="plus"
            data-bs-toggle="modal" data-bs-target="#tambah-accident" />

        <BaseModal title="Tambah Accident" modalId="tambah-accident">
            <VForm id="address-form" @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors }">
                <div class="mb-3">
                    <div class="row">
                        <div class="col-md-6">
                            <label class="form-label">Aplikasi</label>
                            <Field name="aplikasi" as="select" class="form-select" v-model="form.aplikasi">
                                <option disabled value="">Pilih Aplikasi</option>
                                <option v-for="apl in listAplikasi" :key="apl.value" :value="apl.value">
                                    {{ apl.label }}
                                </option>
                            </Field>
                            <ErrorMessage name="aplikasi" class="text-danger" />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">PIC</label>
                            <Field name="pic" as="select" class="form-select" v-model="form.pic">
                                <option disabled value="">Pilih PIC</option>
                                <option v-for="pic in listPIC" :key="pic.value" :value="pic.value">
                                    {{ pic.label }}
                                </option>
                            </Field>
                            <ErrorMessage name="pic" class="text-danger" />
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Kode Issue</label>
                    <Field name="issue" class="form-control" v-model="form.issue" />
                    <ErrorMessage name="issue" class="text-danger" />
                </div>

                <div class="mb-3">
                    <label class="form-label">Judul Issue</label>
                    <Field name="judul" class="form-control" v-model="form.judul" />
                    <ErrorMessage name="judul" class="text-danger" />
                </div>

                <div class="mb-3">
                    <label class="form-label">Detail Issue</label>
                    <Field name="detail" class="form-control" v-model="form.detail" />
                    <ErrorMessage name="detail" class="text-danger" />
                </div>

                <div class="mb-3">
                    <label class="form-label">Link File</label>
                    <DynamicLinkInput v-model="form.link" />

                </div>

            </VForm>

            <template #footer>
                <button type="submit" class="btn btn-primary" form="address-form">Simpan</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            </template>
        </BaseModal>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { Field, ErrorMessage, Form as VForm } from "vee-validate";
import type { PropType } from 'vue';
import { hideModal } from "@/core/helpers/modal";
import * as Yup from "yup";
import BaseModal from "@/components/widget/BaseModal.vue";
import Button from "@/components/widget/Button.vue";
import DynamicLinkInput from '@/components/widget/DynamicInput.vue';
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
    components: {
        BaseModal,
        Field,
        ErrorMessage,
        VForm,
        Button,
        DynamicLinkInput
    },
    props: {
        listAplikasi: {
            type: Array as PropType<{ label: string; value: string }[]>,
            required: true
        },
        listPIC: {
            type: Array as PropType<{ label: string; value: string }[]>,
            required: true
        }
    },
    emits:['add'],
    setup(props, { emit }) {
        const form = reactive({
            aplikasi: "",
            pic: "",
            issue: "",
            judul: "",
            detail: "",
            link: <string[]>([''])

        });


        const addField = () => {
            form.link.push('');
        };


        const removeField = (index: number) => {
            if (form.link.length > 1) {
                form.link.splice(index, 1);
            }
        };


        const schema = Yup.object({
            aplikasi: Yup.string().required("Aplikasi wajib di pilih"),
            pic: Yup.string().required("PIC wajib di pilih"),
            issue: Yup.string().required("Kode issue wajib di isi"),
            judul: Yup.string().required("Judul issue wajib di isi"),
            detail: Yup.string().required("Detail issue wajib di isi"),
        });

        const handleSubmit = () => {
            console.log("Form Submitted:", form);

            const now = new Date();
            const isoString = now.toISOString();

            const payload = {
                ticket_number: 'FCS20250806-1',
                entry_date: isoString,
                application_id: form.aplikasi,
                person_in_charge_id: form.pic,
                title: form.judul,
                status_id: 1,
                issue_code: form.issue,
                detail: form.detail,
                link: form.link
            };
            ApiService.setHeader()
            ApiService.post('/api/incidents', payload)
                .then((respon) => {
                    if (respon.data.statusCode == 201) {
                        Swal.fire({
                            text: "Data berhasil Ditambahkan",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Wokeh bos",
                            heightAuto: false,
                            customClass: {
                                confirmButton: "btn btn-primary",
                            },
                        }).then(() => {
                            const modalEl = document.getElementById('tambah-accident');
                            emit('add');
                            hideModal(modalEl);
                        });
                    } else {
                        Swal.fire({
                            text: "ERROR Bro !!!!",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Coba Maneh",
                            heightAuto: false,
                            customClass: {
                                confirmButton: "btn fw-semibold btn-light-danger",
                            },
                        }).then(() => {
                        });
                    }
                })

        };

        return {
            form,
            schema,
            handleSubmit,
            addField,
            removeField,

        };
    },
});
</script>
