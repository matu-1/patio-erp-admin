import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { API } from 'src/app/constants/api.constant';
import { ResponsePagination } from 'src/app/utils/response';
import { Factura } from '../interfaces/factura.interface';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<ResponsePagination<Factura[]>>(API.INVOICE.GET_ALL)
      .pipe(delay(2000));
  }
}
