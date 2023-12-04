import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementListComponent } from './components/user-management-list/user-management-list.component';
import { UserManagementCreateComponent } from './components/user-management-create/user-management-create.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';

@NgModule({
  declarations: [
    UserManagementListComponent,
    UserManagementCreateComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatIntlTelInputComponent,
    SharedModule
  ]
})
export class UserManagementModule { }
