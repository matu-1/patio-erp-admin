import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { API } from 'src/app/constants/api.constant';
import { PaginationDto } from 'src/app/utils/pagination.dto';
import { Response, ResponsePagination } from 'src/app/utils/response';
import { routeParams } from 'src/app/utils/route-params';
import { Client, CreateClientDto } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  isLoading = {
    getById: true,
  };

  constructor(private http: HttpClient) {}

  getPaginated(filter: PaginationDto) {
    return this.http.get<ResponsePagination<Client[]>>(
      API.CLIENT.GET_PAGINATED,
      { params: filter }
    );
  }

  getById(id: number) {
    this.isLoading.getById = true;
    return this.http
      .get<Response<Client>>(routeParams(API.CLIENT.GET_BY_ID, { id }))
      .pipe(tap(() => (this.isLoading.getById = false)));
  }

  create(dto: Client) {
    return this.http.post<Response<Client>>(API.CLIENT.CREATE, dto);
  }

  update(id: number, dto: Partial<Client>) {
    return this.http.put<Response<Client>>(
      routeParams(API.CLIENT.UPDATE, { id }),
      dto
    );
  }
}
