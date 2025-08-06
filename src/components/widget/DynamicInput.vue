<template>
  <div>
    <div v-for="(link, index) in links" :key="index" class="input-group mb-2">
      <Field
        :name="`link-${index}`"
        class="form-control"
        v-model="links[index]"
        :placeholder="`Link ${index + 1}`"
      />

      <!-- Tombol tambah hanya di input terakhir -->
      <Button
        v-if="index === links.length - 1"
        btnClass="btn btn-success input-group-text"
        @click="addField"
        iconClass="fs-2"
        icon="plus"
      />

      <!-- Tombol hapus muncul jika lebih dari satu input -->
      <Button
        v-if="links.length > 1"
        btnClass="btn btn-danger input-group-text"
        @click="() => removeField(index)"
        iconClass="fs-2"
        icon="trash-square"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Field } from 'vee-validate';
import Button from '@/components/widget/Button.vue';

// Props dan Emit
const props = defineProps<{
  modelValue: string[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

// Computed untuk binding dua arah
const links = computed({
  get: () => props.modelValue,
  set: (val: string[]) => emit('update:modelValue', val),
});

// Fungsi tambah dan hapus
function addField() {
  links.value.push('');
}

function removeField(index: number) {
  if (links.value.length > 1) {
    links.value.splice(index, 1);
  }
}
</script>
