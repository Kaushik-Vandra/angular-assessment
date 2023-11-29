import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MENU_TITLE, Menu, MenuI } from 'src/app/common/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isExpanded: boolean = true;
  HOME_MENU_TITLE = MENU_TITLE.DASHBOARD;
  menu: MenuI[] = Menu;
  isMobile: boolean = false;
  width: number = window.innerWidth;
  height: number = window.innerHeight;
  mobileWidth: number = 1200;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.toggleSidebar();
    });
  }



  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
    // this.sidebarState.expanded.next(this.isExpanded);
  }


  onWindowResize(event: any) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
    this.toggleSidebar();
  }

  toggleSidebar() {
    if (this.width && this.mobileWidth) {
      this.isMobile = this.width < this.mobileWidth;
      if (this.isMobile) {
        this.isExpanded = false;
        this.hideSidebarJS();
      }
    }
  }

  hideSidebarJS() {
    var sidebarContainer: any = this.document.getElementById('sidebar-container');
    this.document.addEventListener('click', (event: Event) => {
      if (this.isMobile && !sidebarContainer.contains(event.target))
        this.isExpanded = false;
    });
  }
}
