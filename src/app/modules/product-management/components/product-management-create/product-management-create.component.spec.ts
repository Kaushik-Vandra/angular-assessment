import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagementCreateComponent } from './product-management-create.component';

describe('ProductManagementCreateComponent', () => {
  let component: ProductManagementCreateComponent;
  let fixture: ComponentFixture<ProductManagementCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductManagementCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductManagementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
