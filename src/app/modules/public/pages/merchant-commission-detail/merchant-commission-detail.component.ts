import { Component, OnInit } from '@angular/core';
import {
  InvoiceDataDetail,
  PaymentMerchant,
} from '../../../main/factura/interfaces/invoice-detail.interface';
import {
  paymentMerchantExcelColumns,
  paymentMerchantsColumns,
} from '../../configs/table-columns';
import { handleRequestPg } from 'src/app/utils/handle-request';
import { PublicService } from '../../services/public.service';
import { ActivatedRoute } from '@angular/router';
import { months } from 'src/app/constants/months.constant';
import { createOrdersInvoicePDF } from '../../utils/create-orders-invoice';
import { ExcelUtils } from 'src/app/utils/excel.util';
import parseByColumns from 'src/app/components/data-table/parse-by-columns';
import { MatDialog } from '@angular/material/dialog';
import { OrdersDetailDialog } from '../../components/orders-detail/orders-detail.dialog';
import { DIALOG_CONFIG_SM } from 'src/app/constants/dialog.constant';

@Component({
  selector: 'app-merchant-commission-detail',
  templateUrl: './merchant-commission-detail.component.html',
  styleUrls: ['./merchant-commission-detail.component.scss'],
})
export class MerchantCommissionDetailComponent implements OnInit {
  invoiceInfo?: InvoiceDataDetail;
  paymentMerchantsColumns = paymentMerchantsColumns;
  months = months;

  constructor(
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ code }) => {
      this.getInfo(this.decodeCode(code));
    });
  }

  async getInfo(dto: any) {
    const res = await handleRequestPg(() =>
      this.publicService.getInvoiceDataInfo(dto)
    );
    if (res) {
      this.invoiceInfo = res.data;
    }
  }

  decodeCode(code: string) {
    const data = window.atob(code);
    const dataArray = data.split('*');
    return {
      startDate: new Date(dataArray[0]),
      endDate: new Date(dataArray[1]),
      clientId: dataArray[2],
    };
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

  showDetailDialog(value: PaymentMerchant) {
    this.dialog.open(OrdersDetailDialog, {
      ...DIALOG_CONFIG_SM,
      data: value,
    });
  }
}
