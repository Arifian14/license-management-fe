export interface IMsaRole {
  id?: number;
  role: string;
  rate: number;
}

export interface IMsaDetail {
  id?: number;
  role_id: number;
  nik: number;
  name: string;
  rate: number | null;
  used_budget: number | null;
  project: string;
  group_position: string;
  department: string;
  vendor: string;
  isActive: boolean;
  join_date: string;
  leave_date: string;
  role: string;
  projects: IDetailProjects[];
}

export interface IDetailProjects {
  project: string;
  team_leader: string;
}

export interface IDetailContracts {
  start_contract: string;
  end_contract: string;
}

export interface IMsa {
  id?: number;
  pks: string;
  date_started: string;
  date_ended: string;
  people_quota: number;
  budget_quota: number;
  file_pks: any;
  file_bast: any;
  roles: IMsaRole[];
  msa?: IMsaDetail[];
}

export interface MsaTableColumn {
  key: string;
  label: string;
  slot?: string;
  headerClass?: string;
}

export interface FilterState {
  selectedFilter: string;
  textfilter: string;
  datefilter: {
    start: string | null;
    end: string | null;
  };
}