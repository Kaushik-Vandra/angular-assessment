import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './components/terms-and-condition/terms-and-condition.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    TermsAndConditionComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    CKEditorModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CmsModule { }
