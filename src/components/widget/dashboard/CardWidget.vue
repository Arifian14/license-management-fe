<template>
  <!--begin::Statistics Widget 5-->
  <component
    :is="to ? 'router-link' : 'a'"
    :to="to"
    :href="to ? undefined : '#'"
    :class="[widgetClasses, `bg-${color}`, { 'card-clickable': to }]"
    class="card hoverable"
  >
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
  </component>
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
    // Tujuan navigasi saat kartu diklik (mis. { path: '/license', query: { status: 'under_1_month' } }).
    // Jika kosong, kartu tetap berupa <a href="#"> non-navigasi seperti semula.
    to: {
      type: [String, Object] as import("vue").PropType<string | Record<string, any>>,
      default: undefined,
    },
  },
  components: {},
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>

<style scoped>
/* Efek hover khusus kartu yang bisa diklik (punya prop `to`) */
.card-clickable {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

.card-clickable:hover {
  transform: translateY(-6px);
  box-shadow: 0 0.75rem 1.75rem rgba(0, 0, 0, 0.2) !important;
  filter: brightness(1.05);
}

.card-clickable:active {
  transform: translateY(-2px);
}
</style>
