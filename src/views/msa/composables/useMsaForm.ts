import { reactive } from "vue";
import * as Yup from "yup";
import type { IMsa, IMsaRole } from "../types";

/**
 * Composable untuk mengelola form MSA (Master Service Agreement)
 * Menyediakan state management, validation schema, dan methods untuk MSA form
 */
export function useMsaForm(initialData?: IMsa) {
  // State untuk data MSA
  const msa = reactive<IMsa>(initialData || {
    pks: "",
    date_started: "",
    date_ended: "",
    people_quota: 0,
    budget_quota: 0,
    file_pks: "",
    file_bast: "",
    roles: []
  });

  // Validation schema untuk detail role
  const detailSchema = Yup.object().shape({
    role: Yup.string().required("Role is required"),
    rate: Yup.number()
      .required("Rate is required")
      .min(1, "Rate must be greater than 0")
      .typeError("Rate must be a valid number"),
  });

  // Validation schema utama untuk form MSA
  const validationSchema = Yup.object().shape({
    pks: Yup.string()
      .required("No PKS is required")
      .min(3, "No PKS must be at least 3 characters")
      .label("No PKS"),
    
    date_started: Yup.string()
      .required("Start date is required")
      .test('is-valid-date', 'Start date must be a valid date', (value) => {
        if (!value) return false;
        return !isNaN(new Date(value).getTime());
      })
      .label("Date Started"),
    
    date_ended: Yup.string()
      .required("End date is required")
      .test('is-valid-date', 'End date must be a valid date', (value) => {
        if (!value) return false;
        return !isNaN(new Date(value).getTime());
      })
      .test('is-after-start', 'End date must be after start date', function(value) {
        if (!value || !this.parent.date_started) return true;
        return new Date(value) > new Date(this.parent.date_started);
      })
      .label("Date Ended"),
    
    people_quota: Yup.number()
      .required("People quota is required")
      .min(1, "People quota must be at least 1")
      .integer("People quota must be a whole number")
      .typeError("People quota must be a valid number")
      .label("People Quota"),
    
    budget_quota: Yup.number()
      .required("Budget quota is required")
      .min(1, "Budget quota must be greater than 0")
      .typeError("Budget quota must be a valid number")
      .label("Budget Quota"),
    
    file_pks: Yup.mixed()
      .required("File PKS is required")
      .label("File PKS"),
    
    file_bast: Yup.mixed()
      .required("File BAST is required")
      .label("File BAST"),
    
    roles: Yup.array()
      .of(detailSchema)
      .min(1, "At least one role must be added")
      .test('unique-roles', 'Role names must be unique', (roles) => {
        if (!roles) return true;
        const roleNames = roles.map(role => role.role.toLowerCase().trim());
        return new Set(roleNames).size === roleNames.length;
      }),
  });

  /**
   * Menambahkan role baru ke dalam MSA
   * @param role - Data role yang akan ditambahkan
   */
  const addRole = (role: IMsaRole) => {
    // Generate ID jika belum ada
    const roleWithId = {
      ...role,
      id: role.id || Date.now() // Gunakan timestamp sebagai ID unik
    };
    msa.roles.push(roleWithId);
  };

  /**
   * Menghapus role berdasarkan index
   * @param index - Index role yang akan dihapus
   */
  const removeRole = (index: number) => {
    if (index >= 0 && index < msa.roles.length) {
      msa.roles.splice(index, 1);
    }
  };

  /**
   * Mengupdate role berdasarkan index
   * @param index - Index role yang akan diupdate
   * @param role - Data role baru
   */
  const updateRole = (index: number, role: IMsaRole) => {
    if (index >= 0 && index < msa.roles.length) {
      msa.roles[index] = { ...role };
    }
  };

  /**
   * Mengupdate field tertentu dalam MSA
   * @param field - Nama field yang akan diupdate
   * @param value - Nilai baru untuk field
   */
  const updateField = <K extends keyof IMsa>(field: K, value: IMsa[K]) => {
    msa[field] = value;
  };

  /**
   * Mereset form MSA ke nilai default
   */
  const resetForm = () => {
    Object.assign(msa, {
      pks: "",
      date_started: "",
      date_ended: "",
      people_quota: 0,
      budget_quota: 0,
      file_pks: "",
      file_bast: "",
      roles: []
    });
  };

  /**
   * Memvalidasi apakah date ended setelah date started
   */
  const validateDates = (): boolean => {
    if (!msa.date_started || !msa.date_ended) return true;
    return new Date(msa.date_ended) > new Date(msa.date_started);
  };

  /**
   * Memvalidasi apakah budget quota cukup untuk rates yang ada
   */
  const validateBudget = (): { isValid: boolean; totalRates: number } => {
    const totalRates = msa.roles.reduce((sum, role) => sum + (role.rate || 0), 0);
    return {
      isValid: totalRates <= msa.budget_quota,
      totalRates
    };
  };

  /**
   * Memvalidasi apakah people quota cukup untuk jumlah roles
   */
  const validatePeopleQuota = (): { isValid: boolean; roleCount: number } => {
    const roleCount = msa.roles.length;
    return {
      isValid: roleCount <= msa.people_quota,
      roleCount
    };
  };

  /**
   * Mendapatkan total rates dari semua roles
   */
  const getTotalRates = (): number => {
    return msa.roles.reduce((sum, role) => sum + (role.rate || 0), 0);
  };

  /**
   * Mendapatkan sisa budget setelah dikurangi total rates
   */
  const getRemainingBudget = (): number => {
    return msa.budget_quota - getTotalRates();
  };

  /**
   * Memeriksa apakah ada role dengan nama tertentu
   * @param roleName - Nama role yang dicari
   * @param excludeIndex - Index yang di-exclude dari pencarian (untuk edit)
   */
  const hasRoleWithName = (roleName: string, excludeIndex?: number): boolean => {
    return msa.roles.some((role, index) => {
      if (excludeIndex !== undefined && index === excludeIndex) return false;
      return role.role.toLowerCase().trim() === roleName.toLowerCase().trim();
    });
  };

  return {
    // State
    msa,
    
    // Validation
    validationSchema,
    
    // Methods
    addRole,
    removeRole,
    updateRole,
    updateField,
    resetForm,
    validateDates,
    validateBudget,
    validatePeopleQuota,
    getTotalRates,
    getRemainingBudget,
    hasRoleWithName,
    
    // Computed properties (dalam bentuk functions)
    isEmpty: () => msa.roles.length === 0,
    isBudgetExceeded: () => getTotalRates() > msa.budget_quota,
    isPeopleQuotaExceeded: () => msa.roles.length > msa.people_quota,
  };
}

export type UseMsaFormReturn = ReturnType<typeof useMsaForm>;