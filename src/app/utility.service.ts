import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  userVar: string = null;
  constructor(private _http: HttpClient, private _dataService: DataService) { }

  public setToken(data: string) {
    this.userVar = data;
    localStorage.setItem('localAuthVar', data);
  }
  public getToken(): string {
    return localStorage.getItem('localAuthVar');
  }
  public removeToken() {
    localStorage.removeItem('localAuthVar');
    this.userVar = "";
  };
  public canActivate() {
    if (this.userVar) return true
    var xyz = localStorage.getItem('localAuthVar');
    if (xyz) return this.authCallBack(xyz);
    else return false
  }
  private authCallBack(xyz) {
    return new Promise(
      (resolve, reject) => {
        this._dataService.postAPI('/api/verifyUserToken', { token: xyz }).subscribe(res => {
          if (res.data) {
            this.userVar = xyz;
            resolve(true);
          } else resolve(false);
        })
      })
  }
}
