<template>
  <div>
    <BaseModal :title="modalTitle" :modalId="modalId" :modal-size="modalSize">
      <VForm id="msa-form" class="form" @submit="handleSubmit" :validation-schema="validationSchema">
        <!-- Form Fields -->
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="applicationFormControlInput1" class="required form-label">Name</label>
              <Field
                name="name"
                type="text"
                class="form-control form-control-solid"
                placeholder="Name"
                v-model="form.name"
                :disabled="isView"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="name" />
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="applicationFormControlInput1" class="required form-label">NIK</label>
              <Field
                name="nik"
                type="text"
                class="form-control form-control-solid"
                placeholder="NIK"
                v-model="form.nik"
                :disabled="isView"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="nik" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <!-- Form Fields -->
            <div class="mb-3">
              <label for="applicationFormControlInput1" class="required form-label">Role</label>
              <Field name="role_id" as="select" class="form-control form-control-solid" :disabled="isView" v-model="form.role_id" @change="handleSelectionChange($event)">
                <option v-for="opt in props.roleData" :key="opt.id" :value="opt.id">{{ opt.role }}</option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="role_id" />
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <!-- Form Fields -->
            <div class="mb-3">
              <label for="applicationFormControlInput1" class="required form-label">Rate</label>
              <input type="text" id="budget_quota" :value="rupiahFormatter(amountFormattedBudget)" class="form-control form-control-solid" placeholder="Application input" readonly />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label class="required form-label">Start Join Date</label>
            <Field
              name="due_date_license"
              type="date"
              :min="form.date_started_pks"
              :max="form.date_ended_pks"
              class="form-control form-control-solid"
              placeholder="Due Date License"
              v-model="form.join_date"
              :disabled="isView"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="due_date_license" />
              </div>
            </div>
          </div>
          
          <div class="col">
            <!-- Form Fields -->
            <div class="mb-3">
              <label for="applicationFormControlInput1" class="required form-label">Group Position</label>
              <Field
                name="group_position"
                type="text"
                class="form-control form-control-solid"
                placeholder="Group Position"
                v-model="form.group_position"
                :disabled="isView"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="group_position" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label class="required form-label">Department</label>
            <Field
              name="department"
              type="text"
              class="form-control form-control-solid"
              placeholder="Department"
              v-model="form.department"
              :disabled="isView"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="department" />
              </div>
            </div>
          </div>
          
          <div class="col">
            <!-- Form Fields -->
            <div class="mb-3">
              <label for="applicationFormControlInput1" class="required form-label">Vendor</label>
              <Field
                name="vendor"
                type="text"
                class="form-control form-control-solid"
                placeholder="Vendor"
                v-model="form.vendor"
                :disabled="isView"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="vendor" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label class="required form-label">Status</label>
            <div class="d-flex">
              <div class="form-check mx-2">
                <input 
                  class="form-check-input" 
                  type="radio" 
                  :value=true 
                  name="status" 
                  v-model="form.isActive"
                  :disabled="isView"
                  id="flexRadioDefault1" :checked="form.isActive === true ? true : false"/>
                <label class="form-check-label" for="flexRadioDefault1">
                  Active
                </label>
              </div>
              <div class="form-check mx-2">
                <input 
                  class="form-check-input" 
                  type="radio" 
                  :value=false 
                  name="status" 
                  v-model="form.isActive"
                  :disabled="isView"
                  id="flexRadioDefault1" :checked="form.isActive === false ? true : false"/>
                <label class="form-check-label" for="flexRadioDefault1">
                  Inactive
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- ============================================================================================================ -->
         <div class="row mt-5" v-for="(project,index) in form.projects" :key="index">
          <div class="col-md-5">
            <!-- Form Fields -->
            <div class="mb-3">
              <label for="applicationFormControlInput1" class="required form-label">Project</label>
              <Field
                :name="`projects[${index}].name`"
                type="text"
                class="form-control form-control-solid"
                placeholder="Project"
                v-model="project.name"
                :disabled="isView"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage :name="`projects[${index}].name`" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-5">
            <!-- Form Fields -->
            <div class="mb-3">
              <label for="applicationFormControlInput1" class="required form-label">Leader</label>
              <Field
                :name="`projects[${index}].team_leader`"
                type="text"
                class="form-control form-control-solid"
                placeholder="team_leader Project"
                v-model="project.team_leader"
                :disabled="isView"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage :name="`projects[${index}].team_leader`" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2 d-flex align-items-end" v-if="!isView">
              <button type="button" class="btn btn-primary mb-3" v-if="index === 0" @click="addProject">+</button>
              <button type="button" class="btn btn-danger mb-3" v-else="index > 0"@click="removeProject(index)">-</button>
          </div>
        </div>
        <!-- ============================================================================================================ -->


        <!-- ============================================================================================================ -->
         <!-- <div class="row mt-5" v-for="(contract,index) in form.contracts" :key="index">
            <div class="col-md-5">
              <div class="mb-3">
                <label for="applicationFormControlInput1" class="required form-label">Start Contract</label>
                <Field
                  :name="`contracts[${index}].start_contract`"
                  type="date"
                  class="form-control form-control-solid"
                  placeholder="Start Contract"
                  v-model="contract.start_contract"
                  :disabled="isView"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage :name="`contracts[${index}].start_contract`" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <div class="mb-3">
                <label for="applicationFormControlInput1" class="required form-label">End Contract</label>
                <Field
                  :name="`contracts[${index}].end_contract`"
                  type="date"
                  class="form-control form-control-solid"
                  placeholder="End Contract"
                  v-model="contract.end_contract"
                  :disabled="isView"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage :name="`contracts[${index}].end_contract`" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-2 d-flex align-items-end" v-if="!isView">
                <button type="button" class="btn btn-primary mb-3" v-if="index === 0" @click="addContract">+</button>
                <button type="button" class="btn btn-danger mb-3" v-else="index > 0"@click="removeContract(index)">-</button>
            </div>
        </div> -->
        <!-- ============================================================================================================ -->

        <div class="text-center pt-15" v-if="!isView">
          <button type="submit" ref="submitButtonRef" class="btn btn-primary me-3">
            <span class="indicator-label">Submit</span>
            <span class="indicator-progress">
              Please wait...
              <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
        </div>
      </VForm>
    </BaseModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, type PropType, type Ref, reactive } from "vue";
