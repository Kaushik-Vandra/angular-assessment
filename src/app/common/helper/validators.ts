import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { Patterns } from "./helper";

export function checkPasswordValidation(control: AbstractControl): ValidationErrors | null {
    if (!control.value?.match(Patterns.strong_password)) {
        return ({ strong_password: true });
    }
    return null;
}

export function ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
      if (!formGroup.controls[controlName].value) {
        matchingControl.setErrors(null);
        return;
      }
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmPasswordValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPassword: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }