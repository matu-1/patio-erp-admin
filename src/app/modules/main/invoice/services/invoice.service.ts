import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from 'src/app/utils/response';
import { API } from 'src/app/constants/api.constant';
import { CreateInvoiceDto, Invoice } from '../interfaces/invoice.interface';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Response<any[]>>(API.INVOICE.GET_ALL);
  }

  create(dto: CreateInvoiceDto) {
    return this.http.post<Response<Invoice>>(API.INVOICE.CREATE, dto);
  }
}
