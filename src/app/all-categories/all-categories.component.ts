import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

declare var $: any;

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss'],
  exportAs: 'bs-modal'
})
export class AllCategoriesComponent implements OnInit {

  @ViewChild('editModal', { static: false }) public editModal: ModalDirective;
  @ViewChild('deleteModal', { static: false }) public deleteModal: ModalDirective;


  constructor() { }

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
