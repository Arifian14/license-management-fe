<template>
  
<!--begin::Alert-->
<div v-if="flash" class="alert alert-dismissible bg-success d-flex flex-column flex-sm-row p-5 mb-10">
    <!--begin::Icon-->
    <i class="ki-duotone ki-pencil fs-2hx text-light me-4 mb-5 mb-sm-0"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i>
    <!--end::Icon-->

    <!--begin::Wrapper-->
    <div class="d-flex flex-column text-light pe-0 pe-sm-10">
        <!--begin::Title-->
        <h4 class="mb-2 light" style="color: white;">{{ flash.text }}</h4>
        <!--end::Title-->

        <!--begin::Content-->
        <span>No PKS : {{ flash.pks }}</span>
        <!--end::Content-->
    </div>
    <!--end::Wrapper-->

    <!--begin::Close-->
    <button type="button" class="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto" data-bs-dismiss="alert">
        <i class="ki-duotone ki-cross fs-1 text-light"><span class="path1"></span><span class="path2"></span></i>
    </button>
    <!--end::Close-->
</div>
<!--end::Alert-->



  <div class="row gy-5 g-xl-8">
    <div class="mb-5 mb-xl-8 card">
      <MsaHeader />
      <MsaTable 
        :columns="columns"
        :items="items"
        @view="viewMsa"
        @edit="editMsa"
        @remove="removeMsa"
        @search="handleSearch"
        @page-change="pageChange"
        :count="count"
        :itemsPerPage="itemsPerPage" 
        :pageCount="totalPages"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,ref } from "vue";
import { useRouter,useRoute } from 'vue-router';
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
    const route = useRoute();
    const flash = ref<any>(null);

    const { items, columns,handleSearch,pageChange,count,itemsPerPage,totalPages } = useMsaList();
    const { deleteMsa } = useMsaApi();

    onMounted(() => {
      // Ambil data dari route.state
      if (history.state.flashMessage) {
        flash.value = history.state.flashMessage;

        // Hapus flash state agar tidak muncul lagi saat reload
        history.replaceState({}, '');
      }
    });

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
      editMsa,
      handleSearch,
      pageChange,
      count,
      itemsPerPage,
      totalPages,
      flash
    };
  }
});
</script>