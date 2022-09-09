import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/constants/api.constant';
import { PATIO_STORE_CONFIG_HTTP } from 'src/app/constants/http-header.constant';
import { skipToken } from 'src/app/interceptors/token.interceptor';
import { ObjectUtils } from 'src/app/utils/object.util';
import { Response } from 'src/app/utils/response';
import { environment } from 'src/environments/environment';
import {
  DeliveryDetail,
  GetDeliveryDetailDto,
} from '../interface/delivery-detail.interface';
import { HoursWorkedDriver } from '../interface/hours-worked-driver.interface';
import { OrderReceived } from '../interface/order-received.interface';
import {
  GetPaymentDetailDto,
  PaymentDetail,
} from '../interface/payment-detail.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getPaymentDetail(dto: GetPaymentDetailDto) {
    return this.http.post<Response<PaymentDetail[]>>(
      API.REPORT.GET_PAYMENT_DETAIL,
      dto
    );
  }

  getDeliveryDetail(dto: GetDeliveryDetailDto) {
    return this.http.post<Response<DeliveryDetail[]>>(
      API.REPORT.GET_DELIVERY_DETAIL,
      dto
    );
  }

  getHoursWorkedDrives(start: Date, end: Date) {
    return this.http.get<Response<HoursWorkedDriver[]>>(
      API.REPORT.GET_HOURS_WORKED_DRIVERS,
      {
        params: { start, end } as any,
        ...PATIO_STORE_CONFIG_HTTP,
      }
    );
  }

  getOrdersReceivedDriver(start: Date, end: Date, paymentModeId?: number) {
    const params = ObjectUtils.clear({ start, end, paymentModeId });
    return this.http.get<Response<OrderReceived[]>>(
      API.REPORT.GET_ORDERS_RECEIVED,
      {
        params,
        ...PATIO_STORE_CONFIG_HTTP,
      }
    );
  }
}
