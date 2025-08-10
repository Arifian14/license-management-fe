import { getAssetPath } from "@/core/helpers/assets";

interface ICustomer {
  id: number;
  name: string;
  role: string;
  rate: string;
  project: string;
  group_position: string;
}

const customers: Array<ICustomer> = [
  {
    id: Math.floor(Math.random() * 99999) + 1,
    name: "Emma Smith",
    role: "Programmer",
    rate: "Rp 5.000.000",
    project: "Decision Engine",
    group_position: "ASP"
  },
  {
    id: Math.floor(Math.random() * 99999) + 1,
    name: "Emma Smith",
    role: "Programmer",
    rate: "Rp 5.000.000",
    project: "Decision Engine",
    group_position: "ASP"
  },
  {
    id: Math.floor(Math.random() * 99999) + 1,
    name: "Emma Smith",
    role: "Programmer",
    rate: "Rp 5.000.000",
    project: "Decision Engine",
    group_position: "ASP"
  },
  {
    id: Math.floor(Math.random() * 99999) + 1,
    name: "Emma Smith",
    role: "Programmer",
    rate: "Rp 5.000.000",
    project: "Decision Engine",
    group_position: "ASP"
  },
  {
    id: Math.floor(Math.random() * 99999) + 1,
    name: "Emma Smith",
    role: "Programmer",
    rate: "Rp 5.000.000",
    project: "Decision Engine",
    group_position: "ASP"
  },
  {
    id: Math.floor(Math.random() * 99999) + 1,
    name: "Emma Smith",
    role: "Programmer",
    rate: "Rp 5.000.000",
    project: "Decision Engine",
    group_position: "ASP"
  },
  {
    id: Math.floor(Math.random() * 99999) + 1,
    name: "Emma Smith",
    role: "Programmer",
    rate: "Rp 5.000.000",
    project: "Decision Engine",
    group_position: "ASP"
  },
  {
    id: Math.floor(Math.random() * 99999) + 1,
    name: "Emma Smith",
    role: "Programmer",
    rate: "Rp 5.000.000",
    project: "Decision Engine",
    group_position: "ASP"
  },
  {
    id: Math.floor(Math.random() * 99999) + 1,
    name: "Emma Smith",
    role: "Programmer",
    rate: "Rp 5.000.000",
    project: "Decision Engine",
    group_position: "ASP"
  },
  {
    id: Math.floor(Math.random() * 99999) + 1,
    name: "Emma Smith",
    role: "Programmer",
    rate: "Rp 5.000.000",
    project: "Decision Engine",
    group_position: "ASP"
  },
  {
    id: Math.floor(Math.random() * 99999) + 1,
    name: "Emma Smith",
    role: "Programmer",
    rate: "Rp 5.000.000",
    project: "Decision Engine",
    group_position: "ASP"
  },
];

export type { ICustomer };

export default customers;
