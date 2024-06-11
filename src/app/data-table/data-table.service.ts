import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  constructor(
    private _http: HttpClient
  ) { }

  getDataTableList() {
    return this._http.get(`https://test-data.directorix.cloud/task1`)
  }

  postDataTableList (formData: any) {
    return this._http.post(`https://test-data.directorix.cloud/task1`, formData)
  }
}
