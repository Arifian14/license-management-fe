<template>
    <div class="car-body py-3">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2">
                    <DropdownFilter label="Filter :" v-model="localSelectedFilter" :options="[
                        { label: 'Judul', value: 'judul' },
                        { label: 'Kode Issue', value: 'issue' }
                    ]" />
                </div>
                <div class="col-md-4" v-if="selectedFilter == 'date'">
                    <DateRangeFilter label="Tanggal Entry" v-model="localDateFilter" />
                </div>

                <div class="col-md-3"
                    v-if="selectedFilter == 'notiket' || selectedFilter == 'judul' || selectedFilter == 'issue'">
                    <TextInputFilter label="Search" v-model="localTextFilter" />
                </div>
                <div class="col-md-3"
                    v-if="selectedFilter == 'status' || selectedFilter == 'aplikasi' || selectedFilter == 'pic'">
                    <dropdown-filter label="Search" v-model="localTextFilter" :options="[
                        { label: 'Open', value: 'open' },
                        { label: 'Temporary Action', value: 'temp' },
                        { label: 'Full Action', value: 'full' }
                    ]" v-if="selectedFilter == 'status'" />

                    <dropdown-filter label="Search" v-model="localTextFilter" :options="[
                        { label: 'Rizky', value: 'rizky' },
                        { label: 'Deris', value: 'deris' },
                        { label: 'Zolla', value: 'zolla' }
                    ]" v-if="selectedFilter == 'pic'" />

                    <dropdown-filter label="Search" v-model="localTextFilter" :options="[
                        { label: 'APPEL', value: 'appel' },
                        { label: 'DVC', value: 'dvc' },
                        { label: 'MCS', value: 'mcs' }
                    ]" v-if="selectedFilter == 'aplikasi'" />
                </div>
                <div class="col-md-2">
                    <br>
                    <Button btnClass="btn btn-icon-white btn-active-light-primary btn-bg-primary" iconClass="fs-3"
                        icon="magnifier" :onClick="emitSearch" />
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