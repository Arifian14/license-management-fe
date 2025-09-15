<template>
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
            
            <!-- Body Component -->
            <LicenseBody 
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
            />
        </div>
    </div>
</template>

<script lang="ts">
import {onBeforeMount, onMounted, reactive, ref, watch,defineComponent} from "vue";
import { useRouter } from 'vue-router';
import LicenseHeader from "./Part/Header.vue";
import LicenseFilter from "./Part/Filter.vue";
import LicenseBody from "./Part/Body.vue";
import ApiService from "@/core/services/ApiService";
import {formatDateToYMD,formatTanggal} from "@/utils/utils"

export default defineComponent({
    name: "pages-accident",
    components: {
        LicenseHeader,
        LicenseFilter,
        LicenseBody
    },
    setup() {
        const router = useRouter();
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

        const pageChange = (cpage: any,paramSearch:any)=>{
            getData(
                {
                    page: cpage,
                    per_page: 10,
                    ...paramSearch
                }
            )
        }

        onBeforeMount(async () => {
            await getData();
        })

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
            getData(searchCriteria);
        };


        return {
            handleAdd,
            selectedFilter,
            datefilter,
            textfilter,
            columns,
            items,
            remove,mencariData,
            edit,
            view,
            handleSearch,
            pageChange,
            count,
            itemsPerPage,
            totalPages
        };
    },

});
</script>
