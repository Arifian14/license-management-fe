<template>
  <div class="card-body py-3">
      <div class="row mb-3">
        <div class="col-md-3">
          <label for="usedBudget" class="form-label">Search Text</label>
            <Field 
                name="freeText" 
                type="text"
                v-model="search.freeText" 
                class="form-control form-control-solid" 
                placeholder="Search..."
            />
        </div>
        <div class="col-md-3">
            <label for="usedBudget" class="form-label">Search By</label>
            <Field 
                name="typeSearch" 
                as="select"
                v-model="search.typeSearch" 
                class="form-control form-control-solid" 
            >
            <option value="" selected>== Select Search By ===</option>
            <option v-for="opt in typeSearchs" :key="opt.id" :value="opt.id">{{ opt.desc }}</option>
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
        <span :class="`badge badge-light-${row.alert ? 'danger' : 'success'} fs-7 fw-bold`">
          {{ row.status }}
        </span>
      </template>

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
import { defineComponent,reactive, ref } from "vue";
import type { PropType } from "vue";
import Table from "@/components/widget/Table.vue";
import TablePagination from "@/components/widget/TablePagination.vue";
import Swal from 'sweetalert2';
import type { MsaTableColumn } from "../../types";
import { Field, ErrorMessage, Form as VForm, useForm } from "vee-validate";

interface ISearch{
  freeText: string
  typeSearch: number | null
}

export default defineComponent({
  name: "MsaTable",
  components: { Table,Field,TablePagination },
  props: {
    columns: {
      type: Array as PropType<MsaTableColumn[]>,
      required: true
    },
    items: {
      type: Array as PropType<any[]>,
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
  },
  emits: ['view', 'edit', 'remove','search','page-change'],
  setup(props, { emit }) {
    const page = ref(props.currentPage);
    const search = reactive<ISearch>({
        freeText: '',
        typeSearch: null
    })
    const typeSearchs = [
      {
        id: 1,
        name: 'pks',
        desc: 'PKS'
      },
      {
        id:2,
        name: 'name',
        desc: 'MSA Name'
      }
    ]
    const confirmDelete = async (row: any) => {
      const result = await Swal.fire({
        title: 'Hapus Data?',
        text: 'Apakah Anda yakin ingin menghapus data ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus',
        cancelButtonText: 'Batal',
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

    const handleSearch = async () => {
        const props:any = typeSearchs.filter((v,i) => v.id == search.typeSearch)
        const params = {};
        if(props.length > 0 && search.freeText != null){
          params[props[0].name] = search.freeText.trim()
        }
        emit('search', params);
    }

    const pageChange = (newPage: number) => {
        const props:any = typeSearchs.filter((v,i) => v.id == search.typeSearch)
        const params = {};
        if(props.length > 0 && search.freeText != null){
          params[props[0].name] = search.freeText.trim()
        }
        page.value = newPage;
        emit("page-change", page.value, params);
    };

    return {
      confirmDelete,
      emitView,
      emitEdit,
      handleSearch,
      search,
      typeSearchs,
      pageChange,
      page
    };
  }
});
</script>