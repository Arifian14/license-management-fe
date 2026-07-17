<template>
  <div class="card-body py-3">
    
    <div class="row mb-3">
      <div class="col-md-3">
        <label for="usedBudget" class="form-label">Search Text</label>
          <Field 
              name="pks" 
              type="text"
              v-model="search.pks" 
              class="form-control form-control-solid" 
              placeholder="No PKS & Aplikasi"
          />
      </div>
      <div class="col-md-3">
        <label for="usedBudget" class="form-label">Search By</label>
        <Field 
            name="status" 
            as="select"
            v-model="search.status" 
            class="form-control form-control-solid" 
        >
        <option value="" selected>== ALL ===</option>
        <option v-for="opt in status" :key="opt.id" :value="opt.id">{{ opt.desc }}</option>
        </Field>
        </div>
      <div class="col-md-2 d-flex align-items-end">
        <button
            type="button"
            class="btn btn-primary me-2"
            @click="handleSearch()"
          >
            Search 
        </button>
      </div>
    </div>

    <Table :columns="columns" :data="items" :npage="1">
      <template #status="{ row }">
        <span :class="`badge badge-light-danger fs-7 fw-bold`">
            {{ row.status }}
        </span>
      </template>

      <!-- <template #bastFileUrl_btn="{ row }">
        <a :href="`${row.bastFileUrl}`" target="_blank" class="btn btn-sm btn-primary">Link File</a>
      </template> -->

      <template #action="{ row }">
        <div class="text-end">
          <button class="btn btn-sm btn-light me-1" @click="emitView(row)">
            <KTIcon icon-name="abstract-26" icon-class="fs-3" />
          </button>
          <button class="btn btn-sm btn-light me-1" @click="emitEdit(row)">
            <KTIcon icon-name="pencil" icon-class="fs-3" />
          </button>
          <!-- <button class="btn btn-sm btn-light" @click="confirmDelete(row)">
            <KTIcon icon-name="trash" icon-class="fs-3" />
          </button> -->
        </div>
      </template>
    </Table>
    <TablePagination v-if="pageCount > 1" :total-pages="pageCount" :total="count" :per-page="itemsPerPage"
            :current-page="page" @page-change="pageChange" />

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import type { PropType } from 'vue';
import { Modal } from 'bootstrap'
import Swal from 'sweetalert2';
import Table from "@/components/widget/Table.vue";
import TablePagination from "@/components/widget/TablePagination.vue";
import Button from "@/components/widget/Button.vue";
import LicenseModal from "./Modal/LicenseModal.vue";
import ApiService from "@/core/services/ApiService";
import { Field, ErrorMessage, Form as VForm, useForm } from "vee-validate";

interface Column {
    key: string;
    label: string;
    slot?: string;
    headerClass?: string;
}

interface ISearch{
  status: number | null
  pks: string | null
}

export default defineComponent({
  name: "msa-body",
  components: {
    Table,
    Button,
    LicenseModal,
    TablePagination,
    Field
  },
  props: {
      columns: {
          type: Array as PropType<Column[]>,
          required: true
      },
      items: {
          type: Array as PropType<Record<string, any>[]>,
          required: true
      },
      count: { type: Number, required: false, default: 5 },
      itemsPerPage: { type: Number, default: 5 },
      itemsPerPageDropdownEnabled: {
          type: Boolean,
          required: false,
          default: true,
      },
      currentPage: { type: Number, required: false, default: 1 },
      pageCount: { type: Number, required: true},
      // Nama status filter awal (mis. 'under_1_month' / 'under_3_months') dari query param halaman
      initialStatus: { type: String, required: false, default: '' },
  },
  emits: ['view', 'edit', 'remove','search','page-change'],
  setup(props, { emit }) {
    const page = ref(props.currentPage);
    const modalMode = ref<'create' | 'edit' | 'view'>('create');
    const selectedData:any = ref({});
    const modalRef = ref();

    const search = reactive<ISearch>({
      status: null,
      pks: null,
    })

    const status = [
      {
        id: 1,
        name: 'under_3_months',
        desc: 'License Under 3 Months',
        param: 'status'
      },
      {
        id: 2,
        name: 'under_1_month',
        desc: 'License Under 1 Month',
        param: 'status'
      },
      {
        id: 3,
        name: 'between_1_3_months',
        desc: 'License 1-3 Months',
        param: 'status'
      },
      {
        id: 4,
        name: 'above_3_months',
        desc: 'License Above 3 Months',
        param: 'status'
      }
    ]

    // Selaraskan dropdown "Search By" dengan status filter awal (dari klik kartu dashboard),
    // sehingga filter tetap ikut saat user melakukan search / pindah halaman.
    if (props.initialStatus) {
      const matched = status.find((v) => v.name === props.initialStatus);
      if (matched) {
        search.status = matched.id;
      }
    }

    // GET API by ID
    const fetchDataById = async (id: string | number) => {
      try {
        ApiService.setHeader()
        const url = `/api/licenses/${id}`
        const response = await ApiService.get(url);
        selectedData.value = response.data.data || response.data;
        console.log(selectedData.value)
      } catch (error) {
        console.error("Failed to get data:", error);
        Swal.fire("Error", "Failed to get data.", "error");
      }
    };

    const handleSearch = async () => {
      const props:any = status.filter((v,i) => v.id == search.status)
      let params = {};
      if(props.length > 0){
        params[props[0].param] = props[0].name
      }

      if(search.pks){
        params['pks'] = search.pks
      }

      emit('search', params);
    }

    const openModal = async (mode: 'create' | 'edit' | 'view', row: any = {}) => {
      modalMode.value = mode;

      if (mode === 'edit' || mode === 'view') {
        await fetchDataById(row.id);
      } else {
        selectedData.value = {}; // Reset saat create
      }

      setTimeout(() => {
        const modalEl = document.getElementById('tambah-license');
        if (modalEl) {
          const modal = Modal.getOrCreateInstance(modalEl);
          modal.show();
        }
      }, 100);
    };

    const handleFormSubmit = (data: any) => {
      console.log("Form Submitted", data);
      // emit atau update data items[] sesuai kebutuhan
    };

    const confirmDelete = async (row: any) => {
      const result = await Swal.fire({
        title: 'Hapus Data?',
        text: 'Apakah Anda yakin ingin menghapus data ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      });

      if (result.isConfirmed) {
        emit('remove', row);
      }
    };

    
      const emitView = (row: any) => {
          emit('view', row);
      };

      const emitEdit = (row: any) => {
          emit('edit', row);
      };

      const pageChange = (newPage: number) => {
        const props:any = status.filter((v,i) => v.id == search.status)
        let params = {};
        if(props.length > 0){
          params[props[0].param] = props[0].name
        }

        if(search.pks){
          params['pks'] = search.pks
        }
        page.value = newPage;
        emit("page-change", page.value,params);
      };

    return {
      modalMode,
      selectedData,
      modalRef,
      openModal,
      confirmDelete,
      handleFormSubmit,
      emitView,
      emitEdit,
      search,
      handleSearch,
      status,
      pageChange,
      page
    };
  }
});
</script>