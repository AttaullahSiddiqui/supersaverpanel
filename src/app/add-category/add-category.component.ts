import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  catData = {};
  responseError = "";
  responseSuccess = "";

  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }
  createCategory(catInfo) {
    if (!catInfo.catFeatured) {
      catInfo.catFeatured = false
    }
    this._dataService.addCategory(catInfo).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.catData = {};
      } else {
        this.responseError = res.message
      }
    })
  }
}
