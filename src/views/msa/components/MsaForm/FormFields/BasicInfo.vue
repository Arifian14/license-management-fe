<template>
  <div class="row">
    <div class="col">
      <div class="mb-10">
        <label for="applicationFormControlInput1" class="required form-label">No PKS</label>
        <Field 
          name="pks" 
          type="text" 
          class="form-control form-control-solid" 
          placeholder="No PKS"
          :model-value="msa.pks"
          @update:modelValue="$emit('update:field', { field: 'pks', value: $event })"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="pks" />
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="mb-10">
        <label for="exampleFormControlInput1" class="required form-label">Budget Quota</label>
        <Field 
          name="budget_quota" 
          type="text" 
          class="form-control form-control-solid" 
          placeholder="Budget Quota"
          :model-value="amountFormatted"
          @blur="formatRupiah"
          @focus="unformatRupiah"
          @update:modelValue="$emit('update:field', { field: 'budget_quota', value: reverseRupiahFormatter($event) })"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="budget_quota" />
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="mb-10">
        <label for="exampleFormControlInput1" class="required form-label">People Quota</label>
        <Field 
          name="people_quota" 
          type="number" 
          class="form-control form-control-solid" 
          placeholder="People Quota"
          :model-value="msa.people_quota"
          @update:modelValue="$emit('update:field', { field: 'people_quota', value: $event })"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="people_quota" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <div class="mb-10">
        <label for="exampleFormControlInput1" class="required form-label">Date Started</label>
        <Field 
          name="date_started" 
          type="date" 
          class="form-control form-control-solid" 
          placeholder="Date Started"
          :model-value="msa.date_started"
          @update:modelValue="$emit('update:field', { field: 'date_started', value: $event })"
          @change="$emit('date-started-changed')"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="date_started" />
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="mb-10">
        <label for="exampleFormControlInput1" class="required form-label">Date Ended</label>
        <Field 
          name="date_ended"
          :min="msa.date_started" 
          type="date" 
          class="form-control form-control-solid" 
          placeholder="Date Ended"
          :model-value="msa.date_ended"
          @update:modelValue="$emit('update:field', { field: 'date_ended', value: $event })"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="date_ended" />
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="mb-10">
        <label for="exampleFormControlInput1" class="required form-label">File PKS</label>
        <Field 
          name="file_pks" 
          type="text" 
          class="form-control form-control-solid" 
          placeholder="File PKS"
          :model-value="msa.file_pks"
          @update:modelValue="$emit('update:field', { field: 'file_pks', value: $event })"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="file_pks" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-4">
      <div class="mb-10">
        <label for="exampleFormControlInput1" class="required form-label">File BAST</label>
        <Field 
          name="file_bast" 
          type="text" 
          class="form-control form-control-solid" 
          placeholder="File BAST"
          :model-value="msa.file_bast"
          @update:modelValue="$emit('update:field', { field: 'file_bast', value: $event })"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="file_bast" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import type { PropType } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { rupiahFormatter, reverseRupiahFormatter } from "@/utils/utils";
import type { IMsa } from "@/views/msa/types/index";

export default defineComponent({
  name: "BasicInfo",
  components: { Field, ErrorMessage },
  props: {
    msa: {
      type: Object as PropType<IMsa>,
      required: true
    }
  },
  emits: ['update:field', 'date-started-changed'],
  setup(props) {
    const amountFormatted = ref<string>('');

    watch(
      () => props.msa.budget_quota,
      (newVal) => {
        if (newVal) {
          amountFormatted.value = rupiahFormatter(newVal);
        }
      },
      { immediate: true }
    );

    const formatRupiah = () => {
      if (amountFormatted.value) {
        const numericValue = reverseRupiahFormatter(amountFormatted.value);
        amountFormatted.value = rupiahFormatter(numericValue);
      }
    };

    const unformatRupiah = () => {
      amountFormatted.value = props.msa.budget_quota?.toString() ?? '';
    };

    return {
      amountFormatted,
      formatRupiah,
      unformatRupiah,
      rupiahFormatter,
      reverseRupiahFormatter
    };
  }
});
</script>