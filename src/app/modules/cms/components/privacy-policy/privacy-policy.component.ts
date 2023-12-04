import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RequestI } from 'src/app/common/interfaces/api.interface';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  public Editor = ClassicEditor;
  form!: FormGroup;
  
  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: [null],
      privacy_policy: [null, Validators.required]
    });
  }

  onSubmit(){
    this.form.markAllAsTouched();
    if(this.form.invalid){
      return;
    }

    const payload : RequestI = {
      path : '',
      data : this.form.value
    }
  }
}
