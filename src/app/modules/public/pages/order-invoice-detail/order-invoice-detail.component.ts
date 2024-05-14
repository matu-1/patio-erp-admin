import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { months } from 'src/app/constants/months.constant';
import { OrderInvoiceService } from 'src/app/modules/main/order-invoice/services/order-invoice.service';
import { handleRequestPg } from 'src/app/utils/handle-request';
import { OrderInvoiceInfo } from '../../interfaces/order-invoice-info.interface';
import {
  paymentMerchantExcelColumns,
  paymentMerchantsColumns,
} from '../../configs/table-columns';
import { PaymentMerchant } from 'src/app/modules/main/factura/interfaces/invoice-detail.interface';
import { ExcelUtils } from 'src/app/utils/excel.util';
import parseByColumns from 'src/app/components/data-table/parse-by-columns';
import { createOrdersInvoicePDF } from '../../utils/create-orders-invoice';

@Component({
  selector: 'app-order-invoice-detail',
  templateUrl: './order-invoice-detail.component.html',
  styleUrls: ['./order-invoice-detail.component.scss'],
})
export class OrderInvoiceDetailComponent implements OnInit {
  orderInvoiceInfo?: OrderInvoiceInfo;
  months = months;
  paymentMerchantsColumns = paymentMerchantsColumns;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderInvoiceService: OrderInvoiceService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getOrderInvoiceInfo(this.decodeCode(params.code).id);
    });
  }

  decodeCode(code: string) {
    const decoded = window.atob(code);
    const dataArray = decoded.split('-');
    return {
      management: dataArray[0],
      month: dataArray[1],
      id: Number(dataArray[2]),
      clientId: dataArray[3],
    };
  }

  async getOrderInvoiceInfo(id: number) {
    const res = await handleRequestPg(() =>
      this.orderInvoiceService.getInfo(id)
    );
    if (res) this.orderInvoiceInfo = res.data;
  }

  sendMessage() {
    const url = `https://api.whatsapp.com/send?phone=59177666780&text=comprobante%20de%20pago%20del%20recibo%20${this.orderInvoiceInfo?.invoiceId}`;
    window.open(url, '_blank');
  }

  sendEmail() {
    const url = `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=patioservicedelivery%40gmail.com&su=[PATIOSERVICE]%20Recibo%20%23${this.orderInvoiceInfo?.invoiceId}%20&body=Adjunto%20el%20comprobante%20de%20pago`;
    window.open(url, '_blank');
  }

  loadMultipago() {
    const h = screen.height;
    const w = screen.width;
    window.open(
      this.orderInvoiceInfo?.urlMultipago,
      '_blank',
      `toolbar=no,location=0,scrollbars=yes,resizable=yes,top=0,left=0,width=${w},height=${h}`
    );
  }

  exportToExcel(value: PaymentMerchant) {
    ExcelUtils.download(
      parseByColumns(value.excel?.orders ?? [], paymentMerchantExcelColumns),
      'merchant orders'
    );
  }

  exportToPDF(value: PaymentMerchant) {
    createOrdersInvoicePDF(value.pdf);
  }
}
