
<template>
  <button :class="`${btnClass} d-flex align-items-center`" @click="handleClick">
    <KTIcon :icon-name="icon" :icon-class="iconClass" />
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PrimaryButton',
  props: {
    label: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function,
      required: false,
    },
    params:{
      type: [String, Number, Object, Array],
      required: false,
    },
    iconClass:{
        type: String,
        required:true
    },
    btnClass:{
        type: String,
        required:true
    }
  },
  methods: {
    handleClick() {
      if (this.onClick) {
        this.onClick(this.params);
      }
    },
  },
});
</script>
