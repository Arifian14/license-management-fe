<template>
    <div class="row gy-5 g-xl-8">
        <div class="mb-5 mb-xl-8 card">
            <!-- start header -->
            <!-- Header Component -->
            <AccidentHeader @add="handleAdd" />
            
            <!-- Filter Component -->
            <AccidentFilter 
                v-model:selectedFilter="selectedFilter"
                v-model:textfilter="textfilter"
                v-model:datefilter="datefilter"
                @search="mencariData"
            />
            
            <!-- Body Component -->
            <AccidentBody 
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
import { defineComponent, ref, watch } from "vue";
import { useRouter } from 'vue-router';
import AccidentHeader from "./Part/Header.vue";
import AccidentFilter from "./Part/Filter.vue";
import AccidentBody from "./Part/Body.vue";

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

        const datefilter = ref({
            start: null,
            end: null,
        });

        const columns = [
            { key: 'tiket', label: 'No Tiket(Auto)' },
            { key: 'tgl_entry', label: 'Tanggal Entry' },
            { key: 'aplikasi', label: 'Aplikasi' },
            { key: 'pic', label: 'PIC' },
            { key: 'issue', label: 'Kode Issue' },
            { key: 'judul', label: 'Judul' },
            { key: 'status', label: 'Status', slot: 'status' },
            { key: 'action', label: '', slot: 'action', headerClass: 'text-end rounded-end'},
        ];

        const items = [
            {tiket: 'TK001', tgl_entry: '2023-01-01', aplikasi: 'Appel', pic: 'Rizky', issue: 'ISS001', judul: 'Bug Login', status: 'open' },
            {tiket: 'TK002', tgl_entry: '2023-01-02', aplikasi: 'DVC', pic: 'Deris', issue: 'ISS002', judul: 'Crash App', status: 'temp' },
            {tiket: 'TK003', tgl_entry: '2023-01-02', aplikasi: 'MCS', pic: 'zolla', issue: 'ISS003', judul: 'Crash App', status: 'open' },
            {tiket: 'TK004', tgl_entry: '2023-01-02', aplikasi: 'APPEL', pic: 'rizky', issue: 'ISS004', judul: 'Crash App', status: 'full' },
        ];

        const handleAdd = () => {
            console.log('Tambah Data diklik');
        };
        watch(selectedFilter, () => {
            textfilter.value = '';
        });

        const view = (row: any) => {
            router.push({ name: 'accident-detail'});
            console.log('View:', row);
        };

        const edit = (row: any) => {
            router.push({ name: 'accident-detail', query: { mode: 'edit' }});
            console.log('Edit:', row);
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
