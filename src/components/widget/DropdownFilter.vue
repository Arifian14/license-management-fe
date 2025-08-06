<template>
    <div class="mb-3">
        <label class="fs-6 fw-semibold mb-2">{{ label }}</label>
        <select class="form-select p-0 px-3" style="height: 32px;" :value="modelValue" 
            @change="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)">
        
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>

        </select>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DropdownFilter',
    props: {
        label: {
            type: String,
            required: true,
        },
        modelValue: {
            type: String,
            required: true,
        },
        options: {
            type: Array as () => { label: string; value: string }[],
            required: true,
        }
    },
});
</script>
