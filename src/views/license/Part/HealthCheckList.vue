<template>
  <div>
    <HealthCheckItem
      v-for="(healthcheck, index) in healthchecks"
      :key="index"
      :healthcheck="healthcheck"
      :index="index"
      :disabled="disabled"
      :is-first="index === 0"
      @add="$emit('add')"
      @remove="$emit('remove', $event)"
      @update:healthcheck="$emit('update:healthcheck', { index, healthcheck: $event })"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import HealthCheckItem from "./HealthCheckItem.vue";
import type { IHealthCheck } from "./types";

export default defineComponent({
  name: "HealthCheckList",
  components: { HealthCheckItem },
  props: {
    healthchecks: {
      type: Array as PropType<IHealthCheck[]>,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["add", "remove", "update:healthcheck"]
});
</script>