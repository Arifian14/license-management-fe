import { ref } from "vue";
import { defineStore } from "pinia";
import { ThemeModeComponent } from "@/assets/ts/layout";

export const THEME_MODE_LS_KEY = "kt_theme_mode_value";
export const THEME_MENU_MODE_LS_KEY = "kt_theme_mode_menu";

export const useThemeStore = defineStore("theme", () => {
  const mode = ref<"light">(
    localStorage.getItem(THEME_MODE_LS_KEY) as "light"
  );

  function setThemeMode(payload: "light" = "light") {
    let currentMode = "light";
    // localStorage.setItem(THEME_MODE_LS_KEY, currentMode);
    // localStorage.setItem(THEME_MENU_MODE_LS_KEY, currentMode);
    // mode.value = currentMode;

    // if (currentMode === "system") {
      // currentMode = ThemeModeComponent.getSystemMode();
      // currentMode = "light";
    // }

    document.documentElement.setAttribute("data-bs-theme", currentMode);
    ThemeModeComponent.init();
  }

  return {
    mode,
    setThemeMode,
  };
});
