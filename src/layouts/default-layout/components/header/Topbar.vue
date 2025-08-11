<template>
  <!--begin::Toolbar wrapper-->
  <div class="d-flex align-items-stretch flex-shrink-0">
    <div class="topbar d-flex align-items-stretch flex-shrink-0">

      <!--begin::Theme mode-->
      <div class="d-flex align-items-center ms-1 ms-lg-3">
        <!--begin::Menu toggle-->
        <a
          href="#"
          class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
          data-kt-menu-trigger="{default:'click', lg: 'hover'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
        >
          <KTIcon
            icon-name="night-day"
            icon-class="theme-light-show fs-2 fs-md-1"
          />
          <KTIcon icon-name="moon" icon-class="theme-dark-show fs-2 fs-md-1" />
        </a>
        <!--begin::Menu toggle-->
        <KTThemeModeSwitcher></KTThemeModeSwitcher>
      </div>
      <!--end::Theme mode-->

      <!--begin::User-->
      <div
        class="d-flex align-items-center me-n3 ms-1 ms-lg-3"
        id="kt_header_user_menu_toggle"
      >
        <!--begin::Menu-->
        <div
          class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
          data-kt-menu-trigger="click"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="bottom"
        >
          <img
            :src="getAssetPath('media/avatars/mbanad.jpg')"
            class="h-30px w-30px rounded"
          />
        </div>
        <KTUserMenu></KTUserMenu>
        <!--end::Menu-->
      </div>
      <!--end::User -->
    </div>
  </div>
  <!--end::Toolbar wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import KTUserMenu from "@/layouts/default-layout/components/menus/UserAccountMenu.vue";
import KTThemeModeSwitcher from "@/layouts/default-layout/components/theme-mode/ThemeModeSwitcher.vue";

export default defineComponent({
  name: "layout-topbar",
  components: {
    KTUserMenu,
    KTThemeModeSwitcher,
  },
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
