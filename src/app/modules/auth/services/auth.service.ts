import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { API } from 'src/app/constants/api.constant';
import { Response } from 'src/app/utils/response';
import { UserTokenDto } from '../interfaces/auth.interface';
import { LoginDto } from '../interfaces/login.interface';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user!: UserTokenDto;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  get user(): UserTokenDto | null {
    return this._user ? { ...this._user } : null;
  }

  login(dto: LoginDto) {
    return this.http.post<Response<UserTokenDto>>(API.AUTH.LOGIN, dto).pipe(
      tap(({ data }) => {
        this._user = data;
        this.tokenService.setToken(data.accessToken);
      })
    );
  }

  isValid(): Observable<boolean> {
    return this.http.get<Response<UserTokenDto>>(API.AUTH.RENEW).pipe(
      tap(({ data }) => {
        this.tokenService.setToken(data.accessToken);
        this._user = data;
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  logout() {
    this._user = undefined as any;
    this.tokenService.removeToken();
  }
}
