<template>
  <VForm id="msa-form" class="form" @submit="handleSubmit">
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
                  v-model="pksRef.pks" 
                  :disabled="true"
                  class="form-control form-control-solid" 
                  placeholder="No PKS"
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
              <input type="text" id="budget_quota" :value="rupiahFormatter(pksRef.budget_quota)" class="form-control form-control-solid" placeholder="Application input" readonly />
            </div>
          </div>
          <div class="col">
            <div class="mb-10">
              <label for="exampleFormControlInput1" class="required form-label">People Quota</label>
              <Field 
                  name="people_quota" 
                  type="number"
                  v-model="pksRef.people_quota" 
                  :disabled="true" 
                  class="form-control form-control-solid" 
                  placeholder="People Quota"
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
                  v-model="pksRef.date_started" 
                  :disabled="true"  
                  class="form-control form-control-solid" 
                  placeholder="Date Started"
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
                  v-model="pksRef.date_ended" 
                  :disabled="true" 
                  class="form-control form-control-solid" 
                  placeholder="Date Ended"
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
              <label for="exampleFormControlInput1" class="form-label">File PKS</label>
              <a :href="`${pksRef.file_pks}`" target="_blank" class="btn btn-sm btn-warning" style="width: 100%;">Link File PKS</a>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-4">
            <div class="mb-10">
              <label for="exampleFormControlInput1" class="form-label">File BAST</label>
              <a :href="`${pksRef.file_bast}`" target="_blank" class="btn btn-sm btn-warning" style="width: 100%;">Link File PKS</a>
            </div>
          </div>
          <div class="col-4">
            <div class="mb-10">
              <label for="usedBudget" class="required form-label">Used Budget Quota</label>
              <input type="text" id="usedBudget" :value="rupiahFormatter(totalUsedBudget)" class="form-control form-control-solid" placeholder="Application input" readonly />
            </div>
          </div>
          <div class="col-4">
            <div class="mb-10">
              <label for="usedPeople" class="required form-label">Used People Quota</label>
              <input type="number" id="usedPeople" :value="totalUsedPeople" class="form-control form-control-solid" placeholder="Application input" readonly />
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
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon
            icon-name="magnifier"
            icon-class="fs-1 position-absolute ms-6"
          />
          <input
            type="text"
            v-model="search"
            @input="searchItems()"
            class="form-control form-control-solid w-250px ps-15"
            placeholder="Search MSA"
          />
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          v-if="pageMode == 'view' ? false : true"
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
            Add MSA
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
          :data="formRef.msa"
          :header="tableHeader"
          :enable-items-per-page-dropdown="true"
          :checkbox-enabled="false"
          checkbox-label="id"
        >
          <template v-slot:name="{ row }">
            {{ row.name }}
          </template>
          <template v-slot:role_name="{ row }">
            {{ row.role }}
          </template>
          <template v-slot:rate="{ row }">
            {{ rupiahFormatter(row.rate) }}
          </template>
          <template v-slot:project="{ row }">
            {{ row.project }}
          </template>
          <template v-slot:group_position="{ row }">
            {{ row.group_position }}
          </template>
          <template v-slot:actions="{ row }">
            <div v-if="pageMode == 'view' ? false : true">
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
            </div>
            <div v-else></div>
          </template>
        </Datatable>
      </div>
    </div>

    <div class="row mt-10 mb-10" v-if="pageMode == 'view' ? false : true" >
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
  <MSAModal
    ref="modalMsaRef"
    @submit-msa="handleSubmitMSA"
    modalId="modal-msa"
    :mode="modalMode"
    :data="selectedData"
    :roleData="roleData"
  />
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted,computed,ref, reactive, onUpdated } from "vue";
import DateRangeFilter from "@/components/widget/DateRangeFilter.vue";
import { Field, ErrorMessage, Form as VForm, useForm } from "vee-validate";
import * as Yup from "yup";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";

import customers from "@/core/data/customers";
import type { ICustomer } from "@/core/data/customers";
import arraySort from "array-sort";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { MenuComponent } from "@/assets/ts/components";
import { Modal } from 'bootstrap'
import MSAModal from "./Modal/MsaModal.vue";
import {formatDateToYMD,getDiffMonths,rupiahFormatter} from "../../../../utils/utils";
import { useRoute } from 'vue-router';


interface IMSADetail {
  id?: number;
  role_id: number;
  name: string;
  rate: number | null;
  project: string;
  group_position: string;
  role: string
}

interface IMSA {
  msa: IMSADetail[];
}

