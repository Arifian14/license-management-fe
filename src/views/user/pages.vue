<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";
import Table from "@/components/widget/Table.vue";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "user-pages",
  components: { Table },
  setup() {
    const items = ref<any[]>([]);
    const columns = [
      { key: "name", label: "Nama User" },
      { key: "email", label: "Email" },
      { key: "role", label: "Role" },   
      { key: "action", label: "", slot: "action", headerClass: "text-end rounded-end" },
    ];

    // form untuk create & edit (mode ditentukan ada/tidaknya id)
    const form = reactive<{ id: number | null; name: string, email: string, password: string, role: string }>(
        { id: null, name: "", email: "", password: "", role: "staff" });

    const roles = ["superadmin", "officer", "staff"]; 

    const getData = async () => {
      ApiService.setHeader();
      try {
        const res = await ApiService.query("/api/users", {});
        items.value = res.data.data;               // index() balikan { data: [...] }
      } catch (e) { console.error(e); }
    };

    const openModal = () => {
      const el = document.getElementById("user-modal");
      if (el) Modal.getOrCreateInstance(el).show();
    };
    const closeModal = () => {
      const el = document.getElementById("user-modal");
      if (el) Modal.getOrCreateInstance(el).hide();
    };

    const add = () => { form.id = null; form.name = ""; form.email = ""; form.password = ""; form.role = "staff"; openModal(); };
    const edit = (row: any) => { form.id = row.id; form.name = row.name; form.email = row.email; form.password = ""; form.role = row.role; openModal(); };

    const submit = async () => {
      // validasi
      if (!form.name.trim() || !form.email.trim() || !form.role) {
        Swal.fire("Lengkapi data", "Nama, email, dan role harus diisi.", "warning");
        return;
      }

      if (!form.id && !form.password.trim()) {
        Swal.fire("Password wajib", "Isi password untuk user baru.", "warning");
        return;
      }

      const payload: any = { name: form.name, email: form.email, role: form.role };
      if (form.password) payload.password = form.password;

      ApiService.setHeader();
        try {
            if (form.id) {
            await ApiService.put(`/api/users/${form.id}`, payload);   // update
            } else {
            await ApiService.post("/api/users", payload);             // create
            }
            closeModal();
            await getData();
        } catch (e) { Swal.fire("Error", "Gagal menyimpan user.", "error"); }
    };

    const remove = async (row: any) => {
      const ok = await Swal.fire({
        title: "Hapus User?", text: row.name, icon: "warning",
        showCancelButton: true, confirmButtonText: "Ya, hapus", confirmButtonColor: "#d33",
      });
      if (!ok.isConfirmed) return;
      ApiService.setHeader();
      try {
        await ApiService.delete(`/api/users/${row.id}`);   // destroy
        await getData();
      } catch (e) { Swal.fire("Error", "Gagal menghapus.", "error"); }
    };

    onMounted(getData);

    return { items, columns, form, roles, add, edit, submit, remove };
  },
});
</script>

<template>
  <div class="card">
    <div class="card-header pt-5 d-flex justify-content-end">
      <button class="btn btn-primary" @click="add">+ Tambah User</button>
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
    <div class="modal fade" id="user-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{ form.id ? "Edit User" : "Tambah User" }}</h4>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Nama</label>
              <input v-model="form.name" class="form-control form-control-solid" />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="form.email" type="email" class="form-control form-control-solid" />
            </div>
            <div class="mb-3">
              <label class="form-label">
                Password <span v-if="form.id" class="text-muted">(kosongkan bila tidak diubah)</span>
              </label>
              <input v-model="form.password" type="password" class="form-control form-control-solid" />
            </div>
            <div class="mb-3">
              <label class="form-label">Role</label>
              <select v-model="form.role" class="form-select form-select-solid">
                <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
              </select>
            </div>
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