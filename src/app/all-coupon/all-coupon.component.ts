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

  storeArray = {};
  selectedStoreName = "";
  selectedStore = "";
  coupons = [];
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
      } else {
        this.responseError = res.message
      }
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
        this.coupons = res.data;
        console.log(res.data)
        this.responseError = "";
      } else {
        this.responseSuccess = "";
        window.scrollTo(0, 0)
        if (this.skipNo) {
          this.skipNo -= 5;
        }
        if (res.status == 404) {
          if (this.coupons) {
            this.responseError = "No more data in this store";
            return;
          }
        } this.coupons = []
        this.responseError = res.message;
      }
    })
  }

  deleteCoupon() {
    this._dataService.postAPI("/api/deleteCoupon", { _id: this.coupons[this.dltIndex]._id }).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.coupons.splice(this.dltIndex, 1);
        window.scrollTo(0, 0)
      } else {
        this.responseError = res.message;
        window.scrollTo(0, 0)
      }
    })
    document.getElementById('closebtn').click();
  }

  saveEditedCoupon(editNode) {
    if (editNode.activeStatus) editNode.code = "";
    this._dataService.postAPI("/api/editCoupon", editNode).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        window.scrollTo(0, 0)
        this.coupons[this.editKey] = res.data;
        console.log(this.editKey)
        console.log(res.data)
        this.editObject = {};
      } else {
        this.responseError = res.message;
        window.scrollTo(0, 0)
      }
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
      this.responseError = "Can't load more coupons at the moment";
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
      this.responseError = "No more previous data exist";
      window.scrollTo(0, 0)
      return;
    }
  }

  closeSuccess() {
    this.responseSuccess = ""
  }
  closeError() {
    this.responseError = ""
  }
}
