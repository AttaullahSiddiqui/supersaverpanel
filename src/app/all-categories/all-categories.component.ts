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
  deleteObject = "";
  editObject = "";
  editKey = "";
  dltIndex: any;

  @ViewChild('editModal', { static: false }) public editModal: ModalDirective;
  @ViewChild('deleteModal', { static: false }) public deleteModal: ModalDirective;


  constructor(private _dataService: DataService) {
    this._dataService.fetchAPI("/api/fetchCategories").subscribe(res => {
      if (res.data) {
        console.log(res.data)
        this.catArray = res.data
      } else {
        this.responseError = res.message
      }
    })
  }

  ngOnInit() {
  }

  showDltModal(key) {
    // this.deleteObject = categoryNode;
    // this.editObject = { ...categoryNode };
    var index = this.catArray.indexOf(key);
    console.log(index);
    this.dltIndex = index;
    $('#deleteModal').modal('show');
  }
  showEditModal(key, categoryNode) {
    this.editObject = { ...categoryNode };
    this.editKey = key;
    $('#editModal').modal('show');
  }


  deleteCoupon() {
    console.log(this.catArray[this.dltIndex]._id)
    this._dataService.postAPI("/api/deleteCategory", { _id: this.catArray[this.dltIndex]._id }).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.catArray.splice(this.dltIndex, 1)
      } else {
        console.log(res.message);
        this.responseError = res.message
      }
    })
    document.getElementById('closebtn').click();
  }

  saveEditedCoupon() {
    this._dataService.postAPI("/api/editCategory", this.editObject).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.catArray[this.editKey] = res.data;
      } else {
        console.log(res.message);
        this.responseError = res.message
      }
    })
    document.getElementById('editbtn').click();
  }
  closeSuccess() {
    this.responseSuccess = ""
  }
  closeError() {
    this.responseError = ""
  }

}
