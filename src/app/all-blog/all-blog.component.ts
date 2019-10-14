import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from '../data.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
declare var $: any;

@Component({
  selector: 'app-all-blog',
  templateUrl: './all-blog.component.html',
  styleUrls: ['./all-blog.component.scss']
})
export class AllBlogComponent implements OnInit {
  blogArray = [];
  deleteObject = "";
  editObject = "";
  editKey = "";
  dltIndex: any;
  skipNo = 0;
  stores = {};
  selectedImage: any = null;
  imageChangedEvent: any = '';
  imgModel = "";
  croppedImage: any = '';
  responseError = "";
  responseSuccess = "";

  @ViewChild('editModal', { static: false }) public editModal: ModalDirective;
  @ViewChild('deleteModal', { static: false }) public deleteModal: ModalDirective;

  constructor(private _dataService: DataService) { this.getBlogsFunc() }

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchStoresOnlyId").subscribe(res => {
      if (res.data) {
        this.stores = res.data;
      } else {
        this.responseError = res.message
      }
    })
  }

  getBlogsFunc() {
    this._dataService.fetchAPIWithLimit("/api/fetchBlogs", this.skipNo, 8).subscribe(res => {
      if (res.data) {
        console.log(res.data)
        this.blogArray = [];
        this.blogArray = res.data;
        this.responseError = "";
      } else {
        window.scrollTo(0, 0)
        if (this.skipNo) {
          this.skipNo -= 5;
        }
        this.responseSuccess = ""
        this.responseError = res.message
      }
    })
  }
  showDltModal(key) {
    this.dltIndex = key;
    $('#deleteModal').modal('show');
  }
  showEditModal(key, categoryNode) {
    this.editObject = "";
    this.editObject = { ...categoryNode };
    this.editKey = key;
    $('#editModal').modal('show');
  }
  deleteBlog() {
    this._dataService.postAPI("/api/deleteBlog", { _id: this.blogArray[this.dltIndex]._id }).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.blogArray.splice(this.dltIndex, 1);
        window.scrollTo(0, 0)
      } else {
        this.responseError = res.message;
        window.scrollTo(0, 0)
      }
    })
    document.getElementById('closebtn').click();
  }

  saveEditedBlog(editNode) {
    var self = this;
    if (this.croppedImage) {
      var filePath = `blogImages/_${new Date().getTime()}`;
      this._dataService.storeImage(filePath, this.selectedImage, function (error, data) {
        if (error) {
          this.responseError = "Can't upload image to the Server";
          window.scrollTo(0, 0)
          return;
        }
        if (data) {
          editNode.img = data;
          self.editCallbackFunc(editNode);
          self.clearCroppedImage()
        }
      }).subscribe()
    } else {
      self.editCallbackFunc(editNode)
    }
  }
  editCallbackFunc(editData) {
    console.log(editData)
    this._dataService.postAPI("/api/editBlog", editData).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.blogArray[this.editKey] = res.data;
        window.scrollTo(0, 0)
      } else {
        this.responseError = res.message;
        window.scrollTo(0, 0)
      }
    })
    document.getElementById('editbtn').click();
  }
  nextFunc() {
    if (!this.blogArray) {
      this.responseError = "Can't load more Blogs at the moment";
      return;
    }
    this.skipNo += 5;
    this.getBlogsFunc()
  }
  prevFunc() {
    if (this.skipNo >= 5) {
      this.skipNo -= 5;
      this.getBlogsFunc()
    } else {
      this.responseError = "No more previous data exist";
      return;
    }
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
  clearCroppedImage() {
    this.imgModel = "";
    this.selectedImage = "";
    this.imageChangedEvent = "";
    this.croppedImage = "";
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
