<template>
  <!--begin::Charts Widget 1-->
  <div class="card" :class="widgetClasses">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <!--begin::Title-->
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">{{ title }}</span>

        <span class="text-muted fw-semibold fs-7">{{ subtitle }}</span>
      </h3>
      <!--end::Title-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body">
      <!--begin::Chart-->
      
      <apexchart
        ref="chartRef"
        type="pie"
        :options="chart"
        :series="series"
        :height="height"
      />
      <!--end::Chart-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Charts Widget 1-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onBeforeMount, ref, watch } from "vue";
import { useThemeStore } from "@/stores/theme";
import type { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: "widget-1",
  props: {
    widgetClasses: String,
    height: { type: Number, default: 350 },
    title: { type: String, default: "Distribusi Status License" },
    subtitle: { type: String, default: "Berdasarkan sisa masa berlaku" },
    series: {
      type: Array as () => number[],
      default: () => [44, 55, 57, 56, 61, 58],
    },
    labels: {
      type: Array as () => string[],
      default: () => ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    colors: {
      type: Array as () => string[],
      default: () => [],
    },
  },
  setup(props) {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    const chart = ref<ApexOptions>({});
    const store = useThemeStore();

    const themeMode = computed(() => store.mode);

    const buildOptions = () => chartOptions(props.labels, props.colors);

    onBeforeMount(() => {
      Object.assign(chart.value, buildOptions());
    });

    const refreshChart = () => {
      if (!chartRef.value) return;
      chartRef.value.updateOptions(buildOptions());
    };

    watch([themeMode, () => props.labels, () => props.colors], () => {
      refreshChart();
    });

    return {
      chart,
      chartRef,
      getAssetPath,
    };
  },
});

// ✅ Pie Chart Options
const chartOptions = (labels: string[], colors: string[]): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-500");
  const baseColor = getCSSVariableValue("--bs-primary");

  return {
    chart: {
      fontFamily: "inherit",
      type: "pie",
      toolbar: { show: false },
    },

    labels,

    legend: {
      show: true,
      position: "bottom",
      labels: {
        colors: labelColor,
      },
    },

    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
      },
    },

    stroke: {
      width: 2,
      colors: ["#fff"],
    },

    tooltip: {
      style: {
        fontSize: "12px",
      },
    },

    colors:
      colors.length > 0
        ? colors
        : [baseColor, "#50CD89", "#F1416C", "#7239EA", "#FFC700", "#009EF7"],

    fill: {
      opacity: 1,
    },
  };
};
</script>