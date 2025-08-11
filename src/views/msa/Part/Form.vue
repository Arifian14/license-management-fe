<template>
  <VForm id="msa-form" class="form" @submit="handleSubmit" :validation-schema="validationSchema">
    <!--begin::Feeds Widget 1-->
    <div class="card mb-5" :class="widgetClasses">
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
                  v-model="formRef.pks"
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
                  v-model="amountFormatted"
                  @blur="formatRupiah"
                  @focus="unformatRupiah"
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
                  v-model="formRef.people_quota"
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
                  v-model="formRef.date_started"
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
                  v-model="formRef.date_ended"
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
                  v-model="formRef.file_pks"
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
                  v-model="formRef.file_bast"
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

    <div class="card">
      <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          v-if="selectedIds.length === 0"
          class="d-flex justify-content-end"
          data-kt-customer-table-toolbar="base"
        >
          <!--begin::Add customer-->
          <button
            type="button"
            class="btn btn-primary"
            @click="openModal('create')"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Role
          </button>
          <!--end::Add customer-->
        </div>
        <!--end::Toolbar-->
      </div>
      <!--end::Card toolbar-->
    </div>
      <div class="card-body pt-0">
        <Datatable
          @on-sort="sort"
          @on-items-select="onItemSelect"
          :data="formRef.roles"
          :header="tableHeader"
          :enable-items-per-page-dropdown="true"
          :checkbox-enabled="false"
          checkbox-label="id"
        >
          <template v-slot:name="{ row }">
            {{ row.role }}
          </template>
          <template v-slot:role="{ row }">
            {{ rupiahFormatter(row.rate) }}
          </template>
          <template v-slot:actions="{ row }">
            <button
                type="button"
                class="btn btn-sm btn-warning me-2"
                @click="openModal('edit',row)"
              >
                Update 
              </button>

            <button
                type="button"
                class="btn btn-sm btn-danger"
                @click="removeDetail(row)"
              >
                Delete 
              </button>
          </template>
        </Datatable>
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

    <!-- Modal Komponen -->
    <RoleModal
      ref="modalRoleRef"
      @submit-role="handleSubmitRole"
      modalId="modal-role"
      :mode="modalMode"
      :data="selectedData"
    />
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted,computed,ref, reactive } from "vue";
import DateRangeFilter from "@/components/widget/DateRangeFilter.vue";
import { Field, ErrorMessage, Form as VForm, useForm } from "vee-validate";
import * as Yup from "yup";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";

import arraySort from "array-sort";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { MenuComponent } from "@/assets/ts/components";
import { Modal } from 'bootstrap'
import RoleModal from "./Modal/RoleModal.vue";
import { useRouter } from 'vue-router';
import {rupiahFormatter,reverseRupiahFormatter} from "../../../../utils/utils";

interface IMSADetail {
  id?: number;
  rate: number;
  role: string;
}

