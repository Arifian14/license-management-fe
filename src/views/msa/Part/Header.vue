<template>
    <div class="card-header border-0 pt-5">
        <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold fs-3 mb-1">List MSA</span>
        </h3>
        <div class="card-toolbar">
            <Button label="Tambah Data" :onClick="route_msa_add" btnClass="btn btn-sm btn-light-primary" iconClass="fs-2" icon="plus" />
        </div>
    </div>
</template>

<script lang="ts">  
import { defineComponent } from "vue";
import Button from "@/components/widget/Button.vue";
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "msa-header",
    components: {
        Button
    },
    emits: ['add'],
    setup(props, { emit }) {
        const router = useRouter();
        const emitAdd = () => {
            emit('add');
        };
        const route_msa_add = () => {
            router.push({ name: 'msa_add', query: {mode: "add"}});
        }

        return {
            emitAdd,
            route_msa_add
        };
    }
});
</script>