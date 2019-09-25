import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {
  radioInput: any;
  constructor() { }

  ngOnInit() {
    this.radioInput = false;
  }
  handleCodeInput() {
    if (this.radioInput)
      this.radioInput = false
    else
      this.radioInput = true
  }

}
