import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from '../data.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData = {};
  responseError = ""
  constructor(private _dataService: DataService, private router: Router, private _utlityService: UtilityService) { }

  ngOnInit() {
    var checkAuth = this._utlityService.getToken();
    if (checkAuth) {
      this._dataService.postAPI('/api/verifyUserToken', { token: checkAuth }).subscribe(res => {
        if (res.data) this.router.navigateByUrl('/dashboard')
      })
    }
  }
  authUser(userInfo) {
    this._dataService.postAPI("/api/login", userInfo).subscribe(res => {
      if (res.data) {
        this._utlityService.setToken(res.data);
        this.router.navigateByUrl('/dashboard')
      } else {
        this.responseError = res['message']
      }
    })
  }
  closeError() {
    this.responseError = ""
  }
}
