import { Injectable } from '@angular/core';
import { Response } from 'src/app/utils/response';
import { Merchant } from '../interfaces/merchant';
import { API } from 'src/app/constants/api.constant';
import { PATIO_STORE_CONFIG_HTTP } from 'src/app/constants/http-header.constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Response<Merchant[]>>(API.MERCHANT.GET_MERCHANTS, {
      ...PATIO_STORE_CONFIG_HTTP,
    });
  }

  create(dto: Merchant) {
    return this.http.post<Response<Merchant[]>>(API.MERCHANT.CREATE, dto, {
      ...PATIO_STORE_CONFIG_HTTP,
    });
  }
}
