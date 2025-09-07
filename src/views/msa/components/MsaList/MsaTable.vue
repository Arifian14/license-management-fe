<template>
  <div class="card-body py-3">
    <Table :columns="columns" :data="items">
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
          <button class="btn btn-sm btn-light" @click="confirmDelete(row)">
            <KTIcon icon-name="trash" icon-class="fs-3" />
          </button>
        </div>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import Table from "@/components/widget/Table.vue";
import Swal from 'sweetalert2';
import type { MsaTableColumn } from "../../types";

export default defineComponent({
  name: "MsaTable",
  components: { Table },
  props: {
    columns: {
      type: Array as PropType<MsaTableColumn[]>,
      required: true
    },
    items: {
      type: Array as PropType<any[]>,
      required: true
    }
  },
  emits: ['view', 'edit', 'remove'],
  setup(props, { emit }) {
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

    return {
      confirmDelete,
      emitView,
      emitEdit
    };
  }
});
</script>