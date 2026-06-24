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
        description="15"
      ></CardWidget>
    </div>
    <div class="col-xl-4">
      <CardWidget
        widget-classes="card-xl-stretch mb-xl-8"
        icon-name="abstract-18"
        color="warning"
        icon-color="white"
        title="Total Aplikasi Under 3M"
        description="10"
      ></CardWidget>
    </div>
    <div class="col-xl-4">
      <CardWidget
        widget-classes="card-xl-stretch mb-xl-8"
        icon-name="information"
        color="danger"
        icon-color="white"
        title="Total Aplikasi Under 1M"
        description="5"
      ></CardWidget>
    </div>
  </div>

  
  <div class="row g-5 g-xl-8">
    <div class="col-xl-6 mx-auto">
      <ChartWidget widget-classes="card-xl-stretch mb-xl-8"></ChartWidget>
    </div>
  </div>

  <!--end::Dashboard-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CardWidget from "@/components/widget/dashboard/CardWidget.vue";
import ChartWidget from "@/components/widget/dashboard/ChartWidget.vue";

export default defineComponent({
  name: "main-dashboard",
  components: {
    CardWidget,
    ChartWidget
  },
});
</script>
