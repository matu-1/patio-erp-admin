import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { API } from 'src/app/constants/api.constant';
import { ResponsePagination, Response } from 'src/app/utils/response';
import { routeParams } from 'src/app/utils/route-params';
import {
  InvoiceDetail,
  SchedulePaymentDto,
  UpdateInvoiceDto,
} from '../interfaces/factura.interface';
import {
  Factura,
  QueryInvoice,
  RevertPaymentDto,
  Pago,
  PayInvoiceDto,
} from '../interfaces/factura.interface';
import { InvoiceInfo } from '../interfaces/invoice-info.interface';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  constructor(private http: HttpClient) {}

  getAll(params: QueryInvoice) {
    const paramsUrl = new URLSearchParams(params as any);
    return this.http
      .get<ResponsePagination<Factura[]>>(`${API.FACTURA.GET_ALL}?${paramsUrl}`)
      .pipe(delay(1000));
  }

  revertPayment(dto: RevertPaymentDto) {
    return this.http.post<Response<Pago>>(API.FACTURA.REVERT_PAYMENT, dto);
  }

  pay(dto: PayInvoiceDto) {
    return this.http.post<Response<Pago>>(API.FACTURA.PAY, dto);
  }

  schedulePayment(dto: SchedulePaymentDto) {
    return this.http.post<Response<Pago>>(API.FACTURA.SCHEDULE_PAYMENT, dto);
  }

  update(id: number, dto: UpdateInvoiceDto) {
    return this.http.put<Response<Factura>>(
      routeParams(API.FACTURA.UPDATE, { id }),
      dto
    );
  }

  getInvoiceDetails(id: number) {
    return this.http.get<Response<InvoiceDetail[]>>(
      routeParams(API.FACTURA_DETAIL.GET_BY_INVOICE, { id })
    );
  }

  recalculateInvoice(id: number) {
    return this.http.put<Response<Factura>>(
      routeParams(API.FACTURA.RECALCULATE_INVOICE, { id }),
      {}
    );
  }

  getInfo(id: number) {
    return this.http.get<Response<InvoiceInfo>>(
      routeParams(API.FACTURA.INFO, { id })
    );
  }
}
