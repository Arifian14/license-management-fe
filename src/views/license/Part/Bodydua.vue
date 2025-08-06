<template>
  <div class="card-body py-3">
    <Button
      label="Tambah Data"
      btnClass="btn btn-sm btn-light-primary"
      iconClass="fs-2"
      icon="plus"
      data-bs-toggle="modal"
      data-bs-target="#tambah-license"
      @click="openAddModal"
    />

    <Table :columns="columns" :data="items">
      <template #status="{ row }">
        <span
          :class="`badge badge-light-${row.status === 'open' ? 'success' : row.status === 'temp' ? 'warning' : 'primary'} fs-7 fw-bold`"
        >
          {{ row.status === 'open' ? 'Open' : row.status === 'temp' ? 'Temporary Action' : 'Full Action' }}
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
          <button class="btn btn-sm btn-light" @click="confirmDelete(row)">
            <KTIcon icon-name="trash" icon-class="fs-3" />
          </button>
        </div>
      </template>
    </Table>

    <!-- Modal Form License -->
    <LicenseForm
      :mode="mode"
      :model-value="selectedRow"
      @submitted="loadData"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Swal from 'sweetalert2';
import Table from '@/components/widget/Table.vue';
import LicenseForm from '@/views/license/Part/Modal/LicenseFormdua.vue'
import Button from '@/components/widget/Button.vue';
import KTIcon from '@/core/helpers/kt-icon/KTIcon.vue';

interface Column {
  key: string;
  label: string;
  slot?: string;
  headerClass?: string;
}

export default defineComponent({
  name: 'msa-body',
  components: {
    Table,
    LicenseForm,
    Button,
    KTIcon
  },
  props: {
    columns: {
      type: Array as () => Column[],
      required: true
    },
    items: {
      type: Array as () => Record<string, any>[],
      required: true
    }
  },
  emits: ['view', 'edit', 'remove'],
  setup(_, { emit }) {
    const selectedRow = ref<Record<string, any> | null>(null);
    const mode = ref<'add' | 'edit' | 'view'>('add');

    const openAddModal = () => {
      selectedRow.value = null;
      mode.value = 'add';
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
        cancelButtonColor: '#3085d6'
      });

      if (result.isConfirmed) {
        deleteData(row);
      }
    };

    const deleteData = (row: any) => {
      emit('remove', row);
      Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
    };

    const loadData = () => {
      emit('edit'); // atau bisa emit event khusus untuk reload data parent
    };

    return {
      selectedRow,
      mode,
      confirmDelete,
      openAddModal,
      loadData
    };
  }
});
</script>
