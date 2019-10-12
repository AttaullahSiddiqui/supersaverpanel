import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-deals-page',
  templateUrl: './deals-page.component.html',
  styleUrls: ['./deals-page.component.scss']
})
export class DealsPageComponent implements OnInit {
  dealInfo = {};
  responseSuccess = "";
  responseError = "";

  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }

  addDeal(dealNode) {
    console.log(dealNode);
    this._dataService.postAPI("/api/addDeal", dealNode).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.dealInfo = {};
        window.scrollTo(0, 0)
      } else {
        this.responseError = res.message
        window.scrollTo(0, 0)
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
