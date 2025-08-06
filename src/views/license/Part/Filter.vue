<template>
    <div class="car-body py-3">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2">
                    <DropdownFilter label="Status License :" v-model="localSelectedFilter" :options="[
                        { label: 'ALL', value: 'judula' },
                        { label: '< 1 Bulan', value: 'judul' },
                        { label: '< 3 Bulan', value: 'issue' },
                        { label: '> 3 Bulan', value: 'issue' }
                    ]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import type { PropType } from 'vue';
import DropdownFilter from "@/components/widget/DropdownFilter.vue";
import DateRangeFilter from "@/components/widget/DateRangeFilter.vue";
import TextInputFilter from "@/components/widget/TextInputFilter.vue";
import Button from "@/components/widget/Button.vue";

interface DateRange {
    start: string | null;
    end: string | null;
}

export default defineComponent({
    name: "msa-filter",
    components: {
        DropdownFilter,
        DateRangeFilter,
        TextInputFilter,
        Button
    },
    props: {
        selectedFilter: {
            type: String,
            required: true
        },
        textfilter: {
            type: String,
            required: true
        },
        datefilter: {
            type: Object as PropType<DateRange>,
            required: true
        }
    },
    emits: ['update:selectedFilter', 'update:textfilter', 'update:datefilter', 'search'],
    setup(props, { emit }) {
        const localSelectedFilter = computed({
            get: () => props.selectedFilter,
            set: (value) => emit('update:selectedFilter', value)
        });

        const localTextFilter = computed({
            get: () => props.textfilter,
            set: (value) => emit('update:textfilter', value)
        });

        const localDateFilter = computed({
            get: () => props.datefilter,
            set: (value) => emit('update:datefilter', value)
        });

        const emitSearch = () => {
            emit('search');
        };

        return {
            localSelectedFilter,
            localTextFilter,
            localDateFilter,
            emitSearch
        };

    }
});
</script>