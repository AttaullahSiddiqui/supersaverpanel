import { Component, OnInit} from '@angular/core';
import { SortablejsOptions } from 'ngx-sortablejs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-top-stores',
  templateUrl: './top-stores.component.html',
  styleUrls: ['./top-stores.component.scss']
})
export class TopStoresComponent implements OnInit {
  dataLoaded: any = {};
  storeInfo: any = null;
  imgModel = "";
  croppedImage: any = "";
  selectedImage: any = null;
  imageChangedEvent: any = '';
  loadedStoreIndex: any;
  loadedStoreId: Number;
  responseError = "";
  responseSuccess = "";

  constructor(private _dataService: DataService) {

  }

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchStoresOnlyId").subscribe(res => {
      if (res.data) {
        this.dataLoaded = res.data;
        this.responseError = "";
      } else {
        this.responseError = res.message
      }
    })
  }

  options: SortablejsOptions = {
    onUpdate: (event: any) => {
      console.log(event);
    }
  };
  closeSuccess() {
    this.responseSuccess = ""
  }
  closeError() {
    this.responseError = ""
  }
}
