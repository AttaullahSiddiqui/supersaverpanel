import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  stores = {};
  blogInfo: any = {};
  isBusy = false;
  selectedImage: any = null;
  imageChangedEvent: any = '';
  imgModel = "";
  htmlContent: any;
  croppedImage: any = '';
  responseSuccess = "";
  responseError = "";

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchStoresOnlyId").subscribe(res => {
      if (res.data) {
        this.stores = res.data;
      } else this.errorHandler(res.message)
    })
  }
  uploadImageFirst(blogNode) {
    if (this.isBusy) return;
    this.isBusy = true;
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService.storeImage(filePath, this.selectedImage, function (error, data) {
      if (error) {
        this.errorHandler("Can't upload image to the Server");
        return;
      }
      if (data) {
        if (!blogNode.featuredForHome) blogNode.featuredForHome = false
        blogNode.img = data;
        self.saveBlogToDB(blogNode)
      }
    }).subscribe()
  }
  saveBlogToDB(blogData) {
    this._dataService.postAPI("/api/addBlog", blogData).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.blogInfo = {};
        this.imgModel = "";
        this.croppedImage = "";
        this.isBusy = false;
        window.scrollTo(0, 0)
      } else this.errorHandler(res.message)
    })
  }

  fileChangeEvent(event: any): void { this.imageChangedEvent = event }

  imageCropped(event: ImageCroppedEvent) {
    this.selectedImage = event.file;
    var reader = new FileReader();
    reader.readAsDataURL(event.file);
    reader.onloadend = () => {
      this.croppedImage = reader.result;
    }
  }
  errorHandler(msg) {
    this.responseError = msg;
    window.scrollTo(0, 0);
    this.isBusy = false;
  }
  closeSuccess() { this.responseSuccess = "" }
  closeError() { this.responseError = "" }
}
