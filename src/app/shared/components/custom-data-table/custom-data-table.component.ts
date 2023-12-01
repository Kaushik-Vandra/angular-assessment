import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ITableActionConfig, ITableColumn, PAGE, TableActionType } from 'src/app/common/interfaces/table.interface';

@Component({
  selector: 'custom-data-table',
  templateUrl: './custom-data-table.component.html',
  styleUrls: ['./custom-data-table.component.scss']
})
export class CustomDataTableComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) public sort!: MatSort;

  @Input() public isMultiSelection: boolean | undefined;
  @Input() public tableName: string = "";
  @Input() public columns: Array<ITableColumn> | any;
  @Input() public totalRows: number | undefined;
  @Input() public isActionColumn: boolean | undefined;
  @Input() public actionColumn: any = [];
  @Input() dataset: Array<any> = [];

  @Output() changePage: EventEmitter<any> = new EventEmitter();
  @Output() searchEvent: EventEmitter<any> = new EventEmitter();

  public dataSource!: any;
  public displayedColumns: any[] = [];
  TABLE_ACTION_TYPE = TableActionType;
  public enableActions: Record<TableActionType, boolean> = {
    [TableActionType.status]: false,
    [TableActionType.EDIT]: false,
    [TableActionType.VIEW]: false,
    [TableActionType.DELETE]: false,
  };

  shouldShow: boolean = false;
  searchBox: FormControl = new FormControl('');
  isChecked: boolean = false;
  dateValue: boolean | undefined;
  selectedDate: string = '';
  selectedData = new SelectionModel<any>(true, []);
  pageLimit: number = PAGE.defaultPageSize;
  pageSizeOptions = PAGE.pageSizeOptions;
  pageIndex: number = 0;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.isMultiSelection) {
      this.displayedColumns.push('select');
    }

    this.displayedColumns = this.displayedColumns?.concat(this.columns?.map((x: any) => {
      return x.prop
    }));

    if (this.actionColumn) {
      this.displayedColumns.push('action');
      if (this.actionColumn && this.actionColumn.length) {
        this.actionColumn.forEach((ac: ITableActionConfig) => {
          this.enableActions[ac.type] = ac.enable;
        });
      }
    }

    this.dataSource = this.dataset;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = this.dataset;
  }

  navigate(isRedirected: boolean, id: string, route: string) {
    console.log("isRedirected", isRedirected);
    console.log("id", id);
    console.log("route", route);
  }

  isAllSelected() {
    return this.selectedData.selected.length === this.dataset.length;
  }

  toggleAll() {
    this.isChecked = true;
    if (this.isAllSelected()) {
      this.isChecked = false;
      this.selectedData.clear();
      return;
    }
    this.selectedData.select(...this.dataset.map((ele) => ele._id));
  }

  get participantCount() {
    return this.selectedData.selected.length;
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = this.pageLimit !== e.pageSize ? 0 : e.pageIndex;
    this.pageLimit = e.pageSize;
    this.changePage.emit(e)
  }

}
