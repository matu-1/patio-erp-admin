import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { API } from 'src/app/constants/api.constant';
import { PATIO_STORE_CONFIG_HTTP } from 'src/app/constants/http-header.constant';
import { Response } from 'src/app/utils/response';
import {
  AverageStatus,
  AverageStatusDto,
} from '../interfaces/average-status.interface';
import { City } from '../interfaces/city.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAverageStatus(dto: AverageStatusDto) {
    console.log('dto', dto);
    return this.http.get<Response<AverageStatus>>(
      API.DASHBOARD.GET_AVERAGE_STATUS,
      { params: dto as any, ...PATIO_STORE_CONFIG_HTTP }
    );
  }

  getCities() {
    return this.http
      .get<Response<City[]>>(API.CITY.GET_CITIES)
      .pipe(delay(3000));
  }
}
