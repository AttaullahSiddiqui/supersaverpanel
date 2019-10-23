import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from '../data.service';
declare var $: any;

@Component({
  selector: 'app-all-coupon',
  templateUrl: './all-coupon.component.html',
  styleUrls: ['./all-coupon.component.scss'],
  exportAs: 'bs-modal'
})
export class AllCouponComponent implements OnInit {

  @ViewChild('editModal', { static: false }) public editModal: ModalDirective;
  @ViewChild('deleteModal', { static: false }) public deleteModal: ModalDirective;

  storeArray: {} = null;
  selectedStoreName = "";
  selectedStore = "";
  coupons = [];
  dataLoaded = false;
  editObject = {};
  editKey = "";
  dltIndex: any;
  skipNo = 0;
  responseSuccess = "";
  responseError = "";

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchStoresOnlyId").subscribe(res => {
      if (res.data) {
        this.storeArray = res.data;
        this.responseError = "";
      } else this.errorHandler(res.message)
    })
  }
  loadCoupons(storeId, event) {
    var index = event.target["selectedIndex"];
    this.selectedStoreName = this.storeArray[index].name;
    this.loadCouponFunc(storeId);
  }
  loadCouponFunc(id) {
    this._dataService.fetchAPIWithLimit("/api/fetchCouponsById", this.skipNo, 5, id).subscribe(res => {
      if (res.data) {
        this.coupons = [];
        this.dataLoaded = true;
        this.coupons = res.data;
        this.responseError = "";
      } else {
        this.responseSuccess = "";
        if (this.skipNo) this.skipNo -= 5;
        if (res.status == 404) {
          if (this.coupons.length) {
            this.errorHandler("No more data in this store");
            return;
          }
        } this.coupons = []
        this.errorHandler(res.message)
      }
    })
  }
  deleteCoupon() {
    this._dataService.postAPI("/api/deleteCoupon", { _id: this.coupons[this.dltIndex]._id }).subscribe(res => {
      if (res.data) {
        this.successHandler(res.message);
        this.coupons.splice(this.dltIndex, 1)
      } else this.errorHandler(res.message)
    })
    document.getElementById('closebtn').click();
  }

  saveEditedCoupon(editNode) {
    if (editNode.activeStatus) editNode.code = "";
    this._dataService.postAPI("/api/editCoupon", editNode).subscribe(res => {
      if (res.data) {
        this.successHandler(res.message);
        this.coupons[this.editKey] = res.data;
        this.editObject = {};
      } else this.errorHandler(res.message)
    })
    document.getElementById('editbtn').click();
  }

  showDltModal(key) {
    this.dltIndex = key
    $('#deleteModal').modal('show');
  }
  showEditModal(key, couponNode) {
    this.editObject = null;
    couponNode.expDate = couponNode.expDate.substr(0, 10);
    this.editObject = { ...couponNode };
    this.editKey = key;
    $('#editModal').modal('show');
  }
  nextFunc() {
    if (!this.coupons) {
      this.errorHandler("Can't load more coupons at the moment");
      return;
    }
    this.skipNo += 5;
    this.loadCouponFunc(this.selectedStore)
  }
  prevFunc() {
    if (this.skipNo >= 5) {
      this.skipNo -= 5;
      this.loadCouponFunc(this.selectedStore)
    } else {
      this.errorHandler("No more previous data exist");
      return;
    }
  }
  fetchTrackingLink(id) {
    this._dataService.fetchAPIUsingId("/api/fetchStoreById", id).subscribe(res => {
      if (res.data) {
        this.editObject['trackingLink'] = res.data.trackUrl;
        this.responseError = "";
      } else this.errorHandler(res.message)
    })
  }
  errorHandler(msg) {
    this.responseError = msg;
    window.scrollTo(0, 0)
  }
  successHandler(msg) {
    this.responseSuccess = msg;
    window.scrollTo(0, 0)
  }
  closeSuccess() { this.responseSuccess = "" }
  closeError() { this.responseError = "" }
}
