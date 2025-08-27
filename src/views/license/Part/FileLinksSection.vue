<template>
  <div class="row">
    <div class="col-md-6">
      <div class="mb-3 d-flex">
        <a :href="filePks" target="_blank" class="btn btn-sm btn-warning" style="width: 100%;">
          Link File PKS
        </a>
      </div>
    </div>
    <div class="col-md-6">
      <div class="mb-3 d-flex">
        <a :href="fileBast" target="_blank" class="btn btn-sm btn-primary" style="width: 100%;">
          Link File BAST
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  name: "FileLinksSection",
  props: {
    filePks: {
      type: String,
      required: true
    },
    fileBast: {
      type: String,
      required: true
    }
  }
});
</script>