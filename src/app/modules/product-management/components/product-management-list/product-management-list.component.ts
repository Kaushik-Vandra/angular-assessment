import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/common/components/confirm-dialog/confirm-dialog.component';
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
    // { type: TableActionType.DELETE, enable: true },
    { type: TableActionType.status, enable: true },
  ];
  searchBox: FormControl = new FormControl('');
  addProductRoute: string = '/' + ROUTES.CREATE_PRODUCT_MANAGEMENT;

  constructor(
    private apisService: ApiService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProductList();
    this.initializeColumns();
    this.getSearchResult();
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = this.pageLimit !== e.pageSize ? 0 : e.pageIndex;
    this.pageLimit = e.pageSize;
    this.getProductList();
  }

  handleActions(element: any) {
    switch (element.from) {
      case 'view':
        this.router.navigate([
          ROUTES.VIEW_PRODUCT_MANAGEMENT,
          element.element._id,
        ]);
        break;
      case 'edit':
        this.router.navigate([
          ROUTES.EDIT_PRODUCT_MANAGEMENT,
          element.element._id,
        ]);
        break;
      case 'status':
        this.handleStatusChange(element.element._id);
        break;
      default:
        break;
    }
  }

  /**
   * when change value in searchbox then call
   * get sub-admins by search text
   */
  getSearchResult() {
    this.searchBox.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.pageIndex = 0;
      if (this.searchBox.value?.trim()) {
        this.getProductList();
      }
    });
  }

  onSearchClose() {
    this.searchBox.reset();
    this.pageIndex = 0;
    this.getProductList();
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
      },
      {
        title: 'Description',
        prop: 'productDescription',
        isHtmlContent: true,
      },
      {
        title: 'Points',
        prop: 'productPoints',
        isNormal: true,
      },
      {
        title: 'Status',
        prop: 'productStatus',
        isRedirect: true,
        isStatus: true,
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
        this.data = res.data.adminProductList;
        this.dataCount = res.data.total_records;
      },
      error: (_error) => {},
    });
  }

  handleStatusChange(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        message: 'Are you sure you want to change the status of product?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle status change here
        this.onConfirmStatusChange(id);
      }
    });
  }

  onConfirmStatusChange(id: string) {
    const payload: RequestI = {
      path: API_END_POINTS.products + `/activeInActive/${id}`,
    };
    this.apisService.get(payload).subscribe({
      next: (res: ResponseI) => {
        this.getProductList();
      },
      error: (_error) => {},
    });
  }
}
