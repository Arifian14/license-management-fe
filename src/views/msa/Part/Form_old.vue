<template>
  <VForm id="msa-form" class="form" @submit="handleSubmit" :validation-schema="validationSchema">
    <!--begin::Feeds Widget 1-->
    <div class="card" :class="widgetClasses">
      <!--begin::Body-->
      <div class="card-body pb-0">
        <div class="row">
          <div class="col">
            <div class="mb-10">
              <label for="applicationFormControlInput1" class="required form-label">No PKS</label>
              <Field 
                  name="pks" 
                  type="text" 
                  class="form-control form-control-solid" 
                  placeholder="No PKS"
                  v-model="msa.pks"
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
                  type="number" 
                  class="form-control form-control-solid" 
                  placeholder="Budget Quota"
                  v-model="msa.budget_quota"
              />
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
                  v-model="msa.people_quota"
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
                  v-model="msa.date_started"
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
                  type="date" 
                  class="form-control form-control-solid" 
                  placeholder="Date Ended"
                  v-model="msa.date_ended"
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
                  type="file" 
                  class="form-control form-control-solid" 
                  placeholder="File PKS"
                  :value="undefined"
                  @change="e => msa.file_bast = e.target.files[0]"
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
                  type="file" 
                  class="form-control form-control-solid" 
                  placeholder="File BAST"
                  :value="undefined"
                  @change="e => msa.file_bast = e.target.files[0]"
              />
              <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                      <ErrorMessage name="file_bast" />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end::Body-->
    </div>

    <div class="card mt-10" :class="widgetClasses">
      <!--begin::Body-->
      <div class="card-body pb-0">
        <div class="row">
          <div class="col-5">
            <div class="mb-10">
              <label for="usedBudget" class="required form-label">Used Budget Quota</label>
              <input type="text" id="usedBudget" :value="totalUsedBudget" class="form-control form-control-solid" placeholder="Application input" readonly />
            </div>
          </div>
          <div class="col-5">
            <div class="mb-10">
              <label for="usedPeople" class="required form-label">Used People Quota</label>
              <input type="number" id="usedPeople" :value="totalUsedPeople" class="form-control form-control-solid" placeholder="Application input" readonly />
            </div>
          </div>
          <div class="col-2">
            <label for="usedPeople" class="form-label">&nbsp;</label><br>
            <button class="btn btn-success" @click="addDetail">Add MSA</button>
          </div>
        </div>
      </div>
      <!--end::Body-->
    </div>

    <div class="row">
      <div class="col-4" v-for="(detail, index) in msa.details" :key="index">
        <div class="card mt-10" :class="widgetClasses">
          <!--begin::Header-->
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bold text-gray-900">MSA-{{ index + 1 }}</span>
              <span class="text-muted mt-1 fw-semibold fs-7">Profile Details</span>
            </h3>

            <div class="card-toolbar">
              <!--begin::Menu-->
              <button
                type="button"
                class="btn btn-sm btn-color-danger btn-active-light-danger"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
                data-kt-menu-flip="top-end"
                @click="removeDetail(index)"
                v-if="msa.details.length > 1"
              >
                Remove 
              </button>
              <Dropdown1></Dropdown1>
              <!--end::Menu-->
            </div>
          </div>
          <!--end::Header-->

          <!--begin::Body-->
          <div class="card-body pb-0">
            <div class="mb-5">
              <label for="applicationFormControlInput1" class="required form-label">Name</label>
              <Field 
                  :name="`details[${index}].name`"
                  type="text" 
                  class="form-control form-control-solid" 
                  placeholder="Name"
                  v-model="detail.name"
              />
              <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                      <ErrorMessage :name="`details[${index}].name`" />
                  </div>
              </div>
            </div>
            <div class="mb-5">
              <label for="exampleFormControlInput1" class="required form-label">Role</label>
              <Field 
                  :name="`details[${index}].role`"
                  type="text" 
                  class="form-control form-control-solid" 
                  placeholder="Role"
                  v-model="detail.role"
              />
              <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                      <ErrorMessage :name="`details[${index}].role`" />
                  </div>
              </div>
            </div>
            <div class="mb-5">
              <label for="exampleFormControlInput1" class="required form-label">Rate</label>
              <Field 
                  :name="`details[${index}].rate`"
                  type="number" 
                  class="form-control form-control-solid" 
                  placeholder="Rate"
                  v-model="detail.rate"
              />
              <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                      <ErrorMessage :name="`details[${index}].rate`"/>
                  </div>
              </div>
            </div>
            <div class="mb-5">
              <label for="exampleFormControlInput1" class="required form-label">Project</label>
              <Field 
                  :name="`details[${index}].project`"
                  type="text" 
                  class="form-control form-control-solid" 
                  placeholder="Project"
                  v-model="detail.project"
              />
              <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                      <ErrorMessage :name="`details[${index}].project`"/>
                  </div>
              </div>
            </div>
            <div class="mb-10">
              <label for="exampleFormControlInput1" class="required form-label">Group Position</label>
              <Field 
                  :name="`details[${index}].group_position`"
                  type="text" 
                  class="form-control form-control-solid" 
                  placeholder="Group Position"
                  v-model="detail.group_position"
              />
              <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                      <ErrorMessage :name="`details[${index}].group_position`"/>
                  </div>
              </div>
            </div>
          </div>
          <!--end::Body-->
        </div>
      </div>
    </div>

    <div class="row mt-10 mb-10">
      <div class="col-3 offset-md-9 text-end">
        <button
          type="submit"
          ref="submitButtonRef"
          id="btn-submit-msa"
          class="btn btn-primary me-3"
          >
              <span class="indicator-label"> Submit </span>
              <span class="indicator-progress">
                  Please wait...
                  <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
              </span>
        </button>
      </div>
    </div>
    <!--end::Feeds Widget 1-->
  </VForm>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted,computed,ref } from "vue";
