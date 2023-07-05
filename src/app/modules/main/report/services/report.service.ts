import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/constants/api.constant';
import { PATIO_STORE_CONFIG_HTTP } from 'src/app/constants/http-header.constant';
import { ObjectUtils } from 'src/app/utils/object.util';
import { Response } from 'src/app/utils/response';
import { routeParams } from 'src/app/utils/route-params';
import { City } from '../../dashboard/interfaces/city.interface';
import { Merchant } from '../../dashboard/interfaces/merchant.interface';
import {
  CollectMerchantDto,
  CollectMerchantParams,
} from '../interfaces/collect-merchant.interface';
import {
  DeliveryDetail,
  GetDeliveryDetailDto,
} from '../interfaces/delivery-detail.interface';
import {
  BankAccount,
  HoursWorkedDriver,
  HoursWorkedDto,
} from '../interfaces/hours-worked-driver.interface';
import { OrderReceived } from '../interfaces/order-received.interface';
import { FilterOrder, Order } from '../interfaces/order.interface';
import { InvoiceByYear } from '../interfaces/invoice-by-year.interface';
import { DriverDto } from '../interfaces/driver.interface';
import {
  CreatePaymentDriverDto,
  GetPaymentDetailDto,
  PaymentDetail,
  RefreshPaymentDto,
  UpdateBankAccount,
} from '../interfaces/payment-detail.interface';

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

  getOrders(dto: FilterOrder) {
    dto.driverStatus = 'assigned,complete';
    dto = ObjectUtils.clear(dto);
    return this.http.get<Response<Order[]>>(API.ORDER.GET_ALL, {
      ...PATIO_STORE_CONFIG_HTTP,
      params: dto as any,
    });
  }

  refresh(dto: RefreshPaymentDto) {
    return this.http.post<Response<any>>(API.PAYMENT_DRIVER.REFRESH, dto);
  }

  updateBankAccount(id: number, dto: UpdateBankAccount) {
    return this.http.put<Response<BankAccount>>(
      routeParams(API.BANK_ACCOUNT.UPDATE, { id }),
      dto,
      { ...PATIO_STORE_CONFIG_HTTP }
    );
  }

  getBankAccount(id: number) {
    return this.http.get<Response<BankAccount>>(
      routeParams(API.BANK_ACCOUNT.GET_BY_ID, { id }),
      { ...PATIO_STORE_CONFIG_HTTP }
    );
  }

  createBankAccount(dto: UpdateBankAccount) {
    return this.http.post<Response<BankAccount>>(API.BANK_ACCOUNT.CREATE, dto, {
      ...PATIO_STORE_CONFIG_HTTP,
    });
  }

  createOrUpdateBankAccount(dto: UpdateBankAccount, id?: number) {
    dto = ObjectUtils.clear(dto);
    if (dto.paymentMethod)
      dto.paymentMethod = (dto.paymentMethod as any).join(',');
    return id ? this.updateBankAccount(id, dto) : this.createBankAccount(dto);
  }

  getCollectMerchants(params: CollectMerchantParams) {
    const urlParams = new URLSearchParams(params as any);
    return this.http.get<Response<CollectMerchantDto[]>>(
      `${API.ORDER.GET_COLLECT_MERCHANT}?${urlParams}`,
      { ...PATIO_STORE_CONFIG_HTTP }
    );
  }

  getMerchants() {
    return this.http.get<Response<Merchant[]>>(API.MERCHANT.GET_MERCHANTS, {
      ...PATIO_STORE_CONFIG_HTTP,
    });
  }

  getInvoicesByYear(year: number) {
    return this.http.get<Response<InvoiceByYear[]>>(
      routeParams(API.INVOICE.GET_BY_YEAR, { year })
    );
  }

  getDrivers() {
    return this.http.get<Response<DriverDto[]>>(API.DRIVER.GET_ALL, {
      ...PATIO_STORE_CONFIG_HTTP,
    });
  }

  getDriverFullInfo(id: number) {
    return this.http.get<Response<DriverDto>>(
      routeParams(API.DRIVER.GET_FULL_INFO, { id }),
      {
        ...PATIO_STORE_CONFIG_HTTP,
      }
    );
  }
}
