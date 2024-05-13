import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  OrderInvoice,
  ParamsOrderInvoice,
} from '../interfaces/order-invoice.interface';
import { API } from 'src/app/constants/api.constant';
import { ResponsePagination } from 'src/app/utils/response';
import { ObjectUtils } from 'src/app/utils/object.util';
import { routeParams } from 'src/app/utils/route-params';

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
    return this.http.get<any>(routeParams(API.ORDER_INVOICE.GET_INFO, { id }));
  }
}
