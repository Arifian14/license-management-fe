<template>
    <div class="row gy-5 g-xl-8">
        <div class="mb-5 mb-xl-8 card">
            <!-- start header -->
            <!-- Header Component -->
            <MsaHeader @add="handleAdd" />
            
            <!-- Filter Component -->
            <!-- <MsaFilter 
                v-model:selectedFilter="selectedFilter"
                v-model:textfilter="textfilter"
                v-model:datefilter="datefilter"
                @search="mencariData"
            /> -->
            
            <!-- Body Component -->
            <MsaBody 
                :columns="columns"
                :items="items"
                @view="view"
                @edit="edit"
                @remove="remove"
            />
        </div>
    </div>
</template>

<script lang="ts">
import {onBeforeMount, onMounted, reactive, ref, watch,defineComponent} from "vue";
import { useRouter } from 'vue-router';
import MsaHeader from "./Part/Header.vue";
import MsaFilter from "./Part/Filter.vue";
import MsaBody from "./Part/Body.vue";
import ApiService from "@/core/services/ApiService";
import {formatDateToYMD,rupiahFormatter,formatTanggal} from "../../../utils/utils"


export default defineComponent({
    name: "pages-msa",
    components: {
        MsaHeader,
        MsaFilter,
        MsaBody
    },
    setup() {
        const router = useRouter();
        const selectedFilter = ref('date');
        const textfilter = ref('')
        const items = ref([]);

        const datefilter = ref({
            start: null,
            end: null,
        });

        const columns = [
            { key: 'pks', label: 'PKS' },
            { key: 'dateStarted', label: 'Date Start' },
            { key: 'dateEnded', label: 'Date End' },
            { key: 'peopleQuota', label: 'People Quota' },
            { key: 'budgetQuota', label: 'Budget Quota' },
            { key: 'action', label: '', slot: 'action', headerClass: 'text-end rounded-end'},
        ];

        function checkBudgetAlert(budgetQuota: number, spent: number): boolean {
            const remaining = budgetQuota - spent;
            const threshold = budgetQuota * 0.2; // 20% dari budget

            // console.log(budgetQuota,'budgetQuota')
            // console.log(spent,'spent')
            // console.log(remaining,'remaining')
            // console.log(threshold,'thres')
            if (remaining <= threshold) {
                return true;
            }

            return false;
        }


        const getData = async () => {
            ApiService.setHeader()
            const url = `/api/v2/msa`
            try {
                const response = await ApiService.query(url, {
                    params: {
                        pks: '',
                        date_started_from: '',
                        date_started_to: '',
                        date_ended_from: '',
                        date_ended_to: '',
                        people_quota: '',
                        budget_quota: '',
                        budget_quota_from: '',
                        budget_quota_to: '',
                        sort_by: 'id',
                        sort_order: 'asc',
                        limit: '',
                        offset: '',
                    }
                });

                const data = response.data.data;
                console.log(data,'dataaaaaaaaaaaaaaaaaaaaaa')
                items.value = data.map((item) => {
                    return {
                        id: item.id,
                        pks: item.pks,
                        dateStarted: formatTanggal(formatDateToYMD(item.dateStarted)),
                        dateEnded: formatTanggal(formatDateToYMD(item.dateEnded)),
                        peopleQuota: item.peopleQuota,
                        budgetQuota: rupiahFormatter(item.budgetQuota),
                        alert: checkBudgetAlert(item.budgetQuota,item.budgetUsed),
                    }
                });
            } catch (error) {
                console.error("Error ambil data:", error);
            }
        };

        onBeforeMount(async () => {
            await getData();
        })

        const handleAdd = () => {
            console.log('Tambah Data diklik');
        };
        watch(selectedFilter, () => {
            textfilter.value = '';
        });

        const view = (row: any) => {
            router.push({ path:`/msa/add_detail/${row.id}`, query: {mode: "view"}});
        };

        const edit = (row: any) => {
            router.push({ path:`/msa/add_detail/${row.id}`, query: {mode: "edit"}});
        };

        const remove = (row: any) => {
            console.log('Delete:', row);
        };
        
        const mencariData = () => {
            console.log(selectedFilter.value);
            console.log(textfilter.value);
            console.log(datefilter.value.end);
            console.log(datefilter.value.start);
        };


        return {
            handleAdd,
            selectedFilter,
            datefilter,
            textfilter,
            columns,
            items,
            view,edit,remove,mencariData
        };
    },

});
</script>