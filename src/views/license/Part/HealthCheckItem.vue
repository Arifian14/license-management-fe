<template>
  <div class="row mb-3 mt-5">
    <div class="col-md-5">
      <FormField
        :name="`healthchecks[${index}].healthcheck_routine_date`"
        type="date"
        label="Health Check Routine"
        :required="true"
        :model-value="healthcheck.healthcheck_routine_date"
        :disabled="disabled"
        @update:modelValue="updateField('healthcheck_routine_date', $event)"
      />
    </div>
    
    <div class="col-md-5">
      <FormField
        :name="`healthchecks[${index}].healthcheck_actual_date`"
        type="date"
        label="Health Check Actual"
        :required="true"
        :model-value="healthcheck.healthcheck_actual_date"
        :disabled="disabled"
        @update:modelValue="updateField('healthcheck_actual_date', $event)"
      />
    </div>
    
    <div class="col-md-2 d-flex align-items-end" v-if="!disabled && showActions">
      <button 
        type="button" 
        class="btn btn-primary mb-3" 
        v-if="isFirst" 
        @click="$emit('add')"
      >+</button>
      
      <button 
        type="button" 
        class="btn btn-danger mb-3" 
        v-else 
        @click="$emit('remove', index)"
      >-</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import FormField from "@/components/Form/FormField.vue";
import type { IHealthCheck } from "./types";

export default defineComponent({
  name: "HealthCheckItem",
  components: { FormField },
  props: {
    healthcheck: {
      type: Object as PropType<IHealthCheck>,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isFirst: {
      type: Boolean,
      default: false
    },
    showActions: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:healthcheck", "add", "remove"],
  methods: {
    updateField(field: keyof IHealthCheck, value: string) {
      this.$emit("update:healthcheck", {
        ...this.healthcheck,
        [field]: value
      });
    }
  }
});
</script>