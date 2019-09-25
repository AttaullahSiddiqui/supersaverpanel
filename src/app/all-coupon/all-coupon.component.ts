import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

// import * as $ from 'jquery'

declare var $: any;
// console.log(`jQuery version: ${$.fn.jquery}`);

@Component({
  selector: 'app-all-coupon',
  templateUrl: './all-coupon.component.html',
  styleUrls: ['./all-coupon.component.scss'],
  exportAs: 'bs-modal'
})
export class AllCouponComponent implements OnInit {

  @ViewChild('editModal', { static: false }) public editModal: ModalDirective;
  @ViewChild('deleteModal', { static: false }) public deleteModal: ModalDirective;


  constructor() { }
  radioInput: any;
  ngOnInit() {
    // $('#exampleModalLong').on('shown.bs.modal', function () {
    //   // $('#myInput').trigger('focus')
    // })
    // $('#exampleModalLong').on('hidden.bs.modal', function () {

    // })
    this.radioInput = true;
  }


  deleteCoupon() {
    // $('#deleteModal').modal('hide');
    document.getElementById('closebtn').click();
  }

  saveEditedCoupon() {
    // $('#editModal').modal('hide');
    document.getElementById('editbtn').click();
  }

  handleCodeInput() {
    if (this.radioInput)
      this.radioInput = false
    else
      this.radioInput = true
  }
}
