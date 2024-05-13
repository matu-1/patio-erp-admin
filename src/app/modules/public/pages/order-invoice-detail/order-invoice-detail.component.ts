import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderInvoiceService } from 'src/app/modules/main/order-invoice/services/order-invoice.service';
import { handleRequestPg } from 'src/app/utils/handle-request';

@Component({
  selector: 'app-order-invoice-detail',
  templateUrl: './order-invoice-detail.component.html',
  styleUrls: ['./order-invoice-detail.component.scss'],
})
export class OrderInvoiceDetailComponent implements OnInit {
  orderInvoiceInfo?: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderInvoiceService: OrderInvoiceService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log('params', params);
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
}
