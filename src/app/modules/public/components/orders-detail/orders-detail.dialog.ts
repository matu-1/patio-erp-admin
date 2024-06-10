import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PAYMENT_MODE_ID } from 'src/app/constants/constant';
import { PaymentMerchant } from 'src/app/modules/main/factura/interfaces/invoice-detail.interface';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.dialog.html',
  styleUrls: ['./orders-detail.dialog.scss'],
})
export class OrdersDetailDialog implements OnInit {
  paymentModeId = PAYMENT_MODE_ID;

  constructor(@Inject(MAT_DIALOG_DATA) public data: PaymentMerchant) {
    console.log(data);
  }

  ngOnInit(): void {}
}
