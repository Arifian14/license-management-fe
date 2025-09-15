export interface IHealthCheck {
  healthcheck_routine_date: string;
  healthcheck_actual_date: string;
}

export interface LicenseData {
  id?: number;
  pks: string;
  application: string;
  due_date_license: string;
  date_started: string;
  descriptions: string;
  vendor_id: number;
  healthchecks: IHealthCheck[];
  file_pks: string;
  file_bast: string;
}

export interface LicenseFormProps {
  data: LicenseData;
  modalId: string;
  mode: "add" | "edit" | "view";
}

export interface LicenseFormEmits {
  (e: "submit", data: LicenseData): void;
  (e: "cancel"): void;
}