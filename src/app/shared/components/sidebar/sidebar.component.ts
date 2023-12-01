import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MENU_TITLE, Menu } from 'src/app/common/helper/menu';
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { MenuI } from 'src/app/common/interfaces/common.interface';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isExpanded: boolean = true;
  nameStore?: MenuI;
  treeControl = new NestedTreeControl<MenuI>((node) => node.subMenu);
  dataSource = new MatTreeNestedDataSource<MenuI>();

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    this.dataSource.data = Menu;
  }

  ngOnInit(): void { }


  hasChild = (_: number, node: MenuI) =>
    !!node.subMenu && node.subMenu.length > 0;

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
    // this.sidebarState.expanded.next(this.isExpanded);
  }


  storeName(node: MenuI) {
    this.nameStore = node;
  }
}
