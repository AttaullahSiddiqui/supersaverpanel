import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

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

}
