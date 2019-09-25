import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'ngx-sortablejs';

@Component({
  selector: 'app-top-stores',
  templateUrl: './top-stores.component.html',
  styleUrls: ['./top-stores.component.scss']
})
export class TopStoresComponent implements OnInit {

  constructor() {

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

  ngOnInit() {

  }
}
