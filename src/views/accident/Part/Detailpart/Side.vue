<template>
    <div class="card-body pt-15 h-full">
        <!--begin::Summary-->
        <div class="d-flex flex-center flex-column mb-5 ">
            <!-- <span :class="`badge badge-light-primary fs-3 fw-bold`" >
                Full Action
            </span> -->
            <span v-if="!isEdit" :class="`badge badge-light-${formside.status.statusName == 'OPEN' ? 'success' :
                formside.status.statusName == 'TEMPORARY ACTION' ? 'warning' : 'primary'
                } fs-3 fw-bold`">
                {{
                    formside.status.statusName == 'OPEN' ? 'Open' :
                        formside.status.statusName == 'TEMPORARY ACTION' ? 'Temporary Action' : 'Full Action'
                }}
            </span>
            <div class="row" v-if="isEdit">
                <label>Status :</label>
                <Field name="status" as="select" class="form-select" v-model="formside.status.id">
                    <option disabled value="">Pilih Status</option>
                    <option v-for="sts in listStatus" :key="sts.value" :value="sts.value">
                        {{ sts.label }}
                    </option>
                </Field>
            </div>
            <h4 class="text-gray-600 mt-3">
                {{ formside.kodetiket }}
            </h4>
            <hr class="w-50 m-2">
            <h5 class="text-gray-600">{{ formside.tglentry }}</h5>
        </div>
        <div class="separator separator-dashed my-3"></div>
        <!--end::Details content-->
        <div class="d-flex flex-stack fs-4 py-3">
            <div class="py-5 fs-6">

                <div class="fw-bold mt-5">Aplikasi</div>
                <div class="text-gray-600" v-if="!isEdit">{{ formside.aplikasi.applicationName }}</div>
                <div v-if="isEdit">
                    <Field name="type" as="select" class="form-select" v-model="formside.aplikasi.id">
                        <option disabled value="">Pilih Aplikasi</option>
                        <option v-for="apl in listAplikasi" :key="apl.value" :value="apl.value">
                            {{ apl.label }}
                        </option>
                    </Field>
                </div>

                <div class="fw-bold mt-5">PIC</div>
                <div class="text-gray-600" v-if="!isEdit">{{ formside.pic.personName }}</div>
                <div v-if="isEdit">
                    <Field name="type" as="select" class="form-select" v-model="formside.pic.id">
                        <option disabled value="">Pilih PIC</option>
                        <option v-for="pic in listPIC" :key="pic.value" :value="pic.value">
                            {{ pic.label }}
                        </option>
                    </Field>
                </div>

                <div class="fw-bold mt-5">Kode Issue</div>
                <div class="text-gray-600" v-if="!isEdit">{{ formside.issue }}</div>
                <Field name="judul" v-if="isEdit" class="form-control" v-model="formside.issue"
                    placeholder="Kode Issue" />

                <div class="fw-bold mt-5">Deploy Date</div>
                <!-- <div class="text-gray-600" v-if="!isEdit">{{ formatDateToYMD(formside.tgldeploy) || '-' }}</div> -->
                <div class="text-gray-600" v-if="!isEdit">{{ formside.tgldeploy || '-' }}</div>
                <el-date-picker v-model="formside.tgldeploy" type="date" :teleported="false" placeholder="Deploy Date"
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
                iconClass="fs-4" icon="save-2" label="Simpan" :onClick="edit" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Field } from "vee-validate";
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';
import Button from "@/components/widget/Button.vue";
import {formatDateToYMD,getDiffMonths,rupiahFormatter} from "@/utils/utils"

interface Formside {
    status: any,
    kodetiket: String | null,
    tglentry: String | null,
    aplikasi: any,
    issue: String | null,
    tgldeploy: String | null,
    pic: any,
}

export default defineComponent({
    name: "accident-detail-side",
    props: {
        isEdit: {
            type: Boolean,
            required: true,
        },
        formside: {
            type: Object as PropType<Formside>,
            required: true
        },
        listAplikasi: {
            type: Array as PropType<{ label: string; value: string }[]>,
            required: true
        },
        listStatus: {
            type: Array as PropType<{ label: string; value: string }[]>,
            required: true
        },
        listPIC: {
            type: Array as PropType<{ label: string; value: string }[]>,
            required: true
        }
    },
    components: {
        Field,
        Button
    },
    emits:['edit'],
    setup(props, {emit}) {
        const router = useRouter();
        const Back = () => {
            router.push({ name: 'accident' });
        }
        const edit = ()=>{
            emit('edit')
        }
        return {
            Back,
            edit,
            formatDateToYMD
        }
    }
});
</script>