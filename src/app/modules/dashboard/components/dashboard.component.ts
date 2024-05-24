import { Component, OnInit } from '@angular/core';
import { API_END_POINTS } from 'src/app/common/helper/api.endpoints';
import { ROUTES } from 'src/app/common/helper/routes';
import { RequestI, ResponseI } from 'src/app/common/interfaces/api.interface';
import { ApiService } from 'src/app/common/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  productCount: number = 0;
  productList: string = '/' + ROUTES.PRODUCT_MANAGEMENT;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getDashboardCount();
  }

  getDashboardCount() {
    const payload: RequestI = {
      path: API_END_POINTS.dashboardCount,
    };

    this.apiService.post(payload).subscribe({
      next: (res: ResponseI) => {
        this.productCount = res.data.productCount;
      },
      error: (_error) => {},
    });
  }
}
