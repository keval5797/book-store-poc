import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from 'src/app/books/model/books';
import { map, Observable } from 'rxjs';
import * as apiUrls from '../utils/apiUrls';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get(apiUrls.getBooksEndPoint);
  }

  getBookById(id: string): Observable<any> {
    return this.http.get(apiUrls.getBookByIdEndPoint(id));
  }

  addBook(book: IBook) {
    return this.http.post(apiUrls.postBooksEndPoint, book);
  }

  updateBook(id: string, book: IBook) {
    return this.http.put(apiUrls.putBooksEndPoint(id), book);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(apiUrls.deleteBooksEndPoint(id));
  }
}
