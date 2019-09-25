import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCouponComponent } from './all-coupon.component';

describe('AllCouponComponent', () => {
  let component: AllCouponComponent;
  let fixture: ComponentFixture<AllCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
