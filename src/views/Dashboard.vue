<template>
  <!--begin::Dashboard-->
  <div class="row g-5 g-xl-8">
    <div class="col-xl-4">
      <CardWidget
        widget-classes="card-xl-stretch mb-xl-8"
        icon-name="scroll"
        color="primary"
        icon-color="white"
        title="Total Aplikasi"
        :description="`${summary.total}`"
      ></CardWidget>
    </div>
    <div class="col-xl-4">
      <CardWidget
        widget-classes="card-xl-stretch mb-xl-8"
        icon-name="abstract-18"
        color="warning"
        icon-color="white"
        title="Total Aplikasi Under 3M"
        :description="`${summary.under3Months}`"
      ></CardWidget>
    </div>
    <div class="col-xl-4">
      <CardWidget
        widget-classes="card-xl-stretch mb-xl-8"
        icon-name="information"
        color="danger"
        icon-color="white"
        title="Total Aplikasi Under 1M"
        :description="`${summary.under1Month}`"
      ></CardWidget>
    </div>
  </div>

  <div class="row g-5 g-xl-8">
    <div class="col-xl-6 mx-auto">
      <ChartWidget
        widget-classes="card-xl-stretch mb-xl-8"
        title="Distribusi Status License"
        subtitle="Berdasarkan sisa masa berlaku"
        :series="statusSeries"
        :labels="statusLabels"
        :colors="statusColors"
      ></ChartWidget>
    </div>
  </div>
  <!--end::Dashboard-->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import CardWidget from "@/components/widget/dashboard/CardWidget.vue";
import ChartWidget from "@/components/widget/dashboard/ChartWidget.vue";
import { useDashboard } from "@/views/dashboard/composables/useDashboard";

export default defineComponent({
  name: "main-dashboard",
  components: {
    CardWidget,
    ChartWidget,
  },
  setup() {
    const { summary, fetchSummary } = useDashboard();

    const statusLabels = ["Aman (> 3 bulan)", "Hampir (1–3 bulan)", "Kritis (< 1 bulan)"];
    const statusColors = ["#50CD89", "#FFC700", "#F1416C"];
    const statusSeries = computed(() => [
      summary.statusDistribution.green,
      summary.statusDistribution.yellow,
      summary.statusDistribution.red,
    ]);

    onMounted(() => {
      fetchSummary();
    });

    return {
      summary,
      statusLabels,
      statusColors,
      statusSeries,
    };
  },
});
</script>
