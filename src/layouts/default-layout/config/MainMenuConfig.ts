import type { MenuItem } from "@/layouts/default-layout/config/types";

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "dashboard",
        route: "/dashboard",
      },
      // {
      //   heading: "Accident",
      //   route: "/accident",

      // },
      // {
      //   heading: "Maintance",
      //   route: "/builder",
      // },
      {
        heading: "MSA",
        route: "/msa",
      },
      {
        heading: "License",
        route: "/license",
      },
    ],
  }
];

export default MainMenuConfig;
