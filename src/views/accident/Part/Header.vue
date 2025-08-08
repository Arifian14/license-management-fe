<template>
    <div class="card-header border-0 pt-5">
        <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold fs-3 mb-1">List Accident</span>
        </h3>
        <div class="card-toolbar">
            <Tambah :listAplikasi="listAplikasi" :listPIC="listPIC" @add="emitAdd"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import Button from "@/components/widget/Button.vue";
import type { PropType } from 'vue';
import Tambah from "./Modal/Tambah.vue";

export default defineComponent({
    name: "accident-header",
    components: {
        Tambah
    },
    props: {
        listAplikasi: {
            type: Array as PropType<{ label: string; value: string }[]>,
            required: true
        },
        listPIC: {
            type: Array as PropType<{ label: string; value: string }[]>,
            required: true
        }
    },
    emits: ['add'],
    setup(props, { emit }) {
        const emitAdd = () => {
            emit('add');
        };

        return {
            emitAdd
        };
    }
});
</script>