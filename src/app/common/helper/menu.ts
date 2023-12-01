import { MenuI } from "src/app/common/interfaces/common.interface";
import { ROUTES } from "./routes";

export const enum MENU_TITLE {
  DASHBOARD = 'Dashboard',
  USER_MANAGEMENT = 'User Management',
  CMS = 'CMS',
  PRIVACY_POLICY = 'Privacy Policy',
  TERMS_AND_CONDITION = 'Terms And Condition',
};

export const Menu: MenuI[] = [
  {
    "name": MENU_TITLE.DASHBOARD,
    "route": ROUTES.DASHBOARD,
    "icon": "dashboard",
  },
  {
    "name": MENU_TITLE.USER_MANAGEMENT,
    "route": ROUTES.USER_MANAGEMENT,
    "icon": "people",
  },
  {
    "name": MENU_TITLE.CMS,
    "route": ROUTES.USER_MANAGEMENT,
    "icon": "difference",
    "subMenu": [
      {
        "name": MENU_TITLE.PRIVACY_POLICY,
        "route": ROUTES.PRIVACY_POLICY,
        "icon": "policy",
      },
      {
        name : MENU_TITLE.TERMS_AND_CONDITION,
        route : ROUTES.TERMS_AND_CONDITION,
        icon : "toc"  
      }
    ]
  },
];