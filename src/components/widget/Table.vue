<template>
    <div class="table-responsive">
        <table class="table align-middle gs-0 gy-4">
            <thead>
                <tr class="fw-bold text-muted bg-light">
                    <th class="ps-4 rounded-start">No.</th>
                    <th v-for="(col, index) in columns" :key="index" :class="col.headerClass">
                        {{ col.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in data" :key="rowIndex" :class="(row.alert !== undefined && row.alert) || (row.statusAlert !== undefined && row.statusAlert === 'yellow') || (row.isPksExpiringSoon !== undefined && row.isPksExpiringSoon) ? 'bg bg-warning' : (row.statusAlert !== undefined && row.statusAlert === 'red') ? 'bg bg-danger' : ''">
                    <td class="p-5">
                        <span class=" text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                            {{ rowIndex + 1 }}
                        </span>
                    </td>
                    <td v-for="(col, colIndex) in columns" :key="colIndex">
                        <slot :name="col.slot" v-bind="{ row }">
                            {{ row[col.key] }}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

interface Column {
    key: string;
    label: string;
    slot?: string;
    headerClass?: string;
}

export default defineComponent({
    name: 'ReusableTable',
    props: {
        columns: {
            type: Array as PropType<Column[]>,
            required: true,
        },
        data: {
            type: Array as PropType<Record<string, any>[]>,
            required: true,
        },
    },
});
</script>
