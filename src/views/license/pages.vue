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
import {formatDateToYMD} from "../../../utils/utils"

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

        const datefilter = ref({
            start: null,
            end: null,
        });

        const columns = [
            { key: 'pks', label: 'PKS' },
            { key: 'application', label: 'Aplikasi' },
            { key: 'dueDateLicense', label: 'Due Date' },
            { key: 'healthCheckRoutine', label: 'Health Check Routine' },
            { key: 'healthCheckActual', label: 'Health Check Actual' },
            { key: 'action', label: '', slot: 'action', headerClass: 'text-end rounded-end'},
        ];

        const getData = async () => {
            const url = `${import.meta.env.VITE_APP_API_URL}/licenses`
            try {
                const response = await ApiService.query(url, {
                    params: {
                        offset: 1,
                        limit: 3,
                    }
                });

                const data = response.data.data;
                console.log("Data hasil API:", data);
                items.value = data.map(item => {
                    return {
                        id:item.id,
                        pks:item.pks,
                        bastFileUrl:item.bastFileUrl,
                        application:item.application,
                        dueDateLicense:formatDateToYMD(item.dueDateLicense),
                        healthCheckRoutine:formatDateToYMD(item.healthCheckRoutine),
                        healthCheckActual:formatDateToYMD(item.healthCheckActual),
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
            remove,mencariData
        };
    },

});
</script>
