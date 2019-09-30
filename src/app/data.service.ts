import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
// import 'rxjs/add/operator/catch'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  result: any;

  constructor(private _http: HttpClient) {

  }

  getUsers() {
    console.log("donnneee");
    return this._http.get("/api/users")
      .pipe(map(res => this.result = res['data']));
    // return this._http.get("/api/users")
    //   .pipe(map(result => {
    //     console.log("Agyaaaa");
    //     console.log(result);
    //   }))
  }

  // getUsers() {
  //   console.log("Add User working");
  //   var userData = {
  //     userName: "danish",
  //     userPass: "jackking9",
  //     admin: true
  //   }
  //   return this._http.post("/api/register", userData)
  //     .pipe(map(res => console.log(res)));
  // }


  // addUser() {
  //   console.log("Add User working");
  //   var userData = {
  //     userName: "danish",
  //     userPass: "jackking9",
  //     admin: true
  //   }
  //   return this._http.post("/api/register", userData)
  //     .pipe(map(res => console.log(res)));
  // }

}
