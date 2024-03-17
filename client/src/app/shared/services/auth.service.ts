import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from 'src/app/books/model/books';
import { Observable } from 'rxjs';
import * as apiUrls from '../utils/apiUrls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(apiUrls.postLoginEndPoint, data);
  }
}
