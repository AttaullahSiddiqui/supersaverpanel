import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.scss']
})
export class EditStoreComponent implements OnInit {
  dataLoaded = {};
  storeInfo = "";
  responseError = "";
  responseSuccess = ""

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchCategories").subscribe(res => {
      if (res.data) {
        this.dataLoaded = res.data;
        this.responseError = "";
      } else {
        this.responseError = res.message
      }
    })
  }

  loadStoreDetails(event) {
    console.log("hahha")
    console.log(event)
  }
}
