import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from 'src/app/utils/response';
import { API } from 'src/app/constants/api.constant';
import { CreateInvoiceDto, Invoice } from '../interfaces/invoice.interface';
import { PATIO_STORE_CONFIG_HTTP } from 'src/app/constants/http-header.constant';

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

  uploadFile(file: File) {
    const body = new FormData();
    body.append('file', file);
    return this.http.post<Response<string>>(API.FILE.UPLOAD, body, {
      ...PATIO_STORE_CONFIG_HTTP,
    });
  }
}
