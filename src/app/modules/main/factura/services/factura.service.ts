import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { API } from 'src/app/constants/api.constant';
import { ResponsePagination, Response } from 'src/app/utils/response';
import { SchedulePaymentDto } from '../interfaces/factura.interface';
import {
  Factura,
  QueryInvoice,
  RevertPaymentDto,
  Pago,
  PayInvoiceDto,
} from '../interfaces/factura.interface';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  constructor(private http: HttpClient) {}

  getAll(params: QueryInvoice) {
    const paramsUrl = new URLSearchParams(params as any);
    return this.http
      .get<ResponsePagination<Factura[]>>(`${API.INVOICE.GET_ALL}?${paramsUrl}`)
      .pipe(delay(1000));
  }

  revertPayment(dto: RevertPaymentDto) {
    return this.http.post<Response<Pago>>(API.INVOICE.REVERT_PAYMENT, dto);
  }

  pay(dto: PayInvoiceDto) {
    return this.http.post<Response<Pago>>(API.INVOICE.PAY, dto);
  }

  schedulePayment(dto: SchedulePaymentDto) {
    return this.http.post<Response<Pago>>(API.INVOICE.SCHEDULE_PAYMENT, dto);
  }
}
