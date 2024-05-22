import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_END_POINTS } from 'src/app/common/helper/api.endpoints';
import { Patterns } from 'src/app/common/helper/helper';
import { ROUTES } from 'src/app/common/helper/routes';
import { cannotContainSpace } from 'src/app/common/helper/validators';
import { RequestI, ResponseI } from 'src/app/common/interfaces/api.interface';
import { ApiService } from 'src/app/common/services/api.service';
import { ToastrService } from 'src/app/common/services/toastr.service';

@Component({
  selector: 'app-product-management-create',
  templateUrl: './product-management-create.component.html',
  styleUrls: ['./product-management-create.component.scss'],
})
export class ProductManagementCreateComponent {
  productListRoute: string = '/' + ROUTES.PRODUCT_MANAGEMENT;
  productForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.productForm = this.fb.group({
      productName: [
        null,
        [
          Validators.required,
          Validators.pattern(Patterns.alpha_spaces),
          Validators.maxLength(30),
          Validators.minLength(2),
          cannotContainSpace,
        ],
      ],
      productDescription: [
        null,
        [
          Validators.required,
          Validators.pattern(Patterns.alpha_spaces),
          Validators.maxLength(200),
          Validators.minLength(2),
          cannotContainSpace,
        ],
      ],
      productPoints: [null, [Validators.required, Validators.min(0)]],
    });
  }

  onFileSelected(file: File) {
    this.selectedFile = file;
  }

  onSubmit() {
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) {
      return;
    }

    const formData = {
      ...this.productForm.value,
      productImages: [],
    };

    const payload: RequestI = {
      path: API_END_POINTS.products + '/create',
      data: formData,
      // data: this.productForm.value,
    };
    this.apiService.post(payload).subscribe({
      next: (res: ResponseI) => {
        console.log('res: ', res);
        this.router.navigate([ROUTES.PRODUCT_MANAGEMENT]);
        this.toastrService.showSuccess(res?.message || 'Something wen wrong!');
      },
      error: (error) => {
        console.log('error: ', error);
        this.toastrService.showError(
          error['error']?.message || 'Something wen wrong!'
        );
      },
    });
  }
}
