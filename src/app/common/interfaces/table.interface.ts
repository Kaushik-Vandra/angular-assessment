export enum TableActionType {
  status = 'status',
  EDIT = 'edit',
  DELETE = 'delete',
  VIEW = 'view',
}

export const PAGE = {
  pageSizeOptions: [5, 10, 25],
  defaultPageSize: 10,
};

export interface ITableActionConfig {
  type: TableActionType;
  enable: boolean;
}

export interface ITableColumn {
  title: string; //title
  prop: string; //key
  prop_2?: string; // key
  customTemplateRef?: string; //
  customClass?: string; //for add any class
  customStyleTh?: any; //for add custom style in th tab
  isEmail?: boolean; //for email styling
  isTitle?: boolean; //for highlight text
  isNormal?: boolean; // for normal text
  isDate?: boolean; //for date formate
  isDOB?: boolean; // for DOB formate
  isNumber?: boolean; //for Round styling

  isRedirect?: boolean; //for navigate route
  redirectURL?: string; //for navigate route
  redirectKey?: string; //for pass any param value in route like id(Ex : '/profile/{{id}}')
  isStatus?: boolean; //for status styling
  isHtmlContent?: boolean; //for status styling
}