import { Field, ErrorMessage, Form as VForm, useForm } from "vee-validate";
import * as Yup from "yup";
import BaseModal from "@/components/widget/BaseModal.vue";
import { Modal } from "bootstrap";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {rupiahFormatter,reverseRupiahFormatter,reverseTanggal} from "@/utils/utils"

interface IDetailProjects{
  name: string;
  team_leader: string;
}

interface IDetailContracts{
  start_contract: string;
  end_contract: string;
}

interface IMsa {
  id?: number;
  role_id: number;
  name: string;
  nik: string;
  rate: number;
  group_position: string;
  department: string;
  vendor: string;
  projects: IDetailProjects[]
  // contracts: IDetailContracts[]
  join_date: string;
  isActive: boolean;
  date_started_pks: string;
  date_ended_pks: string;
}

export default defineComponent({
  components: { BaseModal, Field, ErrorMessage, VForm },
  props: {
    mode: {
      type: String,
      default: "create", // 'create' | 'edit' | 'view'
    },
    data: {
      type: Object as () => IMsa,
      default: () => ({}),
    },
    roleData: {
      type: Array as () => any,
      default: () => ([]),
    },
    dataPks: {
      type: Array as () => any,
      default: () => ([]),
    },
    dataMsa: {
      type: Array as () => any,
      default: () => ([]),
    },
    modalId: {
      type: String,
      required: true,
    },
    modalSize: {
      type: String,
      required: true,
    },
  },
  emits: ['submit-msa','close'],
  setup(props,{ emit }) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const modalRef = ref<null | HTMLElement>(null);
    const amountFormattedBudget = ref<number>(0)

    const detailSchema = Yup.object().shape({
      name: Yup.string().required().label("Project"),
      team_leader: Yup.string().required().label("team_leader"),
    });

    const validationSchema = Yup.object().shape({
      name: Yup.string().required(),
      role_id: Yup.number().required(),
      group_position: Yup.string().required(),
      department: Yup.string().required(),
      vendor: Yup.string().required(),
      projects: Yup.array().of(detailSchema).min(1, "At least one must be added")
    });

    const form = reactive<IMsa>({
      id: 0,
      role_id: 0,
      name: "",
      nik: "",
      rate: 0,
      group_position: "",
      department: "",
      vendor: "",
      join_date: "",
      isActive: true,
      date_started_pks: "",
      date_ended_pks: "",
      projects: [{
        name: "",
        team_leader: "",
      }],
      // contracts: [{
      //   start_contract: "",
      //   end_contract: "",
      // }]
    });

    const nikTemp = ref('')

    const dataMsaRef = ref(<any>[])

    watch(
      [() => props.data, () => props.roleData,() => props.dataPks, ()=> props.dataMsa],
      ([val,roleVal,pksVal,dataMsa]) => {
        val.date_started_pks = reverseTanggal(pksVal.date_started)
        val.date_ended_pks = reverseTanggal(pksVal.date_ended)

        dataMsaRef.value = [...dataMsa];
        if (val.name != undefined) {
            nikTemp.value = val.nik;
            amountFormattedBudget.value = val.rate;
            Object.assign(form, val)
        } else {
            resetForm()
            form.date_started_pks = reverseTanggal(pksVal.date_started);
        }
      },
      { immediate: true }
    )

    const isView = computed(() => props.mode === "view");
    const modalTitle = computed(() => {
      if (props.mode === "edit") return "Edit MSA";
      if (props.mode === "view") return "Detail MSA";
      return "Tambah MSA";
    });

    function resetForm() {
        form.id = 0;
        form.role_id = 0;
        form.name = '';
        form.nik = '';
        form.rate = 0;
        form.group_position = ""
        form.department = ""
        form.vendor = ""
        form.join_date = ""
        form.isActive = true;
        form.date_started_pks = ""
        form.projects = [{
          name: "",
          team_leader: "",
        }];
        // form.contracts = [{
        //   start_contract: "",
        //   end_contract: "",
        // }]
    }

    function closeModal() {
      const modalEl = document.getElementById("modal-msa")
      if (modalEl) {
        const modal = Modal.getOrCreateInstance(modalEl);
        modal.hide();
        resetForm()
      }
    }

    function hasDuplicate(data: any[]): boolean {
      const seen = new Set<string>()

      for (const item of data) {
        const name = item.name.toLowerCase()
        if (seen.has(name)) {
          Swal.fire(
            "Warning",
            "Project duplicate.",
            "warning"
          )
          return true // ketemu duplikat
        }
        seen.add(name)
      }

      return false // tidak ada duplikat
    }

    function isNikUnique(data: any,nik: string,): boolean {
      if(nikTemp.value == nik){
        return false;
      }
      
      const result = data.some((item) => {
        if(item.nik.toLowerCase() === nik.toLowerCase()){
          return true;
        }else{
          return false;
        }
      })
      

      if(result){
        Swal.fire(
            "Warning",
            "NIK duplicate.",
            "warning"
          )
        return true;
      }
      return false;
    }


    const handleSubmit = () => {
      const validateProject = hasDuplicate(form.projects)
      const validateNik = isNikUnique(dataMsaRef.value,form.nik)
      
      if(!validateProject && !validateNik){
        emit('submit-msa', props.mode,{...form})
        closeModal();
      }
    }

    const handleSelectionChange = (e) => {
        const selected = props.roleData.find(item => item.id == e.target.value);
        form.rate = selected.rate;
        amountFormattedBudget.value = selected.rate;
    }

    const addProject = () => {
      form.projects.push({
        name: "",
        team_leader: "",
      });
    }

    const removeProject = (index) => {
      form.projects.splice(index, 1);
    }

    // const addContract = () => {
    //   form.contracts.push({
    //     start_contract: "",
    //     end_contract: "",
    //   });
    // }

    // const removeContract = (index) => {
    //   form.contracts.splice(index, 1);
    // }

    return {
      validationSchema,
      form,
      submitButtonRef,
      modalRef,
      isView,
      modalTitle,
      props,
      handleSubmit,
      handleSelectionChange,
      rupiahFormatter,
      amountFormattedBudget,
      addProject,
      removeProject,
      // addContract,
      // removeContract,
    };
  },
});
</script>