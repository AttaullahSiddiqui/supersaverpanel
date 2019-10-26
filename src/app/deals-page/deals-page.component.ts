import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-deals-page',
  templateUrl: './deals-page.component.html',
  styleUrls: ['./deals-page.component.scss']
})
export class DealsPageComponent implements OnInit {
  dealInfo: any = {};
  isBusy = false;
  responseSuccess = "";
  responseError = "";

  constructor(private _dataService: DataService) { }

  ngOnInit() { }

  addDeal(dealNode) {
    if (this.isBusy) return;
    this.isBusy = true;
    this._dataService.postAPI("/api/addDeal", dealNode).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.dealInfo = {};
        window.scrollTo(0, 0);
        this.isBusy = false
      } else {
        this.responseError = res.message;
        this.isBusy = false;
        window.scrollTo(0, 0)
      }
    })
  }
  closeSuccess() { this.responseSuccess = "" }
  closeError() { this.responseError = "" }
}
