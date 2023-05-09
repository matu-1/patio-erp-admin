import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/app/constants/api.constant';
import { Response } from 'src/app/utils/response';
import { Caja } from '../interfaces/caja.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CajaService {
  isLoading = { all: true };

  constructor(private http: HttpClient) {}

  getAll() {
    this.isLoading.all = true;
    return this.http
      .get<Response<Caja[]>>(API.CAJA.GET_ALL)
      .pipe(tap(() => (this.isLoading.all = false)));
  }
}
