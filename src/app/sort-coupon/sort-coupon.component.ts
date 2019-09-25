import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'ngx-sortablejs';

@Component({
  selector: 'app-sort-coupon',
  templateUrl: './sort-coupon.component.html',
  styleUrls: ['./sort-coupon.component.scss']
})
export class SortCouponComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  options: SortablejsOptions = {
    onUpdate: (event: any) => {
      console.log(event);
    }
  };


  list1 = ["planning", "designing", "developing", "testinnng"];
  list2 = []

  cities = [
    'Ankara',
    'Moscow',
    'Munich',
    'Paris',
    'Washington',
  ];
}
