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
                            <Field name="type" as="select" class="form-select" v-model="form.aplikasi">
                                <option disabled value="">Pilih Aplikasi</option>
                                <option value="appel">APPEL</option>
                                <option value="dvc">DVC</option>
                                <option value="mcs">MCS</option>
                            </Field>
                            <ErrorMessage name="aplikasi" class="text-danger" />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">PIC</label>
                            <Field name="type" as="select" class="form-select" v-model="form.pic">
                                <option disabled value="">Pilih PIC</option>
                                <option value="rizky">Rizky</option>
                                <option value="deris">Deris</option>
                                <option value="zolla">Zolla</option>
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

                    <div v-for="(link, index) in form.link" :key="index" class="input-group mb-2">
                        <Field name="link" class="form-control" v-model="form.link[index]" 
                        :placeholder="`Link ${index + 1}`"/>

                        <!-- Tombol tambah hanya di input terakhir -->
                        <Button v-if="index === form.link.length - 1" btnClass="btn btn-success input-group-text"
                            :onClick="addField" iconClass="fs-2" icon="plus">
                        </Button>

                        <!-- Tombol hapus muncul jika lebih dari satu input -->
                        <Button v-if="form.link.length > 1" btnClass="btn btn-danger input-group-text"
                            :onClick="removeField" :params="index"  iconClass="fs-2" icon="trash-square">
                        </Button>
                    </div>

                    <!-- Menampilkan hasil gabungan -->
                    <!-- <div class="mt-3">
                        <label class="form-label">Gabungan Link:</label>
                        <div class="form-control">{{ combinedLinks }}</div>
                    </div> -->

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
import * as Yup from "yup";
import BaseModal from "@/components/widget/BaseModal.vue";
import Button from "@/components/widget/Button.vue";

export default defineComponent({
    components: {
        BaseModal,
        Field,
        ErrorMessage,
        VForm,
        Button
    },
    setup() {
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
            console.log('masuk')
        };


        const removeField = (index: number) => {
            if (form.link.length > 1) {
                form.link.splice(index, 1);
            }
        };


        const combinedLinks = computed(() => {
            return form.link.filter(link => link.trim() !== '').join(', ');
        });


        const schema = Yup.object({
            firstName: Yup.string().required("Wajib isi nama"),
            address: Yup.string().required("Wajib isi alamat"),
            type: Yup.string().required("Wajib pilih jenis alamat"),
        });

        const handleSubmit = () => {
            console.log("Form Submitted:", form);
        };

        return {
            form,
            schema,
            handleSubmit,
            addField,
            removeField,
            combinedLinks,

        };
    },
});
</script>
