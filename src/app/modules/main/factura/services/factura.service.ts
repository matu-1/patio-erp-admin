import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { API } from 'src/app/constants/api.constant';
import { ResponsePagination } from 'src/app/utils/response';
import { Factura, QueryInvoice } from '../interfaces/factura.interface';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  constructor(private http: HttpClient) {}

  getAll(params: QueryInvoice) {
    const paramsUrl = new URLSearchParams(params as any);
    return this.http
      .get<ResponsePagination<Factura[]>>(`${API.INVOICE.GET_ALL}?${paramsUrl}`)
      .pipe(delay(2000));
  }
}
