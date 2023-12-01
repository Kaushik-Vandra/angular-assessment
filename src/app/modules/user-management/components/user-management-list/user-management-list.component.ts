import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ITableActionConfig, ITableColumn, TableActionType } from 'src/app/common/interfaces/table.interface';

@Component({
  selector: 'app-user-management-list',
  templateUrl: './user-management-list.component.html',
  styleUrls: ['./user-management-list.component.scss']
})
export class UserManagementListComponent implements OnInit {

  data: any[] = [];
  dataCount: number = 0;
  pageLimit: number = 10;
  pageIndex: number = 0;
  displayedColumns: ITableColumn[] = [];
  tableActions: ITableActionConfig[] = [
    { type: TableActionType.VIEW, enable: true },
    { type: TableActionType.EDIT, enable: true },
    { type: TableActionType.DELETE, enable: true },
  ];

  ngOnInit(): void {
    this.initializeColumns();
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = this.pageLimit !== e.pageSize ? 0 : e.pageIndex;
    this.pageLimit = e.pageSize;
  }

  /**
* @description Initializing the columns names with dataSource prop's mapping.
* @returns {void}
*/
  protected initializeColumns(): void {
    this.displayedColumns = [
      {
        title: 'Name & Email',
        prop: 'name',
        prop_2: 'email',
        isTitle: true,
        isRedirect: true,
        redirectURL: '/',
        redirectKey: 'id'
      },
      {
        title: 'phone',
        prop: 'phone',
        isNormal: true,
      },
      {
        title: 'status',
        prop: 'status',
        isNormal: true
      },
    ];
  }

}
