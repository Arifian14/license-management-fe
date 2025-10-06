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
              <label for="exampleFormControlInput1" class="required form-label">Date Started</label>
              <Field 
                  name="date_started" 
                  type="text"
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
                  type="text"
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
        </div>

        <div class="row">
          <div class="col">
            <div class="mb-10">
              <label for="exampleFormControlInput1" class="required form-label">Budget Quota</label>
              <input type="text" id="budget_quota" :value="rupiahFormatter(pksRef.budget_quota)" class="form-control form-control-solid" placeholder="Application input" readonly />
            </div>
          </div>
          <div class="col">
            <div class="mb-10">
              <label for="usedBudget" class="required form-label">Used Budget Quota</label>
              <input type="text" id="usedBudget" :value="rupiahFormatter(totalUsedBudget)" class="form-control form-control-solid" placeholder="Application input" readonly />
            </div>
          </div>
          <div class="col">
            <div class="mb-10">
              <label for="usedBudget" class="required form-label">Available Budget</label>
              <input type="text" id="usedBudget" :value="rupiahFormatter(availableBudget)" class="form-control form-control-solid" placeholder="Application input" readonly />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <div class="mb-10">
              <label for="exampleFormControlInput1" class="form-label">File PKS</label>
              <a :href="`${pksRef.file_pks}`" target="_blank" class="btn btn-sm btn-warning" style="width: 100%;">Link File PKS</a>
            </div>
          </div>
          <div class="col">
            <div class="mb-10">
              <label for="exampleFormControlInput1" class="form-label">File BAST</label>
              <a :href="`${pksRef.file_bast}`" target="_blank" class="btn btn-sm btn-warning" style="width: 100%;">Link File PKS</a>
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
          <div class="col">
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
          :data="filteredTableData"
          :header="tableHeader"
          :enable-items-per-page-dropdown="true"
          :checkbox-enabled="false"
          checkbox-label="id"
        >
          <template v-slot:name="{ row }">
            Name : {{ row.name }}
            <br></br>
            NIK : {{ row.nik }}
            <br></br>
            Role : {{ row.role }}
          </template>
          <template v-slot:description="{ row }">
            Join Date : {{ formatTanggal(row.join_date) }} s/d {{ formatTanggal(row.leave_date) }}
            <br></br>
            Rate : {{ rupiahFormatter(row.rate) }}
            <br></br>
            Used Budget : {{ rupiahFormatter(row.used_budget) }}
          </template>
          <template v-slot:status="{ row }">
            <span :class="row.isActive ? 'badge badge-success' : 'badge badge-danger'">{{ row.isActive ? 'Active' : 'Inactive' }}</span>
          </template>
          <template v-slot:rate="{ row }">
            {{ rupiahFormatter(row.rate) }}
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
                  v-if="row.isDB == true ? false : true"
                  type="button"
                  class="btn btn-sm btn-danger"
                  @click="removeDetail(row)">
                  Delete 
                </button>
            </div>
            <div v-if="pageMode == 'view' ? true : false">
              <button
                type="button"
                class="btn btn-sm btn-primary me-2"
                @click="openModal('view',row)"
              >
                View 
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
          type="button"
          @click="handleBack"
          id="btn-submit-msa"
          class="btn btn-danger me-3"
          >
              <span class="indicator-label"> Back </span>
        </button>

        <button
          type="button"
          @click="handleCancel"
          id="btn-submit-msa"
          class="btn btn-warning me-3"
          >
              <span class="indicator-label"> Cancel </span>
        </button>
        
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
    modalSize="modal-lg"
    :mode="modalMode"
    :data="selectedData"
    :dataMsa="formRef.msa"
    :dataPks="pksRef"
    :roleData="roleData"
    :groupData="groupData"
    :vendorData="vendorData"
  />
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted,computed,ref, reactive, onUpdated, onBeforeUpdate, watch } from "vue";
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
import {formatDateToYMD,getDiffMonths,rupiahFormatter,dateNow,usedBudgetMSA,formatTanggal,reverseTanggal,checkExpiredDate} from "@/utils/utils"
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

interface IDetailProjects{
  name: string;
  team_leader: string;
}

