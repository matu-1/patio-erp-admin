import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  OrderInvoice,
  ParamBulkInvoiceDto,
  ParamsOrderInvoice,
  PayOrderInvoiceDto,
  RevertPaymentOrderInvoiceDto,
  SchedulePaymentDto,
  UpdateOrderInvoiceDto,
} from '../interfaces/order-invoice.interface';
import { API } from 'src/app/constants/api.constant';
import { Response, ResponsePagination } from 'src/app/utils/response';
import { ObjectUtils } from 'src/app/utils/object.util';
import { routeParams } from 'src/app/utils/route-params';
import { OrderInvoiceInfo } from 'src/app/modules/public/interfaces/order-invoice-info.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderInvoiceService {
  constructor(private http: HttpClient) {}

  getPaginated(dto: ParamsOrderInvoice) {
    const params = new URLSearchParams(ObjectUtils.clear(dto) as any);
    return this.http.get<ResponsePagination<OrderInvoice[]>>(
      `${API.ORDER_INVOICE.GET_ALL}?${params}`
      // { params: dto as any }
    );
  }

  getInfo(id: number) {
    return this.http.get<Response<OrderInvoiceInfo>>(
      routeParams(API.ORDER_INVOICE.GET_INFO, { id })
    );
  }

  refresh(id: number) {
    return this.http.put<Response<OrderInvoice>>(
      routeParams(API.ORDER_INVOICE.REFRESH, { id }),
      {}
    );
  }

  revertPayment(dto: RevertPaymentOrderInvoiceDto) {
    return this.http.post<Response<OrderInvoice>>(
      API.ORDER_INVOICE.REVERT_PAYMENT,
      dto
    );
  }

  pay(dto: PayOrderInvoiceDto) {
    return this.http.post<Response<OrderInvoice>>(API.ORDER_INVOICE.PAY, dto);
  }

  schedulePayment(dto: SchedulePaymentDto) {
    return this.http.post<Response<OrderInvoice>>(
      API.ORDER_INVOICE.SCHEDULE_PAYMENT,
      dto
    );
  }

  update(id: number, dto: UpdateOrderInvoiceDto) {
    return this.http.put<Response<OrderInvoice>>(
      routeParams(API.ORDER_INVOICE.UPDATE, { id }),
      dto
    );
  }

  getBulkInvoices(dto: ParamBulkInvoiceDto) {
    return this.http.get<Response<OrderInvoice[]>>(
      `${API.ORDER_INVOICE.BULK_INVOICES}`,
      { params: dto as any }
    );
  }
}