import DateRangeFilter from "@/components/widget/DateRangeFilter.vue";
import { Field, ErrorMessage, Form as VForm, useForm } from "vee-validate";
import * as Yup from "yup";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";

interface MSADetail {
  name: string;
  rate: number;
  role: string;
  project: string;
  group_position: string;
}

interface MSAData {
  pks: string;
  date_started: string;
  date_ended: string;
  people_quota: number;
  budget_quota: number;
  file_pks: any;
  file_bast: any;
  details: MSADetail[];
}


export default defineComponent({
  name: "widget-1",
  props: {
    widgetClasses: String,
  },
  components: {
    DateRangeFilter,
    ErrorMessage,
    VForm,
    Field,
  },
  setup(props, { emit }) {
    const { validateField } = useForm();
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    

    const detailSchema = Yup.object().shape({
      name: Yup.string().required("Name is required"),
      rate: Yup.number().required("Rate is required"),
      role: Yup.string().required("Role is required"),
      project: Yup.string().required("Project is required"),
      group_position: Yup.string().required("Group Position is required")
    });

    const validationSchema = Yup.object().shape({
      pks: Yup.string().required().label("No PKS"),
      date_started: Yup.string().required().label("Date Started"),
      date_ended: Yup.string().required().label("Date Ended"),
      people_quota: Yup.number().required().label("People Quota"),
      budget_quota: Yup.number().required().label("Budget Quota"),
      file_pks: Yup.mixed().required().label("File PKS"),
      file_bast: Yup.mixed().required().label("File BAST"),
      details: Yup.array().of(detailSchema).min(1, "At least one person must be added")
    });

    const msa = ref<MSAData>({
        pks: "",
        date_started: "",
        date_ended: "",
        people_quota: 0,
        budget_quota: 0,
        file_pks: null as File | null,
        file_bast: null as File | null,
        details: [
          {
            name: "",
            rate: 0,
            role: "",
            project: "",
            group_position: ""
          }
        ]
    });

    const addDetail = () => {
      msa.value.details.push({
        name: "",
        rate: 0,
        role: "",
        project: "",
        group_position: ""
      });
    };

    const removeDetail = (index: number) => {
      msa.value.details.splice(index, 1);
    };

    const totalUsedBudget = computed(() =>
      msa.value.details.reduce((sum, detail) => sum + (Number(detail.rate) || 0), 0)
    );

    const totalUsedPeople = computed(() => msa.value.details.length);

    const submitAPI = async (data: typeof msa.value) => {
      const formData = new FormData()
      formData.append('pks', data.pks)
      formData.append('date_started', data.date_started)
      formData.append('date_ended', data.date_ended)
      formData.append('people_quota', data.people_quota.toString())
      formData.append('budget_quota', data.budget_quota.toString())
      if (data.file_pks) formData.append('file_pks', data.file_pks);
      if (data.file_bast) formData.append('file_bast', data.file_bast);
      formData.append('details', JSON.stringify(data.details))

      try {
          const url = `${import.meta.env.VITE_APP_API_URL}/msa`;
          const response:any = await ApiService.post(url, formData);
          if (response?.data) {
              Swal.fire({
                  text: "Form has been successfully submitted!",
                  icon: 'success',
                  confirmButtonText: 'Ok, got it!',
                  customClass: {
                      confirmButton: 'btn btn-success',
                  },
              });
          }
      } catch (error) {
          console.error("Error ambil data:", error);
          Swal.fire({
              text: 'Gagal menyimpan data. Silakan coba lagi.',
              icon: 'error',
              confirmButtonText: 'Ok, got it!',
              customClass: {
                  confirmButton: 'btn btn-danger',
              },
          });
      }
    };

    const handleSubmit = async () => {
      const confirm = await Swal.fire({
          title: 'Apakah kamu yakin?',
          text: 'Data akan disimpan ke sistem.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, simpan!',
          cancelButtonText: 'Batal',
          customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-light',
          },
          buttonsStyling: false,
      });

      if (confirm.isConfirmed) {
        await submitAPI(msa.value)
      }
    }

    return {
      getAssetPath,
      handleSubmit,
      validationSchema,
      msa,
      addDetail,
      removeDetail,
      totalUsedPeople,
      totalUsedBudget,
      validateField,
    };
  },
});
</script>
