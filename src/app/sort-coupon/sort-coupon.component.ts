import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'ngx-sortablejs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sort-coupon',
  templateUrl: './sort-coupon.component.html',
  styleUrls: ['./sort-coupon.component.scss']
})
export class SortCouponComponent implements OnInit {
  storeArray = {};
  selectedStore = "";
  coupons = null;
  responseSuccess = "";
  responseError = "";

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchStoresOnlyId").subscribe(res => {
      if (res.data) {
        this.storeArray = res.data;
        this.responseError = "";
      } else {
        this.responseError = res.message
      }
    })
  }
  options: SortablejsOptions = {
    onUpdate: (ev: any) => {
      var localArr = [];
      if (ev.newIndex > ev.oldIndex) {
        var rootSortNo = this.coupons[ev.newIndex].sortNo;
        for (var a = ev.newIndex; a >= ev.oldIndex; a--) {
          if (a == ev.oldIndex) {
            this.coupons[a].sortNo = rootSortNo;
            localArr.push(this.coupons[a])
          } else {
            this.coupons[a].sortNo = this.coupons[a - 1].sortNo;
            localArr.push(this.coupons[a])
          }
        }
      } else if (ev.oldIndex > ev.newIndex) {
        var rootSortNo = this.coupons[ev.newIndex].sortNo;
        for (var x = ev.newIndex; x <= ev.oldIndex; x++) {
          if (x == ev.oldIndex) {
            this.coupons[x].sortNo = rootSortNo;
            localArr.push(this.coupons[a]);
          } else {
            this.coupons[x].sortNo = this.coupons[x + 1].sortNo;
            localArr.push(this.coupons[a])
          }
        }
      }
      this.sortCouponFunc(localArr);
    }
  };

  loadCoupons(storeId) {
    this._dataService.fetchAPIUsingId("/api/fetchCouponsById", storeId).subscribe(res => {
      if (res.data) {
        this.coupons = [];
        this.coupons = res.data;
        this.responseError = "";
      } else {
        this.responseSuccess = "";
        window.scrollTo(0, 0)
        this.coupons = []
        this.responseError = res.message;
      }
    })
  }
  sortCouponFunc(updatedArr) {
    // console.log(updatedArr);
    this._dataService.sortAPI("/api/sortCoupons", updatedArr).subscribe(res => {
      if (res.data) {
        console.log(res.data)
        this.responseError = "";
      } else {
        this.responseSuccess = "";
        window.scrollTo(0, 0)
        this.responseError = res.message;
      }
    })
  }

  closeSuccess() {
    this.responseSuccess = ""
  }
  closeError() {
    this.responseError = ""
  }
}