interface IPKS {
  id: number;
  pks: string;
  date_started: string;
  date_ended: string;
  people_quota: number;
  budget_quota: number;
  file_pks: any;
  file_bast: any;
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
    MSAModal
  },
  setup(props, { emit }) {
    const route = useRoute();
    const { validateField } = useForm();
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const tableData = ref<Array<any>>([]);
    const initCustomers = ref<Array<any>>([]);

    const selectedIds = ref<Array<number>>([]);
    const selectedData:any = ref({});
    const roleData:any = ref([]);
    const modalMode = ref<'create' | 'edit'>('create');
    const pageMode = route.query.mode;

    const id = parseInt(route.params.id.toString());

      

    const tableHeader = ref([
      {
        columnName: "Name",
        columnLabel: "name",
        columnWidth: 175,
      },
      {
        columnName: "Role",
        columnLabel: "role_name",
        columnWidth: 230,
      },
      {
        columnName: "Rate",
        columnLabel: "rate",
        columnWidth: 230,
      },
      {
        columnName: "Project",
        columnLabel: "project",
        columnWidth: 200,
      },
      {
        columnName: "Group Position",
        columnLabel: "group_position",
        columnWidth: 180,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        columnWidth: 135,
      },
    ]);

      onMounted(() => {
        initCustomers.value.splice(0, tableData.value.length, ...tableData.value);

        if(formRef.msa.length > 0) tableData.value = formRef.msa;

        fetchPKSDataById(id)
      })

      onUpdated(() => {
        if(formRef.msa.length > 0) tableData.value = formRef.msa;
      })
    

    const formRef = reactive<IMSA>({
        msa: []
    });

    const pksRef = reactive<IPKS>({
        id: 0,
        pks: "",
        date_started: "",
        date_ended: "",
        people_quota: 1,
        budget_quota: 0,
        file_pks: "",
        file_bast: ""
    });


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
        const index = formRef.msa.findIndex(obj => (obj.name === row.name && obj.project === row.project && obj.group_position === row.group_position) );
        formRef.msa.splice(index, 1);
      }
    };

    const totalUsedBudget = computed(() =>{
      const totalBudgetByNewRole = formRef.msa.reduce((sum, detail) => sum + (Number(detail.rate) || 0), 0)
      const totalOfMonthsContract = getDiffMonths(pksRef.date_started, pksRef.date_ended);
      return totalBudgetByNewRole * totalOfMonthsContract;
    }
    );

    const totalUsedPeople = computed(() => formRef.msa.length);

    // GET API by ID
    const fetchPKSDataById = async (id: string | number) => {
      try {
        ApiService.setHeader()
        const url = `/api/v2/msa/${id}`
        const response = await ApiService.get(url);
        const data = response.data.data;

        pksRef.id = data.id;
        pksRef.pks = data.pks;
        pksRef.budget_quota = data.budgetQuota;
        pksRef.people_quota = data.peopleQuota;
        pksRef.date_started = formatDateToYMD(data.dateStarted);
        pksRef.date_ended = formatDateToYMD(data.dateEnded);
        pksRef.file_bast = data.fileBast;
        pksRef.file_pks = data.filePks;

        roleData.value = data.roles;

        if(data.msaDetails.length > 0){
          formRef.msa = data.msaDetails.map((item) => {
            return {
              id: item.id,
              role_id: item.role.id,
              name: item.name,
              role: item.role.role,
              rate: item.role.rate,
              project: item.project,
              group_position: item.groupPosition,
            }
          })
        }
        
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        Swal.fire("Error", "Gagal mengambil data.", "error");
      }
    };

    const openModal = async (mode: 'create' | 'edit', row: any = {}) => {
      modalMode.value = mode;
      console.log(formRef.msa)
      if (mode === 'edit') {
        const idx = formRef.msa.findIndex(obj => obj === row );
        // await fetchDataById(idx);
        row.id = idx + 1;
        selectedData.value = {...row}
      } else {
        const peopleQuota = parseInt(pksRef.people_quota.toString())
        const lengthMsa = formRef.msa.length + 1;

        if(peopleQuota < lengthMsa){
          Swal.fire("Warning", "Sudah melebihi quota.", "warning");
          return
        }
        
        selectedData.value = {}; // Reset saat create
      }

      setTimeout(() => {
        const modalEl = document.getElementById('modal-msa');
        if (modalEl) {
          const modal = Modal.getOrCreateInstance(modalEl);
          modal.show();
        }
      }, 100);
    };


    const submitAPI = async (data: IMSA, pksId: string) => {
      const formData = {}
      formData['msa'] = data.msa.map((item) => {
        return {
          role_id: item.role_id,
          name: item.name,
          project: item.project,
          group_position: item.group_position,
        }
      })

      try {
          ApiService.setHeader()
          const url = `/api/v2/msa/${pksId}/details`;
          // const response:any = await ApiService.post(url, formData);
          const response: any = await ApiService.post(url, formData);
          
          if (response?.data) {
              Swal.fire({
                  text: "Form has been successfully submitted!",
                  icon: 'success',
                  confirmButtonText: 'Ok, got it!',
                  customClass: {
                      confirmButton: 'btn btn-success',
                  },
              });
              fetchPKSDataById(id)
          }
      } catch (error:any) {
          Swal.fire({
              text: error.response.data.message,
              icon: 'warning',
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
        const pksId = pksRef.id.toString();
        await submitAPI(formRef,pksId)
      }
    }

    const handleSubmitMSA = (mode,msa) => {
      const findRole = roleData.value.find(data => data.id === msa.role_id);
      if(mode == 'create'){
          msa['id'] = formRef.msa.length;
          msa['role'] = findRole.role;
          formRef.msa.push(msa)
        }else{
          console.log(msa,'msaaaaaaaaaaaaaaaa')
          const id = msa.id == 0 ? msa.id : msa.id - 1;
          msa['role'] = findRole.role;
          formRef.msa[id] = msa
        }
      tableData.value = formRef.msa;
      initCustomers.value = tableData.value;
    }

    const search = ref<string>("");
    const searchItems = () => {
      // tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
      tableData.value = [...initCustomers.value];
      if (search.value !== "") {
        let results: Array<any> = [];
          for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        // tableData.value.splice(0, tableData.value.length, ...results);
        tableData.value = [...results];
      }
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

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    return {
      getAssetPath,
      handleSubmit,
      formRef,
      pksRef,
      validateField,
      onItemSelect,
      tableData,
      tableHeader,
      sort,
      selectedIds,
      searchItems,
      search,
      openModal,
      handleSubmitMSA,
      modalMode,
      selectedData,
      roleData,
      totalUsedBudget,
      totalUsedPeople,
      removeDetail,
      pageMode,
      rupiahFormatter
    };
  },
});
</script>
