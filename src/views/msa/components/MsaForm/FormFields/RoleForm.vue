<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <div class="card-title">
        <h3 class="card-label fw-bold fs-4">Role Management</h3>
      </div>
      <div class="card-toolbar">
        <div class="d-flex justify-content-end" data-kt-customer-table-toolbar="base">
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('add-role')"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Role
          </button>
        </div>
      </div>
    </div>
    
    <div class="card-body pt-0">
      <Datatable
        @on-sort="sort"
        @on-items-select="onItemSelect"
        :data="roles"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
      >
        <template v-slot:name="{ row }">
          {{ row.role }}
        </template>
        <template v-slot:rate="{ row }">
          {{ rupiahFormatter(row.rate) }}
        </template>
        <template v-slot:actions="{ row }">
          <button
            type="button"
            class="btn btn-sm btn-warning me-2"
            @click="$emit('edit-role', row)"
          >
            Update 
          </button>

          <button
            type="button"
            class="btn btn-sm btn-danger"
            @click="confirmRemoveRole(row)"
          >
            Delete 
          </button>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { PropType } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import Swal from "sweetalert2";
import { rupiahFormatter } from "@/utils/utils";
import type { IMsaRole } from "@/views/msa/types/index";

export default defineComponent({
  name: "RoleManagement",
  components: { Datatable },
  props: {
    roles: {
      type: Array as PropType<IMsaRole[]>,
      required: true
    }
  },
  emits: ['add-role', 'edit-role', 'remove-role'],
  setup(props, { emit }) {
    const selectedIds = ref<Array<number>>([]);

    const tableHeader = ref([
      {
        columnName: "Role",
        columnLabel: "name",
        columnWidth: 175,
      },
      {
        columnName: "Rate",
        columnLabel: "rate",
        columnWidth: 230,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        columnWidth: 135,
      },
    ]);

    const confirmRemoveRole = async (row: IMsaRole) => {
      const result = await Swal.fire({
        title: 'Hapus Role?',
        text: 'Apakah Anda yakin ingin menghapus role ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      });

      if (result.isConfirmed) {
        const index = props.roles.findIndex(role => 
          role.role === row.role && role.rate === row.rate
        );
        if (index !== -1) {
          emit('remove-role', index);
        }
      }
    };

    const sort = (sort: Sort) => {
      // Sorting logic if needed
    };

    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    return {
      tableHeader,
      selectedIds,
      confirmRemoveRole,
      sort,
      onItemSelect,
      rupiahFormatter
    };
  }
});
</script>