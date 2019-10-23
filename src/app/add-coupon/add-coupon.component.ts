import { Component, OnInit, ElementRef } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {
  stores = {};
  couponInfo = { activeStatus: true };
  responseSuccess = "";
  responseError = "";

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchStoresOnlyId").subscribe(res => {
      if (res.data) {
        this.stores = res.data;
        this.responseError = "";
      } else this.errorHandler(res.message)
    })
  }
  addCoupon(couponData) {
    couponData.expDate = new Date(couponData.expDate).getTime();
    var today = Date.now();
    if (today > couponData.expDate) {
      this.errorHandler("Wrong Date Selected")
      return;
    }
    if (!couponData.trending) couponData.trending = false;
    if (!couponData.featuredForHome) couponData.featuredForHome = false;
    if (!couponData.newArrival) couponData.newArrival = false;
    if (couponData.activeStatus) couponData.code = "";

    this._dataService.postAPI("/api/addCoupon", couponData).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.couponInfo = { activeStatus: true };
        window.scrollTo(0, 0)
      } else this.errorHandler(res.message)
    })
  }
  fetchTrackingLink(id) {
    this._dataService.fetchAPIUsingId("/api/fetchStoreById", id).subscribe(res => {
      if (res.data) {
        this.couponInfo['trackingLink'] = res.data.trackUrl;
        this.responseError = "";
      } else this.errorHandler(res.message)
    })
  }
  errorHandler(msg) {
    this.responseError = msg;
    window.scrollTo(0, 0)
  }
  closeSuccess() { this.responseSuccess = "" }
  closeError() { this.responseError = "" }
}
