import { Component, OnInit, NgModule } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit {
  public showList: boolean;
  public storeInfo = {};
  responseSuccess = "";
  responseError = "";
  constructor(private _dataService: DataService) {

  }

  ngOnInit() {
    this.showList = false;
  }
  addStore() {
    this._dataService.postAPI("/api/addStore", this.storeInfo).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.storeInfo = {};
      } else {
        this.responseError = res.message
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
