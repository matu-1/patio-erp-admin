import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN = 'token';

  constructor() {}

  getToken() {
    return localStorage.getItem(this.TOKEN);
  }

  setToken(value: string) {
    localStorage.setItem(this.TOKEN, value);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN);
  }
}
