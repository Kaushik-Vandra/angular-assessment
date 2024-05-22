import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from 'src/app/common/helper/routes';
import { ProductManagementListComponent } from './components/product-management-list/product-management-list.component';
import { ProductManagementCreateComponent } from './components/product-management-create/product-management-create.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/' + ROUTES.PRODUCT_MANAGEMENT,
  },
  {
    path: 'list',
    component: ProductManagementListComponent,
  },
  {
    path: 'create',
    component: ProductManagementCreateComponent,
  },
  {
    path: 'edit/:id',
    component: ProductManagementCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductManagementRoutingModule {}
