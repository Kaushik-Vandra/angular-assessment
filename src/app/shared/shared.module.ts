import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ErrorMessageDirective } from './directives/error-message.directive';
import { CustomDataTableComponent } from './components/custom-data-table/custom-data-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ErrorMessageDirective,
    CustomDataTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ErrorMessageDirective,
    CustomDataTableComponent
  ]
})
export class SharedModule { }
