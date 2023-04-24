import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/constants/api.constant';
import { ObjectUtils } from 'src/app/utils/object.util';
import { Response } from 'src/app/utils/response';
import { routeParams } from 'src/app/utils/route-params';
import {
  PaymentDriver,
  PayDriverDto,
  PaymentFilterDto,
  PayDriverMultipleDto,
  UpdatePaymentDriverDto,
} from '../interfaces/payment-driver.interface';
import { Payment } from '../interfaces/payment.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentDriverService {
  constructor(private http: HttpClient) {}

  getPaymentsDriver(dto: PaymentFilterDto) {
    dto = ObjectUtils.clear(dto);
    dto.type = 1;
    dto.showDetails = 1;
    return this.http.get<Response<PaymentDriver[]>>(
      API.PAYMENT_DRIVER.GET_BY_RANGE,
      { params: dto as any }
    );
  }

  pay(id: number, dto: PayDriverDto) {
    return this.http.put<Response<PaymentDriver>>(
      routeParams(API.PAYMENT_DRIVER.PAY, { id }),
      dto
    );
  }

  revert(id: number) {
    return this.http.put<Response<PaymentDriver>>(
      routeParams(API.PAYMENT_DRIVER.REVERT, { id }),
      {}
    );
  }

  getPayments(id: number) {
    return this.http.get<Response<Payment[]>>(
      routeParams(API.PAYMENT_DRIVER.PAYMENTS, { id })
    );
  }

  payMultiple(dto: PayDriverMultipleDto) {
    return this.http.post<Response<any>>(API.PAYMENT_DRIVER.PAY_MULTIPLE, dto);
  }

  update(id: number, dto: UpdatePaymentDriverDto) {
    return this.http.put<Response<PaymentDriver>>(
      routeParams(API.PAYMENT_DRIVER.UPDATE, { id }),
      dto
    );
  }
}
