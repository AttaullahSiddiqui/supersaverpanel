import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData = {};
  loginError = ""
  constructor(private _dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  authUser(userInfo) {
    this._dataService.postAPI("/api/login", userInfo).subscribe(res => {
      if (res.data) {
        this.router.navigateByUrl('/dashboard')
      } else {
        this.loginError = res['message']
      }
    })
  }
}
