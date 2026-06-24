<template>
  <!--begin::Charts Widget 1-->
  <div class="card" :class="widgetClasses">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <!--begin::Title-->
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Recent Pie Chart</span>

        <span class="text-muted fw-semibold fs-7"
          >Coba coba</span
        >
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
    height: Number,
  },
  // components: {
  //   Dropdown1,
  // },
  setup() {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    const chart = ref<ApexOptions>({});
    const store = useThemeStore();

    // ✅ Pie chart hanya butuh array angka
    const series = [44, 55, 57, 56, 61, 58];

    const themeMode = computed(() => store.mode);

    onBeforeMount(() => {
      Object.assign(chart.value, chartOptions());
    });

    const refreshChart = () => {
      if (!chartRef.value) return;
      chartRef.value.updateOptions(chartOptions());
    };

    watch(themeMode, () => {
      refreshChart();
    });

    return {
      chart,
      series,
      chartRef,
      getAssetPath,
    };
  },
});

// ✅ Pie Chart Options
const chartOptions = (): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-500");
  const baseColor = getCSSVariableValue("--bs-primary");

  return {
    chart: {
      fontFamily: "inherit",
      type: "pie",
      toolbar: { show: false },
    },

    // ✅ pengganti xaxis
    labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],

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
      y: {
        formatter: (val: number) => "$" + val + " thousands",
      },
    },

    colors: [
      baseColor,
      "#50CD89",
      "#F1416C",
      "#7239EA",
      "#FFC700",
      "#009EF7",
    ],

    fill: {
      opacity: 1,
    },

    states: {
      normal: { filter: { type: "none", value: 0 } },
      hover: { filter: { type: "none", value: 0 } },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: { type: "none", value: 0 },
      },
    },
  };
};
</script>