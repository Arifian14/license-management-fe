<template>
<!--begin::Alert-->
<div v-if="flash" class="alert alert-dismissible bg-success d-flex flex-column flex-sm-row p-5 mb-10">
    <!--begin::Icon-->
    <i class="ki-duotone ki-pencil fs-2hx text-light me-4 mb-5 mb-sm-0"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i>
    <!--end::Icon-->

    <!--begin::Wrapper-->
    <div class="d-flex flex-column text-light pe-0 pe-sm-10">
        <!--begin::Title-->
        <h4 class="mb-2 light" style="color: white;">{{ flash.text }}</h4>
        <!--end::Title-->

        <!--begin::Content-->
        <span>No PKS : {{ flash.pks }}</span>
        <!--end::Content-->
    </div>
    <!--end::Wrapper-->

    <!--begin::Close-->
    <button type="button" class="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto" data-bs-dismiss="alert">
        <i class="ki-duotone ki-cross fs-1 text-light"><span class="path1"></span><span class="path2"></span></i>
    </button>
    <!--end::Close-->
</div>
<!--end::Alert-->

    <div class="row gy-5 g-xl-8">
        <div class="mb-5 mb-xl-8 card">
            <!-- start header -->
            <!-- Header Component -->
            <LicenseHeader @add="handleAdd" />
            
            <!-- Filter Component -->
            <!-- <LicenseFilter 
                v-model:selectedFilter="selectedFilter"
                v-model:textfilter="textfilter"
                v-model:datefilter="datefilter"
                @search="mencariData"
            /> -->
            
            <!-- Body Component: list aplikasi (mode application) -->
            <LicenseApplicationBody
                v-if="viewMode === 'application'"
                :columns="appColumns"
                :items="items"
                :count="count"
                :itemsPerPage="itemsPerPage"
                :pageCount="totalPages"
                @detail="detail"
                @search="handleSearch"
                @page-change="pageChange"
            />

            <!-- Body Component: list PKS (mode default / detail per aplikasi) -->
            <LicenseBody
                v-else
                :columns="columns"
                :items="items"
                @remove="remove"
                @view="view"
                @edit="edit"
                @search="handleSearch"
                @page-change="pageChange"
                :count="count"
                :itemsPerPage="itemsPerPage"
                :pageCount="totalPages"
                :initialStatus="initialStatus"
            />
        </div>
    </div>
</template>

<script lang="ts">
import {onBeforeMount, onMounted, reactive, ref, watch,defineComponent} from "vue";
import { useRouter,useRoute } from 'vue-router';
import LicenseHeader from "./Part/Header.vue";
import LicenseFilter from "./Part/Filter.vue";
import LicenseBody from "./Part/Body.vue";
import LicenseApplicationBody from "./Part/BodyApplication.vue";
import ApiService from "@/core/services/ApiService";
import {formatDateToYMD,formatTanggal} from "@/utils/utils"

