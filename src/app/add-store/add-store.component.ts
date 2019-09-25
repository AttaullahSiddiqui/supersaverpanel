import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit {
  public showList: boolean;
  constructor() {

  }

  ngOnInit() {
    this.showList = false;
  }


}
