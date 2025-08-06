<template>
    <div class="card-body pt-15">
        <!--begin::Summary-->
        <div class="d-flex flex-center flex-column mb-5">
            <span :class="`badge badge-light-primary fs-3 fw-bold`" v-if="!isEdit">
                Full Action
            </span>
            <div class="row" v-if="isEdit">
                <label>Status :</label>
                <Field name="status" as="select" class="form-select" v-model="Formside.status">
                    <option disabled value="">Pilih Aplikasi</option>
                    <option value="appel">APPEL</option>
                    <option value="dvc">DVC</option>
                    <option value="mcs">MCS</option>
                </Field>
            </div>
            <h4 class="text-gray-600 mt-3">
                10231205324589173
            </h4>
            <hr class="w-50 m-2">
            <h5 class="text-gray-600">28 Juli 2025</h5>
        </div>
        <div class="separator separator-dashed my-3"></div>
        <!--end::Details content-->
        <div class="d-flex flex-stack fs-4 py-3">
            <div class="py-5 fs-6">

                <div class="fw-bold mt-5">Aplikasi</div>
                <div class="text-gray-600" v-if="!isEdit">APPEL</div>
                <div v-if="isEdit">
                    <Field name="type" as="select" class="form-select" v-model="Formside.aplikasi">
                        <option disabled value="">Pilih Aplikasi</option>
                        <option value="appel">APPEL</option>
                        <option value="dvc">DVC</option>
                        <option value="mcs">MCS</option>
                    </Field>
                </div>

                <div class="fw-bold mt-5">Kode Issue</div>
                <div class="text-gray-600" v-if="!isEdit">INC000000015111</div>
                <Field name="judul" v-if="isEdit" class="form-control" v-model="Formside.issue"
                    placeholder="Kode Issue" />

                <div class="fw-bold mt-5">Deploy Date</div>
                <div class="text-gray-600" v-if="!isEdit">-</div>
                <el-date-picker v-model="Formside.tgldeploy" type="date" :teleported="false" placeholder="Deploy Date"
                    v-if="isEdit" />
            </div>

        </div>
        <br><br><br><br>
        <div class="d-flex flex-center flex-column mb-5" v-if="!isEdit">
            <Button btnClass="btn btn-icon-white btn-text-white btn-active-light-success btn-bg-success"
                iconClass="fs-4" icon="arrow-left" :onClick="Back" label="Kembali" />
        </div>
        <div class="d-flex flex-center flex-row mb-5" v-if="isEdit">
            <Button btnClass="btn btn-icon-white btn-text-white btn-active-light-success btn-bg-success"
                iconClass="fs-4" icon="save-2" label="Simpan" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Field } from "vee-validate";
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';
import Button from "@/components/widget/Button.vue";

interface Formside {
    status: String | null,
    kodetiket: String | null,
    tglentry: String | null,
    aplikasi: String | null,
    issue: String | null,
    tgldeploy: String | null,
}

export default defineComponent({
    name: "accident-detail-side",
    props: {
        isEdit: {
            type: Boolean,
            required: true,
        },
        Formside: {
            type: Object as PropType<Formside>,
            required: true
        }
    },
    components: {
        Field,
        Button
    },
    setup() {
        const router = useRouter();
        const Back = () => {
            router.push({ name: 'accident' });
        }
        return {
            Back
        }
    }
});
</script>