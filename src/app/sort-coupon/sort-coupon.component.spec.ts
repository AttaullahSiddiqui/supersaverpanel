import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortCouponComponent } from './sort-coupon.component';

describe('SortCouponComponent', () => {
  let component: SortCouponComponent;
  let fixture: ComponentFixture<SortCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
