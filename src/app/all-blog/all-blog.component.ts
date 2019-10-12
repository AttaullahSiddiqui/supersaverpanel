import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from '../data.service';
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
  responseError = "";
  responseSuccess = "";

  @ViewChild('editModal', { static: false }) public editModal: ModalDirective;
  @ViewChild('deleteModal', { static: false }) public deleteModal: ModalDirective;

  constructor(private _dataService: DataService) { this.getBlogsFunc() }

  ngOnInit() { }

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
    // var index = this.catArray.indexOf(key);
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
    this._dataService.postAPI("/api/deleteCategory", { _id: this.blogArray[this.dltIndex]._id }).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.blogArray.splice(this.dltIndex, 1)
      } else {
        this.responseError = res.message
      }
    })
    document.getElementById('closebtn').click();
  }

  saveEditedBlog() {
    this._dataService.postAPI("/api/editCategory", this.editObject).subscribe(res => {
      if (res.data) {
        this.responseSuccess = res.message;
        this.blogArray[this.editKey] = res.data;
        this.editObject = ""
      } else {
        console.log(res.message);
        this.responseError = res.message
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
  closeSuccess() {
    this.responseSuccess = ""
  }
  closeError() {
    this.responseError = ""
  }
}
