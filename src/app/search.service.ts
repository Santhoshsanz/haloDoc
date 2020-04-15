import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchApi="https://hn.algolia.com/api/v1/search?query=";
  countApi="https://hn.algolia.com/api/v1/users/"
  constructor(private _http: HttpClient) { }

  getData(url: string): Observable<any> {
    return this._http.get(url);
  }

  search(searchTerm:String,page=0): Observable<any>{
    return this.getData(this.searchApi+searchTerm+`&page=${page}`);
  }

  getCount(title:String): Observable<any>{
    return this.getData(this.countApi+title);
  }

}
