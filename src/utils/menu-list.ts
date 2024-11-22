import { Building, InfoIcon, LucideIcon, Settings, Users } from "lucide-react";

type SubMenu = {
  to: string;
  label: string;
  icon?: LucideIcon;
};

type Menu = {
  to?: string;
  label: string;
  icon?: LucideIcon;
  submenus?: SubMenu[];
};

type Group = {
  groupLabel?: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  const ROUTES = {
    Workers: "/information/workers",
    Company: "/information/company",
    Settings: "/settings",
  };

  return [
    {
      groupLabel: "Menu",
      menus: [
        {
          label: "Información general",
          icon: InfoIcon,
          submenus: [
            { to: ROUTES.Workers, label: "Trabajadores", icon: Users },
            { to: ROUTES.Company, label: "Compañía", icon: Building },
          ],
        },
      ],
    },
    {
      groupLabel: "Support",
      menus: [
        {
          to: ROUTES.Settings,
          label: "Configuración",
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}