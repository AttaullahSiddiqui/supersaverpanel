import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss',
    '../../../node_modules/@ng-select/ng-select/themes/default.theme.css'],
  encapsulation: ViewEncapsulation.None
})

export class AddStoreComponent implements OnInit {

  showList: boolean;
  storeInfo = {};
  categories: any;
  selectedImage: any = null;
  imageChangedEvent: any = '';
  imgModel = "";
  croppedImage: any = '';
  responseSuccess = "";
  responseError = "";
  _self = this;

  constructor(private _dataService: DataService, private _http: HttpClient) { }

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchCategories").subscribe(res => {
      if (res.data) {
        this.categories = res.data;
        this.responseError = "";
      } else {
        this.responseError = res.message
      }
    })
  }
  addStore(storeInfo) {
    var self = this;

    var filePath = `storeImages/_${new Date().getTime()}`;

    this._dataService.storeImage(filePath, this.selectedImage, function (error, data) {
      if (error) {
        console.log("Errorrr", error);
        this.responseError = "Can't upload image to the Server";
        return;
      }
      if (data) {
        if (!storeInfo.editorChoice) {
          storeInfo.editorChoice = false
        }
        if (!storeInfo.topStore) {
          storeInfo.topStore = false
        }
        storeInfo.img = data;
        self.saveStoreToDB(storeInfo)
      }
    }).subscribe()
  }

  saveStoreToDB(storeNode) {
    this._dataService.postAPI("/api/addStore", storeNode).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.storeInfo = {};
        this.imgModel = "";
        this.croppedImage = "";
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.selectedImage = event.file;
    var reader = new FileReader();
    reader.readAsDataURL(event.file);
    reader.onloadend = () => {
      this.croppedImage = reader.result;
    }
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
