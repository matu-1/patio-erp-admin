import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { handleRequestPg } from 'src/app/utils/handle-request';
import { FacturaService } from '../../../main/factura/services/factura.service';
import {
  InvoiceDetail,
  InvoiceInfo,
} from '../../../main/factura/interfaces/invoice-info.interface';
import { months } from 'src/app/constants/months.constant';
import {
  additionalServiceColumns,
  salesColumns,
  salesExcelColumns,
} from '../../configs/table-columns';
import { ExcelUtils } from 'src/app/utils/excel.util';
import parseByColumns from 'src/app/components/data-table/parse-by-columns';
import { createSalesInvoice } from '../../utils/create-sales-invoice';

@Component({
  selector: 'app-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
})
export class InvoiceDetailComponent implements OnInit {
  invoiceInfo?: InvoiceInfo;
  months = months;
  additionalServiceColumns = additionalServiceColumns;
  salesColumns = salesColumns;

  constructor(
    private activatedRoute: ActivatedRoute,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ code }) => {
      const id = Number(this.decodeCode(code).id);
      this.getInfo(id);
    });
  }

  async getInfo(id: number) {
    const res = await handleRequestPg(() => this.facturaService.getInfo(id));
    if (res) {
      this.invoiceInfo = res.data;
      this.invoiceInfo.id = id;
    }
  }

  decodeCode(code: string) {
    const data = window.atob(code);
    const dataArray = data.split('-');
    return {
      gestion: dataArray[0],
      mes: dataArray[1],
      id: dataArray[2],
      id_cliente: dataArray[3],
    };
  }

  getInvoiceDetails(isService = true) {
    return this.invoiceInfo?.invoiceDetails.filter((item) =>
      isService ? item.id_servicio != '11' : item.id_servicio == '11'
    );
  }

  sendEmail() {
    const url = `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=patioservicedelivery%40gmail.com&su=[PATIOSERVICE]%20Recibo%20%23${this.invoiceInfo?.id}%20&body=Adjunto%20el%20comprobante%20de%20pago`;
    window.open(url, '_blank');
  }

  sendMessage() {
    const url = `https://api.whatsapp.com/send?phone=59177666780&text=comprobante%20de%20pago%20del%20recibo%20${this.invoiceInfo?.id}`;
    window.open(url, '_blank');
  }

  exportToExcel(invoiceDetail: InvoiceDetail) {
    ExcelUtils.download(
      parseByColumns(invoiceDetail.pdf?.pdf_array ?? [], salesExcelColumns),
      'sales order'
    );
  }

  exportToPDF(invoiceDetail: InvoiceDetail) {
    createSalesInvoice(invoiceDetail.pdf!);
  }
}
