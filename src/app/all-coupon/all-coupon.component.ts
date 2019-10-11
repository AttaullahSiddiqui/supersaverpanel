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
  selectedStoreId = "";
  coupons = [];
  deleteObject = "";
  editObject = "";
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
    this.selectedStoreId = storeId;
    console.log(this.selectedStoreName)
    console.log(storeId);
    this.loadCouponFunc(storeId)
  }
  loadCouponFunc(id) {
    this._dataService.fetchAPIWithLimit("/api/fetchCouponsById", this.skipNo, 5, id).subscribe(res => {
      if (res.data) {
        console.log(res.data)
        this.coupons = [];
        this.coupons = res.data;
        this.responseError = "";
      } else {
        if (this.skipNo) {
          this.skipNo -= 5;
        }
        if (res.status == 404) this.coupons = []
        this.responseSuccess = "";
        this.responseError = res.message;
        console.log(res)
      }
    })
  }

  deleteCoupon() {
    document.getElementById('closebtn').click();
  }

  saveEditedCoupon() {
    document.getElementById('editbtn').click();
  }

  showDltModal(key) {
    this.dltIndex = this.coupons.indexOf(key);
    $('#deleteModal').modal('show');
  }
  showEditModal(key, couponNode) {
    this.editObject = "";
    this.editObject = { ...couponNode };
    this.editKey = key;
    $('#editModal').modal('show');
  }
  nextFunc() {
    if (!this.coupons) {
      this.responseError = "Can't load more categories at the moment";
      return;
    }
    this.skipNo += 5;
    this.loadCouponFunc(this.selectedStoreId)
  }
  prevFunc() {
    if (this.skipNo >= 5) {
      this.skipNo -= 5;
      this.loadCouponFunc(this.selectedStoreId)
    } else {
      this.responseError = "No more previous data exist";
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
