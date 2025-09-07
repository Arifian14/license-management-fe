<template>
  <div class="row mt-10 mb-10">
    <div class="col-3 offset-md-9 text-end">
      <button
        type="button"
        @click="$emit('cancel')"
        class="btn btn-warning me-3"
      >
        <span class="indicator-label">Cancel</span>
      </button>
      
      <button
        type="submit"
        class="btn btn-primary me-3"
      >
        <span class="indicator-label">Submit</span>
        <span class="indicator-progress">
          Please wait...
          <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormActions",
  emits: ['submit', 'cancel']
});
</script>