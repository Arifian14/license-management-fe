<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";
import Table from "@/components/widget/Table.vue";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "vendor-pages",
  components: { Table },
  setup() {
    const items = ref<any[]>([]);
    const columns = [
      { key: "name", label: "Nama Vendor" },
      { key: "action", label: "", slot: "action", headerClass: "text-end rounded-end" },
    ];

    // form untuk create & edit (mode ditentukan ada/tidaknya id)
    const form = reactive<{ id: number | null; name: string }>({ id: null, name: "" });

    const getData = async () => {
      ApiService.setHeader();
      try {
        const res = await ApiService.query("/api/vendors", {});
        items.value = res.data.data;               // index() balikan { data: [...] }
      } catch (e) { console.error(e); }
    };

    const openModal = () => {
      const el = document.getElementById("vendor-modal");
      if (el) Modal.getOrCreateInstance(el).show();
    };
    const closeModal = () => {
      const el = document.getElementById("vendor-modal");
      if (el) Modal.getOrCreateInstance(el).hide();
    };

    const add = () => { form.id = null; form.name = ""; openModal(); };
    const edit = (row: any) => { form.id = row.id; form.name = row.name; openModal(); };

    const submit = async () => {
      ApiService.setHeader();
      try {
        if (form.id) {
          await ApiService.put(`/api/vendors/${form.id}`, { name: form.name });   // update
        } else {
          await ApiService.post("/api/vendors", { name: form.name });             // create
        }
        closeModal();
        await getData();
      } catch (e) { Swal.fire("Error", "Gagal menyimpan vendor.", "error"); }
    };

    const remove = async (row: any) => {
      const ok = await Swal.fire({
        title: "Hapus Vendor?", text: row.name, icon: "warning",
        showCancelButton: true, confirmButtonText: "Ya, hapus", confirmButtonColor: "#d33",
      });
      if (!ok.isConfirmed) return;
      ApiService.setHeader();
      try {
        await ApiService.delete(`/api/vendors/${row.id}`);   // destroy (soft delete)
        await getData();
      } catch (e) { Swal.fire("Error", "Gagal menghapus.", "error"); }
    };

    onMounted(getData);

    return { items, columns, form, add, edit, submit, remove };
  },
});
</script>

<template>
  <div class="card">
    <div class="card-header pt-5 d-flex justify-content-end">
      <button class="btn btn-primary" @click="add">+ Tambah Vendor</button>
    </div>
    <div class="card-body">
      <Table :columns="columns" :data="items" :npage="1">
        <template #action="{ row }">
          <div class="text-end">
            <button class="btn btn-sm btn-light me-1" @click="edit(row)">
              <KTIcon icon-name="pencil" icon-class="fs-3" />
            </button>
            <button class="btn btn-sm btn-light-danger" @click="remove(row)">
              <KTIcon icon-name="trash" icon-class="fs-3" />
            </button>
          </div>
        </template>
      </Table>
    </div>

    <!-- Modal create/edit (Bootstrap) -->
    <div class="modal fade" id="vendor-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{ form.id ? "Edit Vendor" : "Tambah Vendor" }}</h4>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <label class="form-label">Nama Vendor</label>
            <input v-model="form.name" class="form-control form-control-solid" />
          </div>
          <div class="modal-footer">
            <button class="btn btn-light" data-bs-dismiss="modal">Batal</button>
            <button class="btn btn-primary" @click="submit">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>