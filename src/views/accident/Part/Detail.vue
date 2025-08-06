<template>
    <div class="d-flex flex-column flex-xl-row">
        <!--begin::Sidebar-->
        <div class="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10">
            <!--begin::Card-->
            <div class="card mb-5 mb-xl-8">
                <Side :isEdit="isEditMode" :Formside="form"/>
            </div>
            <!--end::Card-->
        </div>
        <!--end::Sidebar-->

        <!--begin::Content-->
        <div class="flex-lg-row-fluid ms-lg-15">
            <div class="card mb-5 mb-xl-8">
                <DetailBody :isEdit="isEditMode" :form="form"/>
            </div>

        </div>
        <!--end::Content-->
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRoute } from 'vue-router';
import Side from "./Detailpart/Side.vue";
import DetailBody from "./Detailpart/Body.vue";

export default defineComponent({
    name: "detail-accident",
    components: {
        Side,
        DetailBody
    },
    setup() {

        const route = useRoute();
        const isEditMode = computed(() => route.query.mode === 'edit');
        const form = ref({
            judul: '',
            detail: '',
            link: [] as string[],
            tempact: '',
            fullact: '',
            reason: '',
            category: '',
            cause: '',
            note: '',
        });
        return {
            isEditMode,
            form
        };

    },

});
</script>
