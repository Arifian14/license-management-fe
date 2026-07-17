<template>
  <!--begin::Dashboard-->
  <!--begin::Kartu PKS (berdasar baris License/PKS)-->
  <div class="row g-5 g-xl-8">
    <div class="col-xl-4">
      <CardWidget
        widget-classes="card-xl-stretch mb-xl-8"
        icon-name="scroll"
        color="primary"
        icon-color="white"
        title="Total PKS"
        :description="`${summary.total}`"
        :to="{ path: '/license' }"
      ></CardWidget>
    </div>
    <div class="col-xl-4">
      <CardWidget
        widget-classes="card-xl-stretch mb-xl-8"
        icon-name="abstract-18"
        color="warning"
        icon-color="white"
        title="PKS Under 3M"
        :description="`${summary.under3Months - summary.under1Month}`"
        :to="{ path: '/license', query: { status: 'between_1_3_months' } }"
      ></CardWidget>
    </div>
    <div class="col-xl-4">
      <CardWidget
        widget-classes="card-xl-stretch mb-xl-8"
        icon-name="information"
        color="danger"
        icon-color="white"
        title="PKS Under 1M"
        :description="`${summary.under1Month}`"
        :to="{ path: '/license', query: { status: 'under_1_month' } }"
      ></CardWidget>
    </div>
  </div>
  <!--end::Kartu PKS-->

  <!--begin::Kartu Aplikasi (berdasar nama aplikasi unik)-->
  <div class="row g-5 g-xl-8">
    <div class="col-xl-4">
      <CardWidget
        widget-classes="card-xl-stretch mb-xl-8"
        icon-name="abstract-26"
        color="primary"
        icon-color="white"
        title="Total Aplikasi"
        :description="`${summary.applications.total}`"
        :to="{ path: '/license', query: { view: 'application' } }"
      ></CardWidget>
    </div>
    <div class="col-xl-4">
      <CardWidget
        widget-classes="card-xl-stretch mb-xl-8"
        icon-name="chart-simple"
        color="warning"
        icon-color="white"
        title="Aplikasi Under 3M"
        :description="`${summary.applications.between1And3Months}`"
        :to="{ path: '/license', query: { view: 'application', status: 'between_1_3_months' } }"
      ></CardWidget>
    </div>
    <div class="col-xl-4">
      <CardWidget
        widget-classes="card-xl-stretch mb-xl-8"
        icon-name="chart-pie-4"
        color="danger"
        icon-color="white"
        title="Aplikasi Under 1M"
        :description="`${summary.applications.under1Month}`"
        :to="{ path: '/license', query: { view: 'application', status: 'under_1_month' } }"
      ></CardWidget>
    </div>
  </div>
  <!--end::Kartu Aplikasi-->

  <div class="row g-5 g-xl-8">
    <div class="col-xl-6">
      <ChartWidget
        widget-classes="card-xl-stretch mb-xl-8"
        title="Distribusi Status PKS"
        subtitle="Berdasarkan sisa masa berlaku"
        :series="statusSeries"
        :labels="statusLabels"
        :colors="statusColors"
        :filters="statusFilters"
      ></ChartWidget>
    </div>
    <div class="col-xl-6">
      <ChartWidget
        widget-classes="card-xl-stretch mb-xl-8"
        title="Distribusi Status Aplikasi"
        subtitle="Berdasarkan nama aplikasi unik"
        :series="appStatusSeries"
        :labels="statusLabels"
        :colors="statusColors"
        :filters="statusFilters"
        view="application"
      ></ChartWidget>
    </div>
  </div>
  <!--end::Dashboard-->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from "vue";
import CardWidget from "@/components/widget/dashboard/CardWidget.vue";
import ChartWidget from "@/components/widget/dashboard/ChartWidget.vue";
import { useDashboard } from "@/views/dashboard/composables/useDashboard";
import { useBodyStore } from "@/stores/body";

export default defineComponent({
  name: "main-dashboard",
  components: {
    CardWidget,
    ChartWidget,
  },
  setup() {
    const { summary, fetchSummary } = useDashboard();
    const bodyStore = useBodyStore();

    const statusLabels = ["Aman (> 3 bulan)", "Hampir (1–3 bulan)", "Kritis (< 1 bulan)"];
    const statusColors = ["#50CD89", "#FFC700", "#F1416C"];
    // Filter status per kategori (selaras urutan statusLabels/series):
    //   Aman→semua, Hampir→pita 1-3 bln (presisi), Kritis→≤1 bln.
    // Disamakan dengan perilaku kartu PKS/Aplikasi saat diklik.
    const statusFilters = ["above_3_months", "between_1_3_months", "under_1_month"];

    // Distribusi status berdasar baris PKS
    const statusSeries = computed(() => [
      summary.statusDistribution.green,
      summary.statusDistribution.yellow,
      summary.statusDistribution.red,
    ]);

    // Distribusi status berdasar nama aplikasi unik (green, yellow, red).
    // Kuning memakai between1And3Months (hitungan distinct pita, dari backend) — BUKAN
    // (under3Months - under1Month) — agar cocok dengan list aplikasi saat slice diklik.
    // Catatan: karena satu aplikasi bisa punya PKS di beberapa pita, slice bisa saling
    // beririsan (jumlah slice tidak selalu = total aplikasi); ini memang sifat "coverage".
    const appStatusSeries = computed(() => {
      const { under1Month, between1And3Months, above3Months } = summary.applications;
      return [above3Months, between1And3Months, under1Month];
    });

    onMounted(() => {
      // Perbesar area background teal agar mencakup kedua baris kartu (khusus halaman dashboard)
      bodyStore.addBodyClassname("page-bg-image-lg");
      fetchSummary();
    });

    onUnmounted(() => {
      bodyStore.removeBodyClassName("page-bg-image-lg");
    });

    return {
      summary,
      statusLabels,
      statusColors,
      statusFilters,
      statusSeries,
      appStatusSeries,
    };
  },
});
</script>
