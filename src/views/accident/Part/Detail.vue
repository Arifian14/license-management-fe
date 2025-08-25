<template>
    <div class="d-flex flex-column flex-xl-row mb-10">
        <!--begin::Sidebar-->
        <div class="flex-column flex-lg-row-auto w-100 w-xl-350px ">
            <!--begin::Card-->
            <div class="card">
                <Side :isEdit="isEditMode" :formside="formside" :listAplikasi="listAplikasi" :listStatus="listStatus"
                    :listPIC="listPIC" @edit="EditData" />
            </div>
            <!--end::Card-->
        </div>
        <!--end::Sidebar-->

        <!--begin::Content-->
        <div class="flex-lg-row-fluid ms-lg-15">
            <div class="card">
                <DetailBody :isEdit="isEditMode" :form="form" />
            </div>

        </div>
        <!--end::Content-->
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import Side from "./Detailpart/Side.vue";
import DetailBody from "./Detailpart/Body.vue";
import ApiService from "@/core/services/ApiService";
import Swal from 'sweetalert2';

export default defineComponent({
    name: "detail-accident",
    components: {
        Side,
        DetailBody
    },
    setup() {
        const listAplikasi = ref<{ label: string; value: string }[]>([]);
        const listStatus = ref<{ label: string; value: string }[]>([]);
        const listPIC = ref<{ label: string; value: string }[]>([]);
        const route = useRoute();
        const router = useRouter();
        let realtglentry
        const isEditMode = computed(() => route.query.mode === 'edit');
        const idData = route.query.id
        const form = ref({
            judul: '',
            detail: '',
            link: [] as string[],
            tempact: '',
            fullact: '',
            reason: '',
            category: '',
            cause: '',
            note: '',
        });
        const formside = ref(<any>{
            status: '',
            kodetiket: '',
            tglentry: '',
            aplikasi: '',
            issue: '',
            tgldeploy: '',
            pic: ''
        })
        const formattedDate = (isoDate) => {
            const date = new Date(isoDate);
            return new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }).format(date);
        }
        const getDetail = async (id) => {
            ApiService.setHeader()
            const respon = await ApiService.get('/api/incidents/', id)
            form.value.judul = respon.data.data.title
            form.value.detail = respon.data.data.detail
            form.value.tempact = respon.data.data.temporaryAction
            form.value.fullact = respon.data.data.fullAction
            form.value.reason = respon.data.data.rootCauseReason
            form.value.category = respon.data.data.category
            form.value.cause = respon.data.data.rootCause
            form.value.note = respon.data.data.note
            form.value.link = respon.data.data.links

            formside.value.status = respon.data.data.status
            formside.value.kodetiket = respon.data.data.ticketNumber
            formside.value.tglentry = formattedDate(respon.data.data.entryDate)
            realtglentry = respon.data.data.entryDate
            formside.value.aplikasi = respon.data.data.application
            formside.value.issue = respon.data.data.issueCode
            formside.value.pic = respon.data.data.personInCharge
            formside.value.tgldeploy = respon.data.data.deployDate
        };
        const getListAplikasi = async () => {
            const response = await ApiService.get('/api/master/applications');
            listAplikasi.value = response.data.data.map((item: any) => ({
                label: item.applicationName,
                value: item.id.toString(),
            }));

            
        }

        const getListStatus = async () => {
            const response = await ApiService.get('/api/master/statuses');
            listStatus.value = response.data.data.map((item: any) => ({
                label: item.statusName,
                value: item.id.toString(),
            }));
        }

        const getListPIC = async () => {
            const response = await ApiService.get('/api/master/person-in-charges');
            listPIC.value = response.data.data.map((item: any) => ({
                label: item.personName,
                value: item.id.toString(),
            }));
        }
        const EditData = () => {
            const payload = {
                "ticket_number": formside.value.kodetiket,
                "entry_date": realtglentry,
                "application_id": formside.value.aplikasi.id,
                "person_in_charge_id": formside.value.pic.id,
                "issue_code": formside.value.issue,
                "title": form.value.judul,
                "detail": form.value.detail,
                "status_id": formside.value.status.id,
                "temporary_action": form.value.tempact,
                "full_action": form.value.fullact,
                "root_cause_reason": form.value.reason,
                "category": form.value.category,
                "root_cause": form.value.cause,
                "note": form.value.note,
                "link": form.value.link,
                "deploy_date": formside.value.tgldeploy
            }
            console.log(payload)
            const id = idData != null ? idData.toString() : '';
            ApiService.setHeader()
            ApiService.update('/api/incidents/', id, payload)
                .then((response) => {
                    Swal.fire('Terhapus!', 'Data berhasil diubah.', 'success');
                    getDetail(idData)
                    router.push({ name: 'accident-detail', query: { id: idData } });
                })
        }
        onMounted(() => {
            getDetail(idData)
            getListAplikasi()
            getListStatus()
            getListPIC()
        })

        return {
            isEditMode,
            form,
            formside,
            listAplikasi,
            listStatus,
            listPIC,
            EditData
        };

    },

});
</script>