interface IMSA {
  pks: string;
  date_started: string;
  date_ended: string;
  people_quota: number;
  budget_quota: number;
  file_pks: any;
  file_bast: any;
  roles: IMSADetail[];
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
    Datatable,
    RoleModal
  },
  setup(props, { emit }) {
    const router = useRouter();
    const { validateField } = useForm();
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const selectedIds = ref<Array<number>>([]);
    const selectedData:any = ref({});
    const modalMode = ref<'create' | 'edit'>('create');

    const amount = ref<number | null>(null)
    const amountFormatted = ref<string>('')

    const formRef = reactive<IMSA>({
        pks: "",
        date_started: "",
        date_ended: "",
        people_quota: 0,
        budget_quota: 0,
        file_pks: "",
        file_bast: "",
        roles: []
    });

    const msaData = computed(() => formRef)

    const tableHeader = ref([
      {
        columnName: "Role",
        columnLabel: "name",
        columnWidth: 175,
      },
      {
        columnName: "Rate",
        columnLabel: "role",
        columnWidth: 230,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        columnWidth: 135,
      },
    ]);


      onMounted(() => {
        // initRole.value.splice(0, tableData.value.length, ...tableData.value);
        
      })
    

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
      budget_quota: Yup.string().required().label("Budget Quota"),
      file_pks: Yup.mixed().required().label("File PKS"),
      file_bast: Yup.mixed().required().label("File BAST"),
      roles: Yup.array().of(detailSchema).min(1, "At least one role must be added")
    });

    // GET API by ID
    const fetchDataById = async (id: string | number) => {
      try {
        // const url = `${import.meta.env.VITE_APP_API_URL}/msa/${id}`
        // const response = await ApiService.get(url);
        // selectedData.value = response.data.data || response.data;
        selectedData.value = {
          id: formRef.roles[id].id,
          role: formRef.roles[id].role,
          rate: formRef.roles[id].rate
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        Swal.fire("Error", "Gagal mengambil data.", "error");
      }
    };

    const openModal = async (mode: 'create' | 'edit', row: any = {}) => {
      modalMode.value = mode;

      if (mode === 'edit') {
        await fetchDataById(row.id);
      } else {
        selectedData.value = {}; // Reset saat create
      }

      setTimeout(() => {
        const modalEl = document.getElementById('modal-role');
        if (modalEl) {
          const modal = Modal.getOrCreateInstance(modalEl);
          modal.show();
        }
      }, 100);
    };

    const submitAPI = async (data: IMSA) => {
      const formData = {};
      formData['pks'] = data.pks;
      formData['date_started'] = data.date_started;
      formData['date_ended'] = data.date_ended;
      formData['people_quota'] = data.people_quota;
      formData['budget_quota'] = data.budget_quota;
      formData['file_pks'] = data.file_pks;
      formData['file_bast'] = data.file_bast;
      formData['roles'] = data.roles;

      try {
          const url = `${import.meta.env.VITE_APP_API_URL}/v2/msa`;
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

              router.push({name:"msa"});
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
        await submitAPI(formRef)
      }
    }

    const removeDetail = async (row: any) => {
      const confirm = await Swal.fire({
        title: 'Apakah kamu yakin?',
        text: 'Data akan dihapus',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
        customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-light',
        },
        buttonsStyling: false,
      });

      if (confirm.isConfirmed) {
        const index = formRef.roles.findIndex(obj => (obj.role === row.role && obj.rate === row.rate));
        formRef.roles.splice(index, 1);
      }
    };

    const search = ref<string>("");
    const searchItems = () => {
      // formRef.value.details.splice(0, formRef.value.details.length, ...initRole.value);
      // if (search.value !== "") {
      //   let results: Array<IRole> = [];
      //   for (let j = 0; j < formRef.value.details.length; j++) {
      //     if (searchingFunc(formRef.value.details[j], search.value)) {
      //       results.push(formRef.value.details[j]);
      //     }
      //   }
      //   formRef.value.details.splice(0, formRef.value.details.length, ...results);
      // }
      MenuComponent.reinitialization();
    };

    const searchingFunc = (obj: any, value: string): boolean => {
      for (let key in obj) {
        if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
          if (obj[key].indexOf(value) != -1) {
            return true;
          }
        }
      }
      return false;
    };

    const deleteCustomer = (id: number) => {
      for (let i = 0; i < formRef.roles.length; i++) {
        if (formRef.roles[i].id === id) {
          formRef.roles.splice(i, 1);
        }
      }
    };

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(formRef.roles, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    const handleSubmitRole = (mode,role) => {
      if(mode == 'create'){
        role['id'] = formRef.roles.length;
        formRef.roles.push(role)
      }else{
        formRef.roles[role.id] = role
      }
    }

    function formatRupiah() {
      if (amountFormatted.value) {
        formRef.budget_quota = reverseRupiahFormatter(amountFormatted.value)
        amountFormatted.value = rupiahFormatter(formRef.budget_quota)
      }
    }

    function unformatRupiah() {
      amountFormatted.value = amount.value?.toString() ?? ''
    }

    return {
      handleSubmit,
      getAssetPath,
      validationSchema,
      formRef,
      validateField,
      deleteCustomer,
      onItemSelect,
      tableHeader,
      sort,
      selectedIds,
      searchItems,
      search,
      openModal,
      modalMode,
      selectedData,
      handleSubmitRole,
      removeDetail,
      formatRupiah,
      unformatRupiah,
      amountFormatted,
      rupiahFormatter
    };
  },
});
</script>
