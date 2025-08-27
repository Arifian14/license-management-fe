<template>
  <div :class="wrapperClass">
    <label v-if="label" :for="name" :class="labelClass">
      {{ label }}<span v-if="required">*</span>
    </label>
    
    <Field
      :name="name"
      :type="type"
      :class="inputClass"
      :placeholder="placeholder"
      :model-value="modelValue"
      :disabled="disabled"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    
    <div class="fv-plugins-message-container">
      <div class="fv-help-block">
        <ErrorMessage :name="name" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "FormField",
  components: { Field, ErrorMessage },
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    wrapperClass: {
      type: String,
      default: "mb-3"
    },
    labelClass: {
      type: String,
      default: "form-label"
    },
    inputClass: {
      type: String,
      default: "form-control form-control-solid"
    }
  },
  emits: ["update:modelValue"]
});
</script>