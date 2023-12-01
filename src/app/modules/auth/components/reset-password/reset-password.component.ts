import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator, checkPasswordValidation } from 'src/app/common/helper/validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      newPassword: [
        "",
        [
          Validators.required,
          checkPasswordValidation,
          Validators.maxLength(20)
        ],
      ],
      new_confirm_password: [
        "",
        [
          Validators.required,
          checkPasswordValidation,
          Validators.maxLength(20)
        ],
      ],
    },
      {
        validator: ConfirmPasswordValidator("newPassword", "new_confirm_password"),
      });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    console.log("form", this.form);
  }

  addNewPasswordErrorClass(): string {
    const errors = this.form.controls['newPassword'].errors
    if (this.form.controls['newPassword'].touched && errors && !errors['required'] && errors['strong_password']) {
      return 'custom-error-class'
    } else {
      return ''
    }
  }

  addNewConfirmPasswordErrorClass(): string {
    const errors = this.form.controls['new_confirm_password'].errors
    if (this.form.controls['new_confirm_password'].touched && errors && !errors['required'] && errors['strong_password']) {
      return 'custom-error-class'
    } else {
      return ''
    }
  }

}
