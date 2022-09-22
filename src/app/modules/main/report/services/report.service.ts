import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/constants/api.constant';
import { PATIO_STORE_CONFIG_HTTP } from 'src/app/constants/http-header.constant';
import { ObjectUtils } from 'src/app/utils/object.util';
import { Response } from 'src/app/utils/response';
import { City } from '../../dashboard/interfaces/city.interface';
import {
  DeliveryDetail,
  GetDeliveryDetailDto,
} from '../interface/delivery-detail.interface';
import {
  HoursWorkedDriver,
  HoursWorkedDto,
} from '../interface/hours-worked-driver.interface';
import { OrderReceived } from '../interface/order-received.interface';
import {
  CreatePaymentDriverDto,
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

  getHoursWorkedDrives(dto: HoursWorkedDto) {
    return this.http.get<Response<HoursWorkedDriver[]>>(
      API.REPORT.GET_HOURS_WORKED_DRIVERS,
      {
        params: dto as any,
        ...PATIO_STORE_CONFIG_HTTP,
      }
    );
  }

  getOrdersReceivedDriver(start: Date, end: Date, paymentModeId?: number) {
    const params = ObjectUtils.clear({ start, end, paymentModeId });
    return this.http.get<Response<OrderReceived[]>>(
      API.REPORT.GET_ORDERS_RECEIVED,
      {
        params: params as any,
        ...PATIO_STORE_CONFIG_HTTP,
      }
    );
  }

  generatePayments(dto: CreatePaymentDriverDto) {
    return this.http.post<Response<boolean>>(
      API.PAYMENT_DRIVER.GENERATE_PAYMENTS,
      dto
    );
  }

  getCities() {
    return this.http.get<Response<City[]>>(API.CITY.GET_CITIES);
  }
}
