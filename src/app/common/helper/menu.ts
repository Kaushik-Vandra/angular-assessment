import { MenuI } from 'src/app/common/interfaces/common.interface';
import { ROUTES } from './routes';

export const enum MENU_TITLE {
  DASHBOARD = 'Dashboard',
  PRODUCT_MANAGEMENT = 'Product Management',
}

export const Menu: MenuI[] = [
  {
    name: MENU_TITLE.DASHBOARD,
    route: ROUTES.DASHBOARD,
    icon: 'dashboard',
  },
  {
    name: MENU_TITLE.PRODUCT_MANAGEMENT,
    route: ROUTES.PRODUCT_MANAGEMENT,
    icon: 'inventory',
  },
];
