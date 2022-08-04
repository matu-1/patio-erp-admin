import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ResponseError } from '../utils/response-error';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('err', err);
        if (err.error instanceof ProgressEvent) {
          return throwError(
            () => new ResponseError(500, 'Ups ocurrio un error', 'error')
          );
        }
        return throwError(
          () => new ResponseError(err.status, err.error.message)
        );
      })
    );
  }
}
