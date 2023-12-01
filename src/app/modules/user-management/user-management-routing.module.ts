import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementListComponent } from './components/user-management-list/user-management-list.component';
import { UserManagementCreateComponent } from './components/user-management-create/user-management-create.component';
import { ROUTES } from 'src/app/common/helper/routes';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/' + ROUTES.USER_MANAGEMENT
  },
  {
    path: 'list',
    component: UserManagementListComponent
  },
  {
    path: 'create',
    component: UserManagementCreateComponent
  },
  {
    path: 'edit/:id',
    component: UserManagementCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
