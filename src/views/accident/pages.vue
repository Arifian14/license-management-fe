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
            <AccidentBody :columns="columns" :items="items" @view="view" @edit="edit" @remove="remove" 
            :count="count" :itemsPerPage="itemsPerPage"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, reactive } from "vue";
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
        const count = ref(0)
        const itemsPerPage = ref(0)

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

        const getData = async (params: { 
        page: number; 
        per_page: number;
        entry_date_from?: string;
        entry_date_to?: string;
        application_id?: string;
        pic_id?: string;
        status_id?: string;
        tiket_number?: string;
        title?: string;
        issue_code?: string
        }) => {
            ApiService.setHeader()
            const respon = await ApiService.query('/api/incidents', { params })
            items.value = respon.data.data.map(item => ({
                ...item,
                personInCharge: item.personInCharge.personName,
                status: item.status.statusName,
                application: item.application.applicationName
            }));
            count.value = respon.data.data.meta.totalCount
            itemsPerPage.value = respon.data.data.meta.pageSize
            console.log(items.value)
        }

        const handleAdd = () => {
            getData(
              { 
                page: 1, 
                per_page: 10
              }
            )
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
            getData(
              { 
                page: 1, 
                per_page: 10
              }
            )
        };

        const mencariData = () => {
          if(selectedFilter.value == 'date'){
            const isoStringStart = datefilter.value.start.toISOString();
            const formattedDateStart = isoStringStart.slice(0, 10);
            
            const isoStringEnd = datefilter.value.end.toISOString();
            const formattedDateEnd = isoStringEnd.slice(0, 10);
            getData(
              { 
                page: 1, 
                per_page: 10,
                entry_date_from: formattedDateStart,
                entry_date_to: formattedDateEnd
              }
            )
          }else if (selectedFilter.value == 'aplikasi'){
            getData(
              { 
                page: 1, 
                per_page: 10,
                application_id: textfilter.value,
              }
            )
          }else if(selectedFilter.value == 'pic'){
            getData(
              { 
                page: 1, 
                per_page: 10,
                pic_id: textfilter.value,
              }
            )
          }else if (selectedFilter.value == 'status'){
            getData(
              { 
                page: 1, 
                per_page: 10,
                status_id: textfilter.value,
              }
            )
          }else if (selectedFilter.value == 'notiket'){
            getData(
              { 
                page: 1, 
                per_page: 10,
                tiket_number: textfilter.value,
              }
            )
          }else if (selectedFilter.value == 'judul'){
            getData(
              { 
                page: 1, 
                per_page: 10,
                title: textfilter.value,
              }
            )
          }else if (selectedFilter.value == 'issue'){
            getData(
              { 
                page: 1, 
                per_page: 10,
                issue_code: textfilter.value
              }
            )
          }
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
            listPIC,count,itemsPerPage
        };
    },

});
</script>
