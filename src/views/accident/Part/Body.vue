<template>
    <div class="card-body py-3">
        <Table :columns="columns" :data="items">
            <template #status="{ row }">
                <span :class="`badge badge-light-${row.status == 'OPEN' ? 'success' :
                    row.status == 'TEMPORARY ACTION' ? 'warning' : 'primary'
                    } fs-7 fw-bold`">
                    {{
                        row.status == 'OPEN' ? 'Open' :
                            row.status == 'TEMPORARY ACTION' ? 'Temporary Action' : 'Full Action'
                    }}
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
import type { PropType } from 'vue';
import Swal from 'sweetalert2';
import Table from "@/components/widget/Table.vue";
import ApiService from "@/core/services/ApiService";

interface Column {
    key: string;
    label: string;
    slot?: string;
    headerClass?: string;
}

export default defineComponent({
    name: "accident-body",
    components: {
        Table
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
                // Panggil fungsi hapus data
                deleteData(row);
            }
        };

        const deleteData = (row: any) => {
            ApiService.setHeader()
            ApiService.delete('/api/incidents/'+row.id).
            then(() => {
                Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
                emit('remove', row);
            })
        };
        const emitView = (row: any) => {
            emit('view', row);
        };

        const emitEdit = (row: any) => {
            emit('edit', row);
        };


        return {
            emitView,
            emitEdit,
            confirmDelete
        };
    }
});
</script>