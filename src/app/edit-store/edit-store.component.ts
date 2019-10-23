import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from '../data.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

declare var $: any;

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.scss'],
  exportAs: 'bs-modal'
})
export class EditStoreComponent implements OnInit {
  dataLoaded = null;
  storeInfo: any = null;
  imgModel = "";
  croppedImage: any = "";
  selectedImage: any = null;
  imageChangedEvent: any = '';
  loadedStoreIndex: any;
  loadedStoreId: Number;
  responseError = "";
  responseSuccess = "";

  @ViewChild('deleteModal', { static: false }) public deleteModal: ModalDirective;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchStoresOnlyId").subscribe(res => {
      if (res.data) {
        this.dataLoaded = res.data;
        this.responseError = "";
      } else this.errorHandler(res.message);
    })
  }

  loadStoreDetails(storeId, event) {
    this.loadedStoreIndex = event.target["selectedIndex"];
    this.loadedStoreId = storeId;
    this._dataService.fetchAPIUsingId("/api/fetchStoreById", storeId).subscribe(res => {
      if (res.data) {
        this.storeInfo = res.data;
        this.responseError = "";
      } else this.errorHandler(res.message);
    })
  }
  showDltModal(storeId) {
    $('#deleteModal').modal('show');
  }
  confirmDelete() {
    this._dataService.postAPI("/api/deleteStore", { _id: this.loadedStoreId }).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.storeInfo = {};
        this.dataLoaded.splice(this.loadedStoreIndex, 1);
        window.scrollTo(0, 0)
      } else this.errorHandler(res.message);
    })
    document.getElementById('closebtn').click();
  }
  saveEditStoreToDB(storeNode) {
    var self = this;
    if (this.croppedImage) {
      var filePath = `storeImages/_${new Date().getTime()}`;
      this._dataService.storeImage(filePath, this.selectedImage, function (error, data) {
        if (error) {
          this.errorHandler("Can't upload image to the Server");
          return;
        }
        if (data) {
          storeNode.img = data;
          self.saveCallbackFunc(storeNode);
          self.clearCroppedImage()
        }
      }).subscribe()
    } else {
      self.saveCallbackFunc(storeNode)
    }
  }
  saveCallbackFunc(storeData) {
    this._dataService.postAPI("/api/editStore", storeData).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.dataLoaded[this.loadedStoreIndex].name = res.data.name;
        this.dataLoaded[this.loadedStoreIndex]._id = res.data._id;
        this.storeInfo = res.data;
        window.scrollTo(0, 0)
      } else this.errorHandler(res.message)
    })
  }

  fileChangeEvent(event: any): void { this.imageChangedEvent = event; }

  imageCropped(event: ImageCroppedEvent) {
    this.selectedImage = event.file;
    var reader = new FileReader();
    reader.readAsDataURL(event.file);
    reader.onloadend = () => {
      this.croppedImage = reader.result;
    }
  }
  clearCroppedImage() {
    this.imgModel = "";
    this.selectedImage = "";
    this.imageChangedEvent = "";
    this.croppedImage = "";
  }
  errorHandler(msg) {
    this.responseError = msg;
    window.scrollTo(0, 0)
  }
  closeSuccess() { this.responseSuccess = "" }
  closeError() { this.responseError = "" }
}
