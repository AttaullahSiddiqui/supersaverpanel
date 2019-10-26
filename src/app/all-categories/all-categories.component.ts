import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from '../data.service';

declare var $: any;

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss'],
  exportAs: 'bs-modal'
})
export class AllCategoriesComponent implements OnInit {
  responseError = "";
  responseSuccess = "";
  catArray = [];
  dataLoaded = false;
  isBusy = false;
  deleteObject = "";
  editObject: any = "";
  editKey = "";
  dltIndex: any;
  skipNo = 0;

  @ViewChild('editModal', { static: false }) public editModal: ModalDirective;
  @ViewChild('deleteModal', { static: false }) public deleteModal: ModalDirective;


  constructor(private _dataService: DataService) { this.getCategoriesFunc() }

  getCategoriesFunc() {
    if (this.isBusy) return;
    this.isBusy = true;
    this._dataService.fetchAPIWithLimit("/api/fetchCategories", this.skipNo, 5).subscribe(res => {
      if (res.data) {
        this.dataLoaded = true;
        this.catArray = [];
        this.catArray = res.data;
        this.responseError = "";
        this.isBusy = false;
      } else {
        if (this.skipNo) this.skipNo -= 5
        this.responseSuccess = ""
        this.errorHandler(res.message);
        this.dataLoaded = true;
      }
    })
  }
  ngOnInit() { }

  showDltModal(key) {
    this.dltIndex = key;
    $('#deleteModal').modal('show');
  }
  showEditModal(key, categoryNode) {
    this.editObject = "";
    this.editObject = { ...categoryNode };
    this.editKey = key;
    $('#editModal').modal('show');
  }
  deleteCoupon() {
    this._dataService.postAPI("/api/deleteCategory", { _id: this.catArray[this.dltIndex]._id }).subscribe(res => {
      if (res.data) {
        this.successHandler(res.message);
        this.catArray.splice(this.dltIndex, 1)
      } else this.errorHandler(res.message)
    })
    document.getElementById('closebtn').click();
  }
  saveEditedCoupon() {
    if (this.isBusy) return;
    this.isBusy = true;
    this._dataService.postAPI("/api/editCategory", this.editObject).subscribe(res => {
      if (res.data) {
        this.successHandler(res.message);
        this.catArray[this.editKey] = res.data;
        this.editObject = "";
      } else this.errorHandler(res.message)
    })
    document.getElementById('editbtn').click();
  }
  nextFunc() {
    if (this.isBusy) return;
    if (!this.catArray) {
      this.errorHandler("Can't load more categories at the moment");
      return;
    }
    this.skipNo += 5;
    this.getCategoriesFunc()
  }
  prevFunc() {
    if (this.isBusy) return;
    if (this.skipNo >= 5) {
      this.skipNo -= 5;
      this.getCategoriesFunc()
    } else {
      this.errorHandler("No more previous data exist");
      return;
    }
  }
  errorHandler(msg) {
    this.responseError = msg;
    window.scrollTo(0, 0);
    this.isBusy = false;
  }
  successHandler(msg) {
    this.responseSuccess = msg;
    window.scrollTo(0, 0);
    this.isBusy = false;
  }
  closeSuccess() { this.responseSuccess = "" }
  closeError() { this.responseError = "" }
}
