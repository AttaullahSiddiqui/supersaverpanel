import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: any;

  constructor(private _dataService: DataService) {
    // this._dataService.getUsers().subscribe(res => { this.users = res; console.log(this.users) })
    // this._dataService.getUsers().subscribe(res => { console.log(res) })



    // this._dataService.getUsers()
    //   .subscribe(res => this.users = res);
  }

  ngOnInit() {
  }

  errorHandler() {

  }

}
