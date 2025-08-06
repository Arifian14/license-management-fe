<template>
  <!--begin::Tables Widget 11-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">List Accident</span>
      </h3>
      <div class="card-toolbar">
        <button class="btn btn-sm btn-light-primary">
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Tambah Data
        </button>
      </div>
    </div>
    <!--end::Header-->

    <div class="car-body py-3">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-2">
            <label class="fs-6 fw-semibold mb-2">Filter :</label>
            <select
              class="form-select p-0 px-3" style="height: 32px;"
              v-model="filter.param"
            >
              <option value="date">Date</option>
              <option value="aplikasi">Aplikasi</option>
              <option value="pic">PIC</option>
              <option value="status">Status</option>
              <option value="notiket">No Tiket</option>
              <option value="judul">Judul</option>
              <option value="issue">Kode Issue</option>
            </select>
          </div>
          <div class="col-md-3" v-if="filter.param == 'date'">
            <label class="fs-6 fw-semibold mb-2">Start</label>
            <br>
            <el-date-picker
            v-model="filter.startdate"
            type="date"
            :teleported="false"
            name="eventName"
            />
          </div>
          <div class="col-md-3" v-if="filter.param == 'date'">
            <label class="fs-6 fw-semibold mb-2">End</label>
            <br>
            <el-date-picker
            v-model="filter.enddate"
            type="date"
            :teleported="false"
            name="eventName"
          />
          </div>
          <div class="col-md-3" v-if="filter.param == 'notiket' || filter.param == 'judul' || filter.param == 'issue'">
            <label class="fs-6 fw-semibold mb-2">Search</label>
            <input type="text" class="form-control" style="height: 32px;" v-model="filter.text"/>
          </div>
          <div class="col-md-3" v-if="filter.param == 'status' || filter.param == 'aplikasi' || filter.param == 'pic'">
            <label class="fs-6 fw-semibold mb-2">Search</label>
            <select
              class="form-select p-0 px-3" style="height: 32px;"
              v-model="filter.text"
              v-if="filter.param == 'status'"
            >
              <option value="open">Open</option>
              <option value="temp">Temporary Action</option>
              <option value="full">Full Action</option>
            </select>
            <select
              class="form-select p-0 px-3" style="height: 32px;"
              v-model="filter.text"
              v-if="filter.param == 'pic'"
            >
              <option value="rizky">Rizky</option>
              <option value="deris">Deris</option>
              <option value="zolla">Zolla</option>
            </select>
            <select
              class="form-select p-0 px-3" style="height: 32px;"
              v-model="filter.text"
              v-if="filter.param == 'aplikasi'"
            >
              <option value="appel">APPEL</option>
              <option value="dvc">DVC</option>
              <option value="mcs">MCS</option>
            </select>
          </div>
          <div class="col-md-2">
            <br>
            <div
              class="btn btn-icon-white btn-active-light-primary btn-bg-primary"
            >
              <KTIcon icon-name="magnifier" icon-class="fs-3" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table class="table align-middle gs-0 gy-4">
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-muted bg-light">
              <th class="ps-4 rounded-start">No.</th>
              <th>No Tiket(Auto)</th>
              <th>Tanggal Entry</th>
              <th>Aplikasi</th>
              <th>PIC</th>
              <th>Kode Issue</th>
              <th>Judul</th>
              <th>Status</th>
              <th class="text-end rounded-end"></th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(item, index) in list" :key="index">
              <tr>
                <td class="p-5">
                  <span class=" text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                    {{ index+1 }}
                  </span>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="d-flex justify-content-start flex-column">
                      <span
                        class="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                        >{{ item.tiket }}</span
                      >
                    </div>
                  </div>
                </td>

                <td>
                  <span
                    class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.tgl_entry }}</span
                  >
                </td>

                <td>
                  <span
                    class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.aplikasi }}</span
                  >
                </td>

                <td>
                  <span
                    class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.pic }}</span
                  >
                </td>
                <td>
                  <span
                    class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.issue }}</span
                  >
                </td>

                <td>
                  <span
                    class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.judul }}</span
                  >
                </td>


                <td>
                  <span
                    :class="`
                      badge badge-light-${item.status == 'open' ? 'success' : item.status == 'temp' ? 'warning' : 'primary'}
                      fs-7
                      fw-bold
                    `"
                    >{{ item.status == 'open' ? 'Open' : item.status == 'Temporary Action' ? 'warning' : 'Full Action' }}</span
                  >
                </td>

                <td class="text-end">
                  <a
                    href="#"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon icon-name="abstract-26" icon-class="fs-3" />
                  </a>

                  <a
                    href="#"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon icon-name="pencil" icon-class="fs-3" />
                  </a>

                  <a
                    href="#"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                    <KTIcon icon-name="trash" icon-class="fs-3" />
                  </a>
                </td>
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 11-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent,ref } from "vue";

interface filerparam {
  param: string;
  startdate: string;
  enddate: string;
  text: string;
}

export default defineComponent({
  name: "kt-widget-11",
  components: {
    
  },
  props: {
    widgetClasses: String,
  },
  setup() {
    const filter = ref<filerparam>({
      param:"date",
      startdate:"",
      enddate:"",
      text:""
    });
    
    const handleFilter = (data: any) => {
      console.log('Filter applied:', data);
    };

    const list = [
      {
        tiket: 'FCS20250725001',
        tgl_entry: "2025-07-25",
        aplikasi: "APPEL",
        pic:"rizky",
        issue: "INC000000025123",
        judul: "GAGAL SIKP",
        status: "open"        
      },
      {
        tiket: 'FCS20250725002',
        tgl_entry: "2025-07-25",
        aplikasi: "DVC",
        pic:"deris",
        issue: "INC000000025123",
        judul: "GAGAL SIKP",
        status: "temp"        
      },
      {
        tiket: 'FCS20250725003',
        tgl_entry: "2025-07-25",
        aplikasi: "MCS",
        pic:"zolla",
        issue: "INC000000025123",
        judul: "GAGAL SIKP",
        status: "temp"        
      },
      {
        tiket: 'FCS20250725004',
        tgl_entry: "2025-07-25",
        aplikasi: "APPEL",
        pic:"rizky",
        issue: "INC000000025123",
        judul: "GAGAL SIKP",
        status: "full"        
      },
    ];

    return {
      list,
      filter,
      getAssetPath,
      handleFilter
    };
  },
});
</script>
