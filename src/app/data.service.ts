import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { filter } from 'minimatch';
// import 'rxjs/add/operator/catch'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  result: any;

  constructor(private _http: HttpClient) {

  }

  getUsers() {
    return this._http.get("/api/users")
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }

  loginUser(userData) {
    return this._http.post("/api/login", userData)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }

  addCategory(catData) {
    return this._http.post("/api/createCategory", catData)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  fetchCategory() {
    console.log("Wokrrrr")
    return this._http.get("/api/fetchCategories")
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
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
