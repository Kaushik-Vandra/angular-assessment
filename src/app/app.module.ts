import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { EmptyLayoutComponent } from './layout/empty-layout/empty-layout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ERROR_MESSAGES, errorMessages } from './common/helper/error.message';
import { ApiService } from './common/services/api.service';
import { AuthService } from './common/services/auth.service';
import { ToastrService } from './common/services/toastr.service';
import { EncryptionService } from './common/services/encryption.service';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    AuthLayoutComponent,
    EmptyLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: ERROR_MESSAGES,
      useValue: errorMessages,
    },
    ApiService,
    AuthService,
    ToastrService,
    EncryptionService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
