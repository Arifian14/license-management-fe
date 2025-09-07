<template>
  <VForm id="msa-form" class="form" @submit="$emit('submit')" :validation-schema="validationSchema">
    <div class="card mb-5" :class="widgetClasses">
      <div class="card-body pb-0">
        <BasicInfo 
          :msa="msa" 
          @update:field="updateField"
          @date-started-changed="$emit('date-started-changed')"
        />
      </div>
    </div>

    <RoleManagement 
      :roles="msa.roles"
      @add-role="$emit('add-role')"
      @edit-role="$emit('edit-role', $event)"
      @remove-role="$emit('remove-role', $event)"
    />

    <FormActions 
      @submit="$emit('submit')"
      @cancel="$emit('cancel')"
    />
  </VForm>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { Form as VForm } from "vee-validate";
import BasicInfo from "@/views/msa/components/MsaForm/FormFields/BasicInfo.vue";
import RoleManagement from "./FormFields/RoleForm.vue";
import FormActions from "@/views/msa/components/MsaForm/FormActions.vue";
import type { IMsa } from "@/views/msa/types/index";

export default defineComponent({
  name: "MsaForm",
  components: { 
    VForm, 
    BasicInfo, 
    RoleManagement, 
    FormActions 
  },
  props: {
    msa: {
      type: Object as PropType<IMsa>,
      required: true
    },
    validationSchema: {
      type: Object,
      required: true
    },
    widgetClasses: {
      type: String,
      default: ""
    }
  },
  emits: ['submit', 'cancel', 'update:field', 'add-role', 'edit-role', 'remove-role', 'date-started-changed'],
  setup(props, { emit }) {
    const updateField = ({ field, value }: { field: keyof IMsa, value: any }) => {
      emit('update:field', { field, value });
    };

    return {
      updateField
    };
  }
});
</script>