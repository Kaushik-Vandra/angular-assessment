import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ProductManagementModule } from './modules/product-management/product-management.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule,
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => DashboardModule,
      },
      {
        path: 'product-management',
        loadChildren: () => ProductManagementModule,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