interface IMSADetail {
  id?: number;
  role_id: number;
  nik: number;
  name: string;
  rate: number | null;
  used_budget: number | null;
  group_id: number;
  department_id: number;
  vendor_id: number;
  isActive: boolean;
  join_date: string;
  leave_date: string;
  role: string
  projects: IDetailProjects[]
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
    const router = useRouter();
    const { validateField } = useForm();
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const tableData = ref<Array<any>>([]);
    const initCustomers = ref<Array<any>>([]);

    const selectedIds = ref<Array<number>>([]);
    const selectedData:any = ref({});
    const roleData:any = ref([]);
    const groupData:any = ref([]);
    const vendorData:any = ref([]);
    const modalMode = ref<'create' | 'edit' | 'view'>('create');
    const pageMode = route.query.mode;
    const isExpired:any = ref(false);

    const id = parseInt(route.params.id.toString());

      

    const tableHeader = ref([
      {
        columnName: "Name",
        columnLabel: "name",
        columnWidth: 175,
      },
      {
        columnName: "Description",
        columnLabel: "description",
        columnWidth: 230,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        columnWidth: 50,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        columnWidth: 135,
      },
    ]);

      onMounted(() => {
        fetchPKSDataById(id)
        fetchGroupPosition()
        fetchVendor()
      })

      // onUpdated(() => {
      //   if(formRef.msa.length > 0) tableData.value = formRef.msa;
      // })
      // onUpdated(() => {
      //   console.log('onUpdate')
      //   if(formRef.msa.length > 0) {
      //     tableData.value = formRef.msa;
      //     // Perbarui initCustomers ketika data berubah
      //     initCustomers.value = [...formRef.msa];
      //   }
      // })
    

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

