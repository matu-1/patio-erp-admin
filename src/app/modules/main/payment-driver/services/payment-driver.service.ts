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
} from '../interfaces/payment-driver.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentDriverService {
  constructor(private http: HttpClient) {}

  getPaymentsDriver(dto: PaymentFilterDto) {
    dto = ObjectUtils.clear(dto);
    dto.type = 1;
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
}
