import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementListComponent } from './components/user-management-list/user-management-list.component';
import { UserManagementCreateComponent } from './components/user-management-create/user-management-create.component';

@NgModule({
  declarations: [
    UserManagementListComponent,
    UserManagementCreateComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
