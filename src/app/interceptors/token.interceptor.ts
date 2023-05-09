import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../modules/auth/services/token.service';

const SKIP_TOKEN = new HttpContextToken(() => false);

export function skipToken() {
  return new HttpContext().set(SKIP_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.context.get(SKIP_TOKEN)) return next.handle(request);
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.tokenService.getToken()}`,
      },
    });
    return next.handle(request);
  }
}
