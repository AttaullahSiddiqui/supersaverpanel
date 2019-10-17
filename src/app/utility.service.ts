import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  userVar: string = null;
  constructor(private _http: HttpClient, private _dataService: DataService) { }

  public setToken(data: string) {
    this.userVar = data;
    localStorage.setItem('Authorization', data);
  }

  public getToken(): string {
    return localStorage.getItem('Authorization');
  }

  public removeToken() {
    localStorage.removeItem('Authorization');
    this.userVar = "";
  };

  public canActivate(): Observable<any> {
    if (this.userVar) {
      console.log("Direct chal gya")
      return of(true);
    }
    var xyz = localStorage.getItem('Authorization');
    if (xyz) {
      console.log("Local me mil gya");
      this._dataService.postAPI('/api/verifyUserToken', { token: xyz }).subscribe(res => {
        if (res.data) {
          console.log("PAss", res.message);
          return of(true);
        } else {
          console.log("Fail", res.message);
          return of(false);
        }
      })
    } else {
      console.log("Nahe mila local me")
      return of(false);
    }
  }
}
