import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  catData = {};
  isBusy = false;
  responseError = "";
  responseSuccess = "";
  constructor(private _dataService: DataService) { }

  ngOnInit() { }

  createCategory(catInfo) {
    if (this.isBusy) return;
    if (!catInfo.catFeatured) catInfo.catFeatured = false
    this.isBusy = true;
    this._dataService.postAPI("/api/createCategory", catInfo).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.isBusy = false;
        this.catData = {};
      } else {
        this.responseError = res.message;
        this.isBusy = false;
      }
    })
  }
  closeSuccess() { this.responseSuccess = "" }
  closeError() { this.responseError = "" }
}
