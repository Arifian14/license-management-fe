<template>
  <div class="row gy-5 g-xl-8">
    <div class="mb-5 mb-xl-8 card">
      <MsaHeader />
      <MsaTable 
        :columns="columns"
        :items="items"
        @view="viewMsa"
        @edit="editMsa"
        @remove="removeMsa"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
import MsaHeader from "./components/MsaList/MsaHeader.vue";
import MsaTable from "./components/MsaList/MsaTable.vue";
import { useMsaList } from "./composables/useMsaList";
import { useMsaApi } from "./composables/useMsaApi";
import Swal from "sweetalert2";

export default defineComponent({
  name: "MsaPages",
  components: {
    MsaHeader,
    MsaTable
  },
  setup() {
    const router = useRouter();
    const { items, columns } = useMsaList();
    const { deleteMsa } = useMsaApi();

    const removeMsa = async (row: any) => {
      try {
        await deleteMsa(row.id);
        Swal.fire({
          text: "MSA has been successfully deleted!",
          icon: "success",
          confirmButtonText: "Ok, got it!",
          customClass: { confirmButton: "btn btn-success" },
        });
        // Refresh data after deletion
        location.reload();
      } catch (error) {
        Swal.fire({
          text: "Gagal menghapus data. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "Ok, got it!",
          customClass: { confirmButton: "btn btn-danger" },
        });
      }
    };

    const viewMsa = (row: any) => {
      router.push({ path: `/msa/add_detail/${row.id}`, query: { mode: "view" } });
    };

    const editMsa = (row: any) => {
      router.push({ path: `/msa/add_detail/${row.id}`, query: { mode: "edit" } });
    };

    return {
      columns,
      items,
      removeMsa,
      viewMsa,
      editMsa
    };
  }
});
</script>