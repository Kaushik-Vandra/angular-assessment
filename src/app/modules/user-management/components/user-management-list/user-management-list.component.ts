import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';
import { ROUTES } from 'src/app/common/helper/routes';
import { ITableActionConfig, ITableColumn, TableActionType } from 'src/app/common/interfaces/table.interface';

@Component({
  selector: 'app-user-management-list',
  templateUrl: './user-management-list.component.html',
  styleUrls: ['./user-management-list.component.scss']
})
export class UserManagementListComponent implements OnInit {

  shouldShow: boolean = false;
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
  searchBox: FormControl = new FormControl('');
  addUserRoute: string = '/' + ROUTES.CREATE_USER_MANAGEMENT;

  ngOnInit(): void {
    this.initializeColumns();
  }

  handlePageEvent(e: PageEvent) {
    console.log("e", e);

    this.pageIndex = this.pageLimit !== e.pageSize ? 0 : e.pageIndex;
    this.pageLimit = e.pageSize;
  }

  /**
 * when change value in searchbox then call
 * get sub-admins by search text
 */
  getSearchResult() {
    this.searchBox.valueChanges
      .pipe
      (debounceTime(500))
      .subscribe(() => {
        this.pageIndex = 0
        if (this.searchBox.value?.trim() || !this.searchBox.value) {
          console.log("this.searchBox.value", this.searchBox.value);

          // this.getSubAdmins();
        }
      })
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
