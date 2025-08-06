<template>
  <!--begin::Toolbar-->
  <div class="toolbar py-5 py-lg-15" id="kt_toolbar">
    <!--begin::Container-->
    <div
      id="kt_toolbar_container"
      :class="{
        'container-fluid': toolbarWidthFluid,
        'container-xxl': !toolbarWidthFluid,
      }"
      class="d-flex flex-stack flex-wrap"
    >
      <PageTitle />

    </div>
    <!--end::Container-->
  </div>
  <!--end::Toolbar-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import PageTitle from "@/layouts/default-layout/components/toolbar/PageTitle.vue";
import { toolbarWidthFluid } from "@/layouts/default-layout/config/helper";

export default defineComponent({
  name: "KToolbar",
  components: {
    PageTitle,
  },
  setup() {
    return {
      toolbarWidthFluid,
      getAssetPath,
    };
  },
});
</script>