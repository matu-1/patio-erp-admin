import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, tap, map } from 'rxjs';
import { API } from 'src/app/constants/api.constant';
import { PATIO_STORE_CONFIG_HTTP } from 'src/app/constants/http-header.constant';
import { Response } from 'src/app/utils/response';
import { routeParams } from 'src/app/utils/route-params';
import { Driver } from '../interfaces/driver.interface';
import { OrderDto } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  hasError = {
    getOrder: false,
  };
  constructor(private http: HttpClient) {}

  getOrder(id: number) {
    return this.http
      .get<Response<OrderDto>>(routeParams(API.ORDER.GET_BY_ID, { id }), {
        ...PATIO_STORE_CONFIG_HTTP,
        params: {
          driverStatus: 'assigned,complete',
        },
      })
      .pipe(
        map((data) => {
          data.data.products = JSON.parse(data.data.details);
          return data;
        }),
        catchError((err) => {
          this.hasError.getOrder = true;
          return throwError(() => err);
        })
      );
  }

  getDriver(id: number) {
    return this.http.get<Response<Driver>>(
      routeParams(API.DRIVER.GET_BY_ID, { id }),
      { ...PATIO_STORE_CONFIG_HTTP }
    );
  }
}
