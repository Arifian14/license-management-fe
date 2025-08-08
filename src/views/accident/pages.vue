<template>
    <div class="row gy-5 g-xl-8">
        <div class="mb-5 mb-xl-8 card">
            <!-- start header -->
            <!-- Header Component -->
            <AccidentHeader @add="handleAdd" :listAplikasi="listAplikasi" :listPIC="listPIC"/>

            <!-- Filter Component -->
            <AccidentFilter v-model:selectedFilter="selectedFilter" v-model:textfilter="textfilter"
                v-model:datefilter="datefilter" @search="mencariData" :listAplikasi="listAplikasi"
                :listStatus="listStatus" :listPIC="listPIC" />

            <!-- Body Component -->
            <AccidentBody :columns="columns" :items="items" @view="view" @edit="edit" @remove="remove" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import { useRouter } from 'vue-router';
import AccidentHeader from "./Part/Header.vue";
import AccidentFilter from "./Part/Filter.vue";
import AccidentBody from "./Part/Body.vue";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
    name: "pages-accident",
    components: {
        AccidentHeader,
        AccidentFilter,
        AccidentBody
    },
    setup() {
        const router = useRouter();
        const selectedFilter = ref('date');
        const textfilter = ref('')
        const listAplikasi = ref<{ label: string; value: string }[]>([]);
        const listStatus = ref<{ label: string; value: string }[]>([]);
        const listPIC = ref<{ label: string; value: string }[]>([]);
        const items = ref([])

        const datefilter = ref({
            start: null,
            end: null,
        });

        const columns = [
            { key: 'ticketNumber', label: 'No Tiket(Auto)' },
            { key: 'entryDate', label: 'Tanggal Entry' },
            { key: 'application', label: 'Aplikasi'},
            { key: 'personInCharge', label: 'PIC' },
            { key: 'issueCode', label: 'Kode Issue' },
            { key: 'title', label: 'Judul' },
            { key: 'status', label: 'Status', slot: 'status' },
            { key: 'action', label: '', slot: 'action', headerClass: 'text-end rounded-end' },
        ];

        const getData = async (params: { page: number; per_page: number }) => {
            ApiService.setHeader()
            const respon = await ApiService.query('/api/incidents', { params })
            items.value = respon.data.data.map(item => ({
                ...item,
                personInCharge: item.personInCharge.personName,
                status: item.status.statusName,
                application: item.application.applicationName
            }));
            console.log(items.value)
        }

        const handleAdd = () => {
            getData({ page: 1, per_page: 10 })
        };
        watch(selectedFilter, () => {
            textfilter.value = '';
        });


        const view = (row: any) => {
            router.push({ name: 'accident-detail', query: { id: row.id }});
        };

        const edit = (row: any) => {
            router.push({ name: 'accident-detail', query: { mode: 'edit', id: row.id } });
        };

        const remove = () => {
            getData({ page: 1, per_page: 10 })
        };

        const mencariData = () => {
            console.log(selectedFilter.value);
            console.log(textfilter.value);
            console.log(datefilter.value.end);
            console.log(datefilter.value.start);
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

        onMounted(() => {
            getListAplikasi()
            getListStatus()
            getListPIC()
            getData({ page: 1, per_page: 10 })
        })


        return {
            handleAdd,
            selectedFilter,
            datefilter,
            textfilter,
            columns,
            items,
            view, edit, remove, mencariData,
            listAplikasi,
            listStatus,
            listPIC
        };
    },

});
</script>
