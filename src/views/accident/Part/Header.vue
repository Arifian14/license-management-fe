<template>
    <div class="card-header border-0 pt-5">
        <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold fs-3 mb-1">List Accident</span>
        </h3>
        <div class="card-toolbar">
            <Tambah />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import Button from "@/components/widget/Button.vue";
import Tambah from "./Modal/Tambah.vue";

export default defineComponent({
    name: "accident-header",
    components: {
        Tambah
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