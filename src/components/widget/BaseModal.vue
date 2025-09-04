<template>
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    aria-hidden="true"
    ref="modalRef"
  >
    <div :class="`modal-dialog ${modalSize == 'modal-xl' ? modalSize : 'mw-650px'}`">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <h2>{{ title }}</h2>
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <slot />
        </div>

        <!-- Footer (optional slot) -->
        <div class="modal-footer flex-center" v-if="$slots.footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ReusableModal",
  props: {
    title: {
      type: String,
      required: true,
    },
    modalId: {
      type: String,
      required: true,
    },
    modalSize: {
      type: String,
      required: false,
    },
  },
  setup() {
    const modalRef = ref<HTMLElement | null>(null);
    return {
      modalRef,
    };
  },
});
</script>
