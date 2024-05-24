import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { API_END_POINTS } from 'src/app/common/helper/api.endpoints';
import { Patterns } from 'src/app/common/helper/helper';
import { ROUTES } from 'src/app/common/helper/routes';
import { cannotContainSpace } from 'src/app/common/helper/validators';
import { RequestI, ResponseI } from 'src/app/common/interfaces/api.interface';
import { ApiService } from 'src/app/common/services/api.service';
import { ToastrService } from 'src/app/common/services/toastr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-management-create',
  templateUrl: './product-management-create.component.html',
  styleUrls: ['./product-management-create.component.scss'],
})
export class ProductManagementCreateComponent {
  productListRoute: string = '/' + ROUTES.PRODUCT_MANAGEMENT;
  baseImgUrl: string = environment.img_url;
  imgUrl: string = '';
  productForm!: FormGroup;
  selectedFile: File | null = null;
  productId: string | null = null;
  productImages: string[] = [];
  removeImages: string[] = [];
  formTitle: string = 'Add Product';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.productId) {
      this.formTitle = 'Edit Product';
      this.getProductDetails(this.productId);
    }
    this.initForm();
  }

  getProductDetails(productId: string | null) {
    const payload: RequestI = {
      path: API_END_POINTS.products + `/get/${productId}`,
    };
    this.apiService.get(payload).subscribe({
      next: (res: ResponseI) => {
        const {
          productName,
          productDescription,
          productPoints,
          productStatus,
          productImages,
        } = res.data;
        this.productForm.setValue({
          productName,
          productDescription,
          productPoints,
          productStatus,
        });
        this.productImages = [productImages[0]];
        this.imgUrl = this.baseImgUrl + productImages[0];
        console.log('this.imgUrl: ', this.imgUrl);
      },
      error: (_error) => {},
    });
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
    if (this.productId) {
      this.productForm.addControl('productStatus', this.fb.control(false));
    }
  }

  onFileSelected(file: FileList) {
    this.selectedFile = file[0];
    if (this.productId && this.productImages.length) {
      this.removeImages = this.productImages;
      this.productImages = [];
    }
  }

  onSubmit() {
    console.log('pr: ', this.productImages);
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) {
      return;
    }
    if (this.selectedFile !== null) {
      this.uploadFiles(this.selectedFile);
    } else if (this.selectedFile === null && this.productImages.length) {
      this.addEditProduct(this.productImages);
    } else {
      this.toastrService.showError('Please select an image file');
    }
  }

  addEditProduct(productImages: string[]) {
    const formData = {
      ...this.productForm.value,
      productPoints: Number(this.productForm.value.productPoints),
      productImages,
    };

    if (this.productId) {
      (formData._id = this.productId),
        (formData.removeImages = this.removeImages);
    }

    const payload: RequestI = {
      path: API_END_POINTS.products + (this.productId ? '/update' : '/create'),
      data: formData,
    };
    this.apiService.post(payload).subscribe({
      next: (res: ResponseI) => {
        this.router.navigate([ROUTES.PRODUCT_MANAGEMENT]);
        this.toastrService.showSuccess(res?.message || 'Something wen wrong!');
      },
      error: (error) => {
        this.toastrService.showError(
          error['error']?.message || 'Something wen wrong!'
        );
      },
    });
  }

  uploadFiles(file: File) {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('module_name', 'product');

    const payload: RequestI = {
      path: API_END_POINTS.uploadImage,
      data: formData,
    };
    this.apiService.post(payload).subscribe({
      next: (res: ResponseI) => {
        this.productImages = res.data.map((img: any) => img.name);
        this.addEditProduct(this.productImages);
      },
      error: (error) => {
        this.toastrService.showError(
          error['error']?.message || 'Something wen wrong!'
        );
      },
    });
  }
}
