import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss',
    '../../../node_modules/@ng-select/ng-select/themes/default.theme.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddStoreComponent implements OnInit {
  public showList: boolean;
  public storeInfo = {};
  public categories: any;
  selectedImage: any = null;
  imgSrc = "";
  responseSuccess = "";
  responseError = "";
  people$: any;
  constructor(private _dataService: DataService) {

  }

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchCategories").subscribe(res => {
      if (res.data) {
        this.categories = res.data;
        this.responseError = "";
      } else {
        this.responseError = res.message
      }
    })
    this.people$ = [
      "hgdgjdws",
      "bbbbb",
      "cccc",
      "hgdgjdws",
      "bbbbb",
      "cccc",
      "hgdgjdws",
      "bbbbb",
      "cccc"
    ];
  }
  addStore(storeInfo) {
    // var localArr = []
    // storeInfo.categoryRef.map(res => localArr.push(res._id));
    // storeInfo.categoryRef = localArr;
    // if (storeInfo.editorChoice) {
    //   storeInfo.editorChoice = false
    // }
    // if (storeInfo.topStore) {
    //   storeInfo.topStore = false
    // }
    var filePath = `storeImages/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    // console.log(storeInfo);
    // console.log(filePath);

    this._dataService.storeImage(filePath, this.selectedImage).subscribe(res => { console.log("Hahahah", res) })

    // this._dataService.postAPI("/api/addStore", this.storeInfo).subscribe(res => {
    //   if (res.data) {
    //     this.responseSuccess = res.message;
    //     this.storeInfo = {};
    //   } else {
    //     this.responseError = res.message
    //   }
    // })
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.selectedImage = null;
    }
  }
  closeSuccess() {
    this.responseSuccess = ""
  }
  closeError() {
    this.responseError = ""
  }
}
