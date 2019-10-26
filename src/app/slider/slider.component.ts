import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
declare var $: any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  stores = {};
  firstSlide: any = {};
  secondSlide: any = {};
  thirdSlide: any = {};
  fourthSlide: any = {};
  fifthSlide: any = {};
  trickyArr = ["", false, false, false, false, false];
  selectedImage: any = null;
  imageChangedEvent: any = '';
  imgModel = "";
  imgModel2 = "";
  imgModel3 = "";
  imgModel4 = "";
  imgModel5 = "";
  htmlContent: any;
  croppedImage: any = '';
  responseSuccess = "";
  responseError = "";

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchStoresOnlyId").subscribe(res => {
      if (res.data) {
        this.stores = res.data;
      } else {
        this.responseError = res.message
      }
    })
  }
  changeTab(id, ev) {
    for (var i = 0; i < 5; i++) {
      (<HTMLElement>document.getElementsByClassName('navList')[i]).classList.remove('active');
    }
    ev.srcElement.classList.add('active');
    for (var i = 1; i < 6; i++) {
      (<HTMLElement>document.getElementById('slider' + i)).classList.remove('active');
      (<HTMLElement>document.getElementById('slider' + i)).classList.remove('show');
    }
    (<HTMLElement>document.getElementById(id)).classList.add('active');
    (<HTMLElement>document.getElementById(id)).classList.add('show');

    this.imgModel = "";
    this.croppedImage = "";
    this.imageChangedEvent = '';
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
  uploadImageFirst(sliderNode, indName) {
    if (this.trickyArr[indName]) return;
    this.trickyArr[indName] = true;
    var self = this;
    var filePath = `sliderImages/_${new Date().getTime()}`;
    this._dataService.storeImage(filePath, this.selectedImage, function (err, data) {
      if (err) {
        this.responseError = "Can't upload image to the Server";
        this.trickyArr[indName] = false;
        window.scrollTo(0, 0)
        return;
      }
      if (data) {
        sliderNode.img = data;
        sliderNode.arrIndex = indName;
        self.uploadSlide(sliderNode)
      }
    }).subscribe()
  }
  uploadSlide(dataNode) {
    this._dataService.postAPI("/api/addSlide", dataNode).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.trickyArr[dataNode.arrIndex] = false;
        this.firstSlide = {};
        this.secondSlide = {};
        this.thirdSlide = {};
        this.fourthSlide = {};
        this.fifthSlide = {};
        this.imgModel = "";
        this.croppedImage = "";
        this.imageChangedEvent = '';
        window.scrollTo(0, 0)
      } else {
        this.responseError = res.message;
        this.trickyArr[dataNode.arrIndex] = false;
        window.scrollTo(0, 0)
      }
    })
  }
  closeSuccess() { this.responseSuccess = "" }
  closeError() { this.responseError = "" }
}