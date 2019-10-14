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
    onUpdate: (event: any) => {
      var prevNodeIndex;
      if (event.newIndex > event.oldIndex) {
        prevNodeIndex = event.newIndex - 1
      } else {
        prevNodeIndex = event.newIndex + 1
      }
      this.sortCouponFunc(this.coupons[event.newIndex], this.coupons[prevNodeIndex])
    }
  };

  loadCoupons(storeId) {
    this._dataService.fetchAPIUsingId("/api/fetchCouponsById", storeId).subscribe(res => {
      if (res.data) {
        this.coupons = [];
        this.coupons = res.data;
        console.log(res.data)
        this.responseError = "";
      } else {
        this.responseSuccess = "";
        window.scrollTo(0, 0)
        this.coupons = []
        this.responseError = res.message;
      }
    })
  }
  sortCouponFunc(mainNode, secondNode) {
    console.log(mainNode);
    console.log(secondNode);
    this._dataService.sortAPI("/api/sortCoupons", mainNode, secondNode).subscribe(res => {
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
