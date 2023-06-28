import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/constants/api.constant';
import { PATIO_STORE_CONFIG_HTTP } from 'src/app/constants/http-header.constant';
import { Driver } from 'src/app/modules/public/interfaces/driver.interface';
import { ObjectUtils } from 'src/app/utils/object.util';
import { Response } from 'src/app/utils/response';
import { routeParams } from 'src/app/utils/route-params';
import { GeneratePrepaid } from '../interfaces/payment-driver.interface';
import {
  CollectDriver,
  PayDriverDto,
  CollectFilterDto,
  CreateCollectDriver,
} from '../interfaces/payment-driver.interface';

@Injectable({
  providedIn: 'root',
})
export class CollectDriverService {
  constructor(private http: HttpClient) {}

  getPaymentsDriver(dto: CollectFilterDto) {
    dto = ObjectUtils.clear(dto);
    dto.type = 0;
    return this.http.get<Response<CollectDriver[]>>(
      API.PAYMENT_DRIVER.GET_BY_RANGE,
      {
        params: dto as any,
      }
    );
  }

  pay(id: number, dto: PayDriverDto) {
    return this.http.put<Response<CollectDriver>>(
      routeParams(API.PAYMENT_DRIVER.PAY, { id }),
      dto
    );
  }

  blockDriver(id: number) {
    return this.http.put<Response<any>>(
      routeParams(API.DRIVER.CHANGE_STATUS, { id }),
      {
        status: 'disabled',
      },
      {
        ...PATIO_STORE_CONFIG_HTTP,
      }
    );
  }

  getDriver(id: number) {
    return this.http.get<Response<Driver>>(
      routeParams(API.DRIVER.GET_BY_ID, { id }),
      { ...PATIO_STORE_CONFIG_HTTP }
    );
  }

  revert(id: number) {
    return this.http.put<Response<CollectDriver>>(
      routeParams(API.PAYMENT_DRIVER.REVERT, { id }),
      {}
    );
  }

  getDrivers() {
    return this.http.get<Response<Driver[]>>(API.DRIVER.GET_ALL, {
      ...PATIO_STORE_CONFIG_HTTP,
    });
  }

  create(dto: CreateCollectDriver) {
    return this.http.post<Response<CollectDriver>>(
      API.PAYMENT_DRIVER.CREATE,
      dto
    );
  }

  generateCollection(dto: GeneratePrepaid) {
    return this.http.post<Response<CollectDriver[]>>(
      API.PAYMENT_DRIVER.GENERATE_COLLECTION,
      dto
    );
  }
}
