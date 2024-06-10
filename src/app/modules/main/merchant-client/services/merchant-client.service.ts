import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response, ResponsePagination } from 'src/app/utils/response';
import { Client } from '../interfaces/client.interface';
import { API } from 'src/app/constants/api.constant';
import { routeParams } from 'src/app/utils/route-params';
import { tap } from 'rxjs';
import { PaginationDto } from 'src/app/utils/pagination.dto';
import { PATIO_STORE_CONFIG_HTTP } from 'src/app/constants/http-header.constant';
import { Collector } from '../interfaces/collector.interface';

@Injectable({
  providedIn: 'root',
})
export class MerchantClientService {
  isLoading = {
    getById: true,
  };

  constructor(private http: HttpClient) {}

  getPaginated(filter: PaginationDto) {
    return this.http.get<ResponsePagination<Client[]>>(
      API.MERCHANT_CLIENT.GET_PAGINATED,
      { params: filter, ...PATIO_STORE_CONFIG_HTTP }
    );
  }

  getById(id: number) {
    this.isLoading.getById = true;
    return this.http
      .get<Response<Client>>(
        routeParams(API.MERCHANT_CLIENT.GET_BY_ID, { id }),
        { ...PATIO_STORE_CONFIG_HTTP }
      )
      .pipe(tap(() => (this.isLoading.getById = false)));
  }

  create(dto: Client) {
    return this.http.post<Response<Client>>(API.MERCHANT_CLIENT.CREATE, dto, {
      ...PATIO_STORE_CONFIG_HTTP,
    });
  }

  update(id: number, dto: Partial<Client>) {
    return this.http.put<Response<Client>>(
      routeParams(API.MERCHANT_CLIENT.UPDATE, { id }),
      dto,
      { ...PATIO_STORE_CONFIG_HTTP }
    );
  }

  changeStatus(id: number, dto: any) {
    return this.http.put<Response<Client>>(
      routeParams(API.MERCHANT_CLIENT.CHANGE_STATUS, { id }),
      dto,
      { ...PATIO_STORE_CONFIG_HTTP }
    );
  }

  getCollectors() {
    return this.http.get<Response<Collector[]>>(API.COLLECTOR.GET_ALL, {
      ...PATIO_STORE_CONFIG_HTTP,
    });
  }
}
