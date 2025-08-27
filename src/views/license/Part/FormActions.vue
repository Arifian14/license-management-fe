<template>
  <div class="text-end pt-15 mb-5">
    <button type="submit" class="btn btn-primary me-3">
      <span class="indicator-label">Submit</span>
      <span class="indicator-progress">
        Please wait...
        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormActions",
  emits: ["submit"],
  setup(props, { emit }) {
    return {};
  }
});
</script>