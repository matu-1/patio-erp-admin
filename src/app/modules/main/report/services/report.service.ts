import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/constants/api.constant';
import { Response } from 'src/app/utils/response';
import {
  DeliveryDetail,
  GetDeliveryDetailDto,
} from '../interface/delivery-detail.interface';
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
}
