import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patterns } from 'src/app/common/helper/helper';
import { ROUTES } from 'src/app/common/helper/routes';
import { cannotContainSpace, validPhoneNumber } from 'src/app/common/helper/validators';
import { RequestI } from 'src/app/common/interfaces/api.interface';

@Component({
  selector: 'app-user-management-create',
  templateUrl: './user-management-create.component.html',
  styleUrls: ['./user-management-create.component.scss']
})
export class UserManagementCreateComponent implements OnInit {

  usersListRoute: string = '/' + ROUTES.USER_MANAGEMENT;
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      first_name: [null, [Validators.required, Validators.pattern(Patterns.alpha_spaces), Validators.maxLength(30), Validators.minLength(2), cannotContainSpace]],
      last_name: [null, [Validators.required, Validators.pattern(Patterns.alpha_spaces), Validators.maxLength(30), Validators.minLength(2), cannotContainSpace]],
      email: [null, [Validators.required, Validators.pattern(Patterns.email), Validators.maxLength(100), Validators.minLength(2)]],
      phone: [null, [Validators.required, validPhoneNumber]],
    })
  }


  onSubmit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) {
      return;
    }

    const payload: RequestI = {
      path: '',
      data: this.userForm.value
    };
    console.log("payload",payload);
    
  }

}
