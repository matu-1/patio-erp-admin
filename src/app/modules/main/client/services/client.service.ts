import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/constants/api.constant';
import { PaginationDto } from 'src/app/utils/pagination.dto';
import { ResponsePagination } from 'src/app/utils/response';
import { Client } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  getPaginated(filter: PaginationDto) {
    return this.http.get<ResponsePagination<Client[]>>(
      API.CLIENT.GET_PAGINATED,
      { params: filter }
    );
  }
}