    watch(() => formRef.msa, (newValue) => {
        tableData.value = [...newValue];
        initCustomers.value = [...newValue];
      }, { deep: true, immediate: true });


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
        const index = formRef.msa.findIndex(obj => (obj.name === row.name && obj.group_id === row.group_id) );
        formRef.msa.splice(index, 1);
      }
    };

    const totalUsedBudget = computed(() =>{
      const totalBudgetByNewRole = formRef.msa.reduce((sum, detail) => sum + (Number(detail.used_budget) || 0), 0)
      return totalBudgetByNewRole;
    }
    );

    const availableBudget = computed(() => {
      return pksRef.budget_quota - totalUsedBudget.value;
    });

    const totalUsedPeople = computed(() => formRef.msa.length);

    const fetchGroupPosition = async () => {
      try {
        ApiService.setHeader()
        const url = `/api/master`
        const params = {
          type:'group'
        }
        const response = await ApiService.query(url,{params});
        const data = response.data.data;
        groupData.value = data;
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        Swal.fire("Error", "Gagal mengambil data.", "error");
      }
    }

    const fetchVendor = async () => {
      try {
        ApiService.setHeader()
        const url = `/api/master`
        const params = {
          type:'vendor'
        }
        const response = await ApiService.query(url,{params});
        const data = response.data.data;
        vendorData.value = data;
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        Swal.fire("Error", "Gagal mengambil data.", "error");
      }
    }

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
        pksRef.date_started = formatTanggal(formatDateToYMD(data.dateStarted));
        pksRef.date_ended = formatTanggal(formatDateToYMD(data.dateEnded));
        pksRef.file_bast = data.fileBast;
        pksRef.file_pks = data.filePks;

        isExpired.value = checkExpiredDate(data.date_ended);

        roleData.value = data.roles;

        if(data.msaDetails.length > 0){
          formRef.msa = data.msaDetails.map((item) => {
            const dataDetail:any = {
              id: item.id,
              role_id: item.role.id,
              name: item.name,
              nik: item.nik,
              role: item.role.role,
              rate: item.role.rate,
              group_id: item.group.id,
              department_id: item.department.id,
              vendor_id: item.vendor.id,
              join_date: item.joinDate != undefined ? formatDateToYMD(item.joinDate) : formatDateToYMD(data.dateStarted),
              leave_date: item.leaveDate ? formatDateToYMD(item.leaveDate) : formatDateToYMD(data.dateEnded),
              isActive: item.isActive,
              isDB: true,
            }
            dataDetail.used_budget = usedBudgetMSA(item.role.rate,getDiffMonths(dataDetail.join_date,dataDetail.leave_date));
            dataDetail.projects = item.projects?.map((item) => {
              return {
                name: item.name,
                team_leader: item.teamLeader,
              }
            });
            return dataDetail;
          })
          tableData.value = [...formRef.msa];
          initCustomers.value = [...formRef.msa];
        }

        console.log(data,'====data====')
        
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        Swal.fire("Error", "Gagal mengambil data.", "error");
      }
    };

    const openModal = async (mode: 'create' | 'edit' | 'view', row: any = {}) => {
      modalMode.value = mode;
      if (mode === 'edit' || 'view') {
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
        const data:any = {};
        data.role_id = item.role_id;
        data.nik = item.nik;
        data.name = item.name;
        data.group_id = item.group_id;
        data.department_id = item.department_id;
        data.vendor_id = item.vendor_id;
        data.join_date = item.join_date;
        data.projects = item.projects;

        if(item.isActive == false){
          data.leave_date = item.leave_date;
        }

        return data;
      });


      try {
          ApiService.setHeader()
          const url = `/api/v2/msa/${pksId}/details`;
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
              // fetchPKSDataById(id)
              router.push({name:"msa"});
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

    const handleCancel = async () => {
      const confirm = await Swal.fire({
          title: 'Apakah kamu yakin?',
          text: 'Data akan di reset',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, cancel!',
          cancelButtonText: 'Batal',
          customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-light',
          },
          buttonsStyling: false,
      });

      if (confirm.isConfirmed) {
        resetForm()

        fetchPKSDataById(id)
      }
    }

    const handleBack = async () => {
      const confirm = await Swal.fire({
          title: 'Apakah kamu yakin untuk kembali ke halaman PKS?',
          text: 'Data akan di reset',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, back!',
          cancelButtonText: 'Batal',
          customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-light',
          },
          buttonsStyling: false,
      });

      if (confirm.isConfirmed) {
        router.push({ path: `/msa`});
      }
    }

    function resetForm(){
        formRef.msa = [];
    }

    const handleSubmitMSA = (mode,msa) => {
      const findRole = roleData.value.find(data => data.id === msa.role_id);
      msa['leave_date'] = msa.isActive == true ? reverseTanggal(pksRef.date_ended) : dateNow();
      msa['used_budget'] = usedBudgetMSA(msa.rate,getDiffMonths(msa.join_date,msa.leave_date));
      if(mode == 'create'){
          msa['id'] = formRef.msa.length;
          msa['isDB'] = false;
          msa['role'] = findRole.role;
          formRef.msa.push(msa)
        }else{
          const id = msa.id == 0 ? msa.id : msa.id - 1;
          msa['role'] = findRole.role;
          formRef.msa[id] = msa
        }
      tableData.value = formRef.msa;
      initCustomers.value = tableData.value;
    }

    const search = ref<string>("");

    const filteredTableData = computed(() => {
      if (search.value === "") {
        return [...formRef.msa];
      }
      
      const searchTerm = search.value.toLowerCase();
      return formRef.msa.filter(item => searchingFunc(item, searchTerm));
    });

    const searchingFunc = (obj: any, value: string): boolean => {
      // Cari di semua properti string pada objek
      for (let key in obj) {
        if (obj[key] !== null && typeof obj[key] === "string") {
          if (obj[key].toLowerCase().includes(value)) {
            return true;
          }
        } else if (typeof obj[key] === "number") {
          // Juga cari dalam angka yang dikonversi ke string
          if (obj[key].toString().includes(value)) {
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
      handleCancel,
      handleBack,
      formRef,
      pksRef,
      validateField,
      onItemSelect,
      tableData,
      filteredTableData,
      tableHeader,
      sort,
      selectedIds,
      search,
      openModal,
      handleSubmitMSA,
      modalMode,
      selectedData,
      roleData,
      groupData,
      vendorData,
      totalUsedBudget,
      totalUsedPeople,
      availableBudget,
      isExpired,
      removeDetail,
      pageMode,
      rupiahFormatter,
      formatTanggal
    };
  },
});
</script>
