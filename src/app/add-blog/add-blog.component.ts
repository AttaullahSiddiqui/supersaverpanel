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
  blogInfo = {};
  selectedImage: any = null;
  imageChangedEvent: any = '';
  imgModel = "";
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
  uploadImageFirst(blogNode) {
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService.storeImage(filePath, this.selectedImage, function (error, data) {
      if (error) {
        this.responseError = "Can't upload image to the Server";
        window.scrollTo(0, 0)
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
    console.log(blogData)
    this._dataService.postAPI("/api/addBlog", blogData).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.blogInfo = {};
        this.imgModel = "";
        this.croppedImage = "";
        window.scrollTo(0, 0)
      } else {
        this.responseError = res.message
        window.scrollTo(0, 0)
      }
    })
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
  closeSuccess() {
    this.responseSuccess = ""
  }
  closeError() {
    this.responseError = ""
  }
}
