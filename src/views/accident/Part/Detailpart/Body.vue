<template>
    <div class="card-body pt-5">
        <!--begin::Summary-->
        <div class="conteiner mb-5">
            <div class="row mt-2">
                <div class="col-md-6">
                    <h1 v-if="!isEdit">Judulnya apa ya?</h1>
                    <Field v-if="isEdit" name="judul" class="form-control" v-model="form.judul" placeholder="Judul" />
                </div>
                <div class="col-md-6">
                    <Button btnClass="btn btn-icon-white btn-active-light-success btn-bg-success" iconClass="fs-4"
                        icon="pencil" style="float: right;" :onClick="EditData" v-if="!isEdit"/>
                    <Button btnClass="btn btn-icon-white btn-active-light-danger btn-bg-danger" iconClass="fs-4"
                        icon="cross-circle" style="float: right;" :onClick="CancelEdit" v-if="isEdit"/>
                </div>
            </div>
            <div class="row mt-2">
                <h3>Detail Issue :</h3>
                <p v-if="!isEdit">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. In accusamus earum aspernatur
                    commodi delectus, alias eveniet libero nihil architecto recusandae optio suscipit. Ipsa
                    inventore corporis atque laboriosam repudiandae labore itaque.
                </p>
                <div class="col-md-12" v-if="isEdit">
                    <Field as="textarea" name="detail" class="form-control" v-model="form.detail"
                        placeholder="Detail Issue" />
                </div>
            </div>
            <div class="row mt-2">
                <h3>Link File :</h3>
                <a v-if="!isEdit"
                    href="https://teams.microsoft.com/l/message/19:37e6b6663a28444ba4515cb080666310@thread.v2/1753345270266?context=%7B%22contextType%22%3A%22chat%22%7D">
                    Gambar 1
                </a>
                <a v-if="!isEdit"
                    href="https://teams.microsoft.com/l/message/19:37e6b6663a28444ba4515cb080666310@thread.v2/1753345270266?context=%7B%22contextType%22%3A%22chat%22%7D">
                    Gambar 2
                </a>
                <DynamicLinkInput v-model="form.link" v-if="isEdit"/>
            </div>
            <hr>
            <div class="row mt-2">
                <h3>Temporary Action :</h3>
                <p v-if="!isEdit">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. In accusamus earum aspernatur
                    commodi delectus, alias eveniet libero nihil architecto recusandae optio suscipit. Ipsa
                    inventore corporis atque laboriosam repudiandae labore itaque.
                </p>
                <div class="col-md-12" v-if="isEdit">
                    <Field as="textarea" name="tempact" class="form-control" v-model="form.tempact"
                        placeholder="Temporary Action" />
                </div>
            </div>
            <div class="row mt-2">
                <h3>Full Action :</h3>
                <p v-if="!isEdit">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. In accusamus earum aspernatur
                    commodi delectus, alias eveniet libero nihil architecto recusandae optio suscipit. Ipsa
                    inventore corporis atque laboriosam repudiandae labore itaque.
                </p>
                <div class="col-md-12" v-if="isEdit">
                    <Field as="textarea" name="fullact" class="form-control" v-model="form.fullact"
                        placeholder="Full Action" />
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-md-6">
                    <h5>Status Reason :</h5>
                    <p v-if="!isEdit">Temporary Corrective Action</p>
                    <Field v-if="isEdit" name="reason" as="select" class="form-select" v-model="form.reason">
                        <option disabled value="">Pilih Status Reason</option>
                        <option>Automated Resolution Reported</option>
                        <option>Customer Follow-Up Required</option>
                        <option>Monitoring Incident</option>
                        <option>No Further Action Required</option>
                        <option>Temporary Corrective Action</option>
                    </Field>
                </div>
                <div class="col-md-6">
                    <h5>Incident Category :</h5>
                    <p v-if="!isEdit">Others</p>
                    <Field v-if="isEdit" name="category" as="select" class="form-select" v-model="form.category">
                        <option disabled value="">Pilih PIC</option>
                        <option>Availability</option>
                        <option>Capacity</option>
                        <option>Connectivity Issue</option>
                        <option>Functionality</option>
                        <option>Hardware Malfunction</option>
                        <option>Human Error</option>
                        <option>Others</option>
                        <option>Performance</option>
                        <option>Security</option>
                        <option>Software Bugs</option>
                        <option>User Access or Permission</option>
                    </Field>
                </div>
            </div>
            <br>
            <div class="row">
                <h5>Root Cause :</h5>
                <p v-if="!isEdit">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. In accusamus earum aspernatur
                    commodi delectus, alias eveniet libero nihil architecto recusandae optio suscipit. Ipsa
                    inventore corporis atque laboriosam repudiandae labore itaque.
                </p>
                <div class="col-md-12" v-if="isEdit">
                    <Field as="textarea" name="cause" class="form-control" v-model="form.cause"
                        placeholder="Root Cause" />
                </div>
            </div>
            <br>
            <div class="row">
                <h5>Resolution Note :</h5>
                <p v-if="!isEdit">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. In accusamus earum aspernatur
                    commodi delectus, alias eveniet libero nihil architecto recusandae optio suscipit. Ipsa
                    inventore corporis atque laboriosam repudiandae labore itaque.
                </p>
                <div class="col-md-12" v-if="isEdit">
                    <Field as="textarea" name="note" class="form-control" v-model="form.note"
                        placeholder="Resolution Note" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
import { Field } from "vee-validate";
import type { PropType } from 'vue';

import Button from "@/components/widget/Button.vue";
import DynamicLinkInput from '@/components/widget/DynamicInput.vue';

import { object } from "yup";

interface Form {
    judul: String | null,
    detail: String | null,
    link: string[],
    tempact: String | null,
    fullact: String | null,
    reason: String | null,
    category: String | null,
    cause: String | null,
    note: String | null,
}

export default defineComponent({
    name: "accident-detail-body",
    props: {
        isEdit: {
            type: Boolean,
            required: true,
        },
        form: {
            type: Object as PropType<Form>,
            required: true
        }
    },
    components: {
        Button,
        Field,
        DynamicLinkInput
    },
    setup() {
        const router = useRouter();
        const EditData = () => {
            router.push({ name: 'accident-detail', query: { mode: 'edit' } });
        }
        const CancelEdit = ()=>{
            router.push({ name: 'accident-detail' });
        }

        return {
            EditData,
            CancelEdit
        }
    }
});
</script>