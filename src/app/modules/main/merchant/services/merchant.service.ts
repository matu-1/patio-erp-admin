import { Injectable } from '@angular/core';
import { Response } from 'src/app/utils/response';
import { Merchant } from '../interfaces/merchant';
import { API } from 'src/app/constants/api.constant';
import { PATIO_STORE_CONFIG_HTTP } from 'src/app/constants/http-header.constant';
import { HttpClient } from '@angular/common/http';
import { routeParams } from 'src/app/utils/route-params';
import { tap } from 'rxjs';
import { ObjectUtils } from 'src/app/utils/object.util';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  isLoading = {
    getById: true,
  };

  constructor(private http: HttpClient) {}

  getAll(params: any) {
    return this.http.get<Response<Merchant[]>>(API.MERCHANT.GET_MERCHANTS, {
      ...PATIO_STORE_CONFIG_HTTP,
      params: ObjectUtils.clear(params),
    });
  }

  getById(id: number) {
    this.isLoading.getById = true;
    return this.http
      .get<Response<Merchant>>(routeParams(API.MERCHANT.GET_BY_ID, { id }), {
        ...PATIO_STORE_CONFIG_HTTP,
      })
      .pipe(tap(() => (this.isLoading.getById = false)));
  }

  create(dto: Merchant) {
    return this.http.post<Response<Merchant>>(API.MERCHANT.CREATE, dto, {
      ...PATIO_STORE_CONFIG_HTTP,
    });
  }

  update(id: number, dto: Merchant) {
    return this.http.put<Response<Merchant>>(
      routeParams(API.MERCHANT.UPDATE, { id }),
      dto,
      {
        ...PATIO_STORE_CONFIG_HTTP,
      }
    );
  }
}
