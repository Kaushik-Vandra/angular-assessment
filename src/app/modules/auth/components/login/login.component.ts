import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_END_POINTS } from 'src/app/common/helper/api.endpoints';
import { Patterns } from 'src/app/common/helper/helper';
import { ApiService } from 'src/app/common/services/api.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { ToastrService } from 'src/app/common/services/toastr.service';
import { RequestI, ResponseI } from 'src/app/common/interfaces/api.interface';
import { ROUTES } from 'src/app/common/helper/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(Patterns.email),
          Validators.maxLength(100),
          Validators.minLength(2),
        ],
      ],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    const payload: RequestI = {
      path: API_END_POINTS.login,
      data: this.loginForm.value,
    };

    this.apiService.post(payload).subscribe({
      next: (res: ResponseI) => {
        this.authService.setAuth(res['data']);
        this.router.navigate([ROUTES.DASHBOARD]);
        this.toastrService.showSuccess(res?.message || 'Something wen wrong!');
      },
      error: (error) => {
        this.toastrService.showError(
          error['error']?.message || 'Something wen wrong!'
        );
      },
    });
  }
}