export default defineComponent({
    name: "pages-accident",
    components: {
        LicenseHeader,
        LicenseFilter,
        LicenseBody,
        LicenseApplicationBody
    },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const flash = ref<any>(null);
        // Status filter awal dari query param (mis. dari klik kartu dashboard PKS Under 1M -> ?status=under_1_month)
        const initialStatus = ref(
            typeof route.query.status === 'string' ? route.query.status : ''
        );
        const selectedFilter = ref('date');
        const textfilter = ref('')
        const items = ref([]);
        const searchParams = ref({});
        const count = ref(0)
        const itemsPerPage = ref(0)
        const totalPages = ref(0)

        const datefilter = ref({
            start: null,
            end: null,
        });

        const columns = [
            { key: 'pks', label: 'PKS' },
            { key: 'application', label: 'Aplikasi' },
            { key: 'dateStarted', label: 'Start Date' },
            { key: 'dueDateLicense', label: 'Due Date' },
            { key: 'status', label: 'Status', slot:'status' },
            { key: 'action', label: '', slot: 'action', headerClass: 'text-end rounded-end'},
        ];

        // Kolom untuk mode list aplikasi (grouping per nama aplikasi)
        const appColumns = [
            { key: 'application', label: 'Aplikasi' },
            { key: 'totalPks', label: 'Jml PKS' },
            { key: 'nearestDueDate', label: 'Jatuh Tempo Terdekat' },
            { key: 'status', label: 'Status', slot: 'status' },
            { key: 'action', label: '', slot: 'action', headerClass: 'text-end rounded-end' },
        ];

        // Mode halaman ditentukan query param:
        //   view=application (tanpa application) -> list aplikasi
        //   selain itu (termasuk ada ?application=) -> list PKS
        const viewMode = ref<'pks' | 'application'>('pks');
        // Status band & aplikasi aktif, dibawa saat search/paging/drill-down
        const currentStatus = ref(initialStatus.value);
        const currentApplication = ref(
            typeof route.query.application === 'string' ? route.query.application : ''
        );

        const getData = async (params: any = {}) => {
            ApiService.setHeader()
            const url = `/api/licenses`
            try {
                const defaultParams = {
                    offset: 1,
                    limit: 3,
                };
                const mergedParams = { ...defaultParams, ...params };
                const response = await ApiService.query(url, {
                    params: mergedParams
                });

                const data = response.data.data;
                items.value = data.map(item => {
                    let status = item.status == 'red' ? 'License expires in ≤ 1 month' : item.status == 'yellow' ? 'License expires in > 1 month and ≤ 3 months' : '';
                    return {
                        id:item.id,
                        pks:item.pks,
                        bastFileUrl:item.bastFileUrl,
                        application:item.application,
                        dueDateLicense:formatTanggal(formatDateToYMD(item.dueDateLicense)),
                        dateStarted:formatTanggal(formatDateToYMD(item.dateStarted)),
                        statusAlert:item.status,
                        status:status,
                    }
                });
                count.value = response.data.meta.totalCount;
                itemsPerPage.value = response.data.meta.pageSize
                totalPages.value = response.data.meta.totalPages
            } catch (error) {
                console.error("Error ambil data:", error);
            }
        };

        // Ambil list aplikasi (grouping) dari endpoint /api/licenses/applications
        const getApplicationData = async (params: any = {}) => {
            ApiService.setHeader()
            const url = `/api/licenses/applications`
            try {
                const mergedParams = { offset: 1, limit: 10, ...params };
                const response = await ApiService.query(url, { params: mergedParams });
                const data = response.data.data;
                items.value = data.map((item: any) => ({
                    application: item.application,
                    totalPks: item.totalPks,
                    under1Month: item.under1Month,
                    under3Months: item.under3Months,
                    nearestDueDate: formatTanggal(formatDateToYMD(item.nearestDueDate)),
                    statusAlert: item.status,
                    status: item.status === 'red'
                        ? 'Kritis (≤1 bln)'
                        : item.status === 'yellow'
                            ? 'Hampir (1–3 bln)'
                            : 'Aman',
                }));
                count.value = response.data.meta.totalCount;
                itemsPerPage.value = response.data.meta.pageSize;
                totalPages.value = response.data.meta.totalPages;
            } catch (error) {
                console.error("Error ambil data aplikasi:", error);
            }
        };

        // Baca query param -> tentukan mode & muat data yang sesuai.
        // Dipanggil saat mount dan tiap kali query berubah (mis. klik "Detail").
        const loadForRoute = async () => {
            const q = route.query;
            currentStatus.value = typeof q.status === 'string' ? q.status : '';
            currentApplication.value = typeof q.application === 'string' ? q.application : '';
            initialStatus.value = currentStatus.value;

            if (q.view === 'application' && !currentApplication.value) {
                viewMode.value = 'application';
                await getApplicationData(
                    currentStatus.value ? { status: currentStatus.value } : {}
                );
            } else {
                viewMode.value = 'pks';
                await getData({
                    ...(currentStatus.value ? { status: currentStatus.value } : {}),
                    ...(currentApplication.value ? { application: currentApplication.value } : {}),
                });
            }
        };

        const pageChange = (cpage: any, paramSearch: any) => {
            if (viewMode.value === 'application') {
                getApplicationData({
                    page: cpage,
                    per_page: 10,
                    ...(currentStatus.value ? { status: currentStatus.value } : {}),
                    ...paramSearch,
                });
                return;
            }
            getData({
                page: cpage,
                per_page: 10,
                ...(currentStatus.value ? { status: currentStatus.value } : {}),
                ...(currentApplication.value ? { application: currentApplication.value } : {}),
                ...paramSearch,
            });
        };

        // Drill-down: klik "Detail" pada satu aplikasi -> pindah ke list PKS
        // aplikasi tsb (navigasi query param, tetap di halaman /license).
        const detail = (row: any) => {
            router.push({
                path: '/license',
                query: {
                    application: row.application,
                    ...(currentStatus.value ? { status: currentStatus.value } : {}),
                },
            });
        };

            onMounted(() => {
                // Ambil data dari route.state
                if (history.state.flashMessage) {
                    flash.value = history.state.flashMessage;

                    // Hapus flash state agar tidak muncul lagi saat reload
                    history.replaceState({}, '');
                }
            });

        onBeforeMount(loadForRoute);

        // Muat ulang saat query berubah tanpa remount (mis. klik "Detail" -> ?application=,
        // atau tombol back browser kembali ke list aplikasi).
        watch(() => route.query, loadForRoute);

        const handleAdd = () => {
            console.log('Tambah Data diklik');
        };
        watch(selectedFilter, () => {
            textfilter.value = '';
        });

        const remove = (row: any) => {
            console.log('Delete:', row);
        };
        
        const mencariData = () => {
            console.log(selectedFilter.value);
            console.log(textfilter.value);
            console.log(datefilter.value.end);
            console.log(datefilter.value.start);
        };

        const view = (row: any) => {
            router.push({ path:`/license/form/${row.id}`, query: {mode: "view"}});
        };

        const edit = (row: any) => {
            router.push({ path:`/license/form/${row.id}`, query: {mode: "edit"}});
        };

        // Handler untuk event search dari Body component
        const handleSearch = (searchCriteria: any) => {
            searchParams.value = searchCriteria;
            if (viewMode.value === 'application') {
                getApplicationData({
                    ...(currentStatus.value ? { status: currentStatus.value } : {}),
                    ...searchCriteria,
                });
                return;
            }
            getData({
                ...(currentApplication.value ? { application: currentApplication.value } : {}),
                ...searchCriteria,
            });
        };


        return {
            handleAdd,
            selectedFilter,
            datefilter,
            textfilter,
            columns,
            appColumns,
            viewMode,
            items,
            remove,mencariData,
            edit,
            view,
            detail,
            handleSearch,
            pageChange,
            count,
            itemsPerPage,
            totalPages,
            flash,
            initialStatus
        };
    },

});
</script>
