<template>
  <div class="card-body py-3">
    <!-- Info mode + search aplikasi -->
    <div class="row mb-3">
      <div class="col-md-8 d-flex align-items-end">
        <div class="text-muted">
          Menampilkan aplikasi yang memiliki PKS mendekati masa berakhir.
          Klik <span class="fw-bold">Detail</span> untuk melihat PKS-nya.
        </div>
      </div>
      <div class="col-md-3">
        <label class="form-label">Cari Aplikasi</label>
        <Field
          name="application"
          type="text"
          v-model="search.application"
          class="form-control form-control-solid"
          placeholder="Nama aplikasi"
        />
      </div>
      <div class="col-md-1 d-flex align-items-end">
        <button type="button" class="btn btn-primary" @click="handleSearch()">Cari</button>
      </div>
    </div>

    <Table :columns="columns" :data="items" :npage="page">
      <template #status="{ row }">
        <span :class="`badge fs-7 fw-bold ${badgeClass(row.statusAlert)}`">
          {{ row.status }}
        </span>
      </template>

      <template #action="{ row }">
        <div class="text-center">
          <button class="btn btn-sm btn-light-primary" @click="emitDetail(row)">
            <KTIcon icon-name="eye" icon-class="fs-4" /> Detail
          </button>
        </div>
      </template>
    </Table>

    <TablePagination
      v-if="pageCount > 1"
      :total-pages="pageCount"
      :total="count"
      :per-page="itemsPerPage"
      :current-page="page"
      @page-change="pageChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import type { PropType } from "vue";
import Table from "@/components/widget/Table.vue";
import TablePagination from "@/components/widget/TablePagination.vue";
import { Field } from "vee-validate";

interface Column {
  key: string;
  label: string;
  slot?: string;
  headerClass?: string;
}

interface ISearch {
  application: string | null;
}

export default defineComponent({
  name: "license-application-body",
  components: {
    Table,
    TablePagination,
    Field,
  },
  props: {
    columns: {
      type: Array as PropType<Column[]>,
      required: true,
    },
    items: {
      type: Array as PropType<Record<string, any>[]>,
      required: true,
    },
    count: { type: Number, required: false, default: 0 },
    itemsPerPage: { type: Number, default: 10 },
    currentPage: { type: Number, required: false, default: 1 },
    pageCount: { type: Number, required: true },
  },
  emits: ["detail", "search", "page-change"],
  setup(props, { emit }) {
    const page = ref(props.currentPage);
    const search = reactive<ISearch>({ application: null });

    const badgeClass = (statusAlert: string) => {
      if (statusAlert === "red") return "badge-light-danger";
      if (statusAlert === "yellow") return "badge-light-warning";
      return "badge-light-success";
    };

    const buildParams = () => {
      const params: Record<string, any> = {};
      if (search.application) params["application"] = search.application;
      return params;
    };

    const handleSearch = () => {
      emit("search", buildParams());
    };

    const emitDetail = (row: any) => {
      emit("detail", row);
    };

    const pageChange = (newPage: number) => {
      page.value = newPage;
      emit("page-change", page.value, buildParams());
    };

    return {
      page,
      search,
      badgeClass,
      handleSearch,
      emitDetail,
      pageChange,
    };
  },
});
</script>
