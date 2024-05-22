import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';
import { API_END_POINTS } from 'src/app/common/helper/api.endpoints';
import { ROUTES } from 'src/app/common/helper/routes';
import { RequestI, ResponseI } from 'src/app/common/interfaces/api.interface';
import {
  ITableActionConfig,
  ITableColumn,
  TableActionType,
} from 'src/app/common/interfaces/table.interface';
import { ApiService } from 'src/app/common/services/api.service';

@Component({
  selector: 'app-product-management-list',
  templateUrl: './product-management-list.component.html',
  styleUrls: ['./product-management-list.component.scss'],
})
export class ProductManagementListComponent implements OnInit {
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
    // { type: TableActionType.status, enable: true },
  ];
  searchBox: FormControl = new FormControl('');
  addProductRoute: string = '/' + ROUTES.CREATE_PRODUCT_MANAGEMENT;

  constructor(private apisService: ApiService) {}

  ngOnInit(): void {
    this.getProductList();
    this.initializeColumns();
  }

  handlePageEvent(e: PageEvent) {
    console.log('e', e);

    this.pageIndex = this.pageLimit !== e.pageSize ? 0 : e.pageIndex;
    this.pageLimit = e.pageSize;
    this.getProductList();
  }

  /**
   * when change value in searchbox then call
   * get sub-admins by search text
   */
  getSearchResult() {
    this.searchBox.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.pageIndex = 0;
      if (this.searchBox.value?.trim() || !this.searchBox.value) {
        console.log('this.searchBox.value', this.searchBox.value);

        // this.getSubAdmins();
      }
    });
  }

  /**
   * @description Initializing the columns names with dataSource prop's mapping.
   * @returns {void}
   */
  protected initializeColumns(): void {
    this.displayedColumns = [
      {
        title: 'Product Name',
        prop: 'productName',
        isTitle: true,
        isRedirect: true,
        redirectURL: '/',
        redirectKey: 'id',
      },
      {
        title: 'Description',
        prop: 'productDescription',
        isNormal: true,
      },
      {
        title: 'Points',
        prop: 'productPoints',
        isNormal: true,
      },
      // {
      //   title: 'Image',
      //   prop: 'productStatus',
      //   isNormal: true,
      // },
      {
        title: 'Status',
        prop: 'productStatus',
        isNormal: true,
      },
    ];
  }

  getProductList(): void {
    const payload: RequestI = {
      path: API_END_POINTS.products + '/list',
      data: {
        page: this.pageIndex + 1,
        limit: this.pageLimit,
        search: this.searchBox.value,
      },
    };
    this.apisService.post(payload).subscribe({
      next: (res: ResponseI) => {
        console.log('res: ', res);
        this.data = res.data.adminProductList;
        this.dataCount = res.data.total_records;
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });
  }
}
