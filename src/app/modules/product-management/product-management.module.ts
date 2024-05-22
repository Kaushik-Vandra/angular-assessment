import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductManagementListComponent } from './components/product-management-list/product-management-list.component';
import { ProductManagementCreateComponent } from './components/product-management-create/product-management-create.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponentComponent } from 'src/app/common/components/input-component/input-component.component';

@NgModule({
  declarations: [
    ProductManagementListComponent,
    ProductManagementCreateComponent,
    InputComponentComponent,
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ProductManagementModule {}
