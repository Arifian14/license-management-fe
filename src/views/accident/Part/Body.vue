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
        <TablePagination v-if="pageCount > 1" :total-pages="pageCount" :total="count" :per-page="itemsPerPage"
            :current-page="page" @page-change="pageChange" />
    </div>
</template>

<script lang="ts">
import {
    defineComponent, onMounted,
    computed,
    ref,
    watch,
    type WritableComputedRef,
} from "vue";
import type { PropType } from 'vue';
import Swal from 'sweetalert2';
import Table from "@/components/widget/Table.vue";
import TablePagination from "@/components/widget/TablePagination.vue";
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
        },
        count: { type: Number, required: false, default: 5 },
        itemsPerPage: { type: Number, default: 5 },
        itemsPerPageDropdownEnabled: {
            type: Boolean,
            required: false,
            default: true,
        },
        currentPage: { type: Number, required: false, default: 1 },
        pageCount: { type: Number, required: false },
    },
    emits: ['view', 'edit', 'remove', "page-change", "update:itemsPerPage"],
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
            ApiService.delete('/api/incidents/' + row.id).
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
        const page = ref(props.currentPage);
        const inputItemsPerPage = ref(props.itemsPerPage);
        watch(
            () => props.count,
            () => {
                page.value = 1;
            }
        );

        watch(
            () => inputItemsPerPage.value,
            () => {
                page.value = 1;
            }
        );

        onMounted(() => {
            inputItemsPerPage.value = props.itemsPerPage;
        });

        const pageChange = (newPage: number) => {
            page.value = newPage;
            emit("page-change", page.value);
        };

        const itemsCountInTable: WritableComputedRef<number> = computed({
            get(): number {
                return props.itemsPerPage;
            },
            set(value: number): void {
                inputItemsPerPage.value = value;
                emit("update:itemsPerPage", value);
            },
        });

        return {
            emitView,
            emitEdit,
            confirmDelete,
            pageChange,
            page,
            itemsCountInTable,
            inputItemsPerPage,
        };
    }
});
</script>