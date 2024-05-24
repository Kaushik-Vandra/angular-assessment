import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_END_POINTS } from 'src/app/common/helper/api.endpoints';
import { RequestI, ResponseI } from 'src/app/common/interfaces/api.interface';
import { ApiService } from 'src/app/common/services/api.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-management-view',
  templateUrl: './product-management-view.component.html',
  styleUrls: ['./product-management-view.component.scss'],
})
export class ProductManagementViewComponent {
  productInfo: any = null;
  productId: string | null = null;
  IMG_BASE_URL: string = environment.img_url;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProductDetails(this.productId);
  }

  getProductDetails(productId: string | null) {
    const payload: RequestI = {
      path: API_END_POINTS.products + `/get/${productId}`,
    };
    this.apiService.get(payload).subscribe({
      next: (res: ResponseI) => {
        this.productInfo = res.data;
      },
      error: (_error) => {},
    });
  }

  goBack(): void {
    this.location.back();
  }
}
