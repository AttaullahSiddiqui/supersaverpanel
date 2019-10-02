import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from '../data.service';

declare var $: any;

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss'],
  exportAs: 'bs-modal'
})
export class AllCategoriesComponent implements OnInit {
  responseError = "";
  catArray = []
  @ViewChild('editModal', { static: false }) public editModal: ModalDirective;
  @ViewChild('deleteModal', { static: false }) public deleteModal: ModalDirective;


  constructor(private _dataService: DataService) {
    this._dataService.fetchCategory().subscribe(res => {
      if (res.data) {
        console.log(res.data);
        console.log(res.data['0'].name);
        this.catArray = res.data
      } else {
        this.responseError = res.message
      }
    })
  }

  ngOnInit() {
  }


  deleteCoupon() {
    // $('#deleteModal').modal('hide');
    // $("#deleteModal .close").click();
    // $("#closebtn").click();
    // $('#closebtn').trigger('click');
    document.getElementById('closebtn').click();
  }

  saveEditedCoupon() {
    // $('#editModal').modal('hide')
    document.getElementById('editbtn').click();
  }

}
