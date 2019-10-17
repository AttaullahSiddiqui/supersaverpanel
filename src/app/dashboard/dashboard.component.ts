import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  coupons = "xxx";
  blogs = "xxx";
  stores = "xxx";
  users = "xxx";
  responseError = ""

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.fetchAPI("/api/countCoupons").subscribe(res => {
      if (res.data) this.coupons = res.data;
      else this.errorHandler(res.message)
    })
    this._dataService.fetchAPI("/api/countBlogs").subscribe(res => {
      if (res.data) this.blogs = res.data;
      else this.errorHandler(res.message)
    })
    this._dataService.fetchAPI("/api/countStores").subscribe(res => {
      if (res.data) this.stores = res.data;
      else this.errorHandler(res.message)
    })
    this._dataService.fetchAPI("/api/countUsers").subscribe(res => {
      if (res.data) this.users = res.data;
      else this.errorHandler(res.message)
    })
  }

  errorHandler(err) {
    this.responseError = "Can't load " + err + " at the moment";
  }

}
