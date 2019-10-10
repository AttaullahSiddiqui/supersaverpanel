import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
import { finalize } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { AngularFireStorage } from '@angular/fire/storage';
// import { filter } from 'minimatch';
// import 'rxjs/add/operator/catch'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  result: any;

  constructor(private _http: HttpClient, private storage: AngularFireStorage) { }

  fetchAPI(url) {
    return this._http.get(url)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  postAPI(url, reqData) {
    return this._http.post(url, reqData)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  putAPI(url, reqData) {
    return this._http.post(url, reqData)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  deleteAPI(url, reqData) {
    return this._http.delete(url, reqData)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  fetchAPIWithLimit(url, skip, limit) {
    const params = {
      skipNo: skip,
      limitNo: limit
    }
    return this._http.get(url, { params: params })
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  fetchAPIUsingId(url, id) {
    return this._http.get(url, { params: { _id: id } })
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }

  storeImage(filePath, selectedImage, cb) {
    const fileRef = this.storage.ref(filePath);
    return this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          cb(undefined, url);
        }, (err) => { cb(err); })
      })
    );
  }

  // getUsers() {
  //   return this._http.get("/api/users")
  //     .pipe(map(res => JSON.parse(JSON.stringify(res))));
  // }

  // loginUser(userData) {
  //   return this._http.post("/api/login", userData)
  //     .pipe(map(res => JSON.parse(JSON.stringify(res))));
  // }

  // addCategory(catData) {
  //   return this._http.post("/api/createCategory", catData)
  //     .pipe(map(res => JSON.parse(JSON.stringify(res))));
  // }
  // fetchCategory() {
  //   return this._http.get("/api/fetchCategories")
  //     .pipe(map(res => JSON.parse(JSON.stringify(res))));
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
