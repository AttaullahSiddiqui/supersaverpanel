import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from '../data.service';
declare var $: any;

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss'],
  exportAs: 'bs-modal'
})
export class AllUserComponent implements OnInit {
  dataLoaded = false;
  userArray = [];
  editObject: any = "";
  editKey = "";
  responseError = "";
  responseSuccess = "";


  @ViewChild('editModal', { static: false }) public editModal: ModalDirective;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchUsers").subscribe(res => {
      if (res.data) {
        this.dataLoaded = true;
        this.userArray = res.data;
        this.responseError = "";
      } else {
        this.errorHandler(res.message)
      }
    })
  }
  showEditModal(key, categoryNode) {
    this.editObject = "";
    this.editObject = { ...categoryNode };
    this.editKey = key;
    $('#editModal').modal('show');
  }
  saveEditedUser() {
    this._dataService.postAPI("/api/editUser", this.editObject).subscribe(res => {
      if (res.data) {
        this.successHandler(res.message);
        this.userArray[this.editKey] = res.data;
        this.editObject = ""
      } else this.errorHandler(res.message)
    })
    document.getElementById('editbtn').click();
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
