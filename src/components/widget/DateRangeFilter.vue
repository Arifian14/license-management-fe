<template>
  <div class="mb-3">
    <label class="fs-6 fw-semibold mb-2">{{ label }}</label>
    <div class="d-flex gap-2">
      <el-date-picker
        v-model="start"
        type="date"
        :teleported="false"
        placeholder="Start Date"
        @change="updateStart"
      />
      <el-date-picker
        v-model="end"
        type="date"
        :teleported="false"
        placeholder="End Date"
        @change="updateEnd"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import type { PropType } from 'vue';

interface DateRange {
  start: string | null;
  end: string | null;
}

export default defineComponent({
  name: 'DateRangeFilter',
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Object as PropType<DateRange>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const start = ref(props.modelValue.start);
    const end = ref(props.modelValue.end);

    watch(() => props.modelValue, (newVal) => {
      start.value = newVal.start;
      end.value = newVal.end;
    });

    const updateStart = (value: string) => {
      emit('update:modelValue', { start: value, end: end.value });
    };

    const updateEnd = (value: string) => {
      emit('update:modelValue', { start: start.value, end: value });
    };

    return {
      start,
      end,
      updateStart,
      updateEnd,
    };
  },
});
</script>
