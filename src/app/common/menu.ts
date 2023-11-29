export interface MenuI {
  name: string;
  route: string;
  icon: string;
}

export const ROUTES = {
  LOGIN : 'auth/login',
  FORGOT_PASSWORD : 'auth/forgot-password',
  RESET_PASSWORD : 'auth/reset-password',

  DASHBOARD : 'dashboard',
  USER_MANAGEMENT : 'user-management/list',
}

export const enum MENU_TITLE {
  DASHBOARD = 'Dashboard',
  USER_MANAGEMENT = 'User Management',
}

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
]