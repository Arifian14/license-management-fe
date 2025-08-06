<template>
  <div class="mb-3">
    <label class="fs-6 fw-semibold mb-2">{{ label }}</label>
    <input
      type="text"
      class="form-control"
      style="height: 32px;"
      :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextInputFilter',
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
});
</script>
