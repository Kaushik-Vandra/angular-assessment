import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagementViewComponent } from './product-management-view.component';

describe('ProductManagementViewComponent', () => {
  let component: ProductManagementViewComponent;
  let fixture: ComponentFixture<ProductManagementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductManagementViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
