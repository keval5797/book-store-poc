import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  apiCallCount = 0;
  next!: HttpHandler;
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.next = next;
    return this.handleHttpEvent(request);
  }

  private handleHttpEvent(
    request: HttpRequest<any>
  ): Observable<HttpEvent<any>> {
    const updatedRequest = this.addHeaders(request);
    return this.next.handle(updatedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        throw this.errorHandler(error);
      })
    );
  }

  private addHeaders(request: HttpRequest<any>) {
    let body = request.body;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Content-Security-Policy', 'default-src');

    if (localStorage.getItem('token')) {
      headers = headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      );
    }
    return request.clone({
      headers,
      body,
    });
  }

  errorHandler(error: HttpErrorResponse): HttpErrorResponse {
    if (error.status === 401) {
      localStorage.clear();
      this.router.navigate(['login']);
    } else {
      alert(error.error.errors);
    }
    return error;
  }
}
