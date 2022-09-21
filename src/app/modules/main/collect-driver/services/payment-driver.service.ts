import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/constants/api.constant';
import { Response } from 'src/app/utils/response';
import { routeParams } from 'src/app/utils/route-params';
import {
  PaymentDriver,
  PayDriverDto,
} from '../interfaces/payment-driver.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentDriverService {
  constructor(private http: HttpClient) {}

  getPaymentsDriver() {
    return this.http.get<Response<PaymentDriver[]>>(API.PAYMENT_DRIVER.GET_ALL);
  }

  pay(id: number, dto: PayDriverDto) {
    return this.http.put<Response<PaymentDriver>>(
      routeParams(API.PAYMENT_DRIVER.PAY, { id }),
      dto
    );
  }
}
