<template>
  <!--begin::Statistics Widget 5-->
  <a href="#" :class="[widgetClasses, `bg-${color}`]" class="card hoverable">
    <!--begin::Body-->
    <div class="card-body d-flex align-items-center">
      <KTIcon
        :icon-name="iconName"
        :icon-class="`text-${iconColor} fs-3x me-3`"
      />

      <div>
        <div :class="`text-inverse-${color}`" class="fw-bold fs-2 mb-1">
          {{ title }}
        </div>

        <div :class="`text-inverse-${color}`" class="fw-semibold fs-2">
          {{ description }}
        </div>
      </div>
    </div>
    <!--end::Body-->
  </a>
  <!--end::Statistics Widget 5-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "kt-widget-5",
  props: {
    widgetClasses: String,
    color: String,
    iconColor: String,
    iconName: String,
    title: String,
    description: String,
  },
  components: {},
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
