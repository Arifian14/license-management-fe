<template>
  <div class="card-body py-3">
    <Table :columns="columns" :data="items">
      <template #status="{ row }">
        <span
          :class="`badge badge-light-${row.status === 'open' ? 'success' :
            row.status === 'temp' ? 'warning' : 'primary'} fs-7 fw-bold`"
        >
          {{
            row.status === 'open'
              ? 'Open'
              : row.status === 'temp'
              ? 'Temporary Action'
              : 'Full Action'
          }}
        </span>
      </template>

      <!-- <template #bastFileUrl_btn="{ row }">
        <a :href="`${row.bastFileUrl}`" target="_blank" class="btn btn-sm btn-primary">Link File</a>
      </template> -->

      <template #action="{ row }">
        <div class="text-end">
          <button class="btn btn-sm btn-light me-1" @click="openModal('view', row)">
            <KTIcon icon-name="abstract-26" icon-class="fs-3" />
          </button>
          <button class="btn btn-sm btn-light me-1" @click="openModal('edit', row)">
            <KTIcon icon-name="pencil" icon-class="fs-3" />
          </button>
          <button class="btn btn-sm btn-light" @click="confirmDelete(row)">
            <KTIcon icon-name="trash" icon-class="fs-3" />
          </button>
        </div>
      </template>
    </Table>

    <!-- Modal Komponen -->
    <LicenseModal
      ref="modalRef"
      modalId="tambah-license"
      :mode="modalMode"
      :data="selectedData"
      @submit="handleFormSubmit"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { PropType } from 'vue';
import { Modal } from 'bootstrap'
import Swal from 'sweetalert2';
import Table from "@/components/widget/Table.vue";
import Button from "@/components/widget/Button.vue";
import LicenseModal from "./Modal/LicenseModal.vue";
import ApiService from "@/core/services/ApiService";

interface Column {
    key: string;
    label: string;
    slot?: string;
    headerClass?: string;
}

export default defineComponent({
  name: "msa-body",
  components: {
    Table,
    Button,
    LicenseModal
  },
  props: {
      columns: {
          type: Array as PropType<Column[]>,
          required: true
      },
      items: {
          type: Array as PropType<Record<string, any>[]>,
          required: true
      }
  },
  setup(props, { emit }) {
    const modalMode = ref<'create' | 'edit' | 'view'>('create');
    const selectedData:any = ref({});
    const modalRef = ref();

    // GET API by ID
    const fetchDataById = async (id: string | number) => {
      try {
        ApiService.setHeader()
        const url = `/api/licenses/${id}`
        const response = await ApiService.get(url);
        selectedData.value = response.data.data || response.data;
        console.log(selectedData.value)
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        Swal.fire("Error", "Gagal mengambil data.", "error");
      }
    };

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
        cancelButtonText: 'Batal',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      });

      if (result.isConfirmed) {
        emit('remove', row);
      }
    };

    return {
      modalMode,
      selectedData,
      modalRef,
      openModal,
      confirmDelete,
      handleFormSubmit
    };
  }
});
</script>